import { supabase } from "./supabase.mjs";

export async function getInspections() {
    const { data, error } = await supabase
        .from("inspeksi")
        .select("*")
        .order("savedAt", { ascending: false });

    if (error) {
        throw error;
    }

    return data;
}

export async function saveInspection(record) {
    const row = {
        id: record.id || Date.now(),
        inspector: record.inspector,
        shift: record.shift,
        area: record.area,
        code: record.code || null,
        datetime: record.datetime || null,
        items: record.items || [],
        savedAt: record.savedAt || new Date().toISOString()
    };

    const { data, error } = await supabase
        .from("inspeksi")
        .insert(row)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function deleteInspection(id) {
    const { error } = await supabase
        .from("inspeksi")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }

    return true;
}
export async function deleteAllInspections() {
    const { error } = await supabase
        .from("inspeksi")
        .delete()
        .not("id", "is", null);

    if (error) {
        throw error;
    }

    return true;
}
