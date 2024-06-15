<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="10" fill="#DADADA" />
    <g v-if="isChecked" clip-path="url(#clip0_4144_756)">
      <path
        d="M6.71875 10.1875L9.125 12.5938L14.625 7.09375"
        stroke="#212121"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4144_756">
        <rect width="11" height="11" fill="white" transform="translate(5 4)" />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup>
const props = defineProps({
  isChecked: {
    type: Boolean,
    required: true,
  },
});
</script>
