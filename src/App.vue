<template>
  <main class="app-container">
    <RouterView />
  </main>
</template>

<style>
.app-container {
  max-width: 1200px;
  min-height: calc(100vh - 3rem);
  margin: 0 auto;
  padding: 0;
  font-family: system-ui, sans-serif;
  border-radius: 25px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  drop-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (min-width: 600px) {
  .app-container {
    padding: 1rem;
  }
}
</style>
