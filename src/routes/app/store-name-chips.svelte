<script lang="ts">
  import type { Snippet } from "svelte";
  import { xxHash32 } from "js-xxhash";
  import IconDotsThreeCircleBold from "phosphor-icons-svelte/IconDotsThreeCircleBold.svelte";
  import { Tooltip } from "bits-ui";
  import StoreNameChips from "./store-name-chips.svelte";

  type Props = {
    stores: string[] | string;
    fallback?: Snippet;
    limit?: number;
  };

  function convertStoreToHue(storeName: string): number {
    return xxHash32(storeName) % 360;
  }

  const { stores: storeOrStores, fallback, limit }: Props = $props();

  const storeNameLimit = 23;
</script>

{#snippet storeSpan(store: string)}
  {#if store.length > storeNameLimit}
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0} disableCloseOnTriggerClick={true}>
        <Tooltip.Trigger class="store-preview-long-name invisible-button">
          <span class="store-preview" style="--hue: {convertStoreToHue(store)}"
            >{store.slice(0, storeNameLimit)}&hellip;</span
          >
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content class="tooltip-container tooltip-high">
            <Tooltip.Arrow />
            <span class="store-preview-full store-preview" style="--hue: {convertStoreToHue(store)}">{store}</span>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  {:else}
    <span class="store-preview" style="--hue: {convertStoreToHue(store)}">{store}</span>
  {/if}
{/snippet}

{#if Array.isArray(storeOrStores)}
  <div class="store-preview-list">
    {#if limit}
      {#each storeOrStores.slice(0, limit) as store}
        {@render storeSpan(store)}
      {:else}
        {@render fallback?.()}
      {/each}
      {#if storeOrStores.length > limit}
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={0} disableCloseOnTriggerClick={true}>
            <Tooltip.Trigger class="store-more-icon">
              <IconDotsThreeCircleBold />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content class="tooltip-container tooltip-high">
                <Tooltip.Arrow />
                <StoreNameChips stores={storeOrStores} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      {/if}
    {:else}
      {#each storeOrStores as store}
        {@render storeSpan(store)}
      {:else}
        {@render fallback?.()}
      {/each}
    {/if}
  </div>
{:else}
  {@render storeSpan(storeOrStores)}
{/if}

<style>
  .store-preview-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--size-1);
  }

  .store-preview {
    display: inline-block;
    padding-inline: var(--size-2);
    border-radius: var(--size-1);

    /* CSS crimes my beloved*/
    background-color: oklch(from var(--primary) l c var(--hue));
    transition: background-color 100ms var(--ease-1);
  }

  :global(.store-preview-long-name) {
    display: inline-flex;
  }

  .store-preview-full {
    box-shadow: var(--shadow-2);
  }

  :global(.store-more-icon) {
    height: unset;
    background-color: var(--surface-2);
    color: var(--muted);
    padding: var(--size-1);
  }
  :global(.tooltip-container) {
    display: flex;
    background-color: var(--surface-1);
    padding: var(--size-1);
    border: 1px solid var(--surface-3);
    border-radius: var(--size-1);
    box-shadow: var(--shadow-2);
    animation: slide-in 100ms var(--ease-1);

    &[data-state="closed"] {
      animation: slide-out 100ms var(--ease-1);
    }
  }
  :global([data-arrow]) {
    color: var(--surface-3);
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      translate: 0 4px;
    }
    100% {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes slide-out {
    0% {
      opacity: 1;
      translate: 0 0;
    }
    100% {
      opacity: 0;
      translate: 0 4px;
    }
  }
</style>
