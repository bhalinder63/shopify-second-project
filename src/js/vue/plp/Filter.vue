<template>
  <div class="filter">
    <h3 class="filter__title p-md bold" @click="isVisible = !isVisible">
      {{ filter.key }}
      <FilterIcon :isVisible="isVisible"></FilterIcon>
    </h3>
    <ul
      :class="[
        'filter__list',
        'p-md',
        `filter__list--${filter.key.toLowerCase()}`,
      ]"
      v-if="isVisible"
    >
      <li
        class="filter__item"
        @click="selectFilter(filter.key, value)"
        v-for="value in filter.values"
        v-if="filter.key !== 'Color'"
      >
        <Checkbox :isChecked="isSelected(filter.key, value)" />
        <span class="filter__checkbox" /><span class="filter__option">{{
          value
        }}</span>
      </li>
      <li
        class="filter__item filter__item--color"
        @click="selectFilter(filter.key, value)"
        v-for="value in filter.values"
        v-if="filter.key === 'Color'"
      >
        <span
          :class="`filter__color-box  ${
            isSelected(filter.key, value) ? 'filter__color-box--selected' : ''
          }`"
        /><span
          class="filter__color-option"
          :style="`background-color: ${value.toLowerCase()}`"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import Checkbox from './Checkbox.vue';
import FilterIcon from './FilterIcon.vue';
import { computed, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  filter: {
    type: Object,
    required: true,
  },
});

const isVisible = ref(true);

const store = useStore();
const selectedFilters = computed(() => store.getters.getSelectedFilters);

const isSelected = (key, value) => {
  const keyLower = key.toLowerCase();
  const valueLower = key === 'Brand' ? value : value.toLowerCase();

  if (!selectedFilters.value[keyLower]) {
    return false;
  }

  return selectedFilters.value[keyLower].includes(valueLower);
};

const emit = defineEmits(['closeParent']);

const selectFilter = (key, value) => {
  store.dispatch('updateSelectedFilters', {
    key: key.toLowerCase(),
    value: key === 'Brand' ? value : value.toLowerCase(),
  });
  emit('closeParent');
};
</script>
