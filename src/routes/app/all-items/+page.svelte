<script lang="ts">
  import AppNav from "./../app-nav.svelte";
  import StoreItem from "../store-item.svelte";
  import { getAppState } from "$lib/state.svelte";

  const app = getAppState();

  const boughtItems = $derived(app.shoppingItems.filter((i) => !i.needToBuy));
</script>

<svelte:head>
  <title>Shopper List &mdash; To Buy</title>
</svelte:head>

<AppNav activePage="all-items"></AppNav>
<article>
  {#if boughtItems.length === 0}
    <p class="muted-text">No Items...</p>
  {:else}
    {#each boughtItems as item}
      <StoreItem {item} mode="card" />
    {/each}
  {/if}
</article>
