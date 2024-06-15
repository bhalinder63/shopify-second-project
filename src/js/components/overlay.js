export default () => {
  const setVars = (vars, el) => {
    if (!vars || !el) return;
    const { elClass, opacity, speed, background } = vars;
    const setProperty = el.style.setProperty.bind(el.style);

    if (elClass) el.classList.add(elClass);

    setProperty('--ov-opacity', opacity || 'inherit');
    setProperty('--ov-speed', speed || 'inherit');
    setProperty('--ov-background', background || 'inherit');
  };

  const execEv = function (e) {
    const ev = this.ev[e];
    ev && ev(this.$el);
  };

  const addEv = function (el) {
    el.addEventListener('animationend', () => {
      const clases = el.classList;
      if (clases.contains('ov--hide')) {
        clases.add('ov--hidden');
        clases.remove('ov--hide');

        execEv.call(this, 'close');
      } else {
        execEv.call(this, 'open');
      }
    });

    const execCancelEv = function () {
      if (this.active) execEv.call(this, 'cancel');
    };

    el.addEventListener('click', () => {
      execCancelEv.call(this);
    });

    window.addEventListener('keyup', (e) => {
      const escape = [
        'Esc', // IE/Edge specific value
        'Escape',
      ];

      if (escape.includes(e.key)) execCancelEv.call(this);
    });
  };

  function overlay(vars) {
    const el = document.createElement('div');
    const ev = el.onanimationend !== undefined;
    el.classList.add('ov', 'ov--hidden');

    this.ev = {};
    this.$el = el;
    setVars(vars, el);

    if (ev) addEv.call(this, el);
    window.document.body.append(el);
  }

  Object.assign(overlay.prototype, {
    show(vars) {
      if (this.active) return;

      const el = this.$el;
      this.active = true;
      setVars(vars, el);
      el.classList.remove('ov--hidden');
    },

    hide(vars) {
      if (!this.active) return;

      const el = this.$el;
      this.active = false;
      setVars(vars, el);
      el.classList.add('ov--hide');
    },

    on(e, listener) {
      const ev = this.ev;
      ev[e] = listener;
    },
  });

  window.Overlay = overlay;
};
