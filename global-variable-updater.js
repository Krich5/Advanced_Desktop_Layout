/**
 * Global Variable Manager Web Component for Webex Contact Center
 * Vanilla JavaScript - No compilation needed
 * Upload this file directly to GitHub Pages
 */

(function() {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: 'CiscoSansTT Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        padding: 20px;
        background: #f5f5f5;
        height: 100%;
        overflow-y: auto;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      
      .header {
        background: linear-gradient(135deg, #049fd9 0%, #005073 100%);
        color: white;
        padding: 24px;
      }
      
      .header h1 {
        font-size: 24px;
        margin: 0 0 8px 0;
        font-weight: 300;
      }
      
      .header p {
        font-size: 14px;
        margin: 0;
        opacity: 0.9;
      }
      
      .content {
        padding: 24px;
      }
      
      .status-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 6px;
        margin-bottom: 24px;
        border-left: 4px solid #049fd9;
      }
      
      .status-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .status-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #dc3545;
      }
      
      .status-indicator.connected {
        background: #28a745;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .status-text {
        font-size: 14px;
        font-weight: 500;
      }
      
      .refresh-btn {
        padding: 8px 16px;
        background: #049fd9;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        transition: background 0.2s;
      }
      
      .refresh-btn:hover {
        background: #037ba8;
      }
      
      .refresh-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .actions-bar {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;
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
        min-height: 100px;
        font-family: 'Courier New', monospace;
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
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 16px;
      }
      
      .variable-card {
        background: white;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        padding: 16px;
        transition: all 0.2s;
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
      
      .icon-btn.delete:hover {
        color: #dc3545;
      }
      
      .variable-value {
        background: #f8f9fa;
        padding: 10px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        color: #495057;
        word-break: break-all;
        max-height: 150px;
        overflow-y: auto;
        border: 1px solid #e9ecef;
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
      <div class="header">
        <h1>Advisory Message</h1>
        <p>Change the Adivsory Message</p>
      </div>
      
      <div class="content">
        <div class="status-bar">
          <div class="status-info">
            <div class="status-indicator" id="statusIndicator"></div>
            <span class="status-text" id="statusText">Connecting...</span>
          </div>
          <button class="refresh-btn" id="refreshBtn">
            ↻ Refresh
          </button>
        </div>
        
        <div id="messageContainer"></div>
        
        <div class="actions-bar">
          <button class="btn btn-primary" id="loadBtn">Load Variables</button>
          <button class="btn btn-success" id="addBtn">+ Add New Variable</button>
        </div>
        
        <div class="editor-panel" id="editorPanel">
          <div class="editor-header">
            <h3 id="editorTitle">Add New Variable</h3>
            <button class="close-btn" id="closeEditor">×</button>
          </div>
          
          <div class="form-group">
            <label for="varName">Variable Name</label>
            <input type="text" id="varName" placeholder="e.g., BUSINESS_HOURS">
          </div>
          
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
      this.variables = [];
      this.isEditing = false;
      this.editingVariable = null;
    }
    
    static get observedAttributes() {
      return ['token', 'org-id', 'data-center'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'token') this.token = newValue;
      if (name === 'org-id') this.orgId = newValue;
      if (name === 'data-center') this.dataCenter = newValue;
      
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
    }
    
    setupEventListeners() {
      this.shadowRoot.getElementById('refreshBtn').addEventListener('click', () => this.loadVariables());
      this.shadowRoot.getElementById('loadBtn').addEventListener('click', () => this.loadVariables());
      this.shadowRoot.getElementById('addBtn').addEventListener('click', () => this.showEditor());
      this.shadowRoot.getElementById('closeEditor').addEventListener('click', () => this.hideEditor());
      this.shadowRoot.getElementById('cancelBtn').addEventListener('click', () => this.hideEditor());
      this.shadowRoot.getElementById('saveBtn').addEventListener('click', () => this.saveVariable());
    }
    
    updateStatus(connected) {
      const indicator = this.shadowRoot.getElementById('statusIndicator');
      const text = this.shadowRoot.getElementById('statusText');
      
      if (connected) {
        indicator.classList.add('connected');
        text.textContent = `Connected (${this.orgId})`;
      } else {
        indicator.classList.remove('connected');
        text.textContent = 'Not connected';
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
      
      const panel = this.shadowRoot.getElementById('editorPanel');
      const title = this.shadowRoot.getElementById('editorTitle');
      const nameInput = this.shadowRoot.getElementById('varName');
      const valueInput = this.shadowRoot.getElementById('varValue');
      
      title.textContent = variable ? 'Edit Variable' : 'Add New Variable';
      nameInput.value = variable ? (variable.name || variable.variableName || '') : '';
      valueInput.value = variable ? (variable.value || variable.variableValue || '') : '';
      nameInput.disabled = !!variable;
      
      panel.classList.add('active');
    }
    
    hideEditor() {
      const panel = this.shadowRoot.getElementById('editorPanel');
      panel.classList.remove('active');
      this.isEditing = false;
      this.editingVariable = null;
    }
    
    getApiUrl() {
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
      
      const container = this.shadowRoot.getElementById('variablesContainer');
      container.innerHTML = '<div class="loading"><div class="spinner"></div>Loading variables...</div>';
      
      try {
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
        this.renderVariables();
        this.showMessage(`Loaded ${this.variables.length} variables`, 'success');
      } catch (error) {
        this.showMessage(`Error loading variables: ${error.message}`, 'error');
        container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⚠️</div><p>Error loading variables</p></div>`;
      }
    }
    
    renderVariables() {
      const container = this.shadowRoot.getElementById('variablesContainer');
      
      if (this.variables.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><p>No variables found. Click "Add New Variable" to create one.</p></div>';
        return;
      }
      
      container.innerHTML = `
        <div class="variables-grid">
          ${this.variables.map(v => this.createVariableCard(v)).join('')}
        </div>
      `;
      
      // Attach event listeners
      container.querySelectorAll('.edit-var').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const varName = e.target.dataset.name;
          const variable = this.variables.find(v => (v.name || v.variableName) === varName);
          this.showEditor(variable);
        });
      });
      
      container.querySelectorAll('.delete-var').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const varName = e.target.dataset.name;
          this.deleteVariable(varName);
        });
      });
    }
    
    createVariableCard(variable) {
      const name = variable.name || variable.variableName || 'Unnamed';
      const value = variable.value || variable.variableValue || '';
      
      return `
        <div class="variable-card">
          <div class="variable-header">
            <div class="variable-name">${this.escapeHtml(name)}</div>
            <div class="variable-actions">
              <button class="icon-btn edit edit-var" data-name="${this.escapeHtml(name)}" title="Edit">✏️</button>
              <button class="icon-btn delete delete-var" data-name="${this.escapeHtml(name)}" title="Delete">🗑️</button>
            </div>
          </div>
          <div class="variable-value">${this.escapeHtml(value)}</div>
        </div>
      `;
    }
    
    async saveVariable() {
      const name = this.shadowRoot.getElementById('varName').value.trim();
      const value = this.shadowRoot.getElementById('varValue').value;
      
      if (!name) {
        this.showMessage('Variable name is required', 'error');
        return;
      }
      
      try {
        const apiUrl = this.getApiUrl();
        const response = await fetch(`${apiUrl}/v1/globalVariables`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orgId: this.orgId,
            variableName: name,
            variableValue: value
          })
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        this.showMessage(`Variable "${name}" saved successfully`, 'success');
        this.hideEditor();
        this.loadVariables();
      } catch (error) {
        this.showMessage(`Error saving variable: ${error.message}`, 'error');
      }
    }
    
    async deleteVariable(name) {
      if (!confirm(`Are you sure you want to delete the variable "${name}"?`)) {
        return;
      }
      
      try {
        const apiUrl = this.getApiUrl();
        const response = await fetch(`${apiUrl}/v1/globalVariables/${encodeURIComponent(name)}?orgId=${this.orgId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        this.showMessage(`Variable "${name}" deleted successfully`, 'success');
        this.loadVariables();
      } catch (error) {
        this.showMessage(`Error deleting variable: ${error.message}`, 'error');
      }
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
