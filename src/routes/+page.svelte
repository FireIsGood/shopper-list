<article class="hero">
  <section class="hero-text">
    <h1>Shopper List</h1>
    <p>A shopping list app.</p>
  </section>
  <section class="hero-image">absolute cinema</section>
</article>
<article>
  <h2>Simple, like really simple.</h2>
  <p>I'm not even sure how to explain how simple this app is.</p>
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
</style>
