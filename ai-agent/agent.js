// AI AGENT - CHECKLIST K3
// Versi awal: mengatur alur analisis temuan inspeksi

function cekStatus(status) {
    const nilai = Number(status);

    if (nilai === 1) {
        return {
            kode: 1,
            status: "Tidak Aman",
            perluAnalisisAI: true
        };
    }

    if (nilai === 2) {
        return {
            kode: 2,
            status: "Normal",
            perluAnalisisAI: false
        };
    }

    if (nilai === 3) {
        return {
            kode: 3,
            status: "Sangat Normal",
            perluAnalisisAI: false
        };
    }

    return {
        kode: 0,
        status: "Status tidak valid",
        perluAnalisisAI: false
    };
}


// Menyiapkan data yang akan dianalisis AI
function buatPermintaanAI(data) {
    const hasil = cekStatus(data.status);

    // AI hanya bekerja jika ditemukan status 1
    if (!hasil.perluAnalisisAI) {
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

    // Tidak ada status 1 → tidak perlu AI
    if (!permintaan) {
        return {
            berhasil: true,
            perluAI: false,
            pesan: "Tidak ada temuan tidak aman."
        };
    }

    // Untuk sementara kita hanya menyiapkan data.
    // AI Lokal dan AI Cloud akan dipasang pada tahap berikutnya.

    return {
        berhasil: true,
        perluAI: true,
        data: permintaan
    };
}


// Export untuk digunakan oleh aplikasi
export {
    cekStatus,
    buatPermintaanAI,
    jalankanAgent
};
