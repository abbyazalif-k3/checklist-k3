import express from "express";

import {
    getInspections,
    saveInspection,
    deleteInspection,
    deleteAllInspections
} from "./inspections.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));


// ================================
// HEALTH CHECK
// ================================

app.get("/api/health", (req, res) => {
    res.json({
        berhasil: true,
        server: "Checklist K3 AI",
        status: "aktif"
    });
});


// ================================
// GET SEMUA INSPEKSI
// ================================

app.get("/api/inspections", async (req, res) => {
    try {

        const records = await getInspections();

        res.json({
            berhasil: true,
            jumlah: records.length,
            data: records
        });

    } catch (error) {

        res.status(500).json({
            berhasil: false,
            error: error.message
        });

    }
});


// ================================
// POST INSPEKSI BARU
// ================================

app.post("/api/inspections", async (req, res) => {
    try {

        const data = req.body;

        if (!data.inspector || !data.shift || !data.area) {

            return res.status(400).json({
                berhasil: false,
                error: "Inspector, shift, dan area wajib diisi."
            });

        }

        const record = {
            ...data,
            id: data.id || Date.now(),
            savedAt: data.savedAt || new Date().toISOString()
        };

        const saved = await saveInspection(record);

        res.status(201).json({
            berhasil: true,
            data: saved
        });

    } catch (error) {

        res.status(500).json({
            berhasil: false,
            error: error.message
        });

    }
});


// ================================
// DELETE SEMUA INSPEKSI
// ================================

app.delete("/api/inspections", async (req, res) => {
    try {

        await deleteAllInspections();

        res.json({
            berhasil: true,
            pesan: "Semua data inspeksi berhasil dihapus."
        });

    } catch (error) {

        res.status(500).json({
            berhasil: false,
            error: error.message
        });

    }
});


// ================================
// DELETE SATU INSPEKSI
// ================================

app.delete("/api/inspections/:id", async (req, res) => {
    try {

        const berhasil = await deleteInspection(req.params.id);

        if (!berhasil) {

            return res.status(404).json({
                berhasil: false,
                error: "Data inspeksi tidak ditemukan."
            });

        }

        res.json({
            berhasil: true,
            pesan: "Data inspeksi berhasil dihapus."
        });

    } catch (error) {

        res.status(500).json({
            berhasil: false,
            error: error.message
        });

    }
});


// ================================
// START SERVER
// ================================

app.listen(PORT, () => {

    console.log(
        `Checklist K3 Server berjalan di http://localhost:${PORT}`
    );

});
