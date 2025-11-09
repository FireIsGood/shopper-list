<script lang="ts">
  import { Tooltip } from "bits-ui";
  import type { Snippet } from "svelte";

  type Props = {
    automaticProvider?: boolean;
    trigger: Snippet;
    triggerClass?: string;
    triggerProps?: Tooltip.TriggerProps;
    contentClass?: string;
    arrow?: boolean;
  } & Tooltip.RootProps;

  let {
    automaticProvider = true,
    open = $bindable(false),
    children,
    trigger,
    triggerClass,
    triggerProps = {},
    contentClass,
    arrow = true,
    ...restProps
  }: Props = $props();
</script>

{#snippet tooltip()}
  <Tooltip.Root delayDuration={0} disableCloseOnTriggerClick={true} bind:open {...restProps}>
    <Tooltip.Trigger class={triggerClass}>
      {@render trigger()}
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content class={contentClass}>
        {#if arrow}
          <Tooltip.Arrow />
        {/if}
        {@render children?.()}
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
{/snippet}

{#if automaticProvider}
  <Tooltip.Provider>
    {@render tooltip()}
  </Tooltip.Provider>
{:else}
  {@render tooltip()}
{/if}
