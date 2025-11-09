<script lang="ts">
  import { getAppState, shoppingItemsEqual, type ShoppingItem } from "$lib/state.svelte";
  import { Dialog } from "bits-ui";
  import StoreNameChips from "./store-name-chips.svelte";
  import IconXBold from "phosphor-icons-svelte/IconXBold.svelte";

  type DialogMode = "add" | "edit";

  const app = getAppState();

  export function openAddDialog() {
    mode = "add";
    resetDialog();
    itemDialogOpen = true;
  }

  export function openEditDialog(item: ShoppingItem) {
    mode = "edit";
    resetDialog();
    initialData = item;
    name = item.name;
    description = item.description;
    stores = item.stores.join(",");
    itemDialogOpen = true;
  }

  function handleDelete(e: Event) {
    if (mode !== "edit") return;
    e.preventDefault();

    // Confirm delete
    confirmDeleteDialogOpen = true;
  }

  function handleClose(e: Event) {
    // Confirm close
    const formEmpty = !(name || description || stores);
    const initialDataEqual = initialData && shoppingItemsEqual(initialData, { name, description, stores: storesList });
    if (formEmpty || (mode === "edit" && initialDataEqual)) return;

    e.preventDefault();
    confirmCloseDialogOpen = true;
  }

  function handleOpenChange(open: boolean) {
    if (open) return;

    // Manually confirm form entries lol
    if (name === "") return;

    if (mode === "add") {
      app.addItem({
        name,
        description,
        stores: storesList,
      });
    }

    if (mode === "edit") {
      if (!initialData) return;
      app.editItem(initialData.id, {
        name,
        description,
        stores: storesList,
      });
    }
  }

  // When we confirm to close
  function handleConfirmClose() {
    resetDialog();
    itemDialogOpen = false;
  }

  // When we confirm to delete
  function handleConfirmDelete() {
    if (!initialData) return;
    app.deleteItem(initialData.id);
    resetDialog();
    itemDialogOpen = false;
  }

  function resetDialog() {
    name = "";
    description = "";
    stores = "";
  }

  // Main dialog state
  let itemDialogOpen = $state(false);
  let mode: DialogMode = $state("add");
  let initialData: ShoppingItem | undefined;

  let name = $state("");
  let description = $state("");
  let stores = $state("");
  const storesList = $derived(
    stores
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s)
  );

  const itemValid = $derived(name !== "");

  // Regular close confirmation dialog state
  let confirmCloseDialogOpen = $state(false);

  // Delete confirmation dialog state
  let confirmDeleteDialogOpen = $state(false);
</script>

<Dialog.Root bind:open={itemDialogOpen} onOpenChange={handleOpenChange}>
  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content class="dialog-content" onInteractOutside={handleClose} onEscapeKeydown={handleClose}>
      <Dialog.Title class="dialog-title">{mode === "add" ? "Add Item" : "Edit Item"}</Dialog.Title>
      <hr />
      <section>
        <div class="form-item">
          <label for="name">Name*</label>
          <input id="name" placeholder="Carrots" bind:value={name} required />
        </div>
        <div class="form-item">
          <label for="description">Description</label>
          <textarea id="description" placeholder="Orange and large" bind:value={description} rows="3"></textarea>
        </div>
        <div class="form-item">
          <label for="stores">Stores</label>
          <input id="stores" placeholder="Amazon, Ebay, 7-Eleven" bind:value={stores} />
        </div>
        <StoreNameChips stores={storesList}
          >{#snippet fallback()}<em class="muted-text">No stores added</em>{/snippet}</StoreNameChips
        >
      </section>
      <div class="dialog-actions">
        {#if mode === "edit"}
          <Dialog.Close class="dialog-delete-button danger-button" onkeydown={handleDelete} onclick={handleDelete}
            >Delete</Dialog.Close
          >
        {/if}
        <Dialog.Close class="dialog-save-button" disabled={!itemValid}>Save</Dialog.Close>
      </div>
      <Dialog.Close class="dialog-close-button light-button" onkeydown={handleClose} onclick={handleClose}>
        <IconXBold />
        <span class="sr-only">Close</span>
      </Dialog.Close>
      <Dialog.Root bind:open={confirmCloseDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay class="dialog-overlay" />
          <Dialog.Content class="dialog-content" onInteractOutside={handleClose}>
            <Dialog.Title class="dialog-title">Unsaved changes</Dialog.Title>
            <hr />
            <Dialog.Description class="dialog-description">
              The item has not been saved. Are you sure you want to discard your changes?
            </Dialog.Description>
            <div class="dialog-actions">
              <Dialog.Close class="dialog-cancel-button outline-button">Cancel</Dialog.Close>
              <Dialog.Close class="dialog-confirm-button" onkeydown={handleConfirmClose} onclick={handleConfirmClose}
                >Confirm</Dialog.Close
              >
            </div>
            <Dialog.Close class="dialog-close-button light-button">
              <IconXBold />
              <span class="sr-only">cancel</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Dialog.Root bind:open={confirmDeleteDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay class="dialog-overlay" />
          <Dialog.Content class="dialog-content" onInteractOutside={handleClose}>
            <Dialog.Title class="dialog-title">Deleting item</Dialog.Title>
            <hr />
            <Dialog.Description class="dialog-description">
              The item will be deleted from your shopping list. This action cannot be reversed.
            </Dialog.Description>
            <div class="dialog-actions">
              <Dialog.Close class="dialog-cancel-button outline-button">Cancel</Dialog.Close>
              <Dialog.Close
                class="dialog-confirm-button danger-button"
                onkeydown={handleConfirmDelete}
                onclick={handleConfirmDelete}>Delete item</Dialog.Close
              >
            </div>
            <Dialog.Close class="dialog-close-button light-button">
              <IconXBold />
              <span class="sr-only">cancel</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global(.dialog-overlay) {
    background-color: rgb(from var(--gray-11) r g b / 0.8);
    position: fixed;
    inset: 0;
    z-index: 50;

    &[data-state="open"] {
      animation: fade-in 100ms var(--ease-1);
    }

    &[data-state="closed"] {
      animation: fade-out 100ms var(--ease-1);
    }
  }

  :global(.dialog-content) {
    position: fixed;
    inset: auto;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    padding: var(--size-3);
    background-color: var(--surface-1);
    border-radius: var(--size-2);
    width: calc(100% - 2rem);
    max-width: 490px;
    z-index: 50;

    &[data-state="open"] {
      animation: scale-up-in 100ms var(--ease-1);
    }
    &[data-state="open"][data-nested] {
      animation: scale-down-in 100ms var(--ease-1);
    }

    &[data-state="closed"] {
      animation: scale-out 100ms var(--ease-1);
    }
  }

  :global(.dialog-title) {
    font-size: var(--font-size-5);
    font-weight: var(--font-weight-6);
    line-height: 1;
  }

  :global(.dialog-actions) {
    display: flex;
    justify-content: end;
    gap: var(--size-3);
    margin-top: var(--size-6);
  }

  :global(.dialog-close-button) {
    position: absolute;
    padding: var(--size-2);
    right: var(--size-2);
    top: var(--size-2);
    font-size: var(--size-4);
  }

  .form-item {
    margin-bottom: var(--size-3);
  }

  .store-preview-list {
    display: flex;
    gap: var(--size-2);
  }

  .store-preview {
    display: inline-block;
    background-color: var(--primary);
    padding-inline: var(--size-2);
    border-radius: var(--size-1);
  }

  hr {
    margin-block: var(--size-3);
    margin-inline: calc(-1 * var(--size-3));
  }

  label {
    display: block;
    color: var(--text-2);
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes scale-up-in {
    0% {
      opacity: 0;
      scale: 0.95;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes scale-down-in {
    0% {
      opacity: 0;
      scale: 1.05;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes scale-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      scale: 0.9;
    }
  }
</style>
