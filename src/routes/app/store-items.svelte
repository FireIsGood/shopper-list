<script lang="ts">
  import AddItemDialog from "./add-item-dialog.svelte";
  import StoreNameChips from "./store-name-chips.svelte";
  import IconPencilSimpleBold from "phosphor-icons-svelte/IconPencilSimpleBold.svelte";
  import IconCheckBold from "phosphor-icons-svelte/IconCheckBold.svelte";
  import IconTargetBold from "phosphor-icons-svelte/IconTargetBold.svelte";
  import type { ShoppingItem } from "$lib/state.svelte";

  type StoreItemMode = "card" | "list";

  const { items, mode = "card" }: { items: ShoppingItem[]; mode?: StoreItemMode } = $props();

  function editItem(item: ShoppingItem) {
    addItemDialog.openEditDialog(item);
  }

  function markItemBought(item: ShoppingItem) {
    item.needToBuy = false;
  }

  function markItemToBuy(item: ShoppingItem) {
    item.needToBuy = true;
  }

  let addItemDialog: ReturnType<typeof AddItemDialog>;
</script>

{#if items.length === 0}
  <p class="muted-text">No Items...</p>
{:else if mode === "list"}
  <ul>
    {#each items as item}
      <li>
        <div class="list-item">
          <div class="list-item-text">
            <span class="list-item-name">{item.name}</span>
            {#if item.description}
              <span class="muted-text">&ndash; {item.description}</span>
            {/if}
          </div>
          <div class="list-item-stores">
            {#if item.stores.length > 0}
              <StoreNameChips stores={item.stores} limit={1} />
            {/if}
          </div>
          <div class="list-item-options">
            <button class="list-edit-item-button light-button" onclick={() => editItem(item)}
              ><IconPencilSimpleBold /><span class="sr-only">edit item</span></button
            >
            <button class="list-mark-bought-item-button light-button" onclick={() => markItemBought(item)}
              ><IconCheckBold /><span class="sr-only">mark as bought</span></button
            >
          </div>
        </div>
      </li>
    {/each}
  </ul>
{:else if mode === "card"}
  <div class="card-item-list">
    {#each items as item}
      <div class="card-item" class:to-buy={item.needToBuy}>
        <p class="card-item-text">
          <span class="card-item-name">{item.name}</span>
          {#if item.description}
            <span class="card-item-description muted-text">&ndash; {item.description}</span>
          {/if}
        </p>
        <StoreNameChips stores={item.stores}>
          {#snippet fallback()}
            <p class="muted-text">No stores...</p>
          {/snippet}
        </StoreNameChips>
        <div class="card-item-options">
          <button class="card-edit-item-button outline-button" onclick={() => editItem(item)}
            ><IconPencilSimpleBold />Edit Item</button
          >
          {#if item.needToBuy}
            <button class="card-mark-bought-item-button" onclick={() => markItemBought(item)}
              ><IconCheckBold />Mark Bought</button
            >
          {:else}
            <button class="card-mark-to-buy-item-button" onclick={() => markItemToBuy(item)}
              ><IconTargetBold />Mark to Buy</button
            >
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/if}

<AddItemDialog bind:this={addItemDialog} />

<style>
  li {
    max-inline-size: unset;
  }

  .list-item {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: var(--size-2);
  }

  .list-item-text {
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--muted); /* hack to fix ellipsis color */
  }

  .list-item-name {
    color: var(--text-1);
  }

  .list-item-stores {
    display: flex;
    gap: var(--size-1);
    align-items: center;
  }

  .list-item-options {
    display: flex;
    gap: var(--size-1);
    flex-shrink: 0;
  }

  .list-edit-item-button,
  .list-mark-bought-item-button {
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

  .card-item-list {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
  }

  .card-item {
    position: relative;
    padding: var(--size-2);
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "name buttons"
      "stores buttons";
    gap: var(--size-2);

    background-color: var(--surface-1);
    border: 1px solid var(--surface-2);
    border-radius: var(--size-1);
  }

  .card-item::after {
    content: "";
    position: absolute;
    height: 100%;
    right: 0;
    aspect-ratio: 3 / 4;
    clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
    z-index: 0;
    background-color: rgb(from var(--red-container) r g b / 0.3);
    transition: background-color 200ms var(--ease-out-5);
  }
  .card-item.to-buy::after {
    background-color: rgb(from var(--blue-container) r g b / 0.3);
  }

  .card-item > * {
    z-index: 1;
  }

  .card-item-text {
    grid-area: name;
    max-width: unset;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--muted); /* hack to fix ellipsis color */
  }
  .card-item-name {
    color: var(--text-1);
  }
  .card-item-description {
    color: var(--muted);
  }

  .card-item-options {
    grid-area: buttons;
    display: flex;
    gap: var(--size-1);
  }
  .card-edit-item-button,
  .card-mark-to-buy-item-button,
  .card-mark-bought-item-button {
    height: unset;
    gap: var(--size-1);
  }

  .card-mark-to-buy-item-button {
    --button-background-color: var(--secondary);
  }

  .card-edit-item-button {
    padding-inline: var(--size-3);
  }
</style>
