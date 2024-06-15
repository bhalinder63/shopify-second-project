/* eslint-disable */
export default () => {
  (function (pdpBuybox) {
    // Global variables
    let quantity;
    let variantSelected;

    const dom = {};
    const cacheDom = () => {
      dom.cartQtyButton = document.querySelectorAll(
        `[data-item-quantity-change]`
      );
      dom.cartQty = document.querySelectorAll(`[data-item-quantity]`);
      dom.cartForm = document.querySelectorAll(`[data-cart-form]`);
      dom.variantValue = document.querySelectorAll('.product__variantValue');
      dom.variantSize = document.querySelectorAll('[data-option="Size"]');
      dom.variantColor = document.querySelectorAll('[data-option="Grind"]');
      dom.addToCartBtn = document.querySelector('.product__addToCart');
      dom.errorMessage = document.querySelector('.product__error');
    };

    const quantityCounter = () => {
      const validateQty = (qty) => {
        if (parseFloat(qty) == parseInt(qty) && !isNaN(qty)) {
          // We have a valid number!
        } else {
          qty = 1;
        }
        return qty;
      };
      const bindUIActions = () => {
        dom.cartQtyButton.forEach((element) => {
          element.addEventListener('click', function () {
            let qtySelector =
              this.parentNode.querySelector(`[data-item-quantity]`);
            let qty = validateQty(
              parseInt(qtySelector.value.replace(/\D/g, ''))
            );
            if (this.hasAttribute('data-item-quantity-plus')) {
              qty += 1;
            } else {
              qty -= 1;
              if (qty <= 1) qty = 1;
            }
            qtySelector.value = qty;
            quantity = qty;
          });
        });
      };
      bindUIActions();
    };

    const variantSelect = () => {
      let variantMatch;
      let variantColorValue;
      let variantSizeValue;
      const products = json_product;
      variantMatch = `${variantColorValue} / ${variantSizeValue}`;
      dom.variantColor.forEach((el, key) => {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          console.log('clicked');
          el.classList.add('product__variant--selected');
          dom.variantColor.forEach((ell, ells) => {
            if (key !== ells) {
              ell.classList.remove('product__variant--selected');
            }
          });

          variantColorValue = this.dataset.variant;

          if (!variantColorValue) {
            variantMatch = `${variantSizeValue}`;
          }
          products.variants.find((el) => {
            if (el.title == variantMatch) {
              variantSelected = el.id;
            }
          });
          console.log('variant', variantSelected);
        });
      });

      dom.variantSize.forEach((el, key) => {
        el.addEventListener('click', function (e) {
          e.preventDefault();

          el.classList.add('product__variant--selected');
          dom.variantSize.forEach((ell, ells) => {
            if (key !== ells) {
              ell.classList.remove('product__variant--selected');
            }
          });

          variantSizeValue = this.dataset.variant;
          variantMatch = `${variantColorValue} / ${variantSizeValue}`;

          products.variants.find((el) => {
            if (el.title == variantMatch) {
              variantSelected = el.id;
            }
          });
          console.log(variantSelected);
        });
      });
    };

    const addToCart = () => {
      const products = json_product;
      dom.addToCartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.Additem({
          id: products.variants[0].id,
          quantity: 1,
        });
        window.openCart();
      });
    };

    const init = () => {
      cacheDom();
      quantityCounter();
      variantSelect();
      addToCart();
    };
    pdpBuybox.init = init;
  })((window.pdpBuybox = window.pdpBuybox || {}));
};
