<script lang="ts">
  import AppNav from "./../app-nav.svelte";
  import StoreItemCardList from "../store-item-card-list.svelte";
  import { getAppState } from "$lib/state.svelte";
  import { browser } from "$app/environment";
  import Loader from "../../loader.svelte";

  const app = getAppState();

  const needToBuyItems = $derived(app.getItems().filter((i) => i.needToBuy));
</script>

<svelte:head>
  <title>Shopper List &mdash; All Items</title>
</svelte:head>

<AppNav activePage="to-buy"></AppNav>
<article>
  <section>
    <h2>To Buy ({browser ? needToBuyItems.length : "-"})</h2>
    {#if !browser}
      <Loader />
    {:else}
      <StoreItemCardList items={needToBuyItems} />
    {/if}
  </section>
</article>

<style>
  section {
    min-height: 50vh;
  }
</style>
