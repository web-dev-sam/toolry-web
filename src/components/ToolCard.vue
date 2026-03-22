<script setup lang="ts">
import { ref, onMounted } from "vue";
import { type Tool } from "../data/tools";
import { highlighterPromise } from "../composables/useHighlighter";
import PmCopyButton from "./PmCopyButton.vue";

const props = defineProps<{ tool: Tool }>();

const open = ref(false);
const highlighted = ref("");
const copied = ref(false);

onMounted(async () => {
  const highlighter = await highlighterPromise;
  highlighted.value = highlighter.codeToHtml(props.tool.code.code, {
    lang: "typescript",
    theme: "github-dark-dimmed",
  });
});

function copy() {
  navigator.clipboard.writeText(props.tool.code.copy);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h3>{{ tool.title }}</h3>
      <p class="description">{{ tool.description }}</p>
    </div>
    <div class="card-footer">
      <div class="add-cmd">
        <span class="add-dollar">$</span>
        <code class="add-code">pnpx toolry --add {{ tool.addPath }}</code>
        <PmCopyButton :suffix="` --add ${tool.addPath}`" placement="top" small />
      </div>
      <button class="code-btn" @click="open = true">Show</button>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="open" class="overlay" @click.self="open = false">
      <div class="modal">
        <div class="modal-header">
          <div>
            <span>{{ tool.title }}</span>
            <p class="description">{{ tool.description }}</p>
          </div>
          <button class="close-btn" @click="open = false">✕</button>
        </div>
        <div class="modal-code">
          <div v-if="highlighted" v-html="highlighted" />
          <pre v-else><code>{{ tool.code.code }}</code></pre>
        </div>
        <div class="modal-footer">
          <button class="copy-btn" @click="copy">{{ copied ? "Copied!" : "Copy code" }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.card {
  border: 1px solid var(--border);
  border-radius: 0.667rem;
  background: var(--code-bg);
  display: flex;
  flex-direction: column;
}

.card-body {
  padding: 1.333rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.667rem;
  text-align: left;
}

.card-body h3 {
  margin: 0;
  font-size: 0.889rem;
  font-weight: 500;
  color: var(--text-h);
}

.description {
  font-size: 0.778rem;
  color: var(--text);
  line-height: 150%;
}

.card-footer {
  padding: 0.667rem 0.667rem 0.667rem 1.333rem;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.667rem;
}

.add-cmd {
  display: flex;
  align-items: center;
  gap: 0.444rem;
  min-width: 0;
}

.add-dollar {
  font-family: var(--mono);
  font-size: 0.667rem;
  color: var(--accent);
  user-select: none;
  flex-shrink: 0;
}

.add-code {
  font-size: 0.722rem;
  color: var(--text);
  background: none;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.code-btn {
  font-family: var(--mono);
  font-size: 0.722rem;
  color: var(--text-h);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.333rem;
  padding: 0.333rem 0.889rem;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;
}

.code-btn:hover {
  border-color: var(--accent-border);
  color: var(--accent);
}

/* Modal */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.667rem;
  width: min(720px, calc(100vw - 2rem));
  max-height: calc(100vh - 4rem);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.333rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.889rem;
  color: var(--text-h);
  font-weight: 500;
  flex-shrink: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  font-size: 1rem;
  padding: 0.222rem;
  line-height: 1;
  border-radius: 0.222rem;
  transition: color 0.15s;
}

.close-btn:hover {
  color: var(--text-h);
}

.modal-code {
  overflow-y: auto;
  flex-grow: 1;
}

.modal-code pre {
  margin: 0;
  padding: 1.333rem;
  overflow-x: auto;
  background: var(--code-bg);
}

.modal-code pre code {
  font-family: var(--mono);
  font-size: 0.722rem;
  line-height: 160%;
  color: var(--text-h);
  background: none;
  padding: 0;
  display: block;
  white-space: pre;
}

.modal-code :deep(pre.shiki) {
  margin: 0;
  padding: 1.333rem;
  overflow-x: auto;
  background: var(--code-bg) !important;
}

.modal-code :deep(pre.shiki code) {
  font-family: var(--mono);
  font-size: 0.722rem;
  line-height: 160%;
  display: block;
  background: none;
  padding: 0;
}

.modal-footer {
  padding: 0.889rem 1.333rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

.copy-btn {
  font-family: var(--mono);
  font-size: 0.722rem;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 0.333rem;
  padding: 0.444rem 1rem;
  cursor: pointer;
  transition: background 0.15s;
}

.copy-btn:hover {
  background: rgba(192, 132, 252, 0.25);
}
</style>
