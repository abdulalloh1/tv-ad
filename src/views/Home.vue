<script
    setup
    lang="ts"
>
import { computed, ref } from "vue";
import BreadCrumbs from "../components/UI/AppBreadCrumbs/AppBreadCrumbs.vue";
import AppSelect from "../components/UI/AppSelect/AppSelect.vue";
import ProductCard from "../components/WorkSpace/ProductCard/ProductCard.vue";

import productsJson from "../mocks/items.json"
import materialsJson from "../mocks/materials.json"
import { Product } from "../types/product";

const breadCrumbsLinks = [
  {
    text: 'Главная',
    to: '/'
  },
  {
    text: 'Системы хранения',
    to: '/'
  },
  {
    text: 'Комплекты стеллажных систем',
    to: '/',
    active: true
  }
]

const sortsList = ref([
  {
    value: 'ASC',
    label: 'По возрастанию'
  },
  {
    value: 'DESC',
    label: 'По убыванию'
  }
])
const materials = materialsJson
const products = productsJson

const sortBy = ref('')
const selectedMaterial = ref('')

const computedProducts = computed(() => {
  if(!sortBy.value && !selectedMaterial.value) return products

  let modifiedProducts: Product[] = JSON.parse(JSON.stringify(products))

  if(sortBy.value) {
    modifiedProducts = modifiedProducts.sort((a:Product, b:Product) => {
      if(sortBy.value === 'ASC') return a.price.current_price - b.price.current_price

      return b.price.current_price - a.price.current_price
    })
  }

  if(selectedMaterial.value) {
    modifiedProducts = modifiedProducts.filter((product: Product) => +product.material === +selectedMaterial.value)
  }

  return modifiedProducts
})
</script>

<template>
  <section class="home">
    <div class="container">
      <bread-crumbs :links="breadCrumbsLinks"/>
      <h2 class="page-title">Комплекты стеллажных систем</h2>
      <div class="home__filter">
        <app-select
            v-model="sortBy"
            class="home__filter__app-select"
            label="Сортировать по:"
            clearable
            :items="sortsList"
        />
        <app-select
            v-model="selectedMaterial"
            class="home__filter__app-select"
            item-text="name"
            item-value="id"
            label="Материал"
            clearable
            :items="materials"
        />
      </div>
      <div class="home__products">
        <product-card
            v-for="(product, index) in computedProducts"
            :key="index"
            :data="product"
        />
      </div>
    </div>
  </section>
</template>