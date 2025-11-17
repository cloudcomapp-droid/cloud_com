/**
 * Cruza productos por campaña, asset group y custom label
 * 
 * @param productsCampaign  Product[]
 * @param productsAssetGroup string[] (product IDs)
 * @param productsByLabel  { itemId: string; title: string }[]
 *
 * @returns Product[]
 */
export function mergeProducts(
  productsCampaign : any[],
  productsAssetGroup : any[],
  productsByLabel : any[]
) {
  if (!Array.isArray(productsCampaign)) return [];
  if (!Array.isArray(productsAssetGroup)) return [];
  if (!Array.isArray(productsByLabel)) return [];

  // Para lookup rápido del label
  const labelMap = new Map(
    productsByLabel.map((p) => [String(p.itemId), p.title])
  );

  // Para lookup rápido de los IDs permitidos
  const assetGroupSet = new Set(productsAssetGroup.map(String));

  // 1️⃣ Filtrar productos por asset group
  const filtered = productsCampaign.filter((p) =>
    assetGroupSet.has(String(p.prod_id))
  );

  // 2️⃣ Reemplazar prod_name con title del custom label
  const merged = filtered.map((p) => {
    const labelTitle = labelMap.get(String(p.prod_id));

    return {
      ...p,
      prod_name: labelTitle ?? p.prod_name, // si no encuentra label, deja el original
    };
  });

  return merged;
}
