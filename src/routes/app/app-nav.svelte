<script lang="ts">
  type PageSlug = "dashboard" | "to-buy" | "all-items";

  let { activePage }: { activePage: PageSlug } = $props();
</script>

<header>
  <nav>
    <a href="/app" class:active-page={activePage === "dashboard"}>Dashboard</a>
    <a href="/app/to-buy" class:active-page={activePage === "to-buy"}>To Buy</a>
    <a href="/app/all-items" class:active-page={activePage === "all-items"}>All Items</a>
  </nav>
</header>

<style>
  header {
    padding: var(--size-3);
  }
  nav {
    display: flex;
    justify-content: space-around;
    gap: var(--size-3);
  }
  a {
    flex-grow: 1;
    font-weight: var(--font-weight-6);
    padding: var(--size-2) var(--size-3);
    background-color: var(--surface-1);
    border: 1px solid var(--surface-2);
    border-radius: var(--size-2);
    text-align: center;
    color: var(--text-2);
    text-decoration-color: var(--muted);

    &.active-page {
      background-color: var(--surface-2);
      border: 1px solid var(--surface-1);
    }
  }
</style>
