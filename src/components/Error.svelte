<script>
  import { fade } from "svelte/transition";

  let { pesan = "error", salah = false } = $props();
</script>

{#if salah}
  <main
    transition:fade
    class="w-screen h-screen fixed top-0 left-0 bg-red-400/50 backdrop-blur flex justify-center items-center z-10"
  >
    <div class=" text-5xl text-center">
      {pesan}
    </div>
  </main>
{/if}
