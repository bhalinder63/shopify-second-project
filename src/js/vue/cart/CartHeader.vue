<template>
  <div class="cart-drawer__header">
    <h2>
      Cart <span v-if="cartItemCount > 0">( {{ cartItemCount }} )</span>
    </h2>
    <button class="cart-drawer__close" @click="store.dispatch('toggleCart')">
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.6631 1.87015C18.9343 2.14134 18.9343 2.58104 18.6631 2.85224L3.38532 18.13C3.11412 18.4012 2.67442 18.4012 2.40323 18.13C2.13203 17.8588 2.13203 17.4191 2.40323 17.1479L17.681 1.87015C17.9522 1.59895 18.3919 1.59895 18.6631 1.87015Z"
          fill="#1A1A1A"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.40323 1.87015C2.67442 1.59895 3.11412 1.59895 3.38532 1.87015L18.6631 17.1479C18.9343 17.4191 18.9343 17.8588 18.6631 18.13C18.3919 18.4012 17.9522 18.4012 17.681 18.13L2.40323 2.85224C2.13203 2.58104 2.13203 2.14134 2.40323 1.87015Z"
          fill="#1A1A1A"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cartItemCount = computed(() => store.getters.getCartItemCount);
</script>
