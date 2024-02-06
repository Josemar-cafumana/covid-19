<script lang="ts" setup>
import { Menu, LayoutDashboard, PieChart, MessageSquareMore } from 'lucide-vue-next';

defineProps<{ menuOpen: boolean }>()
const emit = defineEmits<{
  (e: 'toggleMenu'): void
}>()


</script>

<template>
  <div v-if="!menuOpen">
    <button class="p-5 absolute right-5" @click="$emit('toggleMenu')">
      <Menu :size="28" />
    </button>
  </div>
  <aside v-else class="w-20  fixed left-0 bottom-0 h-screen border-r border-blue-text ">
    <ul class="mt-1">
      <li class="p-5 pl-6 cursor-pointer " @click="$emit('toggleMenu')">
        <Menu :size="28" />
      </li>
      <li class="p-5 cursor-pointer bg-orange flex justify-center items-center">
        <LayoutDashboard :size="28" class="text-white" />
      </li>
      <li class="p-5 cursor-pointer flex justify-center items-center">
        <MessageSquareMore :size="28" />
      </li>
      <li class="p-5 cursor-pointer flex justify-center items-center">
        <PieChart :size="28" />
      </li>
    </ul>
  </aside>
</template>