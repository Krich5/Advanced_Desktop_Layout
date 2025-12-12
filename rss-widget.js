/**
 * Simple RSS/Marquee widget for Webex CC Advanced Header.
 * Usage in layout advancedHeader:
 * {
 *   "comp": "rss-widget",
 *   "script": "https://your-host/rss-widget.js",
 *   "attributes": {
 *     "rss-feed-url": "https://example.com/feed.xml",
 *     "label": "Advisories"
 *   }
 * }
 */
(function() {
  class RssWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.feedUrl = '';
      this.label = 'Feed';
      this.items = [];
    }

    static get observedAttributes() {
      return ['rss-feed-url', 'label'];
    }

    attributeChangedCallback(name, _old, value) {
      if (name === 'rss-feed-url') this.feedUrl = value || '';
      if (name === 'label') this.label = value || 'Feed';
      if (this.isConnected) this.loadFeed();
    }

    connectedCallback() {
      this.render();
      if (this.feedUrl) this.loadFeed();
    }

    async loadFeed() {
      if (!this.feedUrl) {
        this.render('Feed URL not set');
        return;
      }
      try {
        const res = await fetch(this.feedUrl, { headers: { Accept: 'application/rss+xml,text/xml' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/xml');
        const titles = Array.from(doc.querySelectorAll('item > title')).map(n => n.textContent || '').filter(Boolean);
        this.items = titles.slice(0, 5);
        this.render();
      } catch (err) {
        console.error('RSS load failed', err);
        this.render('Feed unavailable');
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
      const text = errorText || (this.items.length ? this.items.join(' • ') : '');
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
