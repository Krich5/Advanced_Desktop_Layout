/**
 * V1
 */

(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: 'CiscoSansTT Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        padding: 12px;
        background: transparent;
        height: 100%;
        overflow-y: auto;
      }
      
      .container {
        width: 100%;
        margin: 0;
        background: transparent;
        border-radius: 8px;
        box-shadow: none;
        overflow: hidden;
      }
      
      .header {
        background: linear-gradient(135deg, #049fd9 0%, #005073 100%);
        color: white;
        padding: 16px;
        border-radius: 8px 8px 0 0;
      }
      
      .header h1 {
        font-size: 20px;
        margin: 0 0 8px 0;
        font-weight: 300;
      }
      
      .header p {
        font-size: 14px;
        margin: 0;
        opacity: 0.9;
      }
      
      .content {
        padding: 16px;
      }
      
      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
      }
      
      .btn-primary {
        background: #049fd9;
        color: white;
      }
      
      .btn-primary:hover {
        background: #037ba8;
      }
      
      .btn-success {
        background: #28a745;
        color: white;
      }
      
      .btn-success:hover {
        background: #218838;
      }
      
      .message {
        padding: 12px 16px;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 14px;
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .message.success {
        background: #d4edda;
        color: #155724;
        border-left: 4px solid #28a745;
      }
      
      .message.error {
        background: #f8d7da;
        color: #721c24;
        border-left: 4px solid #dc3545;
      }
      
      .message.info {
        background: #d1ecf1;
        color: #0c5460;
        border-left: 4px solid #17a2b8;
      }
      
      .editor-panel {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 24px;
        display: none;
      }
      
      .editor-panel.active {
        display: block;
      }
      
      .editor-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      
      .editor-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6c757d;
        padding: 0;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 4px;
      }
      
      .close-btn:hover {
        background: #e9ecef;
        color: #495057;
      }
      
      .form-group {
        margin-bottom: 20px;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #495057;
        font-size: 14px;
      }
      
      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s;
        box-sizing: border-box;
      }
      
      .form-group input:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: #049fd9;
        box-shadow: 0 0 0 3px rgba(4, 159, 217, 0.1);
      }
      
      .form-group textarea {
        resize: vertical;
        min-height: 320px;
        font-family: 'Menlo', 'SFMono-Regular', 'Courier New', monospace;
        font-size: 15px;
        line-height: 1.5;
        letter-spacing: 0.2px;
      }

      .inline-textarea {
        resize: vertical;
        min-height: 320px;
        font-family: 'Menlo', 'SFMono-Regular', 'Courier New', monospace;
        font-size: 15px;
        line-height: 1.5;
        letter-spacing: 0.2px;
        width: 100%;
        padding: 12px;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        box-sizing: border-box;
        color: #111827;
      }

      .inline-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }

      .icon-btn.save {
        color: #16a34a;
      }
      .icon-btn.save:hover {
        color: #0f9a3c;
      }
      
      .form-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
      
      .btn-cancel {
        background: #6c757d;
        color: white;
      }
      
      .btn-cancel:hover {
        background: #5a6268;
      }
      
      .variables-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        align-items: start;
      }
      .variables-grid.two-cols {
        grid-template-columns: minmax(520px, 3fr) minmax(180px, 1fr);
      }
      @media (max-width: 900px) {
        .variables-grid.two-cols {
          grid-template-columns: 1fr;
        }
      }
      
      .variable-card {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        padding: 16px;
        transition: all 0.2s;
        position: relative;
      }
      
      .variable-card:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        border-color: #049fd9;
      }
      
      .variable-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
      }
      
      .variable-name {
        font-weight: 600;
        color: #049fd9;
        font-size: 15px;
        word-break: break-word;
        flex: 1;
      }
      
      .variable-actions {
        display: flex;
        gap: 8px;
        margin-left: 12px;
      }
      
      .icon-btn {
        background: none;
        border: none;
        padding: 6px;
        cursor: pointer;
        border-radius: 4px;
        color: #6c757d;
        transition: all 0.2s;
        font-size: 16px;
      }
      
      .icon-btn:hover {
        background: #f8f9fa;
        color: #495057;
      }
      
      .icon-btn.edit:hover {
        color: #049fd9;
      }
      
      .switch {
        position: relative;
        display: inline-block;
        width: 42px;
        height: 24px;
      }
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #cbd5e1;
        transition: .2s;
        border-radius: 24px;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .2s;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      }
      .switch input:checked + .slider {
        background-color: #10b981;
      }
      .switch input:checked + .slider:before {
        transform: translateX(18px);
      }
      
      .variable-value {
        background: #f8f9fa;
        padding: 12px;
        border-radius: 4px;
        font-family: 'Menlo', 'SFMono-Regular', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: 0.2px;
        color: #374151;
        word-break: break-all;
        min-height: 240px;
        max-height: 320px;
        overflow-y: auto;
        border: 1px solid #e9ecef;
      }
      .boolean-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .boolean-value {
        min-height: unset;
        max-height: unset;
        padding: 10px 12px;
        margin: 0;
        flex: 1;
      }
      
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #6c757d;
      }
      
      .empty-state-icon {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.3;
      }
      
      .loading {
        text-align: center;
        padding: 40px;
        color: #6c757d;
      }

      .ticker {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #0b1f38;
        color: #e2e8f0;
        padding: 10px 12px;
        border-radius: 8px;
        margin-bottom: 12px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.08);
      }
      .ticker-label {
        font-weight: 700;
        font-size: 12px;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        color: #7dd3fc;
        white-space: nowrap;
      }
      .ticker-track {
        position: relative;
        overflow: hidden;
        flex: 1;
        height: 20px;
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
      
      .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #049fd9;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    
    <div class="container">
      <div class="content">
        <div id="tickerContainer"></div>
        <div class="editor-panel" id="editorPanel">
          <div class="editor-header">
            <h3 id="editorTitle"></h3>
            <button class="close-btn" id="closeEditor">×</button>
          </div>
          
          <input type="hidden" id="varName">
          
          <div class="form-group">
            <label for="varValue">Variable Value</label>
            <textarea id="varValue" placeholder="Enter variable value (JSON, string, number, etc.)"></textarea>
          </div>
          
          <div class="form-actions">
            <button class="btn btn-cancel" id="cancelBtn">Cancel</button>
            <button class="btn btn-success" id="saveBtn">Save Variable</button>
          </div>
        </div>
        
        <div id="variablesContainer"></div>
        <div id="messageContainer" style="margin-top:12px;"></div>
      </div>
    </div>
  `;

  class GlobalVariableManager extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      this.token = '';
      this.orgId = '';
      this.dataCenter = '';
      this.baseUrl = '';
      this.variableId = '';
      this.variableId2 = '';
      this.variableId3 = '';
      this.feedUrl = '';
      this.feedLabel = 'Advisory Feed';
      this.rssItems = [];
      this.variables = [];
      this.isEditing = false;
      this.editingVariable = null;
      this.editingVariableName = null;
    }
    
    static get observedAttributes() {
      return [
        'token',
        'org-id',
        'data-center',
        'variable-id',
        'variable-id-2',
        'variable-id-3',
        'base-url',
        'rss-feed-url',
        'rss-feed-label'
      ];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'token') this.token = newValue;
      if (name === 'org-id') this.orgId = newValue;
      if (name === 'data-center') this.dataCenter = newValue;
      if (name === 'variable-id') this.variableId = newValue;
      if (name === 'variable-id-2') this.variableId2 = newValue;
      if (name === 'variable-id-3') this.variableId3 = newValue;
      if (name === 'base-url') this.baseUrl = newValue;
      if (name === 'rss-feed-url') this.feedUrl = newValue;
      if (name === 'rss-feed-label') this.feedLabel = newValue;
      
      if (this.token && this.orgId) {
        this.updateStatus(true);
      }
    }
    
    connectedCallback() {
      this.setupEventListeners();
      
      // Auto-load if we have credentials
      if (this.token && this.orgId) {
        setTimeout(() => this.loadVariables(), 500);
      }
      if (this.feedUrl) {
        setTimeout(() => this.loadTicker(), 300);
      }
    }
    
    setupEventListeners() {
      // Inline editing; editor panel is unused but kept for compatibility.
    }
    
    updateStatus(connected) {
      const indicator = this.shadowRoot.getElementById('statusIndicator');
      const text = this.shadowRoot.getElementById('statusText');
      
      // UI element removed; keep for compatibility.
      if (indicator && text) {
        if (connected) {
          indicator.classList.add('connected');
          text.textContent = `Connected (${this.orgId})`;
        } else {
          indicator.classList.remove('connected');
          text.textContent = 'Not connected';
        }
      }
    }
    
    showMessage(message, type = 'info') {
      const container = this.shadowRoot.getElementById('messageContainer');
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${type}`;
      messageDiv.textContent = message;
      container.appendChild(messageDiv);
      
      setTimeout(() => messageDiv.remove(), 5000);
    }
    
    showEditor(variable = null) {
      this.isEditing = !!variable;
      this.editingVariable = variable;

      // Switch to inline edit mode by tracking which variable is being edited.
      const targetName = variable
        ? (variable.name || variable.variableName)
        : (this.variables[0] && (this.variables[0].name || this.variables[0].variableName));
      this.editingVariableName = targetName || null;
      this.renderVariables();
    }

    prefillEditorFromVariable(variable) {
      const nameInput = this.shadowRoot.getElementById('varName');
      const valueInput = this.shadowRoot.getElementById('varValue');
      if (!nameInput || !valueInput || !variable) return;
      nameInput.value = variable.name || variable.variableName || '';
      valueInput.value = variable.variableValue || variable.defaultValue || variable.value || '';
      nameInput.disabled = true;
    }
    
    hideEditor() {
      const panel = this.shadowRoot.getElementById('editorPanel');
      panel.classList.remove('active');
      this.isEditing = false;
      this.editingVariable = null;
    }
    
    getApiUrl() {
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
    
    async loadVariables() {
      if (!this.token || !this.orgId) {
        this.showMessage('Missing authentication credentials', 'error');
        return;
      }
      
      try {
        const container = this.shadowRoot.getElementById('variablesContainer');
        container.innerHTML = '<div class="loading"><div class="spinner"></div>Loading variables...</div>';

        const ids = [this.variableId, this.variableId2, this.variableId3].filter(Boolean);
        if (ids.length > 0) {
          const results = [];
          for (const id of ids) {
            const v = await this.loadVariableById(container, id);
            if (v) results.push(v);
          }
          this.variables = results;
        } else {
          // Fallback to list if no ids provided.
          const apiUrl = this.getApiUrl();
          const response = await fetch(`${apiUrl}/v1/globalVariables?orgId=${this.orgId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          this.variables = data.data || data.globalVariables || [];
        }
        this.renderVariables();
        this.showMessage(`Loaded ${this.variables.length} variables`, 'success');
        this.renderTicker();
      } catch (error) {
        this.showMessage(`Error loading variables: ${error.message}`, 'error');
        const container = this.shadowRoot.getElementById('variablesContainer');
        if (container) container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⚠️</div><p>Error loading variables</p></div>`;
      }
    }

    async loadVariableById(containerEl, idOverride) {
      try {
        const apiUrl = this.getApiUrl();
        const response = await fetch(
          `${apiUrl}/organization/${this.orgId}/cad-variable/${idOverride || this.variableId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const normalized = {
          id: data.id,
          name: data.name,
          variableValue: data.defaultValue,
          variableType: data.variableType || 'String',
          raw: data
        };
        return normalized;
      } catch (error) {
        this.showMessage(`Error loading variable: ${error.message}`, 'error');
        if (containerEl) {
          containerEl.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⚠️</div><p>Error loading variable</p></div>`;
        }
        return null;
      }
    }

    async loadTicker() {
      if (!this.feedUrl) return;
      try {
        const res = await fetch(this.feedUrl, { headers: { Accept: 'application/rss+xml,text/xml' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item > title')).slice(0, 5).map(n => n.textContent || '').filter(Boolean);
        this.rssItems = items;
        this.renderTicker();
      } catch (err) {
        this.rssItems = [];
        this.renderTicker(true);
      }
    }

    renderTicker(showError = false) {
      const el = this.shadowRoot.getElementById('tickerContainer');
      if (!el) return;
      const label = this.feedLabel || 'Feed';
      if (showError && !this.getVariableTickerText()) {
        el.innerHTML = `<div class="ticker"><span class="ticker-label">${this.escapeHtml(label)}</span><div class="ticker-track"><span>Feed unavailable</span></div></div>`;
        return;
      }
      const text = this.rssItems.length
        ? this.rssItems.join('  •  ')
        : this.getVariableTickerText();
      if (!text) {
        el.innerHTML = '';
        return;
      }
      el.innerHTML = `
        <div class="ticker">
          <span class="ticker-label">${this.escapeHtml(label)}</span>
          <div class="ticker-track"><span>${this.escapeHtml(text)}</span></div>
        </div>
      `;
    }

    getVariableTickerText() {
      const preferred = this.variables.find(v => this.variableId3 && v.id === this.variableId3);
      const primary = preferred || this.variables.find(v => (v.variableType || '').toLowerCase() !== 'boolean');
      if (!primary) return '';
      const val = primary.variableValue || primary.value || primary.defaultValue || '';
      return typeof val === 'string' ? val : String(val);
    }
    
    renderVariables() {
      const container = this.shadowRoot.getElementById('variablesContainer');
      
      if (this.variables.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><p>No variables found.</p></div>';
        return;
      }
      
      container.innerHTML = `
        <div class="variables-grid${this.variables.length > 1 ? ' two-cols' : ''}">
          ${this.variables.map(v => this.createVariableCard(v)).join('')}
        </div>
      `;
      
      // Attach event listeners
      container.querySelectorAll('.edit-var').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const varName = e.currentTarget.dataset.name;
          const varId = e.currentTarget.dataset.id;
          const variable = this.variables.find(v => (v.name || v.variableName) === varName || v.id === varId);
          this.showEditor(variable);
        });
      });
      container.querySelectorAll('.save-var').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const varName = e.currentTarget.dataset.name;
          const varId = e.currentTarget.dataset.id;
          const card = e.currentTarget.closest('.variable-card');
          const textarea = card ? card.querySelector('.edit-value') : null;
          const newVal = textarea ? textarea.value : '';
          this.saveVariableInline(varName, newVal, varId);
        });
      });
      container.querySelectorAll('.bool-toggle').forEach(chk => {
        chk.addEventListener('change', (e) => {
          const varName = e.currentTarget.dataset.name;
          const varId = e.currentTarget.dataset.id;
          const newVal = e.currentTarget.checked ? 'true' : 'false';
          this.saveVariableInline(varName, newVal, varId);
        });
      });
    
    }
    
    createVariableCard(variable) {
      const isBoolean = (variable.variableType || '').toLowerCase() === 'boolean';
      let name = variable.name || variable.variableName || (isBoolean ? 'CCB Enabled' : 'Advisory Message');
      if (variable.id) {
        if (this.variableId && variable.id === this.variableId) name = 'Advisory Message';
        else if (this.variableId2 && variable.id === this.variableId2) name = 'CCB Enabled';
        else if (this.variableId3 && variable.id === this.variableId3) name = 'Banner Message';
      } else if (!isBoolean) {
        name = 'Banner Message';
      }
      const value = (variable.value || variable.variableValue || variable.defaultValue || '');
      const isEditing = !isBoolean && this.editingVariableName === (variable.name || variable.variableName);
      
      return `
        <div class="variable-card">
          <div class="variable-header">
            <div class="variable-name">${this.escapeHtml(name)}</div>
            ${isBoolean
              ? ''
              : (isEditing
                  ? `<button class="icon-btn save save-var" data-name="${this.escapeHtml(variable.name || variable.variableName || '')}" data-id="${this.escapeHtml(variable.id || '')}" title="Save" style="padding:4px 6px;">💾</button>`
                  : `<button class="icon-btn edit edit-var" data-name="${this.escapeHtml(variable.name || variable.variableName || '')}" data-id="${this.escapeHtml(variable.id || '')}" title="Edit" style="padding:4px 6px;">✏️</button>`)}
          </div>
          ${isBoolean
            ? `<label style="display:flex;align-items:center;gap:10px;font-weight:600;color:#111827;">
                 <div class="switch">
                   <input type="checkbox" class="bool-toggle" data-name="${this.escapeHtml(variable.name || variable.variableName || '')}" data-id="${this.escapeHtml(variable.id || '')}" ${value === 'true' || value === true ? 'checked' : ''}>
                   <span class="slider"></span>
                 </div>
                 <span>${value === 'true' || value === true ? 'On' : 'Off'}</span>
               </label>`
            : (isEditing
                ? `<textarea class="inline-textarea edit-value">${this.escapeHtml(value)}</textarea>`
                : `<div class="variable-value">${this.escapeHtml(value)}</div>`)}
        </div>
      `;
    }

    async saveVariableInline(name, value, idOverride) {
      const finalName = name && name.trim()
        ? name.trim()
        : (this.variables[0] && (this.variables[0].name || this.variables[0].variableName)) || '';
      const finalValue = value !== undefined
        ? value
        : (this.variables[0] && (this.variables[0].value || this.variables[0].variableValue || this.variables[0].defaultValue)) || '';

      const sourceVar = this.variables.find(v => v.id === idOverride || (v.name || v.variableName) === finalName) || this.variables[0];
      const targetId = idOverride || (sourceVar && sourceVar.id) || this.variableId || this.variableId2;
      
      if (!finalName) {
        this.showMessage('Variable name is required', 'error');
        return;
      }
      
      try {
        const apiUrl = this.getApiUrl();

        // If a specific variableId was provided, use the CAD variable endpoint.
        if (targetId) {
          const source = (sourceVar && sourceVar.raw) || {};
          const payload = Object.assign({}, source, {
            id: targetId,
            name: source.name || finalName,
            defaultValue: finalValue,
          });

          const res = await fetch(`${apiUrl}/organization/${this.orgId}/cad-variable/${targetId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
          }

          // Refresh the current variable
          const updated = await this.loadVariableById(null, targetId);
          if (updated) {
            const idx = this.variables.findIndex(v => v.id === targetId || (v.name || v.variableName) === finalName);
            if (idx >= 0) {
              this.variables[idx] = updated;
            } else {
              this.variables.push(updated);
            }
          }
          this.showMessage(`Variable "${finalName}" saved successfully`, 'success');
          this.editingVariableName = null;
          this.renderVariables();
          return;
        }

        // Legacy/globalVariables endpoint (name-based) when no variableId is provided.
        const response = await fetch(`${apiUrl}/v1/globalVariables`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orgId: this.orgId,
            variableName: finalName,
            variableValue: finalValue
          })
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        this.showMessage(`Variable "${finalName}" saved successfully`, 'success');
        this.editingVariableName = null;
        const updated = {
          id: targetId || finalName,
          name: finalName,
          variableValue: finalValue,
          variableType: 'String',
          raw: {}
        };
        const idx = this.variables.findIndex(v => v.id === updated.id || (v.name || v.variableName) === finalName);
        if (idx >= 0) {
          this.variables[idx] = Object.assign({}, this.variables[idx], updated);
        } else {
          this.variables.push(updated);
        }
        this.renderVariables();
        this.renderTicker();
      } catch (error) {
        this.showMessage(`Error saving variable: ${error.message}`, 'error');
      }
    }

    async saveVariable() {
      const name = this.shadowRoot.getElementById('varName')?.value || '';
      const value = this.shadowRoot.getElementById('varValue')?.value;
      return this.saveVariableInline(name, value);
    }
    
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }
  
  // Check if already defined
  if (!customElements.get('global-variable-manager')) {
    customElements.define('global-variable-manager', GlobalVariableManager);
    console.log('Global Variable Manager component registered successfully');
  }
})();

// Log that script has loaded
console.log('Global Variable Manager script loaded');
