<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import IconCopy from "~icons/lets-icons/copy";
import IconCheck from "~icons/lets-icons/check-ring-round";

const props = defineProps<{
  /** String appended to each PM's base command, e.g. " --add generators/uuid" */
  suffix?: string;
  /** Open dropdown upward instead of downward */
  placement?: "top" | "bottom";
  small?: boolean;
}>();

const pms = [
  { id: "npm", label: "npm", base: "npx toolry@latest" },
  { id: "pnpm", label: "pnpm", base: "pnpx toolry@latest" },
  { id: "yarn", label: "yarn", base: "yarn dlx toolry@latest" },
  { id: "bun", label: "bun", base: "bunx toolry@latest" },
  { id: "deno", label: "deno", base: "deno run -A npm:toolry@latest" },
];

const dropdownOpen = ref(false);
const copied = ref(false);
const wrap = ref<HTMLElement | null>(null);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

async function copyCmd(pm: (typeof pms)[0]) {
  await navigator.clipboard.writeText(pm.base + (props.suffix ?? ""));
  dropdownOpen.value = false;
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function onDocClick(e: MouseEvent) {
  if (wrap.value && !wrap.value.contains(e.target as Node)) {
    dropdownOpen.value = false;
  }
}

onMounted(() => document.addEventListener("click", onDocClick));
onUnmounted(() => document.removeEventListener("click", onDocClick));
</script>

<template>
  <div class="pm-copy" :class="{ small }" ref="wrap">
    <button class="copy-btn" :class="{ copied }" @click="toggleDropdown">
      <IconCheck v-if="copied" />
      <IconCopy v-else />
    </button>
    <div v-if="dropdownOpen" class="pm-dropdown" :class="placement ?? 'bottom'">
      <button v-for="pm in pms" :key="pm.id" class="pm-option" @click="copyCmd(pm)">
        <span class="pm-label">{{ pm.label }}</span>
        <span class="pm-cmd">{{ pm.base }}{{ suffix ?? "" }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.pm-copy {
  position: relative;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.778rem;
  height: 1.778rem;
  border: none;
  background: transparent;
  color: var(--text);
  border-radius: 0.333rem;
  cursor: pointer;
  transition:
    color 0.15s,
    background 0.15s;

  & svg {
    width: 0.833rem;
    height: 0.833rem;
  }

  &:hover {
    background: var(--border);
    color: var(--text-h);
  }

  &.copied {
    color: var(--accent);
  }
}

.small .copy-btn {
  width: 1.444rem;
  height: 1.444rem;

  & svg {
    width: 0.722rem;
    height: 0.722rem;
  }
}

.pm-dropdown {
  position: absolute;
  right: 0;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 0.444rem;
  overflow: hidden;
  z-index: 200;
  min-width: 14rem;
  box-shadow: var(--shadow);

  &.bottom {
    top: calc(100% + 0.444rem);
  }

  &.top {
    bottom: calc(100% + 0.444rem);
  }
}

.pm-option {
  display: flex;
  align-items: center;
  gap: 0.556rem;
  width: 100%;
  padding: 0.556rem 0.778rem;
  border: none;
  background: transparent;
  color: var(--text);
  font-family: var(--mono);
  font-size: 0.722rem;
  cursor: pointer;
  text-align: left;
  transition:
    background 0.1s,
    color 0.1s;

  &:hover {
    background: var(--border);
    color: var(--text-h);

    & .pm-cmd {
      color: var(--text);
    }
  }
}

.pm-label {
  color: var(--text-h);
  min-width: 2.5rem;
}

.pm-cmd {
  color: var(--text);
  opacity: 0.6;
  font-size: 0.667rem;
  margin-left: auto;
  padding-left: 0.5rem;
}
</style>
