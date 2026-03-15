<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)
const email = ref('')
const password = ref('')

const handleAuth = () => {
  alert(isLogin.value ? 'Logged in successfully!' : 'Account created!')
  router.push('/')
}
</script>

<template>
  <div class="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl animate-in fade-in zoom-in duration-500">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-black dark:text-white mb-2">{{ isLogin ? 'Login' : 'Signup' }}</h1>
      <p class="text-slate-500 text-sm italic">Access your personalized explorer dashboard</p>
    </div>

    <form @submit.prevent="handleAuth" class="space-y-4">
      <div v-if="!isLogin" class="animate-in slide-in-from-top-2 duration-300">
        <label class="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Full Name</label>
        <input type="text" required class="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white outline-none" placeholder="Enter your name">
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Email</label>
        <input v-model="email" type="email" required class="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white outline-none" placeholder="email@example.com">
      </div>
      <div>
        <label class="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Password</label>
        <input v-model="password" type="password" required class="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 dark:text-white outline-none" placeholder="••••••••">
      </div>
      
      <button type="submit" class="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-95 mt-4 uppercase tracking-widest text-xs">
        {{ isLogin ? 'Login' : 'Create Account' }}
      </button>
    </form>
    
    <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
      <button @click="isLogin = !isLogin" class="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">
        {{ isLogin ? "New here? Create an account" : "Already a member? Login" }}
      </button>
    </div>
  </div>
</template>