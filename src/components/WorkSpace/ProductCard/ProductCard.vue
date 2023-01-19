<script lang="ts" setup>
import { Product } from "../../../types/product";
import { computed, PropType } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  data: {
    type: Object as PropType<Product>,
    required: true
  }
})
const store = useStore()

const isProductInCart = computed(() => {
  return store.state.cartModule.cart.includes(props.data.id)
})

const isProductInFavorite = computed(() => {
  return store.state.favoriteModule.favorite.includes(props.data.id)
})

function toggleCart () {
  store.commit('toggleCart', props.data.id)
}

function toggleFavorite () {
  store.commit('toggleFavorite', props.data.id)
}

</script>

<template>
  <div class="product-card">
    <div
        v-if="data.price.old_price"
        class="product-card__sale"
    >
      Скидка
    </div>
    <div class="product-card__image">
      <img
          :src="`/img/${data.image.url}`"
          alt=""
      >
    </div>
    <div class="product-card__code">{{ data.code }}</div>
    <h3 class="product-card__name">{{ data.name }}</h3>
    <div class="product-card__footer">
      <div class="product-card__price">
        <p
            v-if="data.price.old_price"
            class="product-card__price__old"
        >
          {{ data.price.old_price }}₽
        </p>
        {{ data.price.current_price }}₽
      </div>
      <div class="product-card__utils">
        <button
            class="product-card__utils__btn"
            @click="toggleCart"
        >
          <svg
              :data-src="!isProductInCart ? '/img/icons/cart.svg' : '/img/icons/tick.svg'"
          />
        </button>
        <button
            :class="['product-card__utils__btn', 'product-card__heart-btn', {
              'product-card__heart-btn--active': isProductInFavorite
            }]"
            @click="toggleFavorite"
        >
          <svg data-src="/img/icons/heart.svg"/>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./ProductCard.scss" />