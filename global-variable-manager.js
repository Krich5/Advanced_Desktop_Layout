/**
 * Global Variable Updater for Webex Contact Center
 * Simple component to update a specific global variable
 * Set the variable ID in Desktop Layout attributes
 * V4
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
        max-width: 800px;
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
      
      .info-box {
        background: #e7f3ff;
        border: 1px solid #b3d9ff;
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 24px;
      }
      
      .info-box h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #004085;
      }
      
      .info-box p {
        margin: 0;
        font-size: 14px;
        color: #004085;
      }
      
      .info-label {
        font-weight: 600;
        display: inline-block;
        width: 120px;
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
      
      .form-group textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        font-family: 'Courier New', monospace;
        transition: border-color 0.2s;
        box-sizing: border-box;
        resize: vertical;
        min-height: 120px;
      }
      
      .form-group textarea:focus {
        outline: none;
        border-color: #049fd9;
        box-shadow: 0 0 0 3px rgba(4, 159, 217, 0.1);
      }
      
      .current-value {
        background: #f8f9fa;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid #e9ecef;
        margin-bottom: 16px;
      }
      
      .current-value h4 {
        margin: 0 0 8px 0;
        font-size: 14px;
        color: #6c757d;
        font-weight: 500;
      }
      
      .current-value pre {
        margin: 0;
        font-family: 'Courier New', monospace;
        font-size: 13px;
        color: #495057;
        white-space: pre-wrap;
        word-break: break-all;
      }
      
      .button-group {
        display: flex;
        gap: 12px;
      }
      
      .btn {
        padding: 12px 24px;
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
        flex: 1;
      }
      
      .btn-primary:hover {
        background: #037ba8;
      }
      
      .btn-success {
        background: #28a745;
        color: white;
        flex: 2;
      }
      
      .btn-success:hover {
        background: #218838;
      }
      
      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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
        <h1 id="headerTitle">Global Variable Updater</h1>
        <p id="headerSubtitle">Update global variable value</p>
      </div>
      
      <div class="content">
        <div class="status-bar">
          <div class="status-info">
            <div class="status-indicator" id="statusIndicator"></div>
            <span class="status-text" id="statusText">Connecting...</span>
          </div>
        </div>
        
        <div id="messageContainer"></div>
        
        <div class="info-box">
          <h3>Variable Information</h3>
          <p><span class="info-label">Variable ID:</span><span id="varIdDisplay">Not set</span></p>
          <p><span class="info-label">Org ID:</span><span id="orgIdDisplay">Not set</span></p>
        </div>
        
        <div id="mainContent"></div>
      </div>
    </div>
  `;

  class GlobalVariableUpdater extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      this.token = '';
      this.orgId = '';
      this.dataCenter = '';
      this.variableId = '';
      this.variableName = '';
      this.currentValue = '';
      this.loading = false;
    }
    
    static get observedAttributes() {
      return ['token', 'org-id', 'data-center', 'variable-id', 'variable-name'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'token') this.token = newValue;
      if (name === 'org-id') this.orgId = newValue;
      if (name === 'data-center') this.dataCenter = newValue;
      if (name === 'variable-id') this.variableId = newValue;
      if (name === 'variable-name') this.variableName = newValue;
      
      if (this.token && this.orgId && this.variableId) {
        this.updateStatus(true);
        this.updateInfoDisplay();
      }
    }
    
    connectedCallback() {
      this.setupEventListeners();
      
      // Update header if variable name is provided
      if (this.variableName) {
        this.shadowRoot.getElementById('headerTitle').textContent = this.variableName;
      }
      
      // Auto-load if we have credentials
      if (this.token && this.orgId && this.variableId) {
        setTimeout(() => this.loadVariable(), 500);
      }
    }
    
    setupEventListeners() {
      // Event listeners will be added dynamically when content is rendered
    }
    
    updateInfoDisplay() {
      this.shadowRoot.getElementById('varIdDisplay').textContent = this.variableId || 'Not set';
      this.shadowRoot.getElementById('orgIdDisplay').textContent = this.orgId || 'Not set';
    }
    
    updateStatus(connected) {
      const indicator = this.shadowRoot.getElementById('statusIndicator');
      const text = this.shadowRoot.getElementById('statusText');
      
      if (connected) {
        indicator.classList.add('connected');
        text.textContent = `Connected`;
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
    
    async loadVariable() {
      if (!this.token || !this.orgId || !this.variableId) {
        this.showMessage('Missing required configuration', 'error');
        return;
      }
      
      this.loading = true;
      const mainContent = this.shadowRoot.getElementById('mainContent');
      mainContent.innerHTML = '<div class="loading"><div class="spinner"></div>Loading variable...</div>';
      
      try {
        const apiUrl = this.getApiUrl();
        const response = await fetch(`${apiUrl}/v1/globalVariables/${this.variableId}`, {
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
        this.currentValue = data.variableValue || data.value || '';
        this.renderEditor();
        this.showMessage('Variable loaded successfully', 'success');
      } catch (error) {
        this.showMessage(`Error loading variable: ${error.message}`, 'error');
        this.renderEditor(); // Show editor anyway so they can try to save
      } finally {
        this.loading = false;
      }
    }
    
    renderEditor() {
      const mainContent = this.shadowRoot.getElementById('mainContent');
      
      mainContent.innerHTML = `
        <div class="current-value">
          <h4>Current Value:</h4>
          <pre>${this.escapeHtml(this.currentValue || 'No value set')}</pre>
        </div>
        
        <div class="form-group">
          <label for="newValue">New Value:</label>
          <textarea id="newValue" placeholder="Enter new variable value...">${this.escapeHtml(this.currentValue)}</textarea>
        </div>
        
        <div class="button-group">
          <button class="btn btn-primary" id="loadBtn">↻ Reload</button>
          <button class="btn btn-success" id="saveBtn">Save Variable</button>
        </div>
      `;
      
      // Add event listeners
      mainContent.querySelector('#loadBtn').addEventListener('click', () => this.loadVariable());
      mainContent.querySelector('#saveBtn').addEventListener('click', () => this.saveVariable());
    }
    
    async saveVariable() {
      const newValue = this.shadowRoot.getElementById('newValue').value;
      
      if (!this.token || !this.orgId || !this.variableId) {
        this.showMessage('Missing required configuration', 'error');
        return;
      }
      
      try {
        const apiUrl = this.getApiUrl();
        const response = await fetch(`${apiUrl}/v1/globalVariables/${this.variableId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            variableValue: newValue
          })
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        this.currentValue = newValue;
        this.showMessage('Variable updated successfully', 'success');
        this.loadVariable(); // Reload to confirm
      } catch (error) {
        this.showMessage(`Error saving variable: ${error.message}`, 'error');
      }
    }
    
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }
  
  // Check if already defined
  if (!customElements.get('global-variable-updater')) {
    customElements.define('global-variable-updater', GlobalVariableUpdater);
    console.log('Global Variable Updater component registered successfully');
  }
})();

// Log that script has loaded
console.log('Global Variable Updater script loaded');
