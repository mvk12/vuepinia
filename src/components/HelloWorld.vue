<script setup>
import { storeToRefs } from 'pinia'
import { useStore } from '../store/counter'

defineProps({
  msg: String
})

const store = useStore()

const { count, doubleCount } = storeToRefs(store)
const { increment } = store
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="increment">count is {{ count }}</button>
  </div>
  <div class="card">
    <p>Double count: {{ doubleCount }}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
