<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { highlighterPromise } from '../composables/useHighlighter'

const code = `import { defineTools } from 'toolry'

export default defineTools({
  name: 'ssl:self-signed',
  description: 'Generate a self-signed SSL certificate',
  category: 'Security',
  args: {
    domain:  { type: 'text',   description: 'Domain',         default: 'localhost' },
    days:    { type: 'text',   description: 'Valid for days',  default: '365' },
    keySize: {
      type: 'select',
      description: 'RSA key size',
      options: () => [
        { value: '2048', label: '2048-bit (fast)' },
        { value: '4096', label: '4096-bit (secure)' },
      ],
    },
  },
  run: ({ domain, days, keySize }) =>
    \`openssl req -x509 -newkey rsa:\${keySize} -keyout key.pem -out cert.pem\`
      + \` -sha256 -days \${days} -nodes -subj "/CN=\${domain}"\`,
})`

const highlighted = ref('')

onMounted(async () => {
  const highlighter = await highlighterPromise
  highlighted.value = highlighter.codeToHtml(code, {
    lang: 'typescript',
    theme: 'github-dark-dimmed',
  })
})
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
    <div id="demo">
      <video src="/demo.mp4" autoplay loop muted playsinline />
    </div>
  </section>

  <div class="ticks"></div>
  <section id="code-section">
    <h2>Define a tool in seconds</h2>
    <div id="example">
      <div v-if="highlighted" v-html="highlighted" />
      <pre v-else><code>{{ code }}</code></pre>
    </div>
  </section>

  <div class="ticks"></div>
  <div id="spacer"></div>
</template>

<style scoped>
#badge {
  font-size: 0.722rem;
  font-family: var(--mono);
  letter-spacing: 0.5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 99px;
  padding: 0.222rem 0.667rem;
}

#headline p {
  font-size: 1rem;
  color: var(--text);
  max-width: 480px;

  @media (max-width: 1024px) {
    font-size: 0.938rem;
  }
}

#headline h1 {
  margin-bottom: 2rem;
}

#install code {
  font-size: 0.778rem;
  color: var(--text);
  padding: 0.444rem 0.889rem;
  border: 1px solid var(--border);
  border-radius: 0.444rem;
  background: var(--code-bg);
  cursor: default;
  user-select: all;
}

#demo {
  width: 100%;
  max-width: 720px;
  border: 1px solid var(--border);
  border-radius: 0.667rem;
  overflow: hidden;
  box-shadow: var(--shadow);
}

#demo video {
  display: block;
  width: 100%;
}

#code-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem;
  border-top: 1px solid var(--border);
}

#code-section h2 {
  font-size: 1.5rem;
  color: var(--text-h);
  font-weight: 600;
  text-align: center;
}

#example {
  width: 100%;
  max-width: 720px;
  border: 1px solid var(--border);
  border-radius: 0.667rem;
  overflow: hidden;
  text-align: left;
  box-shadow: var(--shadow);
}

#example pre {
  margin: 0;
  padding: 1.333rem;
  overflow-x: auto;
  background: var(--code-bg);
}

#example pre code {
  background: none;
  padding: 0;
  font-size: 0.722rem;
  line-height: 160%;
  color: var(--text-h);
  display: block;
  white-space: pre;
}

#example :deep(pre.shiki) {
  margin: 0;
  padding: 1.333rem;
  overflow-x: auto;
  border-radius: 0;
  background: var(--code-bg) !important;
}

#example :deep(pre.shiki code) {
  font-family: var(--mono);
  font-size: 0.722rem;
  line-height: 160%;
  display: block;
  background: none;
  padding: 0;
}
</style>
