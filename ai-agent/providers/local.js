// AI LOKAL PROVIDER
// Koneksi ke Ollama akan digunakan di tahap berikutnya.

const LOCAL_AI_URL = "http://localhost:11434/api/generate";

async function analisisDenganAIlocal(data) {
    try {
        const prompt = `
Anda adalah AI Assistant untuk inspeksi keselamatan kerja tambang.

Analisis temuan berikut:

Nama pemeriksa: ${data.nama || "-"}
Area: ${data.area || "-"}
Item pemeriksaan: ${data.item || "-"}
Status: ${data.status || 1}
Keterangan: ${data.keterangan || "-"}

Berikan hasil dalam format:

BAHAYA:
RISIKO:
PENYEBAB:
TINDAKAN:
PRIORITAS:

Berikan rekomendasi hanya berdasarkan informasi yang tersedia.
Jika informasi tidak cukup, nyatakan bahwa informasi perlu dilengkapi.
`;

        const response = await fetch(LOCAL_AI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.2",
                prompt: prompt,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error("AI Lokal tidak dapat dihubungi.");
        }

        const result = await response.json();

        return {
            berhasil: true,
            sumber: "AI Lokal",
            hasil: result.response || ""
        };

    } catch (error) {

        return {
            berhasil: false,
            sumber: "AI Lokal",
            error: error.message
        };
    }
}

export {
    analisisDenganAIlocal
};
