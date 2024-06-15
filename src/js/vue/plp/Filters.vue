<template>
  <aside :class="`filters ${isVisible ? 'filters--mobile-drawer' : ''}`">
    <div
      class="filters__mobile-heading p-md bold"
      @click="isVisible = !isVisible"
    >
      Filters
      <FilterIcon :isVisible="isVisible" />
    </div>
    <Filter
      v-for="(filter, index) in filters"
      v-if="!loading.filters"
      :filter="filter"
      @closeParent="isVisible = false"
    />
    <div class="filter" v-if="loading.filters">
      <h3 class="filter__title p-md bold">Loading...</h3>
      <ul class="filter__list p-md" v-for="index in [1, 2, 3, 4]">
        <li class="filter__item" :key="index">
          <Checkbox :isChecked="false" />
          <span class="filter__checkbox" /><span class="filter__option">
            ..........
          </span>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import Checkbox from './Checkbox.vue';
import Filter from './Filter.vue';
import FilterIcon from './FilterIcon.vue';
import { ref, computed, watchEffect } from 'vue';

import { useStore } from 'vuex';

const isVisible = ref(false);
const store = useStore();
const filters = computed(() => store.getters.getFilters);
const loading = computed(() => store.getters.getLoading);
const selectedFilters = computed(() => store.getters.getSelectedFilters);
store.dispatch('fetchFilters');

const isSelected = (key, value) => {
  const keyLower = key.toLowerCase();
  const valueLower = key === 'Brand' ? value : value.toLowerCase();

  if (!selectedFilters.value[keyLower]) {
    return false;
  }

  return selectedFilters.value[keyLower].includes(valueLower);
};

const selectFilter = (key, value) => {
  store.dispatch('updateSelectedFilters', {
    key: key.toLowerCase(),
    value: key === 'Brand' ? value : value.toLowerCase(),
  });
};

watchEffect(() => {
  selectedFilters.value;
  store.dispatch('fetchProducts', 0);
});
</script>
