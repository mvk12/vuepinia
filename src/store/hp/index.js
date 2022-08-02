import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('hp-data', () => {
    const registers = ref([])
    const page = ref(1)
    const perPage = ref(10)

    const start = computed(() => (page.value - 1) * perPage.value)
    const final = computed(() => start.value + perPage.value)
    const total = computed(() => registers.value.length)
    const lastPage = computed(() => ((total.value - (total.value % perPage.value)) / perPage.value) + ((total.value % perPage.value) > 0 ? 1 : 0))

    const rows = computed(() => registers.value.slice(start.value, final.value))

    watch(page, (newPage, oldPage) => {
        console.log(`Cambio de página de ${oldPage} a ${newPage}`)
    })

    watch(perPage, () => {
        page.value = 1
    })
    
    const fetchData = () => {
        fetch('https://hp-api.herokuapp.com/api/characters')
            .then((result) => {
                return result.json()
            })
            .then((data) => {
                registers.value = data;
            })
            .catch((err) => {
            });
    }
    
    const previousPage = () => {
        page.value --;
    }

    const nextPage = () => {
        page.value ++;
    }

    return {
        registers,
        start,
        final,
        page,
        perPage,
        rows,
        lastPage,
        fetchData,
        previousPage,
        nextPage,
    }
})