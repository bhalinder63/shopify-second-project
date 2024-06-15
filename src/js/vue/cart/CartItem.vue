<template>
  <div
    :class="`cart-item ${
      loading.cart && loading.cartItemId === item.key
        ? 'cart-item--loading'
        : ''
    }`"
  >
    <div
      class="cart-drawer__loading"
      v-if="loading.cart && loading.cartItemId == item.key"
    ></div>
    <div class="cart-item__image">
      <img :src="item.featured_image.url" :alt="item.featured_image.alt" />
    </div>
    <div class="cart-item__details">
      <div class="cart-item__header">
        <a :href="item.url">
          <p class="bold">{{ item.product_title }}</p>
          <p
            v-if="!item.product_has_only_default_variant"
            class="p-md semibold cart-item__variant"
          >
            {{ item.variant_title }}
          </p>
          <p class="p-xs" v-if="item.selling_plan_allocation != null">
            {{ item.selling_plan_allocation.selling_plan.options[0].name
            }}{{ ' '
            }}{{ item.selling_plan_allocation.selling_plan.options[0].value }}
          </p>
        </a>
      </div>
      <div class="cart-item__remove p-sm" @click="() => remove(item.key)">
        Remove
      </div>
      <div class="cart-item__quantity">
        <div
          class="cart-item__change-quantity"
          @click="() => decrement(item.key, item.quantity - 1)"
        >
          –
        </div>
        <div class="p-md bold">{{ item.quantity }}</div>
        <div
          class="cart-item__change-quantity"
          @click="() => increment(item.key, item.quantity + 1)"
        >
          +
        </div>
      </div>
      <div class="cart-item__price p-md bold">
        {{ formatPrice(item.discounted_price) }}
        <span
          class="cart-item__price--compare"
          v-if="item.price >= item.discounted_price"
          >{{ formatPrice(item.price) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const loading = computed(() => store.getters.getLoading);

const props = defineProps({
  item: Object,
});

const formatPrice = (price) => {
  return `$${(price / 100).toFixed(2)}`;
};

const increment = (id, quantity) =>
  store.dispatch('updateCartItems', {
    id,
    quantity,
  });

const decrement = (id, quantity) =>
  store.dispatch('updateCartItems', {
    id,
    quantity,
  });

const remove = (id) =>
  store.dispatch('updateCartItems', {
    id,
    quantity: 0,
  });
</script>
