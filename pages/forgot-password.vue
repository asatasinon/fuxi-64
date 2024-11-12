<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">忘记密码</h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">邮箱</label>
            <input v-model="email" id="email" type="email" required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="请输入注册邮箱">
          </div>
        </div>

        <div class="flex items-center justify-end">
          <NuxtLink to="/login" class="text-sm text-indigo-600 hover:text-indigo-500">
            返回登录
          </NuxtLink>
        </div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            发送重置密码邮件
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')

const handleResetPassword = async () => {
  try {
    // 这里添加重置密码逻辑
    console.log('重置密码邮箱:', email.value)
  } catch (error) {
    console.error('发送重置密码邮件失败:', error)
  }
}
</script> 