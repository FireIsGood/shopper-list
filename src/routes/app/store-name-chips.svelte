<script lang="ts">
  import type { Snippet } from "svelte";
  import { xxHash32 } from "js-xxhash";

  type Props = {
    stores: string[] | string;
    fallback?: Snippet;
  };

  function convertStoreToHue(storeName: string): number {
    return xxHash32(storeName) % 360;
  }

  const { stores, fallback }: Props = $props();
</script>

{#if Array.isArray(stores)}
  <div class="store-preview-list">
    {#each stores as store}
      <span class="store-preview" style="--hue: {convertStoreToHue(store)}">{store}</span>
    {:else}
      {@render fallback?.()}
    {/each}
  </div>
{:else}
  <span class="store-preview" style="--hue: {convertStoreToHue(stores)}">{stores}</span>
{/if}

<style>
  .store-preview-list {
    grid-area: stores;
    display: flex;
    gap: var(--size-2);
  }

  .store-preview {
    display: inline-block;
    padding-inline: var(--size-2);
    border-radius: var(--size-1);

    /* CSS crimes my beloved*/
    background-color: oklch(from var(--primary) l c var(--hue));
    transition: background-color 100ms var(--ease-1);
  }
</style>
