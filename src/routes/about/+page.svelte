<script lang="ts">
  import IconCaretDownBold from "phosphor-icons-svelte/IconCaretDownBold.svelte";
  import { Accordion } from "bits-ui";

  type Tutorial = {
    title: string;
    description: string;
  };

  const tutorials: Tutorial[] = [
    {
      title: "Add an item",
      description: "hi",
    },
    {
      title: "Mark an item as bought",
      description: "hi",
    },
  ];
</script>

<svelte:head>
  <title>Shopper List &mdash; About</title>
</svelte:head>

<article>
  <section>
    <h2>Frequently Asked Questions</h2>
    <h3>What is Shopper List?</h3>
    <p>Shopper List is an app to track groceries you want to buy at various stores across your devices.</p>
    <h3>How are lists stored?</h3>
    <p>
      Currently lists are stored on device in your browser's Local Storage, however there are plans to allow for
      cross-device data storage via accounts. This is not implemented yet.
    </p>
  </section>
  <hr />
  <section>
    <h2>How do I...</h2>
    <Accordion.Root type="multiple">
      {#each tutorials as tutorial}
        <Accordion.Item class="accordion-item">
          <Accordion.Header>
            <Accordion.Trigger class="accordion-trigger invisible-button">
              <h3 class="accordion-header">
                {tutorial.title} <span class="accordion-expand-icon"><IconCaretDownBold /></span>
              </h3>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="accordion-content">
            <p>{tutorial.description}</p>
          </Accordion.Content>
        </Accordion.Item>
      {/each}
    </Accordion.Root>
  </section>
</article>

<style>
  :global(.accordion-item:not(:last-of-type)) {
    border-bottom: 2px dashed var(--surface-3);
  }

  :global(.accordion-trigger) {
    width: 100%;
    background-color: unset;
    padding-block: var(--size-3);
  }

  .accordion-header {
    display: flex;
    max-inline-size: unset;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 0;
  }

  .accordion-expand-icon {
    padding-inline: var(--size-2);
  }

  :global(.accordion-content) {
    overflow: hidden;

    &[data-state="open"] {
      animation: accordion-open 100ms var(--ease-1);
    }

    &[data-state="closed"] {
      animation: accordion-close 100ms var(--ease-1);
    }
  }

  p {
    margin-bottom: var(--size-3);
    color: var(--text-2);
  }

  @keyframes accordion-open {
    0% {
      height: 0;
    }
    100% {
      height: var(--bits-accordion-content-height);
    }
  }

  @keyframes accordion-close {
    0% {
      height: var(--bits-accordion-content-height);
    }
    100% {
      height: 0;
    }
  }
</style>
