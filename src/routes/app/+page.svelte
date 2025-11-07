<script lang="ts">
  import { getAppState } from "$lib/state.svelte";
  import AppNav from "./app-nav.svelte";

  const app = getAppState();
</script>

<svelte:head>
  <title>Shopper List &mdash; Dashboard</title>
</svelte:head>

<AppNav activePage="dashboard"></AppNav>
<article>
  <section class="shopping-item-groups">
    <div class="shopping-item-group">
      <h2>To Buy</h2>
      {#if app.shoppingItems.length === 0}
        <p>No Items...</p>
      {:else}
        <ul>
          {#each app.shoppingItems as item}
            <li>{item.name}</li>
          {/each}
        </ul>
      {/if}
    </div>
    <div class="shopping-item-group">
      <h2>Bought</h2>
      {#if app.shoppingItems.length === 0}
        <p>No Items...</p>
      {:else}
        <ul>
          {#each app.shoppingItems as item}
            <li>{item.name}</li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>
  <section>
    <h2>Actions</h2>
    <div class="action-list">
      <button>Add Item</button>
    </div>
  </section>
</article>

<style>
  .shopping-item-groups {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--size-3);
  }

  .shopping-item-group {
  }
</style>
