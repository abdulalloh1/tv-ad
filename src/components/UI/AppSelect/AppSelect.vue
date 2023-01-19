<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: null,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  },
  itemText: {
    type: String,
    default: 'label'
  },
  itemValue: {
    type: String,
    default: 'value'
  },
  height: {
    type: [Number, String],
    default: null
  },
  clearable: Boolean,
  outlined: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: null
  },
  returnObject: {
    type: Boolean,
    default: false
  },
  touched: {
    type: Object,
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue'
])
const root = ref(null)
const showOptions = ref(false)
const searchingText = ref('')

const selectHeaderText = computed(() => {
  if (selectedItem.value) {
    return selectedItem.value[props.itemText]
  }

  return props.title
})

const selectedItem = computed(() => {
  if (props.items.length === 0) return null

  if (props.returnObject) return props.modelValue

  return props.items.find((item) => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(item[props.itemValue])
    } else {
      return item[props.itemValue] === props.modelValue
    }
  })
})

const computedItems = computed(() => {
  if (!props.items) return []
  return props.items
})

function checkIfItemIsSelected(item) {
  if (!props.modelValue) return
  if (!props.multiple) {
    if (!selectedItem.value) return false;
    const valueForCheck = props.returnObject ? selectedItem.value[props.itemValue] : selectedItem.value[props.itemValue];
    return item[props.itemValue] === valueForCheck;
  } else if (props.returnObject) {
    return props.modelValue.some((selectedItem) => {
      return selectedItem[props.itemValue] === item[props.itemValue]
    })
  } else {
    return props.modelValue.includes(item[props.itemValue])
  }
}

function toggle() {
  showOptions.value = !showOptions.value
}

function selectItem(selectedItem) {
  if (!props.multiple) {
    emit('update:modelValue', props.returnObject ? selectedItem : selectedItem[props.itemValue])
    showOptions.value = false
  } else {
    toggleItem(selectedItem)
  }
  searchingText.value = ''
}

function toggleItem(item) {
  if (checkIfItemIsSelected(item)) {
    removeSelectedItem(item);
  } else {
    addItemToSelected(item);
  }
}

function addItemToSelected(item) {
  const valueToPush = props.returnObject ? item : item[props.itemValue];
  props.modelValue.push(valueToPush)
}

function removeSelectedItem(item) {
  if (Array.isArray(props.modelValue)) {
    const index = props.modelValue.findIndex(selectedItem => selectedItem === item[props.itemValue])
    props.modelValue.splice(index, 1)
  } else {
    emit('update:modelValue', null)
  }
}

function clear() {
  emit('update:modelValue', null)
}

function onClickOutside(e) {
  if (!root.value.contains(e.target)) {
    showOptions.value = false
  }
}

window.onkeydown = (e) => {
  if (e.keyCode === 27) {
    showOptions.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', onClickOutside)
})

</script>

<template>
  <div
      :class="[
      'app-select',
      {
        'app-select--active': showOptions,
        'app-select--outlined': outlined
      },
      color ? `app-select--${color}` : ''
    ]"
  >
    <label class="app-select__label">
      {{ label }}
    </label>
    <button
        ref="root"
        :style="{
          height: height ? height + 'px' : ''
        }"
        :tabindex="!computedItems.length ? '-1' : ''"
        class="app-select__header"
        @blur="touched ? touched.blur() : ''"
        @click="toggle()"
    >
      <span class="app-select__wrap">
         <span class="app-select__wrap__text">
            {{ selectHeaderText }}
         </span>
      </span>
      <span class="app-select__header__right">
        <button
            v-if="clearable && selectedItem"
            class="app-select__clear"
            @click.prevent="clear()"
        >
          <svg data-src="/img/icons/close.svg"/>
        </button>
        <span class="app-select__arrow">
          <svg data-src="/img/icons/arrow-down.svg"/>
        </span>
      </span>
    </button>
    <div class="app-select__options">
      <div
          v-if="computedItems.length === 0"
          class="app-select__option app-select__option--no-selectable"
      >
        <i>пусто</i>
      </div>
      <div
          v-for="(item, index) in computedItems"
          :key="index"
      >
        <div
            v-if="item.header"
            class="app-select__option app-select__option--header"
        >
          {{ item.header }}
        </div>
        <button
            v-else
            :class="[
            'app-select__option',
            {
              'app-select__option--selected': checkIfItemIsSelected(item)
            }
          ]"
            @click="selectItem(item)"
        >
          {{ item[itemText] }}
        </button>
      </div>
    </div>
  </div>
</template>

<style
    lang="scss"
    src="./AppSelect.scss"
/>