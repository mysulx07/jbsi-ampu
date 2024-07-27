<script>
  import { Link } from "svelte-routing";
</script>

<nav class="bg-sky-700 w-full">
  <div
    class="container mx-auto p-3 flex justify-between text-white font-semibold"
  >
    <div><Link to=".">LOGO JBSI</Link></div>
    <div class="flex gap-3">
      <Link to=".">JBSI</Link>
      <Link to="pbsi">PBSI</Link>
      <Link to="bsi">BSI</Link>
      <Link to="pbsd">PBSD</Link>
    </div>
  </div>
</nav>
