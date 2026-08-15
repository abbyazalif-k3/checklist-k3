import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum diset.");
}

const ai = new GoogleGenAI({
    apiKey
});

async function analisisDenganGemini(data) {

    if (Number(data.status) !== 1) {
        return {
            berhasil: true,
            perluAI: false,
            hasil: "Tidak ditemukan kondisi tidak aman."
        };
    }

    const prompt = `
Anda adalah AI Assistant untuk inspeksi keselamatan kerja tambang.

Analisis TEMUAN TIDAK AMAN berikut.

Nama pemeriksa: ${data.nama || "-"}
Area: ${data.area || "-"}
Item pemeriksaan: ${data.item || "-"}
Status: 1 - Tidak Aman
Keterangan: ${data.keterangan || "-"}

Berikan analisis dalam format:

BAHAYA:
RISIKO:
PENYEBAB:
TINDAKAN:
PRIORITAS:

Prioritas harus berupa:
TINGGI
SEDANG
RENDAH

Berikan rekomendasi berdasarkan informasi yang tersedia.
Jangan mengarang fakta yang tidak diberikan.
Jika informasi tidak cukup, nyatakan informasi yang perlu dilengkapi.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt
        });

        return {
            berhasil: true,
            perluAI: true,
            sumber: "Gemini",
            hasil: response.text || ""
        };

    } catch (error) {
        return {
            berhasil: false,
            perluAI: true,
            sumber: "Gemini",
            error: error.message
        };
    }
}

export {
    analisisDenganGemini
};
