<script lang="ts">
  import AppNav from "./../app-nav.svelte";
  import StoreItemCardList from "../store-item-card-list.svelte";
  import { getAppState } from "$lib/state.svelte";

  const app = getAppState();
</script>

<svelte:head>
  <title>Shopper List &mdash; To Buy</title>
</svelte:head>

<AppNav activePage="all-items"></AppNav>
<article>
  <StoreItemCardList items={app.getItems()} />
</article>
