import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const validateQuantity = (quantity) => {
  if (parseFloat(quantity) == parseInt(quantity) && !isNaN(quantity)) {
    return quantity;
  } else {
    return 1;
  }
};

export class ProductDetails extends HTMLElement {
  constructor() {
    super();
    this.cartQuantityButton = this.querySelectorAll('[data-quantity-change]');
    this.cartQuantity = this.querySelector('[data-quantity]');
    this.price = this.querySelector('[data-price]');
    this.addToCart = this.querySelector('[data-add-to-cart]');
    this.options = this.querySelectorAll('[data-option]');
    this.optionValues = this.querySelectorAll('[data-option-value]');
    this.selectedVariant = this.querySelector('[data-variant]');
    this.carousel = this.querySelector('.js-product-details');
    this.sellingPlan = this.querySelector('[data-selling-plan]');
    this.spPrice = this.querySelectorAll('[data-sp-price]');
    this.isSubscription = false;
    this.initAddToCart();
    this.initQuantityCounter();
    this.initVariantSelection();
    this.initCarousel();
    this.initSellingPlans();
  }

  initSellingPlans = () => {
    if (this.sellingPlan) {
      this.selectedVariant.dataset.selectedPlan =
        this.sellingPlan.querySelector('[data-sp-selected]').value;
      this.sellingPlan
        .querySelectorAll('.selling-plan__option')
        .forEach((option) => {
          option.addEventListener('click', () => {
            if (option.hasAttribute('data-sp-once')) {
              this.sellingPlan
                .querySelector('[data-sp-plan]')
                .classList.remove('selling-plan__option--selected');
              option.classList.add('selling-plan__option--selected');
              this.isSubscription = false;
            }
            if (option.hasAttribute('data-sp-plan')) {
              this.sellingPlan
                .querySelector('[data-sp-once]')
                .classList.remove('selling-plan__option--selected');
              option.classList.add('selling-plan__option--selected');
              this.isSubscription = true;
            }
          });
        });
      this.sellingPlan
        .querySelector('select')
        .addEventListener('change', (e) => {
          const options = e.target.options;
          for (let i = 0; i < options.length; i++) {
            options[i].removeAttribute('data-selected');
          }

          const selection = e.target.options[e.target.selectedIndex];
          selection.setAttribute('data-sp-selected', 'true');

          this.selectedVariant.dataset.selectedPlan = selection.value;
        });
    }
  };

  initAddToCart = () => {
    this.addToCart.addEventListener('click', () => {
      if (this.addToCart.hasAttribute('disabled')) return;
      const id = this.selectedVariant.value;
      const quantity = this.cartQuantity.dataset.quantity;
      const sellingPlan = this.selectedVariant.dataset.selectedPlan;
      console.log(this.isSubscription);
      if (this.isSubscription) window.cart.addToCart(id, quantity, sellingPlan);
      else window.cart.addToCart(id, quantity);
    });
  };

  initQuantityCounter = () => {
    this.cartQuantityButton.forEach((element) => {
      element.addEventListener('click', () => {
        if (
          element.classList.contains(
            'product-details__counter-change--disabled'
          )
        )
          return;
        let quantity = validateQuantity(
          parseInt(this.cartQuantity.textContent.replace(/\D/g, ''))
        );
        if (element.hasAttribute('data-quantity-increment')) {
          quantity += 1;
        } else {
          quantity -= 1;
          if (quantity <= 1) quantity = 1;
        }
        this.cartQuantity.textContent = quantity;
        this.cartQuantity.setAttribute('data-quantity', quantity);
      });
    });
  };

  initCarousel = () => {
    const productDetailsCarousel = new Swiper(this.carousel, {
      modules: [Autoplay, Pagination],
      clickable: true,
      pagination: {
        el: '.swiper-pagination',
      },
      direction: 'horizontal',
      speed: 400,
      spaceBetween: 100,
      autoplay: {
        delay: 5000,
      },
    });
    return productDetailsCarousel;
  };

  selectVariant = () => {
    let selectedOptions = Array.from(
      this.querySelectorAll('.js-option-selected')
    );
    const { variants } = product;
    const selectedVariant = variants.find((variant) => {
      return variant.options.every(
        (option, index) =>
          option === selectedOptions[index].getAttribute('data-option-value')
      );
    });
    this.selectedVariant.value = selectedVariant.id;
    let price = '$' + (selectedVariant.price / 100).toFixed(2);
    let compareAtPrice =
      '$' + (selectedVariant.compare_at_price / 100).toFixed(2);
    if (selectedVariant.compare_at_price > selectedVariant.price) {
      this.price.innerHTML = `${price} <span class="product-details__price--compare">${compareAtPrice}</span>`;
    } else this.price.textContent = price;
    if (this.sellingPlan && product.selling_plan_groups?.length > 0) {
      this.spPrice[0].textContent = price;
      let discount =
        Number(
          product.selling_plan_groups[0].selling_plans[0].price_adjustments[0]
            .value
        ) / 100;
      this.spPrice[1].textContent =
        '$' + ((selectedVariant.price * (1 - discount)) / 100).toFixed(2);
    }
    if (selectedVariant.available) {
      this.cartQuantityButton.forEach((el) =>
        el.classList.remove('product-details__counter-change--disabled')
      );
      this.addToCart.removeAttribute('disabled');
      this.addToCart.textContent = 'Add to Cart';
      this.optionValues.forEach((el) =>
        el.classList.remove('product-details__option-value--disabled')
      );
      this.cartQuantity.textContent = 1;
      this.cartQuantity.dataset.quantity = 1;
    } else {
      this.cartQuantityButton.forEach((el) =>
        el.classList.add('product-details__counter-change--disabled')
      );
      this.addToCart.setAttribute('disabled', 'true');
      this.addToCart.textContent = 'Out of Stock';
      this.optionValues.forEach((el) =>
        el.classList.remove('product-details__option-value--disabled')
      );
      selectedOptions.forEach((el) =>
        el.classList.add('product-details__option-value--disabled')
      );
      this.cartQuantity.textContent = 0;
      this.cartQuantity.dataset.quantity = 0;
    }
  };

  initVariantSelection = () => {
    this.options.forEach((option) => {
      let values = option.querySelectorAll(`[data-option-value]`);
      values.forEach((value, index) => {
        if (index === 0) {
          value.classList.add('product-details__option-value--selected');
          value.classList.add('js-option-selected');
        }
        value.addEventListener('click', (e) => {
          e.preventDefault();
          if (
            value.classList.contains('product-details__option-value--disabled')
          )
            return;
          values.forEach((value) => {
            value.classList.remove('product-details__option-value--selected');
            value.classList.remove('js-option-selected');
          });
          value.classList.add('product-details__option-value--selected');
          value.classList.add('js-option-selected');
          this.selectVariant();
        });
      });
    });
    this.selectVariant();
  };
}
