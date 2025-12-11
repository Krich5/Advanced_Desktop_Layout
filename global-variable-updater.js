/**
 * Level Set
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
        max-width: 900px;
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
        margin: 0;
        font-weight: 400;
      }
      
      .content {
        padding: 32px;
      }
      
      .message {
        padding: 14px 18px;
        border-radius: 4px;
        margin-bottom: 20px;
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
      
      .section {
        margin-bottom: 28px;
      }
      
      .section-label {
        font-size: 13px;
        font-weight: 600;
        color: #6c757d;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
      }
      
      .current-message {
        background: #f8f9fa;
        padding: 16px;
        border-radius: 6px;
        border: 2px solid #e9ecef;
        min-height: 60px;
      }
      
      .current-message-text {
        font-size: 15px;
        color: #212529;
        line-height: 1.6;
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      .current-message-empty {
        color: #6c757d;
        font-style: italic;
      }
      
      .editor-section {
        margin-top: 32px;
      }
      
      .editor-label {
        font-size: 15px;
        font-weight: 500;
        color: #212529;
        margin-bottom: 12px;
      }
      
      textarea {
        width: 100%;
        padding: 14px;
        border: 2px solid #ced4da;
        border-radius: 6px;
        font-size: 15px;
        font-family: inherit;
        transition: all 0.2s;
        box-sizing: border-box;
        resize: vertical;
        min-height: 140px;
        line-height: 1.6;
      }
      
      textarea:focus {
        outline: none;
        border-color: #049fd9;
        box-shadow: 0 0 0 4px rgba(4, 159, 217, 0.1);
      }
      
      .button-group {
        display: flex;
        gap: 12px;
        margin-top: 24px;
      }
      
      .btn {
        padding: 14px 28px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.2s;
        font-family: inherit;
      }
      
      .btn-save {
        background: #28a745;
        color: white;
        flex: 1;
      }
      
      .btn-save:hover:not(:disabled) {
        background: #218838;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
      }
      
      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .loading {
        text-align: center;
        padding: 60px 20px;
        color: #6c757d;
      }
      
      .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #049fd9;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .char-count {
        text-align: right;
        font-size: 13px;
        color: #6c757d;
        margin-top: 8px;
      }
    </style>
    
    <div class="container">
      <div class="header">
        <h1 id="pageTitle">Message Updater</h1>
      </div>
      
      <div class="content">
        <div id="messageContainer"></div>
        <div id="mainContent"></div>
      </div>
    </div>
  `;

  class MessageUpdater extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      
      this.token = '';
      this.orgId = '';
      this.dataCenter = '';
      this.variableId = '';
      this.title = '';
      this.currentMessage = '';
      this.loading = false;
    }
    
    static get observedAttributes() {
      return ['token', 'org-id', 'data-center', 'variable-id', 'title'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'token') this.token = newValue;
      if (name === 'org-id') this.orgId = newValue;
      if (name === 'data-center') this.dataCenter = newValue;
      if (name === 'variable-id') this.variableId = newValue;
      if (name === 'title') this.title = newValue;
    }
    
    connectedCallback() {
      // Update title if provided
      if (this.title) {
        this.shadowRoot.getElementById('pageTitle').textContent = this.title;
      }
      
      // Auto-load if we have credentials
      if (this.token && this.orgId && this.variableId) {
        setTimeout(() => this.loadMessage(), 300);
      } else {
        this.showMessage('Missing configuration. Please check Desktop Layout settings.', 'error');
      }
    }
    
    showMessage(message, type = 'info') {
      const container = this.shadowRoot.getElementById('messageContainer');
      container.innerHTML = '';
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${type}`;
      messageDiv.textContent = message;
      container.appendChild(messageDiv);
      
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.remove();
        }
      }, 5000);
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
    
    async loadMessage() {
      if (!this.token || !this.orgId || !this.variableId) {
        this.showMessage('Missing required configuration', 'error');
        return;
      }
      
      this.loading = true;
      const mainContent = this.shadowRoot.getElementById('mainContent');
      mainContent.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading message...</p></div>';
      
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
          throw new Error(`Unable to load message (Error ${response.status})`);
        }
        
        const data = await response.json();
        this.currentMessage = data.variableValue || data.value || '';
        this.renderEditor();
      } catch (error) {
        this.showMessage(`Error: ${error.message}`, 'error');
        this.currentMessage = '';
        this.renderEditor();
      } finally {
        this.loading = false;
      }
    }
    
    renderEditor() {
      const mainContent = this.shadowRoot.getElementById('mainContent');
      
      mainContent.innerHTML = `
        <div class="section">
          <div class="section-label">Current Message</div>
          <div class="current-message">
            <div class="current-message-text ${!this.currentMessage ? 'current-message-empty' : ''}">
              ${this.escapeHtml(this.currentMessage) || 'No message set'}
            </div>
          </div>
        </div>
        
        <div class="editor-section">
          <div class="editor-label">Update Message</div>
          <textarea id="newMessage" placeholder="Enter your message here...">${this.escapeHtml(this.currentMessage)}</textarea>
          <div class="char-count">
            <span id="charCount">0</span> characters
          </div>
        </div>
        
        <div class="button-group">
          <button class="btn btn-save" id="saveBtn">Save Message</button>
        </div>
      `;
      
      // Add event listeners
      const textarea = mainContent.querySelector('#newMessage');
      const charCount = mainContent.querySelector('#charCount');
      const saveBtn = mainContent.querySelector('#saveBtn');
      
      // Update character count
      const updateCharCount = () => {
        charCount.textContent = textarea.value.length;
      };
      updateCharCount();
      
      textarea.addEventListener('input', updateCharCount);
      saveBtn.addEventListener('click', () => this.saveMessage());
      
      // Focus on textarea
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
    
    async saveMessage() {
      const newMessage = this.shadowRoot.getElementById('newMessage').value;
      const saveBtn = this.shadowRoot.getElementById('saveBtn');
      
      if (!this.token || !this.orgId || !this.variableId) {
        this.showMessage('Missing required configuration', 'error');
        return;
      }
      
      saveBtn.disabled = true;
      saveBtn.textContent = 'Saving...';
      
      try {
        const apiUrl = this.getApiUrl();
        const response = await fetch(`${apiUrl}/v1/globalVariables/${this.variableId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            variableValue: newMessage
          })
        });
        
        if (!response.ok) {
          throw new Error(`Failed to save message (Error ${response.status})`);
        }
        
        this.currentMessage = newMessage;
        this.showMessage('Message saved successfully!', 'success');
        this.renderEditor();
      } catch (error) {
        this.showMessage(`Error: ${error.message}`, 'error');
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save Message';
      }
    }
    
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }
  
  // Check if already defined
  if (!customElements.get('message-updater')) {
    customElements.define('message-updater', MessageUpdater);
    console.log('Message Updater component registered');
  }
})();

console.log('Message Updater script loaded');
