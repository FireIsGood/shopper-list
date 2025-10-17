<script lang="ts">
  import { page } from "$app/state";
</script>

<article>
  <section>
    <h1>{page.status}</h1>
    <p>{page.error?.message}</p>
  </section>
</article>

<style>
  article {
    display: grid;
    place-items: center;
    min-height: min(var(--size-14), 50vh);
    text-align: center;
  }

  h1,
  p {
    max-inline-size: unset;
  }
</style>
