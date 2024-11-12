<template>
  <div class="space-y-4">
    <!-- 搜索框 -->
    <div class="flex gap-4 mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索卦名、拼音、性质或描述..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        v-model="pageSize"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="10">10条/页</option>
        <option value="20">20条/页</option>
        <option value="50">50条/页</option>
      </select>
    </div>

    <!-- 表格 -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-6 py-3 border-b text-left">序号</th>
            <th class="px-6 py-3 border-b text-left">卦名</th>
            <th class="px-6 py-3 border-b text-left">拼音</th>
            <th class="px-6 py-3 border-b text-left">性质</th>
            <th class="px-6 py-3 border-b text-left">卦象</th>
            <th class="px-6 py-3 border-b text-left">卦辞</th>
            <th class="px-6 py-3 border-b text-left">释义</th>
            <th class="px-6 py-3 border-b text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fuxi in paginatedFuxi" :key="fuxi.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 border-b">{{ fuxi.id }}</td>
            <td class="px-6 py-4 border-b font-bold">{{ fuxi.name }}</td>
            <td class="px-6 py-4 border-b text-gray-600">{{ fuxi.pronunciation }}</td>
            <td class="px-6 py-4 border-b">{{ fuxi.nature }}</td>
            <td class="px-6 py-4 border-b text-2xl">{{ fuxi.character }}</td>
            <td class="px-6 py-4 border-b">{{ fuxi.meaning }}</td>
            <td class="px-6 py-4 border-b">{{ fuxi.description }}</td>
            <td class="px-6 py-4 border-b">
              <button
                @click="showDetails(fuxi)"
                class="text-indigo-600 hover:text-indigo-900"
              >
                详情
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="flex items-center justify-between mt-4">
      <div class="text-sm text-gray-700">
        显示 {{ startIndex + 1 }}-{{ endIndex }} 条，共 {{ filteredFuxi.length }} 条
      </div>
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          上一页
        </button>
        <div class="flex items-center gap-1">
          <template v-for="page in totalPages" :key="page">
            <button
              @click="currentPage = page"
              :class="[
                'px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50',
                currentPage === page ? 'bg-indigo-500 text-white hover:bg-indigo-600' : ''
              ]"
            >
              {{ page }}
            </button>
          </template>
        </div>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <div v-if="selectedFuxi" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto"
      @click.self="selectedFuxi = null"
    >
      <div class="bg-white p-8 rounded-lg max-w-4xl w-full mx-4 my-8 relative">
        <button
          @click="selectedFuxi = null"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          关闭
        </button>
        
        <div class="space-y-6">
          <!-- 标题部分 -->
          <div class="flex items-center gap-4 border-b pb-4">
            <h3 class="text-3xl font-bold">{{ selectedFuxi.name }}</h3>
            <span class="text-xl text-gray-600">[{{ selectedFuxi.pronunciation }}]</span>
            <span class="text-4xl">{{ selectedFuxi.character }}</span>
          </div>

          <!-- 基本信息 -->
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-bold mb-2">基本信息</h4>
              <div class="space-y-2">
                <p><span class="text-gray-600">序号：</span>第{{ selectedFuxi.id }}卦</p>
                <p><span class="text-gray-600">性质：</span>{{ selectedFuxi.nature }}</p>
                <p><span class="text-gray-600">卦辞：</span>{{ selectedFuxi.meaning }}</p>
              </div>
            </div>

            <!-- 卦象图形展示 -->
            <div>
              <h4 class="text-lg font-bold mb-2">卦象图形</h4>
              <div class="space-y-2">
                <div v-for="(line, index) in fuxiLines" :key="index" 
                  class="flex justify-center gap-2">
                  <div v-if="line === '阳'" class="w-16 h-2 bg-black"></div>
                  <div v-else class="flex gap-2">
                    <div class="w-7 h-2 bg-black"></div>
                    <div class="w-7 h-2 bg-black"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 详细解释 -->
          <div class="space-y-4">
            <div>
              <h4 class="text-lg font-bold mb-2">卦象释义</h4>
              <p class="text-gray-800">{{ selectedFuxi.description }}</p>
            </div>
            
            <div>
              <h4 class="text-lg font-bold mb-2">详细解释</h4>
              <p class="text-gray-800">{{ selectedFuxi.details }}</p>
            </div>

            <!-- 六爻解释 -->
            <div>
              <h4 class="text-lg font-bold mb-2">六爻</h4>
              <div class="space-y-2">
                <p><span class="font-medium">上爻：</span>{{ selectedFuxi.yao?.top }}</p>
                <p><span class="font-medium">五爻：</span>{{ selectedFuxi.yao?.fifth }}</p>
                <p><span class="font-medium">四爻：</span>{{ selectedFuxi.yao?.fourth }}</p>
                <p><span class="font-medium">三爻：</span>{{ selectedFuxi.yao?.third }}</p>
                <p><span class="font-medium">二爻：</span>{{ selectedFuxi.yao?.second }}</p>
                <p><span class="font-medium">初爻：</span>{{ selectedFuxi.yao?.first }}</p>
              </div>
            </div>

            <!-- 象传 -->
            <div>
              <h4 class="text-lg font-bold mb-2">象传</h4>
              <p class="text-gray-800">{{ selectedFuxi.image }}</p>
            </div>

            <!-- 用法指导 -->
            <div>
              <h4 class="text-lg font-bold mb-2">用法指导</h4>
              <p class="text-gray-800">{{ selectedFuxi.usage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fuxi } from '~/types/fuxi'

// 使用 useAsyncData 获取数据
const { data: fuxiData } = await useAsyncData('fuxi', () => {
  return queryContent('fuxi64-data').findOne()
})

// 搜索和分页状态
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedFuxi = ref<Fuxi | null>(null)

// 根据搜索条件过滤数据
const filteredFuxi = computed(() => {
  if (!fuxiData.value?.hexagrams) return []
  
  const query = searchQuery.value.toLowerCase()
  return fuxiData.value.hexagrams.filter(fuxi => 
    fuxi.name.toLowerCase().includes(query) ||
    fuxi.pronunciation.toLowerCase().includes(query) ||
    fuxi.nature.toLowerCase().includes(query) ||
    fuxi.description.toLowerCase().includes(query) ||
    fuxi.details.toLowerCase().includes(query)
  )
})

// 计算总页数
const totalPages = computed(() => 
  Math.ceil(filteredFuxi.value.length / pageSize.value)
)

// 计算当前页的数据
const paginatedFuxi = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredFuxi.value.slice(start, end)
})

// 计算当前显示的数据范围
const startIndex = computed(() => 
  (currentPage.value - 1) * pageSize.value
)

const endIndex = computed(() => 
  Math.min(startIndex.value + pageSize.value, filteredFuxi.value.length)
)

// 监听搜索和页码大小变化，重置当前页
watch([searchQuery, pageSize], () => {
  currentPage.value = 1
})

// 计算卦象的阴阳爻
const fuxiLines = computed(() => {
  if (!selectedFuxi.value) return []
  
  // 根据卦象字符解析阴阳爻
  const lines = []
  const chars = selectedFuxi.value.character.split('')
  
  for (const char of chars) {
    switch (char) {
      case '☰': // 乾卦
        lines.push('阳', '阳', '阳')
        break
      case '☷': // 坤卦
        lines.push('阴', '阴', '阴')
        break
      case '☳': // 震卦
        lines.push('阴', '阴', '阳')
        break
      case '☴': // 巽卦
        lines.push('阴', '阳', '阳')
        break
      case '☵': // 坎卦
        lines.push('阳', '阴', '阳')
        break
      case '☶': // 艮卦
        lines.push('阳', '阴', '阴')
        break
      case '☲': // 离卦
        lines.push('阳', '阳', '阴')
        break
      case '☱': // 兑卦
        lines.push('阴', '阳', '阳')
        break
    }
  }
  
  return lines
})

// 显示详情
const showDetails = (fuxi: Fuxi) => {
  selectedFuxi.value = fuxi
}
</script>

<style scoped>
.fuxi-line {
  width: 64px;
  height: 8px;
  background-color: black;
  margin: 4px 0;
}

.fuxi-line-broken {
  width: 28px;
  height: 8px;
  background-color: black;
  margin: 4px 2px;
}
</style>