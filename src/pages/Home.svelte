<script>
  // @ts-nocheck

  import { onMount } from "svelte";

  import fetchData from "../lib/fetchData";
  import Error from "../components/Error.svelte";
  import Loading from "../components/Loading.svelte";

  let { dosens } = $props();

  let laporan = $state("");
  let loading = $state(false);
  let salah = $state(false);
  let jadwals = $state([]);
  let nidns = $state([]);
  let rekap = $state([]);

  console.log("jalan Home");

  loadJadwal();

  async function loadJadwal() {
    console.log("loading jadwal");
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
      };
      setRekap(nidn1, sks, makul);
      if (nidn2 != "") setRekap(nidn2, sks, makul);
    });

    console.log("selesai loading dan proses jadwal");
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
</script>

<Loading {loading} />
<Error pesan={laporan} {salah} />
<div>
  {#each nidns as nidn}
    <div>
      {nidn.namal} SKS = {rekap[nidn.nidn].sks} kelas = {rekap[nidn.nidn].kelas}
    </div>
  {/each}
</div>
