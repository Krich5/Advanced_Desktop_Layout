/**
 * V1
 */
(function() {
  class RssWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.feedUrl = '';
      this.label = 'Feed';
      this.items = [];
      this.token = '';
      this.orgId = '';
      this.dataCenter = '';
      this.baseUrl = '';
      this.variableId = '';
      this.textValue = '';
    }

    static get observedAttributes() {
      return ['rss-feed-url', 'label', 'token', 'org-id', 'data-center', 'base-url', 'variable-id'];
    }

    attributeChangedCallback(name, _old, value) {
      if (name === 'rss-feed-url') this.feedUrl = value || '';
      if (name === 'label') this.label = value || 'Feed';
      if (name === 'token') this.token = value || '';
      if (name === 'org-id') this.orgId = value || '';
      if (name === 'data-center') this.dataCenter = value || '';
      if (name === 'base-url') this.baseUrl = value || '';
      if (name === 'variable-id') this.variableId = value || '';
      if (this.isConnected) this.loadFeed();
    }

    connectedCallback() {
      this.render();
      this.loadFeed();
    }

    async loadFeed() {
      this.items = [];
      this.textValue = '';

      if (this.feedUrl) {
        try {
          const res = await fetch(this.feedUrl, { headers: { Accept: 'application/rss+xml,text/xml' } });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/xml');
          const titles = Array.from(doc.querySelectorAll('item > title')).map(n => n.textContent || '').filter(Boolean);
          this.items = titles.slice(0, 5);
          this.render();
          return;
        } catch (err) {
          console.error('RSS load failed', err);
        }
      }

      await this.loadVariableFallback();
      this.render(this.items.length === 0 && !this.textValue ? 'Feed unavailable' : undefined);
    }

    apiBase() {
      if (this.baseUrl) return this.baseUrl;
      const dcMap = {
        'us1': 'https://api.wxcc-us1.cisco.com',
        'eu1': 'https://api.wxcc-eu1.cisco.com',
        'eu2': 'https://api.wxcc-eu2.cisco.com',
        'anz1': 'https://api.wxcc-anz1.cisco.com',
        'ca1': 'https://api.wxcc-ca1.cisco.com'
      };
      return dcMap[this.dataCenter] || dcMap['us1'];
    }

    async loadVariableFallback() {
      if (!this.variableId || !this.token || !this.orgId) {
        return;
      }
      try {
        const res = await fetch(`${this.apiBase()}/organization/${this.orgId}/cad-variable/${this.variableId}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        this.textValue = data.defaultValue || '';
      } catch (err) {
        console.error('Variable load failed', err);
      }
    }

    render(errorText) {
      const style = `
        :host {
          display: block;
          font-family: 'CiscoSansTT Regular', 'Helvetica Neue', Arial, sans-serif;
        }
        .ticker {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #0b1f38;
          color: #e2e8f0;
          padding: 8px 12px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          min-height: 32px;
        }
        .ticker-label {
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #7dd3fc;
          white-space: nowrap;
        }
        .ticker-track {
          position: relative;
          overflow: hidden;
          flex: 1;
          height: 18px;
        }
        .ticker-track span {
          position: absolute;
          white-space: nowrap;
          animation: tickerScroll 24s linear infinite;
        }
        @keyframes tickerScroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `;
      const text = errorText || (this.items.length ? this.items.join(' • ') : this.textValue || '');
      this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="ticker">
          <span class="ticker-label">${(this.label || 'Feed').replace(/</g, '&lt;')}</span>
          <div class="ticker-track"><span>${text ? text.replace(/</g, '&lt;') : ''}</span></div>
        </div>
      `;
    }
  }

  if (!customElements.get('rss-widget')) {
    customElements.define('rss-widget', RssWidget);
  }
})();
