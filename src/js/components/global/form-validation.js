export const formValidation = () => {
  const dom = {};
  const cacheDom = () => {
    dom.body = document.querySelector('body');
    dom.formInput = document.querySelectorAll('.js-form-input');
    dom.formInputErrors = document.querySelectorAll('.js-form-error');
    dom.loginFormInputs = document
      .querySelector('#loginForm')
      ?.querySelectorAll('.js-form-input');
    dom.signupFormInputs = document
      .querySelector('#registerForm')
      ?.querySelectorAll('.js-form-input');
    dom.resetFormInputs = document
      .querySelector('#resetForm')
      ?.querySelectorAll('.js-form-input');
    dom.loginForm = document
      .querySelector('#loginForm')
      ?.querySelector('#customer_login');
    dom.signupForm = document
      .querySelector('#registerForm')
      ?.querySelector('#create_customer');
    dom.resetForm = document.querySelector('#resetForm')?.querySelector('form');
  };

  const bindUIActions = () => {
    const verifyEmail = (email) => {
      const rgex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return rgex.test(String(email).toLowerCase());
    };

    const verifyText = (pass) => {
      const rgex = /^(?!\s*$).+/;
      return rgex.test(String(pass).toLowerCase());
    };

    const toggleInputError = (input) => {
      let error = input.closest('div').querySelector('.js-form-error');
      if (input.type === 'email') {
        if (!verifyEmail(input.value)) {
          error.classList.add('js-form-error--active');
          window.isEmailVerified = false;
        } else {
          error.classList.remove('js-form-error--active');
          window.isEmailVerified = true;
        }
      } else {
        if (!verifyText(input.value)) {
          error.classList.add('js-form-error--active');
          window.isTextVerified = false;
        } else {
          error.classList.remove('js-form-error--active');
          window.isTextVerified = true;
        }
      }
    };
    if (dom.formInput) {
      dom.formInput.forEach((input) => {
        input.addEventListener('blur', () => {
          toggleInputError(input);
        });
      });
    }

    if (dom.loginForm) {
      dom.loginForm.addEventListener('submit', (event) => {
        dom.loginFormInputs.forEach((input) => toggleInputError(input));
        if (!(window.isEmailVerified && window.isTextVerified)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
    }

    if (dom.signupForm) {
      dom.signupForm.addEventListener('submit', (event) => {
        dom.signupFormInputs.forEach((input) => toggleInputError(input));
        if (!(window.isEmailVerified && window.isTextVerified)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
    }

    /*if (dom.resetForm) {
      dom.resetForm.addEventListener('submit', (event) => {
        dom.resetFormInputs.forEach((input) => toggleInputError(input));
        if (!(window.isEmailVerified && window.isTextVerified)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
    }*/
  };
  cacheDom();
  bindUIActions();
};
