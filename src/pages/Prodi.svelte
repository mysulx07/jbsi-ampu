<script>
  // @ts-nocheck

  import fetchData from "../lib/fetchData";
  import Error from "../components/Error.svelte";
  import Loading from "../components/Loading.svelte";
  import { slide } from "svelte/transition";

  let { prodi } = $props();

  let laporan = $state("");
  let loading = $state(false);
  let salah = $state(false);
  let jadwals = $state([]);
  let tampilMakul = $state([false]);
  const smtr = [0, "I", "II", "III", "IV", "V", "VI", "VII", "VII"];

  loadJadwal();

  async function loadJadwal() {
    // console.log("loading jadwal");
    loading = true;

    const data = await fetchData("GET", `/api/jadwal/prodi/${prodi}`);
    if (!data.status) {
      laporan = "Data Jadwal Gagal Diload!!";
      salah = true;
    }
    jadwals = data.data;
    // jadwals.sort();
    // console.log(jadwals[1]);

    // console.log(rekap);
    loading = false;
  }
</script>

<Loading {loading} />
<Error pesan={laporan} {salah} />
<div class="lg:w-[80%] w-full mx-auto">
  <div
    class="flex flex-row gap-2 border-b-2 border-blue-500 py-2 font-bold bg-slate-300 rounded-t-lg"
  >
    <div class="flex-initial md:w-[3%] w-full text-center">#</div>
    <div class="flex-initial md:w-[15%] w-full text-center">Kode MK</div>
    <div class="flex-initial md:w-[34%] w-full text-center">Nama MK</div>
    <div class="flex-initial md:w-[3%] w-full text-center">SKS</div>
    <div class="flex-initial md:w-[15%] w-full text-center">Kelas</div>
    <div class="flex-initial md:w-[30%] w-full text-center">Pengampu</div>
  </div>
  {#each jadwals as jadwal, i}
    <div
      class="flex flex-row gap-3 border-b-[1px] border-blue-200 py-1 hover:bg-sky-100 hover:border-blue-500 hover:py-2 hover:font-semibold"
    >
      <div class="flex-initial md:w-[3%] w-full text-center">{i + 1}.</div>
      <div class="flex-initial md:w-[15%] w-full text-center">
        {jadwal.kodemk}
      </div>
      <div class="flex-initial md:w-[34%] w-full md:text-left text-center">
        {jadwal.namamk}
      </div>
      <div class="flex-initial md:w-[3%] w-full text-center">
        {jadwal.sks}
      </div>
      <div class="flex-initial md:w-[15%] w-full text-center">
        {jadwal.prodi}
        {smtr[jadwal.semester]}
        {jadwal.kelas}
      </div>
      <div class="flex-initial md:w-[30%] w-full md:text-left text-center">
        <div>{jadwal.namal1}</div>
        {#if jadwal.nidn2 != ""}
          <div>{jadwal.namal2}</div>
        {/if}
      </div>
    </div>
  {/each}
</div>
