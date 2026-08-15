import { analisisDenganGemini } from "./gemini.mjs";

const hasil = await analisisDenganGemini({
    nama: "Test",
    area: "Crusher",
    item: "Safety guard",
    status: 1,
    keterangan: "Safety guard tidak terpasang"
});

console.log(JSON.stringify(hasil, null, 2));
