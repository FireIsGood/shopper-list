<script lang="ts">
  import { Jumper } from "svelte-loading-spinners";
</script>

<div class="loader">
  <Jumper color="var(--muted)" />
  <p class="muted-text"><em>Loading...</em></p>
</div>

<style>
  .loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--size-2);
  }
</style>
