<script lang="ts">
  import AppNav from "./../app-nav.svelte";
  import StoreItems from "../store-items.svelte";
  import { getAppState } from "$lib/state.svelte";

  const app = getAppState();

  // Fucked Up and Evil hack
  const allItems = $derived(app.getItems().map((i) => i));
</script>

<svelte:head>
  <title>Shopper List &mdash; To Buy</title>
</svelte:head>

<AppNav activePage="all-items"></AppNav>
<article>
  <StoreItems items={allItems} mode="card" />
</article>
