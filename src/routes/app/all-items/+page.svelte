<script lang="ts">
  import AppNav from "./../app-nav.svelte";
  import StoreItemCardList from "../store-item-card-list.svelte";
  import { getAppState } from "$lib/state.svelte";
  import { browser } from "$app/environment";
  import Loader from "../../loader.svelte";

  const app = getAppState();
</script>

<svelte:head>
  <title>Shopper List &mdash; To Buy</title>
</svelte:head>

<AppNav activePage="all-items"></AppNav>
<article>
  <section>
    <h2>All Items ({browser ? app.getItems().length : "-"})</h2>
    {#if !browser}
      <Loader />
    {:else}
      <StoreItemCardList items={app.getItems()} />
    {/if}
  </section>
</article>
