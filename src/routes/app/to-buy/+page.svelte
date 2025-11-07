<script lang="ts">
  import AppNav from "./../app-nav.svelte";
  import StoreItem from "../store-item.svelte";
  import { getAppState } from "$lib/state.svelte";

  const app = getAppState();

  const needToBuyItems = $derived(app.shoppingItems.filter((i) => i.needToBuy));
</script>

<svelte:head>
  <title>Shopper List &mdash; All Items</title>
</svelte:head>

<AppNav activePage="to-buy"></AppNav>
<article>
  {#if needToBuyItems.length === 0}
    <p class="muted-text">No Items...</p>
  {:else}
    {#each needToBuyItems as item}
      <StoreItem {item} mode="card" />
    {/each}
  {/if}
</article>
