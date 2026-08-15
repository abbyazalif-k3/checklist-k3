import { cekStatus } from "./agent.js";
import { analisisDenganAIlocal } from "./providers/local.js";
import { analisisDenganAICloud } from "./penyedia/cloud.js";

/*
 * ROUTER AI AGENT
 *
 * Status:
 * 1 = Tidak Aman
 * 2 = Normal
 * 3 = Sangat Normal
 *
 * AI hanya bekerja jika terdapat status 1.
 */

async function jalankanRouter(data) {

    // Periksa status inspeksi
    const status = cekStatus(data.status);

    // Status 2 atau 3 → tidak perlu AI
    if (!status.perluAI) {
        return {
            berhasil: true,
            perluAI: false,
            sumber: "Agent",
            hasil: "Tidak ditemukan kondisi tidak aman."
        };
    }

    // Status 1 → coba AI Lokal
    const lokal = await analisisDenganAIlocal(data);

    if (lokal.berhasil) {
        return {
            berhasil: true,
            perluAI: true,
            sumber: "AI Lokal",
            hasil: lokal.hasil
        };
    }

    // AI Lokal gagal → coba AI Cloud
    const cloud = await analisisDenganAICloud(data);

    if (cloud.berhasil) {
        return {
            berhasil: true,
            perluAI: true,
            sumber: "AI Cloud",
            hasil: cloud.hasil
        };
    }

    // Semua AI gagal
    return {
        berhasil: false,
        perluAI: true,
        sumber: "Agent",
        hasil: null,
        error: "AI Lokal dan AI Cloud tidak dapat digunakan."
    };
}

export {
    jalankanRouter
};
