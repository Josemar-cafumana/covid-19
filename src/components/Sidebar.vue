<script lang="ts" setup>
import { Menu, LayoutDashboard, PieChart, MessageSquareMore } from 'lucide-vue-next';
</script>

<template>
    <aside class="w-20 fixed left-0 bottom-0 h-screen border-r border-blue-text ">
      <ul class="mt-1">
        <li class="p-5 ">
          <Menu :size="28" />
        </li>
        <li class="p-5 bg-orange flex justify-center items-center">
          <LayoutDashboard :size="28" class="text-white" />
        </li>
        <li class="p-5 flex justify-center items-center">
          <MessageSquareMore :size="28" />
        </li>
        <li class="p-5 flex justify-center items-center">
          <PieChart :size="28" />
        </li>
      </ul>
    </aside>
</template>