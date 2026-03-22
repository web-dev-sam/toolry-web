<script setup lang="ts">
import { ref, onMounted } from "vue";
import { highlighterPromise } from "../composables/useHighlighter";
import AppFooter from "../components/AppFooter.vue";
import PmCopyButton from "../components/PmCopyButton.vue";

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
})`;

const highlighted = ref("");

onMounted(async () => {
  const highlighter = await highlighterPromise;
  highlighted.value = highlighter.codeToHtml(code, {
    lang: "typescript",
    theme: "github-dark-dimmed",
  });
});
</script>

<template>
  <section id="center">
    <div id="badge">Zero boilerplate</div>
    <div id="headline">
      <h1>toolry</h1>
      <p>Write tools in JS/TS, run shell commands, get a beautiful interactive CLI.</p>
    </div>
    <div id="install">
      <div id="command">
        <span id="dollar">$</span>
        <code>npx toolry@latest</code>
        <div id="copy-divider" />
        <PmCopyButton />
      </div>
      <div id="install-hint"># sets up config · creates a sample tool · launches the UI</div>
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

  <AppFooter />
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

#install {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.556rem;
}

#command {
  display: flex;
  align-items: center;
  gap: 0.667rem;
  padding: 0.444rem 0.444rem 0.444rem 1.111rem;
  border: 1px solid var(--border);
  border-radius: 0.444rem;
  background: var(--code-bg);
}

#dollar {
  font-family: var(--mono);
  font-size: 1rem;
  color: var(--accent);
  user-select: none;
}

#command > code {
  font-size: 1rem;
  color: var(--text-h);
  background: none;
  padding: 0;
  cursor: default;
  user-select: all;
}

#copy-divider {
  width: 1px;
  height: 1.2em;
  background: var(--border);
  flex-shrink: 0;
  margin-left: 0.222rem;
}

#install-hint {
  font-size: 0.611rem;
  font-family: var(--mono);
  color: var(--text);
  opacity: 0.45;
  letter-spacing: 0.2px;
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
