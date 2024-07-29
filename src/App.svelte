<script>
  // @ts-ignore
  import { Route, Router } from "svelte-routing";
  import fetchData from "./lib/fetchData";
  import Home from "./pages/Home.svelte";
  import Nav from "./components/Nav.svelte";
  import Error from "./components/Error.svelte";
  import Loading from "./components/Loading.svelte";
  import Prodi from "./pages/Prodi.svelte";

  let laporan = $state("error");
  let salah = $state(false);
  // console.log("APP");

  //   onMount(async () => {

  //   });
  // @ts-ignore
  //   dosens = loadDosen();

  async function loadDosen() {
    // console.log("load dosen");
    const data = await fetchData("GET", "/api/dosen");
    // console.log(data);
    if (!data.status) {
      laporan = "data dosen gagal diload";
      salah = true;
      return;
    }
    return data.data;
  }
</script>

<Error pesan={laporan} {salah} />
{#await loadDosen()}
  <Loading></Loading>
{:then dosens}
  <Router basepath="/ampu">
    <Nav />
    <main class="container mx-auto p-2 mb-2">
      <Route path="/"><Home {dosens} /></Route>
      <Route path="/pbsi"><Prodi prodi="PBSI" /></Route>
      <Route path="/bsi"><Prodi prodi="BSI" /></Route>
      <Route path="/pbsd"><Prodi prodi="PBSD" /></Route>
    </main>
  </Router>
{/await}
