<script setup>
import { onMounted, ref } from "vue"
import { storeToRefs } from 'pinia'

import { useStore } from "../store/hp"

const store = useStore()

const { page, perPage, rows, lastPage } = storeToRefs(store)

const optionsPerPage = [5, 10, 25, 50, 100]

onMounted(() => {
    store.fetchData()
})
</script>

<template>
    <h1>Personajes de Harry Potter</h1>
    <div>
        <p>Tamaño de página</p>
        <select v-model="perPage">
            <option v-for="val in optionsPerPage" :key="val" :value="val">{{ val }}</option>
        </select>
    </div>
    <ul>
        <li v-for="({ name }, idx) in rows" :key="idx">{{ name }}</li>
    </ul>
    <div>
        Página {{ page }} de {{ lastPage }}
    </div>
    <div>
        <a href="#" @click.prevent="store.previousPage">Anterior</a>
        <span>&nbsp;-&nbsp;</span>
        <a href="#" @click.prevent="store.nextPage">Siguiente</a>
    </div>
</template>