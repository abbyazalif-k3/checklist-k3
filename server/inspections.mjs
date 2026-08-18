import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "inspections.json");

async function readInspections() {
    try {
        const data = await fs.readFile(DATA_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
}

async function writeInspections(records) {
    await fs.writeFile(
        DATA_FILE,
        JSON.stringify(records, null, 2),
        "utf8"
    );
}

export async function getInspections() {
    return await readInspections();
}

export async function saveInspection(record) {
    const records = await readInspections();

    records.unshift(record);

    await writeInspections(records);

    return record;
}

export async function deleteInspection(id) {
    const records = await readInspections();

    const filtered = records.filter(
        record => String(record.id) !== String(id)
    );

    await writeInspections(filtered);

    return filtered.length !== records.length;
}
