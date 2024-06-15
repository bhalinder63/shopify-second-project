<template>
  <div class="product-listing">
    <Filters />
    <section class="products-grid">
      <div
        class="p products-grid__no-products"
        v-if="!loading.products && products.length === 0"
      >
        No products to display.
      </div>
      <ProductCard
        v-for="product in products"
        v-if="!loading.products"
        :product="product"
      ></ProductCard>
      <div
        v-for="index in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
        v-if="loading.products"
        class="products-grid__product-card"
      >
        <div
          class="products-grid__product-image products-grid__product-image--loading"
        ></div>
        <div
          class="products-grid__product-title products-grid__product-title--loading"
        ></div>
        <div
          class="products-grid__product-price products-grid__product-price--loading"
        ></div>
      </div>
    </section>
  </div>
  <div class="products-grid__pages">
    <button
      class="products-grid__previous-page"
      @click="pageChange(-1)"
      :disabled="!page.hasPreviousPage || loading.products"
    >
      <
    </button>
    <p class="products-grid__current-page">{{ page.pageNumber }}</p>
    <button
      class="products-grid__next-page"
      @click="pageChange(1)"
      :disabled="!page.hasNextPage || loading.products"
    >
      >
    </button>
  </div>
</template>

<script setup>
import Filters from './Filters.vue';
import ProductCard from './ProductCard.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('initCollection');
const products = computed(() => store.getters.getProducts);
const loading = computed(() => store.getters.getLoading);
const page = computed(() => store.getters.getPage);

const props = defineProps({
  data: Object,
});

function pageChange(change) {
  store.dispatch('fetchProducts', change);
}
</script>
