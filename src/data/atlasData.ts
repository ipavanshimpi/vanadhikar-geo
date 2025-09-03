export interface StateOverview {
  state: string;
  state_en: string;
  total_claims: number;
  approved_claims: number;
  pending_claims: number;
  rejection_rate: number;
  cfr_titles: number;
  total_area_recognized: number;
  tribal_population_percent: number;
  districts: number;
  villages_covered: number;
  implementation_score: number;
  last_updated: string;
}

export interface VillageAsset {
  village_id: string;
  village_name: string;
  district: string;
  state: string;
  forest_cover_percent: number;
  water_security_index: number;
  agricultural_intensity: number;
  total_area_hectares: number;
  cfr_potential_hectares: number;
  cfr_recognized_hectares: number;
  households: number;
  tribal_households: number;
}

export interface TimeSeriesData {
  monthly_approvals: Array<{
    month: string;
    approvals: number;
    rejections: number;
  }>;
  forest_change: Array<{
    year: number;
    forest_area: number;
    deforestation_rate: number;
  }>;
}

export const stateOverviewData: StateOverview[] = [
  {
    state: "मध्य प्रदेश",
    state_en: "Madhya Pradesh",
    total_claims: 624000,
    approved_claims: 294877,
    pending_claims: 329123,
    rejection_rate: 53,
    cfr_titles: 29980,
    total_area_recognized: 2308211,
    tribal_population_percent: 21.1,
    districts: 52,
    villages_covered: 15420,
    implementation_score: 68,
    last_updated: "2024-08-15"
  },
  {
    state: "त्रिपुरा",
    state_en: "Tripura",
    total_claims: 191000,
    approved_claims: 124541,
    pending_claims: 66459,
    rejection_rate: 22,
    cfr_titles: 55,
    total_area_recognized: 462500,
    tribal_population_percent: 31.8,
    districts: 8,
    villages_covered: 2847,
    implementation_score: 78,
    last_updated: "2024-08-10"
  },
  {
    state: "ओडिशा",
    state_en: "Odisha",
    total_claims: 445000,
    approved_claims: 186340,
    pending_claims: 258660,
    rejection_rate: 42,
    cfr_titles: 12450,
    total_area_recognized: 1556780,
    tribal_population_percent: 22.8,
    districts: 30,
    villages_covered: 8934,
    implementation_score: 61,
    last_updated: "2024-08-12"
  },
  {
    state: "तेलंगाना",
    state_en: "Telangana",
    total_claims: 156000,
    approved_claims: 67890,
    pending_claims: 88110,
    rejection_rate: 57,
    cfr_titles: 3420,
    total_area_recognized: 445670,
    tribal_population_percent: 12.9,
    districts: 33,
    villages_covered: 4560,
    implementation_score: 45,
    last_updated: "2024-08-08"
  }
];

export const villageAssetsData: VillageAsset[] = [
  {
    village_id: "V001",
    village_name: "खेरमाई",
    district: "बैतूल",
    state: "MP",
    forest_cover_percent: 65.2,
    water_security_index: 0.34,
    agricultural_intensity: 0.78,
    total_area_hectares: 1247,
    cfr_potential_hectares: 810,
    cfr_recognized_hectares: 245,
    households: 156,
    tribal_households: 134
  },
  {
    village_id: "V002",
    village_name: "सरसोडा",
    district: "धार",
    state: "MP",
    forest_cover_percent: 78.5,
    water_security_index: 0.67,
    agricultural_intensity: 0.45,
    total_area_hectares: 890,
    cfr_potential_hectares: 699,
    cfr_recognized_hectares: 456,
    households: 89,
    tribal_households: 76
  },
  {
    village_id: "V003",
    village_name: "कुम्हारपाडा",
    district: "कंधमाल",
    state: "Odisha",
    forest_cover_percent: 82.1,
    water_security_index: 0.56,
    agricultural_intensity: 0.23,
    total_area_hectares: 1456,
    cfr_potential_hectares: 1195,
    cfr_recognized_hectares: 0,
    households: 234,
    tribal_households: 201
  }
];

export const timeSeriesData: TimeSeriesData = {
  monthly_approvals: [
    { month: "2024-01", approvals: 1240, rejections: 890 },
    { month: "2024-02", approvals: 1456, rejections: 756 },
    { month: "2024-03", approvals: 1678, rejections: 834 },
    { month: "2024-04", approvals: 1234, rejections: 978 },
    { month: "2024-05", approvals: 1567, rejections: 723 },
    { month: "2024-06", approvals: 1789, rejections: 645 },
    { month: "2024-07", approvals: 1834, rejections: 567 },
    { month: "2024-08", approvals: 1923, rejections: 456 }
  ],
  forest_change: [
    { year: 2020, forest_area: 234500, deforestation_rate: 2.1 },
    { year: 2021, forest_area: 232100, deforestation_rate: 1.8 },
    { year: 2022, forest_area: 230800, deforestation_rate: 1.2 },
    { year: 2023, forest_area: 229900, deforestation_rate: 0.9 },
    { year: 2024, forest_area: 229500, deforestation_rate: 0.4 }
  ]
};