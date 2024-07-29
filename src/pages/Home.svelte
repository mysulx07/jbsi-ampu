<script>
  // @ts-nocheck

  import { onMount } from "svelte";

  import fetchData from "../lib/fetchData";
  import Error from "../components/Error.svelte";
  import Loading from "../components/Loading.svelte";
  import { slide } from "svelte/transition";

  let { dosens } = $props();

  let laporan = $state("");
  let loading = $state(false);
  let salah = $state(false);
  let jadwals = $state([]);
  let nidns = $state([]);
  let rekap = $state([]);
  let tampilMakul = $state([false]);
  const smtr = [0, "I", "II", "III", "IV", "V", "VI", "VII", "VII"];

  loadJadwal();

  async function loadJadwal() {
    // console.log("loading jadwal");
    loading = true;
    let data = [];
    // console.log(dosens);
    dosens.forEach((row) => {
      if (row.level == 0) return false;
      rekap[String(row.nidn)] = {
        nama: row.namal,
        sks: 0,
        kelas: 0,
        makul: [],
      };
      data.push(row);
    });
    nidns = data;
    // console.log(nidns);

    data = await fetchData("GET", "/api/jadwal");
    if (!data.status) {
      laporan = "Data Jadwal Gagal Diload!!";
      salah = true;
    }
    jadwals = data.data;
    // console.log(jadwals[1]);

    jadwals.forEach((row, i) => {
      const nidn1 = row.nidn1 ?? "";
      const nidn2 = row.nidn2 ?? "";
      const sks = nidn2 == "" ? row.sks : row.sks / 2;
      const makul = {
        kodeMk: row.kodemk,
        namaMk: row.namamk,
        prodi: row.prodi,
        sks,
        kelas: row.kelas,
        semester: row.semester,
      };
      setRekap(nidn1, sks, makul);
      if (nidn2 != "") setRekap(nidn2, sks, makul);
    });

    // console.log(rekap);
    loading = false;
  }

  function setRekap(nidn, sks, makul) {
    try {
      rekap[String(nidn)].sks += sks;
      rekap[String(nidn)].kelas += 1;
      rekap[String(nidn)].makul.push(makul);
    } catch (error) {
      rekap[String(nidn)] = { sks, kelas: 1, makul: [makul] };
    }
  }

  function tampil(i) {
    event.preventDefault();

    tampilMakul[i] = !tampilMakul[i];
  }
</script>

<Loading {loading} />
<Error pesan={laporan} {salah} />
<div class="lg:w-[62%] w-full mx-auto">
  <div
    class="flex flex-row gap-2 border-b-2 border-blue-500 py-2 font-bold bg-slate-300 rounded-t-lg"
  >
    <div class="flex-initial w-[5%] text-center">#</div>
    <div class="flex-initial w-[55%] text-center">Nama Dosen</div>
    <div class="flex-initial w-[20%] text-center">SKS</div>
    <div class="flex-initial w-[20%] text-center">Kelas</div>
  </div>
  {#each nidns as nidn, i}
    <a
      href="none"
      onclick={() => tampil(i)}
      class="flex flex-row gap-2 border-b-[1px] border-blue-200 py-1 hover:bg-sky-100 hover:border-blue-500 hover:py-2 hover:font-semibold"
      class:bg-blue-400={tampilMakul[i]}
      class:font-semibold={tampilMakul[i]}
      class:py-2={tampilMakul[i]}
      class:hover:bg-sky-400={tampilMakul[i]}
    >
      <div class="flex-initial w-[5%] text-center">{i + 1}.</div>
      <div class="flex-initial w-[55%]">
        {rekap[nidn.nidn].nama}
      </div>
      <div class="flex-initial w-[20%] text-center">{rekap[nidn.nidn].sks}</div>
      <div class="flex-initial w-[20%] text-center">
        {rekap[nidn.nidn].kelas}
      </div>
    </a>
    {#if tampilMakul[i]}
      <div
        class="border-[1px] m-1 border-slate-200 p-2 rounded-md bg-sky-50"
        transition:slide
      >
        {#each rekap[nidn.nidn].makul as row, i}
          <div class="flex md:flex-row flex-col text-md border-b">
            <div class="flex-initial md:w-[5%] text-center">{i + 1})</div>
            <div class="flex-initial w-full md:w-[20%] text-center">
              {row.kodeMk}
            </div>
            <div
              class="flex-initial w-full md:w-[40%] md:text-left text-center"
            >
              {row.namaMk}
            </div>
            <div class="flex-initial w-full md:w-[20%] text-center">
              {row.sks}
            </div>
            <div class="flex-initial w-full md:w-[20%] text-center">
              {row.prodi}
              {smtr[row.semester]}
              {row.kelas}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/each}
</div>
