<script lang="ts">
  import IconCaretDownBold from "phosphor-icons-svelte/IconCaretDownBold.svelte";
  import { Accordion } from "bits-ui";

  type Tutorial = {
    title: string;
    description: string[];
  };

  const tutorials: Tutorial[] = [
    {
      title: "Add an item",
      description: [
        `To add an item, click the 'Add Item' button in the bottom of the Dashboard or individual items pages.`,
      ],
    },
    {
      title: "Mark an item as Bought",
      description: [
        `To mark an item as bought from the app Dashboard page's To Buy section, click the checkmark icon to the right
of the item.`,
        `To mark an item as bought from the To Buy or All Items pages' cards, click the 'Mark Bought' button.`,
      ],
    },
    {
      title: "Mark an item as To Buy",
      description: [
        `To mark an item as To Buy, navigate to the All Items page and click the item's 'Mark to Buy' button`,
      ],
    },
    {
      title: "Edit an item's name, description, or stores",
      description: [
        `To open the Edit Item dialog from the app's Dashboard page's To Buy section, click on the pencil icon.`,
        `To open the Edit Item dialog from the app's To Buy or All Items pages, click on the 'Edit Item' button.`,
        `Inside the Edit Item dialog you can write different values in the item's name, description or stores fields and
then click the 'Save' button.`,
      ],
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
    <h3>Where are lists stored?</h3>
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
            <Accordion.Trigger class="accordion-trigger light-button">
              <h3 class="accordion-header">
                {tutorial.title} <span class="accordion-expand-icon"><IconCaretDownBold /></span>
              </h3>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content class="accordion-content">
            <div class="description">
              {#each tutorial.description as section}
                <p>{@html tutorial.description}</p>
              {/each}
            </div>
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

  .description {
    padding: var(--size-3) var(--size-5);
  }

  p {
    color: var(--text-2);
    &:not(:last-child) {
      margin-bottom: var(--size-3);
    }
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
