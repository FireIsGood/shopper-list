<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import LightDarkSwitcher from "./light-dark-switcher.svelte";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <nav>
    <a href="/" class:active={page.url.pathname === "/"}>Home</a>
    <a href="/app" class:active={<string>page.url.pathname === "/app"}>App</a>
    <a href="/about" class:active={<string>page.url.pathname === "/about"}>About</a>
    <LightDarkSwitcher />
  </nav>
</header>
<main>
  {@render children?.()}
</main>

<style>
  nav {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    font-size: 1.125rem;
  }
  nav a {
    color: var(--muted);
    text-decoration-color: var(--muted);

    &.active {
      color: var(--text-1);
      text-decoration-color: var(--text-1);
    }
  }

  :global(.light-dark-switcher) {
    margin-left: auto;
  }
</style>
