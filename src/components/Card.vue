<script lang="ts" setup>
defineProps<{ label: string, labelColor: string, value: number}>()

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
    <Card class="shadow-md bg-blue-card border-0">
              <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle :class="labelColor + ' text-sm font-medium'">
                  {{ label }}
                </CardTitle>
                
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold text-blue-50">
                  {{ value.toLocaleString() }}
                </div>
        
              </CardContent>
            </Card>
</template>