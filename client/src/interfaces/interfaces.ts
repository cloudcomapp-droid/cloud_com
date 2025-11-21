export interface Campaign {
  id: string;
  name: string;
}

export interface AssetGroup {
  id: string;
  name: string;
  campaign?: string;
}

export interface Product {
  camp_id: string;
  camp_name: string;
  camp_type: string;
  prod_id: string;
  prod_name: string;
  prod_imprs: number;
  prod_clcks: number;
  prod_ctr: number;
  prod_convs: number;
  prod_value: number;
  prod_costs: number;
  prod_roas: number;
}