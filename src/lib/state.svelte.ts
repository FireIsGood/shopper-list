import { browser } from "$app/environment";
import { getContext, setContext } from "svelte";

export type ShoppingItem = {
  id: string;
  name: string;
  description: string;
  stores: string[];
  needToBuy: boolean;
};

// Used to create a shopping item, an external interface
type ShoppingItemInitial = {
  name: string;
  description: string;
  stores: string[];
};

// JSON type saved
type StoredState = {
  shoppingItems: ShoppingItem[];
};

class AppState {
  private shoppingItems = $state<ShoppingItem[]>([]);

  constructor() {
    if (!browser) return;
    const localStorageState = localStorage?.getItem("appState") ?? null;

    if (localStorageState) {
      const initialData: StoredState = JSON.parse(localStorageState);
      this.shoppingItems = initialData.shoppingItems ?? [];
    }

    $effect(() => {
      this.saveToLocalStorage();
    });
  }

  public addItem(item: ShoppingItemInitial) {
    const newItem = this.createItem(item);
    this.shoppingItems.push(newItem);
  }

  public editItem(id: string, item: ShoppingItemInitial) {
    const itemIndex = this.shoppingItems.findIndex((i) => i.id === id);
    if (itemIndex === -1) return;

    const newItem = this.createItem(item);
    this.shoppingItems[itemIndex] = newItem;
  }

  public deleteItem(id: string) {
    this.shoppingItems = this.shoppingItems.filter((i) => i.id !== id);
  }

  public getItems(): ShoppingItem[] {
    return this.shoppingItems.toSorted((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }

  private createItem(initialItem: ShoppingItemInitial): ShoppingItem {
    return {
      id: crypto.randomUUID(),
      name: initialItem.name,
      description: initialItem.description,
      stores: initialItem.stores.map((s) => s.trim()),
      needToBuy: true,
    };
  }

  private saveToLocalStorage() {
    const flatData: StoredState = { shoppingItems: this.shoppingItems };
    localStorage.setItem("appState", JSON.stringify(flatData));
  }
}

export function shoppingItemsEqual(a: ShoppingItemInitial, b: ShoppingItemInitial): boolean {
  return a.name === b.name && a.description === b.description && a.stores.join(",") === b.stores.join(",");
}

const APP_CTX = Symbol("APP_CTX");

export function setAppState() {
  return setContext(APP_CTX, new AppState());
}

export function getAppState() {
  return getContext<ReturnType<typeof setAppState>>(APP_CTX);
}
