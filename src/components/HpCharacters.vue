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
    <h1 class="text-5xl text-black text-center">Personajes de Harry Potter</h1>
    <div class="text-center my-3">
        <p>Tamaño de página</p>
        <select v-model="perPage" class="border border-gray-300 text-gray-900 text-sm rounded-lg ">
            <option v-for="val in optionsPerPage" :key="val" :value="val">{{ val }}</option>
        </select>
    </div>

    <div class="flex flex-wrap">
        <div class="hover:bg-gray-600 flex-auto w-50 mx-10 my-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            v-for="({ name, image, gender }, idx) in rows" :key="idx">
            <div class="text-center">
                <img class="rounded-t-lg w-60 h-50" :src="image" alt="" />
            </div>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ name }}</h5>
                </a>
                <p class="mb-3 font-normal text-white">{{gender}}</p>
            </div>
        </div>
    </div>
    
    <div class="flex justify-between">
        <a class="text-right bg-transparent hover:bg-gray-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded" href="#" @click.prevent="store.previousPage">Anterior</a>
        <div>
            Página <span class="italic">{{ page }}</span> de <span class="italic">{{ lastPage }}</span>
        </div>
        <a class="text-right bg-transparent hover:bg-gray-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded" href="#" @click.prevent="store.nextPage">Siguiente</a>
    </div>
</template>