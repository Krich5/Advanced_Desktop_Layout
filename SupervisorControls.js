/**
 * Updated 12/12/25 2:10PM
 */

(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      :host {
        display: block;
        font-family: 'Inter', 'CiscoSansTT Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        padding: 12px;
        background: transparent;
        height: 100%;
        overflow-y: auto;
        /* light defaults with translucency for blending */
        --card-bg: rgba(255, 255, 255, 0.52);
        --card-border: rgba(213, 222, 235, 0.9);
        --card-text: #0f172a;
        --muted-text: #374151;
        --chip-bg: rgba(255, 255, 255, 0.42);
        --chip-border: rgba(219, 228, 240, 0.6);
        --chip-status-bg: rgba(224, 242, 254, 0.58);
        --chip-status-border: rgba(191, 219, 254, 0.65);
        --input-border: rgba(215, 224, 236, 0.7);
        --input-bg: rgba(255, 255, 255, 0.6);
        --message-bg: rgba(255, 255, 255, 0.46);
        --message-border: rgba(223, 230, 241, 0.65);
        --card-bg-edit: rgba(255, 255, 255, 0.38);
        --message-bg-edit: rgba(255, 255, 255, 0.36);
      }
      :host(.theme-dark) {
        --card-bg: #0f172a;
        --card-border: #1f2937;
        --card-text: #e5e7eb;
        --muted-text: #d1d5db;
        --chip-bg: #111827;
        --chip-border: #1f2937;
        --chip-status-bg: #0b2f44;
        --chip-status-border: #0e4a6e;
        --input-border: #374151;
        --input-bg: #111827;
        --message-bg: #0f172a;
        --message-border: #1f2937;
      }
      /* Dark palette kept for optional forcing via theme="dark" */
      @media (prefers-color-scheme: dark) {
        :host(.theme-dark) {
          --card-bg: #0f172a;
          --card-border: #1f2937;
          --card-text: #e5e7eb;
          --muted-text: #d1d5db;
          --chip-bg: #111827;
          --chip-border: #1f2937;
          --chip-status-bg: #0b2f44;
          --chip-status-border: #0e4a6e;
          --input-border: #374151;
          --input-bg: #111827;
          --message-bg: #0f172a;
          --message-border: #1f2937;
        }
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
        max-width: 1100px;
        margin-right: auto;
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
        border-radius: 16px;
        overflow: hidden;
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
        min-height: 100px;
        font-family: 'Inter', 'CiscoSansTT Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 15px;
        line-height: 1.5;
        letter-spacing: 0.2px;
        width: 100%;
        padding: 12px;
        border: 1px solid var(--input-border);
        border-radius: 6px;
        box-sizing: border-box;
        color: var(--card-text);
        background: var(--input-bg);
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
        grid-template-columns: minmax(500px, 2.2fr) minmax(200px, 1fr);
      }
      @media (max-width: 900px) {
        .variables-grid.two-cols {
          grid-template-columns: 1fr;
        }
      }
      
      .variable-card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 18px;
        padding: 16px;
        transition: all 0.2s;
        position: relative;
        box-sizing: border-box;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
        overflow: hidden;
      }
      .variable-card.editing {
        background: var(--card-bg-edit);
        border-color: var(--card-border);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);
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
        color: var(--muted-text);
        transition: all 0.2s;
        font-size: 16px;
      }
      
      .icon-btn:hover {
        background: var(--message-bg);
        color: var(--card-text);
      }
      
      .icon-btn.edit:hover {
        color: #049fd9;
      }
      
      .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 28px;
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
        height: 22px;
        width: 22px;
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
        transform: translateX(22px);
      }

      .override-view {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .override-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: var(--chip-bg);
        border: 1px solid var(--chip-border);
        border-radius: 999px;
        padding: 8px 12px;
        font-weight: 600;
        color: var(--card-text);
        white-space: nowrap;
      }
      .override-chip.status {
        background: var(--chip-status-bg);
        border-color: var(--chip-status-border);
      }
      .override-label {
        font-weight: 700;
        color: var(--card-text);
      }
      .override-toggle {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        color: var(--card-text);
      }
      .override-message-view {
        width: 100%;
        box-sizing: border-box;
        background: var(--message-bg);
        border: 1px solid var(--message-border);
        border-radius: 14px;
        padding: 12px 14px;
        font-family: 'Inter', 'CiscoSansTT Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        min-height: 140px;
        margin-top: 8px;
        color: rgba(55, 65, 81, 0.72);
      }
      .inline-textarea.override-msg {
        min-height: 140px;
      }
      .editing .inline-textarea,
      .editing .override-input,
      .editing .override-msg,
      .editing .variable-value,
      .editing .override-message-view {
        background: var(--message-bg-edit);
        color: #111827;
        border-color: var(--message-border);
        box-shadow: none;
      }
      .override-input {
        border: 1px solid var(--input-border);
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 14px;
        color: var(--card-text);
        background: var(--input-bg);
      }
      
      .variable-value {
        background: var(--message-bg);
        padding: 12px;
        border-radius: 12px;
        font-family: 'Inter', 'CiscoSansTT Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: 0.2px;
        color: rgba(55, 65, 81, 0.72);
        word-break: break-all;
        min-height: 90px;
        max-height: 140px;
        overflow-y: auto;
        border: 1px solid var(--message-border);
      }
      .message-value {
        min-height: 70px;
        max-height: 120px;
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
      this.variableIdOverrideMsg = '';
      this.overrideId = '';
      this.variables = [];
      this.overrideEntry = null;
      this.isEditing = false;
      this.editingVariable = null;
      this.editingVariableName = null;
      this.successFlags = {};
      this.theme = '';
      this.themeObserver = null;
    }
    
    static get observedAttributes() {
      return [
        'token',
        'org-id',
        'data-center',
        'globvar-advisory-message-id',
        'globvar-ccb-id',
        'override-message-var-id',
        'override-id',
        'base-url',
        'theme'
      ];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'token') this.token = newValue;
      if (name === 'org-id') this.orgId = newValue;
      if (name === 'data-center') this.dataCenter = newValue;
      if (name === 'globvar-advisory-message-id') this.variableId = newValue;
      if (name === 'globvar-ccb-id') this.variableId2 = newValue;
      if (name === 'override-message-var-id') this.variableIdOverrideMsg = newValue;
      if (name === 'override-id') this.overrideId = newValue;
      if (name === 'base-url') this.baseUrl = newValue;
      if (name === 'theme') {
        this.theme = (newValue || '').toLowerCase();
        this.applyThemeClass();
      }
      
      // no-op status; removed
    }
    
    connectedCallback() {
      this.setupEventListeners();
      this.applyThemeClass();
      this.startThemeSync();
      
      // Auto-load if we have credentials
      if (this.token && this.orgId) {
        setTimeout(() => this.loadVariables(), 500);
      }
    }
    
    setupEventListeners() {
      // Inline editing; editor panel is unused but kept for compatibility.
    }
    
    updateStatus() {}

    applyThemeClass() {
      const host = this.shadowRoot && this.shadowRoot.host;
      if (!host) return;
      host.classList.remove('theme-dark', 'theme-light');
      if (this.theme === 'dark') host.classList.add('theme-dark');
      else host.classList.add('theme-light'); // default to light when unset
    }

    detectPageTheme() {
      // Try common theme markers on host page
      const root = document.documentElement;
      const body = document.body;
      const classText = `${root.className || ''} ${body && body.className ? body.className : ''}`.toLowerCase();
      const dataTheme = (root.dataset.theme || body?.dataset?.theme || '').toLowerCase();
      if (dataTheme === 'dark' || classText.includes('dark-mode') || classText.includes('theme-dark')) return 'dark';
      if (dataTheme === 'light' || classText.includes('theme-light')) return 'light';

      // Fallback: look for the dark-mode toggle input
      const toggle = document.querySelector('md-toggle-switch[aria-label*="Dark" i] input[type="checkbox"]');
      if (toggle) return toggle.checked ? 'dark' : 'light';

      // Fallback to media
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    startThemeSync() {
      // Disable auto-sync; default to light unless theme attr forces dark.
      return;
    }

    markSuccess(id) {
      if (!id) return;
      this.successFlags[id] = true;
      setTimeout(() => {
        delete this.successFlags[id];
        this.renderVariables();
      }, 2500);
      this.renderVariables();
    }
    
    showMessage(message, type = 'info') {
      if (type === 'success') return; // suppress success banners
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
      const targetKey = variable
        ? (variable.id || variable.name || variable.variableName)
        : (this.variables[0] && (this.variables[0].id || this.variables[0].name || this.variables[0].variableName));
      this.editingVariableName = targetKey || null;
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

    getAllItems() {
      const items = this.variables.filter(v => !(this.variableIdOverrideMsg && v.id === this.variableIdOverrideMsg));
      if (this.overrideEntry) items.push(this.overrideEntry);
      return items;
    }
    
    async loadVariables() {
      if (!this.token || !this.orgId) {
        this.showMessage('Missing authentication credentials', 'error');
        return;
      }
      
      try {
        const container = this.shadowRoot.getElementById('variablesContainer');
        container.innerHTML = '<div class="loading"><div class="spinner"></div>Loading variables...</div>';
        this.overrideEntry = null;

        const ids = [this.variableId, this.variableId2, this.variableIdOverrideMsg].filter(Boolean);
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
        if (this.overrideId) {
          const ov = await this.loadOverrideById();
          if (ov) this.overrideEntry = ov;
        }
        this.renderVariables();
        this.showMessage(`Loaded ${this.variables.length + (this.overrideEntry ? 1 : 0)} items`, 'success');
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

    async loadOverrideById() {
      if (!this.overrideId) return null;
      try {
        const apiUrl = this.getApiUrl();
        const response = await fetch(`${apiUrl}/organization/${this.orgId}/overrides/${this.overrideId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const latest = data.latestOverride || (data.overrides && data.overrides[0]) || {};
        return {
          id: data.id,
          name: data.name || 'Override Hours',
          variableType: 'override',
          startDateTime: latest.startDateTime || '',
          endDateTime: latest.endDateTime || '',
          workingHours: latest.workingHours === true || latest.workingHours === 'true',
          timezone: data.timezone || '',
          raw: data
        };
      } catch (err) {
        this.showMessage(`Error loading override: ${err.message}`, 'error');
        return null;
      }
    }
    
    renderVariables() {
      const container = this.shadowRoot.getElementById('variablesContainer');
      
      if (this.variables.length === 0 && !this.overrideEntry) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><p>No variables found.</p></div>';
        return;
      }
      
      const items = this.getAllItems();
      container.innerHTML = `
        <div class="variables-grid${items.length > 1 ? ' two-cols' : ''}">
          ${items.map(v => this.createVariableCard(v)).join('')}
        </div>
      `;
      
      // Attach event listeners
      container.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const state = e.currentTarget.dataset.state;
          if (state === 'check') return;
          const varName = e.currentTarget.dataset.name;
          const varId = e.currentTarget.dataset.id;
          const varType = e.currentTarget.dataset.type;
          const variable = this.getAllItems().find(v => (v.name || v.variableName) === varName || v.id === varId);
          if (!variable) return;
          if (state === 'edit') {
            this.showEditor(variable);
            return;
          }
          // save
          const card = e.currentTarget.closest('.variable-card');
          if (varType === 'override' && card) {
            const date = card.querySelector('.override-date')?.value || '';
            const start = card.querySelector('.override-start')?.value || '';
            const end = card.querySelector('.override-end')?.value || '';
            const working = card.querySelector('.override-working')?.checked || false;
            const msgVal = card.querySelector('.override-msg')?.value;
            this.saveOverrideInline(date, start, end, working, varId, msgVal);
          } else {
            const textarea = card ? card.querySelector('.edit-value') : null;
            const newVal = textarea ? textarea.value : '';
            this.saveVariableInline(varName, newVal, varId);
          }
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
      container.querySelectorAll('.override-working-toggle').forEach(chk => {
        chk.addEventListener('change', (e) => {
          const varId = e.currentTarget.dataset.id;
          const working = e.currentTarget.checked;
          const ov = this.getAllItems().find(v => v.id === varId);
          if (!ov) return;
          const date = this.toLocalDate(ov.startDateTime);
          const start = this.toLocalTime(ov.startDateTime);
          const end = this.toLocalTime(ov.endDateTime);
          const msgVar = this.variables.find(v => v.id === this.variableIdOverrideMsg);
          const msgVal = msgVar ? (msgVar.value || msgVar.variableValue || msgVar.defaultValue || '') : undefined;
          this.saveOverrideInline(date, start, end, working, varId, msgVal);
        });
      });
    
    }
    
    createVariableCard(variable) {
      const type = (variable.variableType || '').toLowerCase();
      const isBoolean = type === 'boolean';
      const isOverride = type === 'override';
      const isOverrideMsg = !isBoolean && !isOverride && variable.id && this.variableIdOverrideMsg && variable.id === this.variableIdOverrideMsg;
      let name = variable.name || variable.variableName || (isBoolean ? 'CCB Enabled' : 'Message');
      if (variable.id && this.variableId && variable.id === this.variableId) name = 'Advisory Message';
      if (variable.id && this.variableId2 && variable.id === this.variableId2) name = 'CCB Enabled';
      if (variable.id && this.overrideId && variable.id === this.overrideId) name = 'Override Hours';
      if (isOverrideMsg) name = 'Override Message';
      const value = (variable.value || variable.variableValue || variable.defaultValue || variable.startDateTime || '');
      const overrideMsgItem = this.variables.find(v => v.id === this.variableIdOverrideMsg);
      const overrideMsgVal = overrideMsgItem ? (overrideMsgItem.value || overrideMsgItem.variableValue || overrideMsgItem.defaultValue || '') : '';
      const editKey = (variable.id || variable.name || variable.variableName || '').toString();
      const isEditing = !isBoolean && this.editingVariableName === editKey;
      const successKey = editKey;
      const showSuccess = !!this.successFlags[successKey];
      
      return `
        <div class="variable-card">
          <div class="variable-header">
            <div class="variable-name">${this.escapeHtml(name)}</div>
            ${isBoolean
              ? ''
              : (() => {
                  const buttonState = showSuccess ? 'check' : (isEditing ? 'save' : 'edit');
                  const icon = buttonState === 'save' ? '💾' : (buttonState === 'check' ? '✓' : '✏️');
                  const title = buttonState === 'save' ? 'Save' : (buttonState === 'check' ? 'Saved' : 'Edit');
                  const disabled = buttonState === 'check' ? 'disabled' : '';
                  return `<button class="icon-btn action-btn" data-state="${buttonState}" data-type="${isOverride ? 'override' : 'text'}" data-name="${this.escapeHtml(variable.name || variable.variableName || '')}" data-id="${this.escapeHtml(variable.id || '')}" title="${title}" style="padding:4px 6px;" ${disabled}>${icon}</button>`;
                })()}
          </div>
          ${isBoolean
            ? `<label style="display:flex;align-items:center;gap:10px;font-weight:600;color:#111827;">
                 <div class="switch">
                   <input type="checkbox" class="bool-toggle" data-name="${this.escapeHtml(variable.name || variable.variableName || '')}" data-id="${this.escapeHtml(variable.id || '')}" ${value === 'true' || value === true ? 'checked' : ''}>
                   <span class="slider"></span>
                 </div>
                 <span>${value === 'true' || value === true ? 'On' : 'Off'}</span>
               </label>`
           : isOverride
            ? (isEditing
                ? `<div style="display:flex;flex-direction:column;gap:12px;" class="editing">
                     <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
                       <label style="font-weight:600;color:var(--card-text);">
                         Date
                         <input type="date" class="override-date override-input" value="${this.escapeHtml(this.toLocalDate(variable.startDateTime))}">
                       </label>
                       <label style="font-weight:600;color:var(--card-text);">
                         From
                         <input type="time" class="override-start override-input" value="${this.escapeHtml(this.toLocalTime(variable.startDateTime))}">
                       </label>
                       <label style="font-weight:600;color:var(--card-text);">
                         To
                         <input type="time" class="override-end override-input" value="${this.escapeHtml(this.toLocalTime(variable.endDateTime))}">
                       </label>
                       <label class="override-toggle">
                         <div class="switch">
                           <input type="checkbox" class="override-working" ${variable.workingHours ? 'checked' : ''}>
                           <span class="slider"></span>
                         </div>
                         <span>${variable.workingHours ? 'Enabled' : 'Disabled'}</span>
                       </label>
                     </div>
                     ${ (overrideMsgItem)
                         ? `<div style="display:flex;flex-direction:column;gap:8px;margin-top:6px;">
                              <label style="font-weight:600;color:var(--card-text);">Override Message</label>
                             <textarea class="inline-textarea override-msg">${this.escapeHtml(overrideMsgVal)}</textarea>
                           </div>`
                        : '' }
                   </div>`
                 : `<div>
                      <div class="override-view">
                        <div class="override-chip"><span class="override-label">Start</span> ${this.escapeHtml(this.formatDateTime(variable.startDateTime))}</div>
                        <div class="override-chip"><span class="override-label">End</span> ${this.escapeHtml(this.formatDateTime(variable.endDateTime))}</div>
                        <label class="override-toggle">
                          <div class="switch">
                            <input type="checkbox" class="override-working-toggle" data-id="${this.escapeHtml(variable.id || '')}" ${variable.workingHours ? 'checked' : ''}>
                            <span class="slider"></span>
                          </div>
                          <span>${variable.workingHours ? 'Enabled' : 'Disabled'}</span>
                        </label>
                      </div>
                      ${(overrideMsgItem && variable.workingHours)
                        ? `<div style="width:100%;display:flex;flex-direction:column;gap:6px;margin-top:10px;">
                             <div style="font-weight:700;color:#049fd9;">Override Message</div>
                             <div class="override-message-view">
                               <div class="message-value">${this.escapeHtml(overrideMsgVal)}</div>
                             </div>
                           </div>`
                        : ''}
                    </div>`)
             : (isOverrideMsg
                  ? ( (this.overrideEntry && this.overrideEntry.workingHours)
                        ? (isEditing
                            ? `<textarea class="inline-textarea edit-value">${this.escapeHtml(value)}</textarea>`
                             : `<div class="variable-value message-value">${this.escapeHtml(value)}</div>`
                          )
                        : `<div class="variable-value message-value">Override disabled</div>`
                    )
                  : (isEditing
                      ? `<textarea class="inline-textarea edit-value">${this.escapeHtml(value)}</textarea>`
                      : `<div class="variable-value message-value">${this.escapeHtml(value)}</div>`))}
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
          this.markSuccess(targetId || finalName);
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
        
        this.markSuccess(targetId || finalName);
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
      } catch (error) {
        this.showMessage(`Error saving variable: ${error.message}`, 'error');
      }
    }

    async saveOverrideInline(date, startTime, endTime, working, idOverride, msgVal) {
      const overrideId = idOverride || this.overrideId;
      if (!overrideId) {
        this.showMessage('Missing override ID', 'error');
        return;
      }
      if (!date || !startTime || !endTime) {
        this.showMessage('Date, start, and end are required', 'error');
        return;
      }
      const startDateTime = this.toIsoLocal(date, startTime);
      const endDateTime = this.toIsoLocal(date, endTime);
      if (!startDateTime || !endDateTime) {
        this.showMessage('Invalid date/time format', 'error');
        return;
      }
      try {
        const apiUrl = this.getApiUrl();
        const source = (this.overrideEntry && this.overrideEntry.raw) || {};
        const latestName = (source.latestOverride && source.latestOverride.name)
          || (source.overrides && source.overrides[0] && source.overrides[0].name)
          || 'override';
        const timezone = source.timezone || '';
        const overrideObj = {
          name: latestName,
          startDateTime,
          endDateTime,
          workingHours: !!working
        };
        const body = {
          organizationId: this.orgId,
          id: overrideId,
          name: source.name || 'Override Hours',
          overrides: [overrideObj],
          latestOverride: overrideObj,
          timezone
        };

        const res = await fetch(`${apiUrl}/organization/${this.orgId}/overrides/${overrideId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        if (!res.ok) {
          throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        this.overrideEntry = await this.loadOverrideById();
        if (msgVal !== undefined && this.variableIdOverrideMsg) {
          // Save the override message as a separate variable.
          await this.saveVariableInline('override-message', msgVal, this.variableIdOverrideMsg);
        }
        this.markSuccess(overrideId);
        this.editingVariableName = null;
        this.renderVariables();
      } catch (err) {
        this.showMessage(`Error saving override: ${err.message}`, 'error');
      }
    }

    async saveVariable() {
      const name = this.shadowRoot.getElementById('varName')?.value || '';
      const value = this.shadowRoot.getElementById('varValue')?.value;
      return this.saveVariableInline(name, value);
    }

    formatDateTime(str) {
      if (!str) return '';
      const d = new Date(str);
      if (isNaN(d.getTime())) return str;
      return d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    toLocalDate(str) {
      if (!str) return '';
      const d = new Date(str);
      if (isNaN(d.getTime())) return str;
      const pad = n => `${n}`.padStart(2, '0');
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }

    toLocalTime(str) {
      if (!str) return '';
      const d = new Date(str);
      if (isNaN(d.getTime())) return '';
      const pad = n => `${n}`.padStart(2, '0');
      return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    toIsoLocal(dateStr, timeStr) {
      if (!dateStr) return '';
      // Try native parsing first
      const attempt = new Date(`${dateStr}T${timeStr || '00:00'}`);
      const asDate = isNaN(attempt.getTime()) ? this.parseLoose(dateStr, timeStr) : attempt;
      if (!asDate || isNaN(asDate.getTime())) return '';
      const pad = n => `${n}`.padStart(2, '0');
      return `${asDate.getFullYear()}-${pad(asDate.getMonth() + 1)}-${pad(asDate.getDate())}T${pad(asDate.getHours())}:${pad(asDate.getMinutes())}`;
    }

    parseLoose(dateStr, timeStr) {
      // Handle MM/DD/YYYY or other slash formats if browser returns localized value
      const parts = dateStr.split(/[\\/]/);
      if (parts.length === 3) {
        const [a, b, c] = parts.map(p => parseInt(p, 10));
        const year = c >= 1000 ? c : (c + 2000);
        const month = a > 12 ? b - 1 : a - 1;
        const day = a > 12 ? a : b;
        const [h = 0, m = 0] = (timeStr || '').split(':').map(v => parseInt(v, 10) || 0);
        return new Date(year, month, day, h, m);
      }
      return null;
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
