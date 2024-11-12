<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">伏羲六十四卦</h1>
    <FuxiTable />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const user = ref(null)

onMounted(() => {
  // 检查用户是否已登录
  const userStr = localStorage.getItem('user')
  if (!userStr) {
    router.push('/login')
  } else {
    user.value = JSON.parse(userStr)
  }
})
</script> 