<template>
  <span class="filter__dropdown-button" v-if="props.isVisible">
    <svg
      width="12"
      height="12"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_11_658)">
        <path
          d="M6.875 22H37.125"
          stroke="#212121"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_11_658">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </span>
  <span class="filter__dropdown-button" v-if="!props.isVisible">
    <svg
      width="12"
      height="12"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_11_659)">
        <path
          d="M6.875 22H37.125"
          stroke="#212121"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 6.875V37.125"
          stroke="#212121"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_11_659">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
      <g clip-path="url(#clip0_11_659)">
        <path
          d="M6.875 22H37.125"
          stroke="#212121"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 6.875V37.125"
          stroke="#212121"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_11_659">
          <rect width="44" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </span>
</template>

<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});
</script>
