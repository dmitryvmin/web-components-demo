export default class AutocompleteClass {
  constructor(rootEl, options = {}) {
    this.rootEl = rootEl;
    this.numOfResults = options.numOfResults || 10;
    this.onRequestData = options.onRequestData;
    this.onSelect = options.onSelect;
    this.activeLiIdx = undefined;
    this.inputEl = undefined;
    this.results = undefined;
    this.init();
  }

  async onQueryChange(query) {
    if (typeof this.onRequestData !== 'function') {
      return;
    }
    const results = await this.onRequestData({
      query,
      numOfResults: this.numOfResults,
    });
    this.updateDropdown(results);
  }

  updateDropdown(results) {
    if (results.length) {
      this.results = results;
      this.listEl.appendChild(this.createResultsEl(results));
      this.listEl.classList.remove('hide');
    } else {
      this.clearResults();
    }
  }

  clearResults() {
    this.activeLiIdx = undefined;
    this.listEl.innerHTML = '';
    this.listEl.classList.add('hide');
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('li');
      el.classList.add('result');
      el.textContent = result.value;

      // Pass the value to the onSelect callback
      el.addEventListener('click', () => {
        if (typeof this.onSelect !== 'function') {
          return;
        }
        this.onSelect(result.value);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  setLiClassName(liIdx, isActive) {
    if (liIdx === undefined) {
      console.warn('No liIdx provided', liIdx);
      return;
    }
    const activeLiEl = this.listEl.childNodes[liIdx];
    if (!activeLiEl) {
      return;
    }

    if (isActive) {
      activeLiEl.classList.add('active');
    } else {
      activeLiEl.classList.remove('active');
    }
  }

  handleInputFocused() {
    if (!this.inputEl) {
      console.warn('No inputEl', this.inputEl);
    }
    this.inputEl.focus();
  }

  onArrowUp() {
    // If no Li items found, disregard event
    if (!this.listEl.firstChild) {
      return;
    }
    // If no active Li is set, disregard event
    if (this.activeLiIdx === undefined) {
      return;
    }
    // If no activeLi is 0, clear active Li and move focus to input
    if (this.activeLiIdx === 0) {
      this.setLiClassName(0, false);
      this.activeLiIdx = undefined;
      this.handleInputFocused();
      return;
    }
    // Else, move focus styling to the previous Li
    this.setLiClassName(this.activeLiIdx, false);
    this.setLiClassName(this.activeLiIdx - 1, true);
    this.activeLiIdx = this.activeLiIdx - 1;
  }

  onArrowDown() {
    // If no Li items found, disregard event
    if (!this.listEl.firstChild) {
      return;
    }
    // If no active Li is set, set first Li child active
    if (this.activeLiIdx === undefined) {
      // this.inputEl.blur();
      this.activeLiIdx = 0;
      this.setLiClassName(0, true);
      return;
    }
    // If active Li is the last node, disregard event
    const liCount = this.listEl.childNodes.length;
    if (this.activeLiIdx === liCount) {
      return;
    }
    // Else, move focus styling to the next Li
    this.setLiClassName(this.activeLiIdx, false);
    this.setLiClassName(this.activeLiIdx + 1, true);
    this.activeLiIdx = this.activeLiIdx + 1;
  }

  onKeyEnter() {
    this.onSelect(this.results[this.activeLiIdx]);
    this.clearResults();
    this.handleInputFocused();
  }

  onKeyDown(event) {
    switch (event.code) {
      case 'ArrowUp':
        this.onArrowUp();
        break;
      case 'ArrowDown':
        this.onArrowDown();
        break;
      case 'Enter':
        this.onKeyEnter();
        break;
      default:
        break;
    }
  }

  setInputListeners() {
    this.inputEl.addEventListener('input', event => this.onQueryChange(event.target.value));
    this.inputEl.addEventListener('keydown', this.onKeyDown.bind(this));
    this.inputEl.addEventListener('search', this.clearResults.bind(this));
  }

  createQueryInputEl() {
    this.inputEl = document.createElement('input');
    this.inputEl.setAttribute('type', 'search');
    this.inputEl.setAttribute('name', 'query');
    this.inputEl.setAttribute('autocomplete', 'off');
    this.setInputListeners();
  }

  init() {
    // Build query input
    this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl);

    // Build results dropdown
    this.listEl = document.createElement('ul');
    this.listEl.classList.add('results');
    this.listEl.classList.add('hide');
    this.rootEl.appendChild(this.listEl);
  }
}
