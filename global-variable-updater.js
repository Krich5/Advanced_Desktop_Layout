(function () {
  const defaultOptions = {
    title: 'Global Variable',
    buttonLabel: 'Update',
    nameLabel: 'Variable name',
    valueLabel: 'Value',
    onUpdate: null,
  };

  function createStyles(target) {
    const style = (target && target.ownerDocument
      ? target.ownerDocument
      : document
    ).createElement('style');
    style.textContent = `
      .vu-card {
        font-family: "Helvetica Neue", Arial, sans-serif;
        background: #0c1a2b;
        color: #f7f9fb;
        border: 1px solid #1f2e44;
        border-radius: 12px;
        padding: 16px;
        width: 100%;
        max-width: 420px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.24);
      }
      .vu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .vu-title {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0.3px;
      }
      .vu-chip {
        font-size: 10px;
        letter-spacing: 1px;
        text-transform: uppercase;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.2);
        padding: 4px 8px;
        border-radius: 20px;
      }
      .vu-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 12px;
      }
      .vu-label {
        font-size: 12px;
        opacity: 0.85;
      }
      .vu-input {
        background: #0f2237;
        border: 1px solid #223754;
        border-radius: 8px;
        padding: 10px 12px;
        color: #f7f9fb;
        font-size: 14px;
        outline: none;
        transition: border 120ms ease, box-shadow 120ms ease;
      }
      .vu-input:focus {
        border-color: #4ec2f7;
        box-shadow: 0 0 0 2px rgba(78,194,247,0.18);
      }
      .vu-actions {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-top: 4px;
      }
      .vu-button {
        background: linear-gradient(120deg, #1aa1f1, #3ccfcf);
        border: none;
        color: #0a1626;
        font-weight: 700;
        padding: 10px 16px;
        border-radius: 10px;
        cursor: pointer;
        transition: transform 120ms ease, box-shadow 160ms ease;
      }
      .vu-button:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(0,0,0,0.18); }
      .vu-button:active { transform: translateY(0); box-shadow: none; }
      .vu-status {
        font-size: 12px;
        opacity: 0.9;
      }
      .vu-status--error { color: #ffb4c0; }
      .vu-status--success { color: #a7f3d0; }
    `;
    const where = target && target.appendChild ? target : document.head;
    where.appendChild(style);
  }

  function createDom(options, doc) {
    const card = doc.createElement('div');
    card.className = 'vu-card';

    const header = doc.createElement('div');
    header.className = 'vu-header';

    const title = doc.createElement('div');
    title.className = 'vu-title';
    title.textContent = options.title;

    const chip = doc.createElement('div');
    chip.className = 'vu-chip';
    chip.textContent = 'Global';

    header.appendChild(title);
    header.appendChild(chip);
    card.appendChild(header);

    const nameField = doc.createElement('div');
    nameField.className = 'vu-field';
    const nameLabel = doc.createElement('label');
    nameLabel.className = 'vu-label';
    nameLabel.textContent = options.nameLabel;
    const nameInput = doc.createElement('input');
    nameInput.className = 'vu-input';
    nameInput.placeholder = 'ex: customerTier';
    if (options.defaultName) nameInput.value = options.defaultName;
    nameField.appendChild(nameLabel);
    nameField.appendChild(nameInput);

    const valueField = doc.createElement('div');
    valueField.className = 'vu-field';
    const valueLabel = doc.createElement('label');
    valueLabel.className = 'vu-label';
    valueLabel.textContent = options.valueLabel;
    const valueInput = doc.createElement('input');
    valueInput.className = 'vu-input';
    valueInput.placeholder = 'ex: Gold';
    if (options.defaultValue) valueInput.value = options.defaultValue;
    valueField.appendChild(valueLabel);
    valueField.appendChild(valueInput);

    const actions = doc.createElement('div');
    actions.className = 'vu-actions';
    const button = doc.createElement('button');
    button.className = 'vu-button';
    button.textContent = options.buttonLabel;
    const status = doc.createElement('div');
    status.className = 'vu-status';
    actions.appendChild(button);
    actions.appendChild(status);

    card.appendChild(nameField);
    card.appendChild(valueField);
    card.appendChild(actions);

    return { card, nameInput, valueInput, button, status };
  }

  async function handleUpdate(opts, state) {
    const name = state.nameInput.value.trim();
    const value = state.valueInput.value.trim();

    state.status.textContent = '';
    state.status.className = 'vu-status';

    if (!name) {
      state.status.textContent = 'Variable name is required.';
      state.status.classList.add('vu-status--error');
      return;
    }

    state.button.disabled = true;
    state.button.textContent = 'Updating...';

    try {
      if (typeof opts.onUpdate === 'function') {
        await opts.onUpdate({ name, value });
      } else {
        window.parent.postMessage(
          { type: 'GLOBAL_VARIABLE_UPDATE', name, value },
          '*'
        );
      }
      state.status.textContent = 'Updated.';
      state.status.classList.add('vu-status--success');
    } catch (err) {
      state.status.textContent = 'Update failed.';
      state.status.classList.add('vu-status--error');
      // console.error is intentional for quick gadget debugging.
      console.error('Variable update failed', err);
    } finally {
      state.button.disabled = false;
      state.button.textContent = opts.buttonLabel;
    }
  }

  function render(mount, userOptions) {
    if (!mount) throw new Error('Target mount element is required.');
    const opts = Object.assign({}, defaultOptions, userOptions || {});

    const targetDoc = mount.ownerDocument || document;
    createStyles(mount instanceof ShadowRoot ? mount : targetDoc.head);
    const state = createDom(opts, targetDoc);
    mount.innerHTML = '';
    mount.appendChild(state.card);

    state.button.addEventListener('click', () => handleUpdate(opts, state));
    state.valueInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleUpdate(opts, state);
    });
  }

  class GlobalVariableUpdater extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
      return ['title', 'button-label', 'name-label', 'value-label', 'name', 'value'];
    }

    connectedCallback() {
      this._renderFromAttributes();
    }

    attributeChangedCallback() {
      if (this.isConnected) {
        this._renderFromAttributes();
      }
    }

    _renderFromAttributes() {
      const opts = {
        title: this.getAttribute('title') || defaultOptions.title,
        buttonLabel: this.getAttribute('button-label') || defaultOptions.buttonLabel,
        nameLabel: this.getAttribute('name-label') || defaultOptions.nameLabel,
        valueLabel: this.getAttribute('value-label') || defaultOptions.valueLabel,
        defaultName: this.getAttribute('name') || '',
        defaultValue: this.getAttribute('value') || '',
        onUpdate: this.onUpdate || null,
      };
      render(this.shadowRoot, opts);
    }
  }

  if (!customElements.get('global-variable-updater')) {
    customElements.define('global-variable-updater', GlobalVariableUpdater);
  }

  // Expose imperative render for non-custom-element usage.
  window.VariableUpdater = { render };
})();
