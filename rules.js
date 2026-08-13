// ATURAN STATUS INSPEKSI K3

const STATUS = {
    TIDAK_AMAN: 1,
    NORMAL: 2,
    SANGAT_NORMAL: 3
};


function evaluasiStatus(status) {
    const nilai = Number(status);

    switch (nilai) {

        case STATUS.TIDAK_AMAN:
            return {
                kode: 1,
                nama: "Tidak Aman",
                perluAI: true,
                prioritas: "TINGGI",
                tindakan: "Perlu pemeriksaan dan tindakan pengendalian."
            };

        case STATUS.NORMAL:
            return {
                kode: 2,
                nama: "Normal",
                perluAI: false,
                prioritas: "RENDAH",
                tindakan: "Tidak perlu analisis AI."
            };

        case STATUS.SANGAT_NORMAL:
            return {
                kode: 3,
                nama: "Sangat Normal",
                perluAI: false,
                prioritas: "RENDAH",
                tindakan: "Tidak perlu analisis AI."
            };

        default:
            return {
                kode: 0,
                nama: "Status Tidak Valid",
                perluAI: false,
                prioritas: "TIDAK DIKETAHUI",
                tindakan: "Periksa kembali status inspeksi."
            };
    }
}


export {
    STATUS,
    evaluasiStatus
};
