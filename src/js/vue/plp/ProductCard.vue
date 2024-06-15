<template>
  <div :key="product.title" class="products-grid__product-card">
    <a
      :href="`/products/${product.handle}`"
      class="products-grid__product-link"
    >
      <img
        :src="product.variants.nodes[0].image.src"
        alt="Product Image"
        class="products-grid__product-image"
      />
      <h3 class="products-grid__product-title p-md">
        {{ product.title }}
      </h3>
      <p class="products-grid__product-price p-xs">
        {{ getProductPrice(product) }}
        <span
          v-if="getComparePrice(product)"
          class="products-grid__product-price--compare p-xs"
          >${{ getComparePrice(product) }}</span
        >
      </p>
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const getProductPrice = (product) => {
  return '$' + product.variants.nodes[0].priceV2.amount;
};

const getComparePrice = (product) => {
  return product.variants.nodes[0].compareAtPriceV2?.amount;
};
</script>
