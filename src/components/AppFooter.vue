<template>
  <div class="ticks"></div>
  <footer id="spacer">
    <a href="https://github.com/web-dev-sam/toolry" target="_blank" rel="noopener">web-dev-sam/toolry</a>
  </footer>
</template>

<style scoped>
#spacer {
  height: 4.889rem;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    height: 3rem;
  }
}

a {
  font-size: 0.722rem;
  color: var(--text);
  text-decoration: none;
  transition: color 0.15s;
}

a:hover {
  color: var(--text-h);
}
</style>
