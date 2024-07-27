<script>
  // @ts-ignore
  import { onMount } from "svelte";
  import { Route, Router } from "svelte-routing";
  import fetchData from "./lib/fetchData";
  import Home from "./pages/Home.svelte";
  import Nav from "./components/Nav.svelte";
  import Error from "./components/Error.svelte";
  import Loading from "./components/Loading.svelte";

  let laporan = $state("error");
  let salah = $state(false);
  console.log("APP");

  //   onMount(async () => {

  //   });
  // @ts-ignore
  //   dosens = loadDosen();

  async function loadDosen() {
    console.log("load dosen");
    const data = await fetchData("GET", "/api/dosen");
    // console.log(data);
    if (!data.status) {
      laporan = "data dosen gagal diload";
      salah = true;
      return;
    }
    return data.data;

    // @ts-ignore
    console.log("selesai load dosen");
  }
</script>

<Error pesan={laporan} {salah} />

<Router basepath="/ampu">
  <Nav />
  <main class="container mx-auto p-2 mb-2">
    {#await loadDosen()}
      <Loading></Loading>
    {:then dosens}
      <Route path="/"><Home {dosens} /></Route>
      <Route path="/pbsi">PBSI</Route>
      <Route path="/bsi">BSI</Route>
      <Route path="/pbsd">BSI</Route>
    {/await}
  </main>
</Router>
