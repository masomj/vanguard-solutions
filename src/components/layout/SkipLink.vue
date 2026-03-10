<template>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: #fff;
  text-decoration: none;
  border-radius: 0 0 0.25rem 0.25rem;
  font-weight: 600;
}
.skip-link:focus {
  top: 0;
}
</style>
