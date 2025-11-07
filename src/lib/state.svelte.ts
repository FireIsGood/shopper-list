import { browser } from "$app/environment";
import { getContext, setContext } from "svelte";

const APP_CTX = "APP_CTX";

type AppData = {
  shoppingItems: ShoppingItem[];
};

export type ShoppingItem = {
  name: string;
  description: string;
  stores: string[];
  needToBuy: boolean;
};

const defaultData: AppData = {
  shoppingItems: [],
};

export function setAppState() {
  if (!browser) return defaultData;

  const localStorageState = localStorage?.getItem("appState") ?? null;
  const initialData: AppData = localStorageState
    ? Object.assign(defaultData, JSON.parse(localStorageState))
    : defaultData;
  const appState = $state(initialData);
  setContext(APP_CTX, appState);
  return appState;
}

export function getAppState(): AppData {
  return getContext<AppData>(APP_CTX) ?? defaultData;
}
