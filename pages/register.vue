<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">注册</h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="username" class="sr-only">用户名</label>
            <input v-model="registerForm.username" id="username" type="text" required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="用户名">
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input v-model="registerForm.password" id="password" type="password" required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="密码">
          </div>
          <div>
            <label for="confirmPassword" class="sr-only">确认密码</label>
            <input v-model="registerForm.confirmPassword" id="confirmPassword" type="password" required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="确认密码">
          </div>
        </div>

        <div v-if="passwordError" class="text-red-500 text-sm">
          {{ passwordError }}
        </div>

        <div class="flex items-center justify-end">
          <NuxtLink to="/login" class="text-sm text-indigo-600 hover:text-indigo-500">
            已有账号？去登录
          </NuxtLink>
        </div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            注册
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const passwordError = ref('')

watch(() => registerForm.value.confirmPassword, (newVal) => {
  if (newVal && newVal !== registerForm.value.password) {
    passwordError.value = '两次输入的密码不一致'
  } else {
    passwordError.value = ''
  }
})

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    passwordError.value = '两次输入的密码不一致'
    return
  }

  try {
    // 这里添加注册逻辑
    console.log('注册表单:', registerForm.value)
  } catch (error) {
    console.error('注册失败:', error)
  }
}
</script> 