<script lang="ts" setup>
defineProps({
  links: Array
})
</script>

<template>
  <div class="bread-crumbs">
    <div
        v-for="(item, index) in links"
        :key="index"
        class="bread-crumbs__item"
    >
      <router-link
          :class="[
                'bread-crumbs__link',
                {
                  'bread-crumbs__active-page': item.active
                }
            ]"
          :to="item.href"
          tag="button"
      >
        {{ item.text }}
      </router-link>
      <i v-show="!item.active" class="bread-crumbs__arrow">
        <svg data-src="/img/icons/arrowRight.svg"/>
      </i>
    </div>
  </div>
</template>

<style lang="scss" src="./BreadCrumbs.scss"/>