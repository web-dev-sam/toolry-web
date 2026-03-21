<script setup lang="ts">
defineProps<{ page: string }>()
const emit = defineEmits<{ navigate: [page: string] }>()
</script>

<template>
  <nav>
    <div class="links">
      <button :class="{ active: page === 'home' }" @click="emit('navigate', 'home')">Home</button>
      <button :class="{ active: page === 'tools' }" @click="emit('navigate', 'tools')">Tools</button>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.222rem;
  height: 3.111rem;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.logo {
  font-family: var(--mono);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-h);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.links {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 0.5rem;
}

.links button {
  font-family: var(--mono);
  font-size: 0.778rem;
  color: var(--text);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.333rem 0.667rem;
  border-radius: 0.333rem;
  transition: color 0.15s, background 0.15s;
}

.links button:hover,
.links button.active {
  color: var(--text-h);
  background: var(--accent-bg);
}

.links button.active {
  color: var(--accent);
}
</style>
