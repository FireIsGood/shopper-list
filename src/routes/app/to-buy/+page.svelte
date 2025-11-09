<script lang="ts">
  import AppNav from "./../app-nav.svelte";
  import StoreItemCardList from "../store-item-card-list.svelte";
  import { getAppState } from "$lib/state.svelte";

  const app = getAppState();

  const needToBuyItems = $derived(app.getItems().filter((i) => i.needToBuy));
</script>

<svelte:head>
  <title>Shopper List &mdash; All Items</title>
</svelte:head>

<AppNav activePage="to-buy"></AppNav>
<article>
  <h2>Items ({needToBuyItems.length})</h2>
  <StoreItemCardList items={needToBuyItems} />
</article>
