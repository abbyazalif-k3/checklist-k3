import express from "express";
import { analisisDenganGemini } from "./gemini.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        berhasil: true,
        server: "Checklist K3 AI",
        status: "aktif"
    });
});

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
    console.log(`Checklist K3 AI Server berjalan di http://localhost:${PORT}`);
});
