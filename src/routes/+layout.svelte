<script>
  import "$lib/css/app.css";
</script>

<svelte:head>
  <title>CS719 - Pokémon Battle Simulator</title>
</svelte:head>

<!-- TODO Your code here for page header -->

<div class="container">
  <slot />
</div>

<style>
  .container {
    width: 1200px;
    margin: 0 auto;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }
</style>
