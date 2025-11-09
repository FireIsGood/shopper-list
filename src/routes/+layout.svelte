<script lang="ts">
  import "../app.css";
  import LightDarkSwitcher from "./light-dark-switcher.svelte";
  import { page } from "$app/state";
  import { setAppState } from "$lib/state.svelte";

  // Set up services
  setAppState();

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="https://fav.farm/🛍️" />
</svelte:head>

<header>
  <nav>
    <a href="/" class:active={page.url.pathname === "/"}>Home</a>
    <a href="/app" class:active={(<string>page.url.pathname).startsWith("/app")}>App</a>
    <a href="/about" class:active={(<string>page.url.pathname).startsWith("/about")}>About</a>
    <LightDarkSwitcher />
  </nav>
</header>
<main>
  {@render children?.()}
</main>

<style>
  header,
  main {
    box-sizing: content-box;
    max-width: 1024px;
    margin-inline: auto;
    display: block flow-root;
    background-color: rgb(from var(--surface-1) r g b / 0.8);
    box-shadow: var(--shadow-3);
  }

  header {
    margin-bottom: 1rem;
    border-bottom-left-radius: var(--size-2);
    border-bottom-right-radius: var(--size-2);
  }

  main {
    border-radius: var(--size-2);
  }

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
