import { Product } from "@/interfaces/interfaces";

/**
 * Cruza productos por campaña, asset group y custom label.
 * 
 * - Filtra productos de campaña por asset group.
 * - Les aplica los labels.
 * - Agrega productos faltantes con métricas = 0.
 * - Si hay IDs repetidos se suman las métricas.
 */
export function mergeProducts(
  productsCampaign: Product[],
  productsAssetGroup: string[],
  productsByLabel: { itemId: string; title: string }[]
): Product[] {
  const debug = true;

  if (!Array.isArray(productsCampaign)) return [];
  if (!Array.isArray(productsAssetGroup)) return [];
  if (!Array.isArray(productsByLabel)) return [];

  // Para lookup rápido del label
  const labelMap = new Map(
    productsByLabel.map((p) => [String(p.itemId), p.title])
  );

  // Set de asset group
  const assetGroupSet = new Set(productsAssetGroup.map(String));

  // 1️⃣ Productos de campaña filtrados por asset group
  const filteredCampaignProducts = productsCampaign
    .filter((p) => assetGroupSet.has(String(p.prod_id)))
    .map((p) => ({
      ...p,
      prod_name: labelMap.get(String(p.prod_id)) ?? p.prod_name,
    }));

  // 2️⃣ Crear productos faltantes
  const existingCampaignIds = new Set(
    filteredCampaignProducts.map((p) => String(p.prod_id))
  );

  const missingProducts = Array.from(assetGroupSet)
    .filter((id) => !existingCampaignIds.has(id))
    .map((id) => {
      const labelTitle = labelMap.get(id);

      return {
        camp_id: "",
        camp_name: "",
        camp_type: "",
        prod_id: id,
        prod_name: labelTitle ?? id,
        prod_imprs: 0,
        prod_clcks: 0,
        prod_ctr: 0,
        prod_convs: 0,
        prod_value: 0,
        prod_costs: 0,
      } as Product;
    });

  // 3️⃣ Unir todo
  const allProducts = [...filteredCampaignProducts, ...missingProducts];

  // 4️⃣ Agrupar por prod_id y sumar métricas
  const grouped = new Map<string, Product>();

  for (const p of allProducts) {
    const id = String(p.prod_id);

    if (!grouped.has(id)) {
      grouped.set(id, { ...p });
    } else {
      const existing = grouped.get(id)!;
      console.log('duplicadte:', id);
      console.log('existing name:', existing.prod_name, 'new name:', p.prod_name);

      grouped.set(id, {
        ...existing,
        prod_name: existing.prod_name || p.prod_name, // mantiene label si existía
        prod_imprs: existing.prod_imprs + p.prod_imprs,
        prod_clcks: existing.prod_clcks + p.prod_clcks,
        prod_ctr: (existing.prod_clcks + p.prod_clcks) / (existing.prod_imprs + p.prod_imprs),
        prod_convs: existing.prod_convs + p.prod_convs,
        prod_value: existing.prod_value + p.prod_value,
        prod_costs: existing.prod_costs + p.prod_costs,
      });
    }
  }

  return Array.from(grouped.values());
}



/**
 * Devuelve los elementos duplicados agrupados por itemId.
 * 
 * @param items Array de objetos que tengan itemId
 */
export function findDuplicatesByItemId(items: { itemId: string; [k: string]: any }[] = []) {
  const map = new Map<string, any[]>();

  // Agrupar por itemId
  for (const item of items) {
    const id = String(item.itemId);
    if (!map.has(id)) {
      map.set(id, [item]);
    } else {
      map.get(id)!.push(item);
    }
  }

  // Filtrar solo los que tienen más de 1
  const duplicates: { itemId: string; entries: any[] }[] = [];

  for (const [itemId, entries] of map) {
    if (entries.length > 1) {
      duplicates.push({ itemId, entries });
    }
  }

  return duplicates;
}