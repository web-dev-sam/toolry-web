<script setup lang="ts">
import { ref } from 'vue'
import AppNav from './components/AppNav.vue'
import HomePage from './pages/HomePage.vue'
import ToolsPage from './pages/ToolsPage.vue'

const page = ref<'home' | 'tools'>('home')
</script>

<template>
  <AppNav :page="page" @navigate="page = $event as 'home' | 'tools'" />
  <HomePage v-if="page === 'home'" />
  <ToolsPage v-else-if="page === 'tools'" />
</template>
