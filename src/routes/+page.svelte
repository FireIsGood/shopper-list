<svelte:head>
  <title>Shopper List</title>
</svelte:head>

<article class="hero">
  <section class="hero-text">
    <h1>Shopper List</h1>
    <p>A shopping list app.</p>
  </section>
  <section class="hero-image">absolute cinema</section>
</article>
<article class="why">
  <h2>Why use Shopper list?</h2>
  <div class="reasons">
    <div>
      <h3>Track items by stores</h3>
      <p>Mark items that you buy from multiple stores.</p>
    </div>
    <div>
      <h3>Filter items by store</h3>
      <p>See what you can buy from where you are.</p>
      <p><em><small>(Feature WIP)</small></em></p>
    </div>
    <div>
      <h3>Track between devices</h3>
      <p>Set your list from your computer and check off items as you shop.</p>
      <p><em><small>(Feature WIP)</small></em></p>
    </div>
  </div>
</article>

<style>
  .hero {
    min-height: var(--size-15);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .hero-text {
    align-self: center;
    display: grid;
    gap: 1rem;
    padding-inline: var(--size-2);
  }

  .hero-image {
    display: grid;
    place-items: center;
    background: var(--gradient-7);
    text-align: center;
    color: var(--gray-1);
    font-size: var(--size-4);
    mask: conic-gradient(from 45deg at left, #0000, #000 1deg 89deg, #0000 90deg) 50%/100% 2rem;
    border-top-right-radius: var(--size-1);
    border-bottom-right-radius: var(--size-1);
  }

  @media (width < 480px) {
    .hero {
      grid-template-columns: auto;
    }
    .hero-image {
      display: none;
    }
  }

  .why {
    border-top: 2px solid var(--surface-4);
    padding-top: var(--size-5);
  }

  .reasons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--size-content-1), 1fr));
    gap: var(--size-4);
    padding: var(--size-3);
    text-align: center;
  }

  h2 {
    text-align: center;
  }
  h3 {
    font-size: var(--font-size-3);
    font-weight: var(--font-weight-6);
  }
  p {
    color: var(--text-2);
  }
</style>
