<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">登录</h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="username" class="sr-only">用户名</label>
            <input v-model="loginForm.username" id="username" type="text" required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="用户名">
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input v-model="loginForm.password" id="password" type="password" required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="密码">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <NuxtLink to="/forgot-password" class="text-sm text-indigo-600 hover:text-indigo-500">
            忘记密码？
          </NuxtLink>
          <NuxtLink to="/register" class="text-sm text-indigo-600 hover:text-indigo-500">
            注册账号
          </NuxtLink>
        </div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            登录
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">第三方登录</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-3 gap-3">
          <button @click="handleThirdPartyLogin('wechat')"
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            微信
          </button>
          <button @click="handleThirdPartyLogin('qq')"
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            QQ
          </button>
          <button @click="handleThirdPartyLogin('bilibili')"
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            哔哩哔哩
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 使用 useAsyncData 获取用户数据
const { data: usersData } = await useAsyncData('users', () => {
  return queryContent('users').findOne()
})

const loginForm = ref({
  username: '',
  password: ''
})

const router = useRouter()

const handleLogin = async () => {
  try {
    if (!usersData.value?.users) {
      throw new Error('用户数据加载失败')
    }
    
    // 模拟登录验证
    const user = usersData.value.users.find(
      u => u.username === loginForm.value.username && 
          u.password === loginForm.value.password
    )

    if (user) {
      // 登录成功
      console.log('登录成功:', user)
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/')
    } else {
      alert('用户名或密码错误')
    }
  } catch (error) {
    console.error('登录失败:', error)
    alert('登录失败，请重试')
  }
}

const handleThirdPartyLogin = (platform: string) => {
  if (!usersData.value?.thirdPartyAccounts) {
    alert('第三方登录数据加载失败')
    return
  }

  // 模拟第三方登录
  const thirdPartyAccount = usersData.value.thirdPartyAccounts.find(
    account => account.platform === platform
  )

  if (thirdPartyAccount) {
    const bindUser = usersData.value.users.find(
      user => user.id === thirdPartyAccount.bindUserId
    )
    if (bindUser) {
      console.log('第三方登录成功:', platform, bindUser)
      localStorage.setItem('user', JSON.stringify(bindUser))
      router.push('/')
    }
  } else {
    alert('第三方登录失败，请重试')
  }
}
</script> 