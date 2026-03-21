<script setup lang="ts">
const example = `import { defineTool } from 'toolry'

export default defineTool({
  name: 'dev',
  description: 'Start the dev server',
  category: 'Laravel',
  args: {
    port: { type: 'text', description: 'Port', default: '8000' },
  },
  run: ({ port }) => \`php artisan serve --port=\${port}\`,
})`
</script>

<template>
  <section id="center">
    <div id="badge">Zero boilerplate</div>
    <div id="headline">
      <h1>toolry</h1>
      <p>Write tools in JS/TS, run shell commands, get a beautiful interactive CLI.</p>
    </div>
    <div id="install">
      <code>pnpm install toolry</code>
    </div>
    <div id="example">
      <pre><code>{{ example }}</code></pre>
    </div>
  </section>

  <div class="ticks"></div>
  <div id="spacer"></div>
</template>

<style scoped>
#badge {
  font-size: 13px;
  font-family: var(--mono);
  letter-spacing: 0.5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 99px;
  padding: 4px 12px;
}

#headline p {
  font-size: 18px;
  color: var(--text);
  max-width: 480px;

  @media (max-width: 1024px) {
    font-size: 15px;
  }
}

#headline h1 {
  margin-bottom: 2rem;
}

#install code {
  font-size: 14px;
  color: var(--text);
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--code-bg);
  cursor: default;
  user-select: all;
}

#example {
  width: 100%;
  max-width: 560px;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  text-align: left;
  background: var(--code-bg);
  box-shadow: var(--shadow);
}

#example pre {
  margin: 0;
  padding: 24px;
  overflow-x: auto;
}

#example pre code {
  background: none;
  padding: 0;
  font-size: 13px;
  line-height: 160%;
  color: var(--text-h);
  display: block;
  white-space: pre;
}
</style>
