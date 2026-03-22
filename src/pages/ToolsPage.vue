<script setup lang="ts">
import ToolCard from "../components/ToolCard.vue";
import { tools } from "../data/tools";
import AppFooter from "../components/AppFooter.vue";
</script>

<template>
  <section id="tools">
    <div id="tools-header">
      <h2>Tools</h2>
      <p>Copy-paste example tools.</p>
    </div>
    <div id="tools-grid">
      <ToolCard v-for="tool in tools" :key="tool.id" :tool="tool" />
    </div>
  </section>

  <AppFooter />
</template>

<style scoped>
#tools {
  padding: 3.556rem 2.222rem 2.667rem;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 2.5rem 1.25rem 2rem;
  }
}

#tools-header {
  margin-bottom: 2.222rem;
}

#tools-header h2 {
  font-size: 2rem;
  color: var(--text-h);
  font-weight: 500;
  margin: 0 0 0.667rem;
}

#tools-header p {
  color: var(--text);
  font-size: 0.889rem;
}

#tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.333rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}
</style>
