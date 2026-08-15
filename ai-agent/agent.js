import { evaluasiStatus } from "../rules.js";

/*
 * AI AGENT — CHECKLIST K3
 *
 * Status:
 * 1 = Tidak Aman → AI aktif
 * 2 = Normal → AI tidak aktif
 * 3 = Sangat Normal → AI tidak aktif
 */

// Cek status menggunakan aturan utama rules.js
function cekStatus(status) {
    return evaluasiStatus(status);
}


// Menyiapkan data temuan untuk AI
function buatPermintaanAI(data) {
    const hasil = cekStatus(data.status);

    // AI hanya bekerja untuk status 1
    if (!hasil.perluAI) {
        return null;
    }

    return {
        nama: data.nama || "",
        area: data.area || "",
        item: data.item || "",
        status: 1,
        statusText: "Tidak Aman",
        keterangan: data.keterangan || "",
        foto: data.foto || null
    };
}


// Fungsi utama AI Agent
async function jalankanAgent(data) {
    const permintaan = buatPermintaanAI(data);

    // Tidak ada status 1
    if (!permintaan) {
        return {
            berhasil: true,
            perluAI: false,
            pesan: "Tidak ada temuan tidak aman."
        };
    }

    return {
        berhasil: true,
        perluAI: true,
        data: permintaan
    };
}


export {
    cekStatus,
    buatPermintaanAI,
    jalankanAgent
};
