<script lang="ts">
  import { getAppState } from "$lib/state.svelte";
  import AppNav from "./app-nav.svelte";
  import AddItemDialog from "./add-item-dialog.svelte";
  import StoreItem from "./store-item.svelte";

  const app = getAppState();

  const needToBuyItems = $derived(app.shoppingItems.filter((i) => i.needToBuy));
  const needToBuyStores = $derived([
    ...needToBuyItems.reduce((map, item) => {
      item.stores.forEach((store) => map.set(store, 1));
      return map;
    }, new Map<string, number>()),
  ]);
</script>

<svelte:head>
  <title>Shopper List &mdash; Dashboard</title>
</svelte:head>

<AppNav activePage="dashboard"></AppNav>
<article>
  <section class="dashboard-groups">
    <div class="shopping-item-group">
      <h2 class="group-header">To Buy</h2>
      {#if needToBuyItems.length === 0}
        <p class="muted-text">No Items...</p>
      {:else}
        <ul>
          {#each needToBuyItems as item}
            <StoreItem {item} mode="list" />
          {/each}
        </ul>
      {/if}
    </div>
    <div class="stores-group">
      <h2 class="group-header">Stores</h2>
      {#if needToBuyStores.length === 0}
        <p class="muted-text">No Stores...</p>
      {:else}
        <ul>
          {#each needToBuyStores as store}
            <li>{store[0]} &ndash; {store[1]}</li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>
  <section class="actions">
    <h2>Actions</h2>
    <div class="action-list">
      <AddItemDialog />
    </div>
  </section>
</article>

<style>
  .dashboard-groups {
    min-height: 50vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--size-3);
  }

  .shopping-item-group,
  .stores-group {
    padding: var(--size-2) var(--size-3);
    background-color: var(--surface-1);
    border: 1px solid var(--surface-2);
    border-radius: var(--size-2);
  }

  .group-header {
    text-align: center;
  }

  .actions {
    margin-top: var(--size-3);
  }
</style>
