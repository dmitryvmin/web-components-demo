import AutocompleteClass from './AutocompleteClass';
import getDataController from '../utils/getDataController';
import template from './template';

export default class TypeaheadComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$label = this.shadowRoot.querySelector('label');
    this.$searchComponent = this.shadowRoot.querySelector('#typeahead-component');
  }

  connectedCallback() {
    const dataController = this.getAttribute('data-controller');
    // TODO: the responsibility of picking the appropriate dataController - getDataController(type).
    // This logic should be moved out of this Component and injected at component instantiation
    // (in this set up that would be in index.html so keeping it in here)
    this.autocomplete = new AutocompleteClass(this.$searchComponent, getDataController(dataController)());
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.$label.innerHTML = this.label;
  }
}

if (!window.customElements.get('typeahead-component')) {
  window.customElements.define('typeahead-component', TypeaheadComponent);
}
