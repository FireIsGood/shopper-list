<script lang="ts">
  import type { ShoppingItem } from "$lib/state.svelte";
  import StoreItems from "./store-items.svelte";
  import AddItemDialog from "./add-item-dialog.svelte";
  import IconPlusBold from "phosphor-icons-svelte/IconPlusBold.svelte";

  type Props = {
    items: ShoppingItem[];
  };

  const { items }: Props = $props();

  // svelte-ignore non_reactive_update
  let addItemDialog: ReturnType<typeof AddItemDialog>;
</script>

<section class="store-item-card-list">
  <StoreItems {items} mode="card" />
  <button class="add-item-button" onclick={addItemDialog.openAddDialog}><IconPlusBold /> Add item</button>
  <AddItemDialog bind:this={addItemDialog} />
</section>

<style>
  .store-item-card-list {
    position: relative;

    /* button offset */
    padding-bottom: calc(var(--size-3) + var(--size-8));
  }

  .add-item-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
