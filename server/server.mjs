import express from "express";
import {
    getInspections,
    saveInspection,
    deleteInspection
} from "./inspections.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("."));
app.get("/api/health", (req, res) => {
    res.json({
        berhasil: true,
        server: "Checklist K3 AI",
        status: "aktif"
    });
});

// GET semua inspeksi
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

// POST inspeksi baru
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

// DELETE inspeksi
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

// Analisis AI
app.post("/api/analyze", async (req, res) => {
    try {
        const data = req.body;

        if (Number(data.status) !== 1) {
            return res.json({
                berhasil: true,
                perluAI: false,
                sumber: "Agent",
                hasil: "Tidak ditemukan kondisi tidak aman."
            });
        }

        const { analisisDenganGemini } = await import("./gemini.mjs");
        const hasil = await analisisDenganGemini(data);

        res.json(hasil);
    } catch (error) {
        res.status(500).json({
            berhasil: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(
        `Checklist K3 AI Server berjalan di http://localhost:${PORT}`
    );
});
