// AI CLOUD PROVIDER
// API key TIDAK boleh diletakkan di frontend.

async function analisisDenganAICloud(data) {
    return {
        berhasil: false,
        sumber: "AI Cloud",
        error: "AI Cloud belum dikonfigurasi."
    };
}

export {
    analisisDenganAICloud
};
