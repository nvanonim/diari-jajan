<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'primary',
  },
})

</script>

<template>
  <button class="button" :class="{ grey: props.color === 'grey' }">
    <slot />
  </button>
</template>

<style scoped>
.button {
  text-transform: uppercase;
  background-color: rgb(100, 13, 199);
  color: rgb(223, 223, 223);
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.button:hover {
  background-color: rgb(123, 16, 245);
}

.grey {
  background-color: rgb(65, 65, 65);
  color: rgb(223, 223, 223);
}
</style>