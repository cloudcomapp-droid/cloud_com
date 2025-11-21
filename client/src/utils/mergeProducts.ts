import { Product } from "@/interfaces/interfaces";

export function mergeProducts(
  productsCampaign: Product[],
  productsAssetGroup: string[],
  productsByLabel: { itemId: string; title: string }[]
): Product[] {
  const debug = true;

  if (!Array.isArray(productsCampaign)) return [];
  if (!Array.isArray(productsAssetGroup)) return [];
  if (!Array.isArray(productsByLabel)) return [];

  // IDs válidos (solo los que tienen label)
  const validIds = new Set(productsByLabel.map((p) => String(p.itemId)));

  // Label map
  const labelMap = new Map(
    productsByLabel.map((p) => [String(p.itemId), p.title])
  );

  // Filtramos asset group por IDs válidos
  const assetGroupSet = new Set(
    productsAssetGroup.map(String).filter((id) => validIds.has(id))
  );

  // 1️⃣ Productos de campaña filtrados por asset group Y por IDs válidos
  const filteredCampaignProducts = productsCampaign
    .filter((p) => assetGroupSet.has(String(p.prod_id)))
    .filter((p) => validIds.has(String(p.prod_id)))
    .map((p) => ({
      ...p,
      prod_name: labelMap.get(String(p.prod_id)) ?? p.prod_name,
      prod_roas: p.prod_costs ? p.prod_value / p.prod_costs : 0,
    }));

  // 2️⃣ Crear productos faltantes (pero solo si están en validIds)
  const existingCampaignIds = new Set(
    filteredCampaignProducts.map((p) => String(p.prod_id))
  );

  const missingProducts = Array.from(assetGroupSet)
    .filter((id) => !existingCampaignIds.has(id))
    .map((id) => {
      const labelTitle = labelMap.get(id);
      const Campaign = productsCampaign[0]?.camp_id ?? "";
      const CampaignName = productsCampaign[0]?.camp_name ?? "";

      return {
        camp_id: Campaign,
        camp_name: CampaignName,
        camp_type: "",
        prod_id: id,
        prod_name: labelTitle ?? id,
        prod_imprs: 0,
        prod_clcks: 0,
        prod_ctr: 0,
        prod_convs: 0,
        prod_value: 0,
        prod_costs: 0,
        prod_roas: 0,
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

      if (debug) {
        console.log("duplicate:", id);
        console.log(
          "existing name:",
          existing.prod_name,
          "new name:",
          p.prod_name
        );
      }

      grouped.set(id, {
        ...existing,
        prod_name: existing.prod_name || p.prod_name,
        prod_imprs: existing.prod_imprs + p.prod_imprs,
        prod_clcks: existing.prod_clcks + p.prod_clcks,
        prod_ctr:
          (existing.prod_clcks + p.prod_clcks) /
          (existing.prod_imprs + p.prod_imprs || 1),
        prod_convs: existing.prod_convs + p.prod_convs,
        prod_value: existing.prod_value + p.prod_value,
        prod_costs: existing.prod_costs + p.prod_costs,
        prod_roas:
          (existing.prod_value + p.prod_value) /
          (existing.prod_costs + p.prod_costs || 1),
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
export function findDuplicatesByItemId(items: { itemId: string; [k: string]: any, attrs: any[] }[] = []) {
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