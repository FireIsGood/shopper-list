<script lang="ts">
  import { getAppState } from "$lib/state.svelte";
  import IconPlusBold from "phosphor-icons-svelte/IconPlusBold.svelte";
  import AppNav from "./app-nav.svelte";
  import AddItemDialog from "./add-item-dialog.svelte";
  import StoreItems from "./store-items.svelte";
  import StoreNameChips from "./store-name-chips.svelte";
  import { browser } from "$app/environment";
  import Loader from "../loader.svelte";

  const app = getAppState();

  const needToBuyItems = $derived(app.getItems().filter((i) => i.needToBuy));
  const needToBuyStores = $derived(
    [
      ...needToBuyItems.reduce((map, item) => {
        item.stores.forEach((store) => {
          const prior = map.get(store) ?? 0;
          map.set(store, prior + 1);
        });
        return map;
      }, new Map<string, number>()),
    ].sort(([_a, a], [_b, b]) => b - a)
  );

  // svelte-ignore non_reactive_update
  let addItemDialog: ReturnType<typeof AddItemDialog>;
</script>

<svelte:head>
  <title>Shopper List &mdash; Dashboard</title>
</svelte:head>

<AppNav activePage="dashboard"></AppNav>
<article>
  <section class="dashboard-groups">
    <div class="shopping-item-group">
      <h2 class="group-header">To Buy</h2>
      {#if !browser}
        <Loader />
      {:else}
        <StoreItems items={needToBuyItems} mode="list" />
      {/if}
    </div>
    <div class="stores-group">
      <h2 class="group-header">Stores</h2>
      {#if !browser}
        <Loader />
      {:else if needToBuyStores.length === 0}
        <p class="muted-text">No Stores...</p>
      {:else}
        <ul>
          {#each needToBuyStores as store}
            <li><StoreNameChips stores={store[0]} /> &ndash; {store[1]}</li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>
  <section class="actions">
    <h2>Actions</h2>
    <div class="action-list">
      <button onclick={addItemDialog.openAddDialog}><IconPlusBold /> Add item</button>
      <AddItemDialog bind:this={addItemDialog} />
    </div>
  </section>
</article>

<style>
  h2 {
    max-inline-size: unset;
  }

  .dashboard-groups {
    min-height: 50vh;
    display: grid;
    grid-template-columns: 2fr minmax(var(--size-14), 1fr);
    gap: var(--size-3);
  }

  article {
    container: dashboard / inline-size;
  }

  @container dashboard (width < 800px) {
    .dashboard-groups {
      grid-template-columns: 1fr;
      min-height: unset;
    }
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
