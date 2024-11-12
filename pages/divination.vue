<script setup lang="ts">
import { ref } from 'vue'

interface HexagramLine {
  type: 'yin' | 'yang'
  value: string
}

const hexagram = ref<HexagramLine[] | null>(null)

const generateHexagram = () => {
  const lines: HexagramLine[] = []
  for (let i = 0; i < 6; i++) {
    const type = Math.random() < 0.5 ? 'yin' : 'yang'
    lines.push({
      type,
      value: type === 'yang' ? '━━━' : '━  ━'
    })
  }
  hexagram.value = lines
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">周易卜卦</h1>
        
        <button 
          @click="generateHexagram"
          class="inline-flex items-center justify-center px-8 py-4 
                 text-lg font-medium text-white bg-indigo-600 
                 rounded-md hover:bg-indigo-700 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 
                 focus:ring-indigo-500 transition-all duration-200"
        >
          求卦
        </button>

        <div v-if="hexagram" 
             class="mt-12 space-y-4 transition-all duration-500"
             :class="{'opacity-0': !hexagram, 'opacity-100': hexagram}"
        >
          <div 
            v-for="(line, index) in hexagram" 
            :key="index"
            class="text-3xl font-mono tracking-wider"
            :class="line.type === 'yang' ? 'text-gray-900' : 'text-gray-500'"
          >
            {{ line.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 400px;
}
</style> 