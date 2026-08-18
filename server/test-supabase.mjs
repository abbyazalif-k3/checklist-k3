import { supabase } from "./supabase.mjs";

async function test() {
    console.log("Menguji koneksi Supabase...");

    const { data, error } = await supabase
        .from("inspeksi")
        .select("id, inspector, shift, area, code, datetime, items, savedAt")
        .limit(1);

    if (error) {
        console.error("Gagal konek Supabase:");
        console.error(error);
        process.exit(1);
    }

    console.log("=================================");
    console.log("SUPABASE BERHASIL TERHUBUNG");
    console.log("=================================");
    console.log("Data:", data);
}

test();
