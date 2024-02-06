<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
 

 <div>
    <div class="">
        <Skeleton class="w-2/4 h-5  p-4 mt-10 rounded-lg bg-blue-card" />
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-4">
            <Skeleton v-for="n of 4" :key="n" class="h-24 bg-blue-card rounded-lg" />
        </div>
        <Skeleton  class="bg-blue-card p-2 h-screen rounded-lg"  />
    </div>
 </div>
</template>