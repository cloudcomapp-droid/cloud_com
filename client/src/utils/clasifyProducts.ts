const classifyProducts = (products, rules) => {
  const silentData = [];
  const cashCowsData = [];
  const poorDogsData = [];
  const hopelessData = [];
  const numbData = [];

  products?.forEach((p) => {
    // 1. Silent
    if (p.prod_roas === 0 && p.prod_costs === 0 && p.prod_imprs === 0) {
      silentData.push(p);
      return;
    }

    // 2. Cash Cows
    if (p.prod_roas >= rules.cashCowRoas && p.prod_convs >= rules.cashCowConv) {
      cashCowsData.push(p);
      return;
    }

    // 3. Poor Dogs
    if (
      (p.prod_roas >= rules.poorDogRoas && p.prod_roas < rules.cashCowRoas) ||
      (p.prod_roas >= rules.cashCowRoas && p.prod_convs < rules.cashCowConv)
    ) {
      poorDogsData.push(p);
      return;
    }

    // 4. Hopeless
    if (p.prod_roas < rules.poorDogRoas && p.prod_costs >= rules.hopelessCost) {
      hopelessData.push(p);
      return;
    }

    // 5. Numb = complemento de Hopeless dentro del rango 0 ≤ ROAS < poorDogRoas
    if (
      p.prod_roas < rules.poorDogRoas &&
      p.prod_roas >= 0 &&
      p.prod_costs < rules.hopelessCost &&
      p.prod_costs >= 0 &&
      p.prod_imprs > 0
    ) {
      numbData.push(p);
      return;
    }
  });

  return {
    silentData,
    cashCowsData,
    poorDogsData,
    hopelessData,
    numbData,
  };
};
export default classifyProducts;
