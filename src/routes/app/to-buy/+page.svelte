<script lang="ts">
  import AppNav from "./../app-nav.svelte";
  import StoreItems from "../store-items.svelte";
  import { getAppState } from "$lib/state.svelte";

  const app = getAppState();

  const needToBuyItems = $derived(app.shoppingItems.filter((i) => i.needToBuy));
</script>

<svelte:head>
  <title>Shopper List &mdash; All Items</title>
</svelte:head>

<AppNav activePage="to-buy"></AppNav>
<article>
  <StoreItems items={needToBuyItems} mode="card" />
</article>
