<script>
  let { loading = false } = $props();
</script>

{#if loading}
  <main
    class="w-screen h-screen fixed top-0 left-0 bg-slate-400/20 backdrop-blur flex justify-center items-center"
  >
    <div class=" text-5xl text-center">Loading</div>
  </main>
{/if}
