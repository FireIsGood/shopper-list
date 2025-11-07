<script lang="ts">
  import type { ShoppingItem } from "$lib/state.svelte";
  import IconPencilSimpleBold from "phosphor-icons-svelte/IconPencilSimpleBold.svelte";
  import IconCheckBold from "phosphor-icons-svelte/IconCheckBold.svelte";

  type StoreItemMode = "card" | "list";

  const { item, mode = "card" }: { item: ShoppingItem; mode?: StoreItemMode } = $props();

  function editItem() {}
  function markItemBought() {
    item.needToBuy = false;
  }
</script>

{#if mode === "list"}
  <li>
    <div class="store-item">
      <div>
        {item.name}
        {#if item.description}
          <span class="muted-text">&ndash; {item.description}</span>
        {/if}
      </div>
      <div class="item-options">
        <button class="edit-item-button light-button" onclick={editItem}
          ><IconPencilSimpleBold /><span class="sr-only">edit item</span></button
        >
        <button class="mark-bought-item-button light-button" onclick={markItemBought}
          ><IconCheckBold /><span class="sr-only">mark as bought</span></button
        >
      </div>
    </div>
  </li>
{:else if mode === "card"}
  <p>
    {item.name} (this is a card now)
  </p>
{/if}

<style>
  .store-item {
    display: flex;
  }
  .item-options {
    display: flex;
    margin-left: auto;
    gap: var(--size-1);
    flex-shrink: 0;
  }
  .edit-item-button,
  .mark-bought-item-button {
    padding: var(--size-1);
    color: var(--muted);

    &:hover {
      color: inherit;
    }
    &:active {
      scale: 0.95;
      translate: 0 1px;
    }

    transition:
      scale 100ms var(--ease-1),
      translate 100ms var(--ease-1);
  }
</style>
