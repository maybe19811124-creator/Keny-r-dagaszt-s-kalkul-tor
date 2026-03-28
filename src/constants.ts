export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  baseAmount: number;
  baseUnit: string;
  ingredients: Ingredient[];
  note?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "dagasztas",
    name: "Dagasztás",
    baseAmount: 92,
    baseUnit: "kg",
    ingredients: [
      { name: "Csésze", amount: 1, unit: "dagasztás" }
    ]
  },
  {
    id: "feher-kenyer",
    name: "Fehér kenyér",
    baseAmount: 92,
    baseUnit: "kg",
    ingredients: [
      { name: "Kovász", amount: 36, unit: "kg" },
      { name: "Liszt", amount: 45, unit: "kg" },
      { name: "Víz", amount: 22, unit: "liter" },
      { name: "Só", amount: 1.8, unit: "kg" },
      { name: "Élesztő", amount: 1.5, unit: "kg" },
      { name: "Lisztjavító", amount: 0.3, unit: "kg" }
    ],
    note: "A víz, élesztő mennyisége a liszt minősége és az időjárás függvényében változhat."
  },
  {
    id: "falusi-kenyer",
    name: "Falusi kenyér",
    baseAmount: 96,
    baseUnit: "kg",
    ingredients: [
      { name: "Kovász", amount: 36, unit: "kg" },
      { name: "Liszt", amount: 45, unit: "kg" },
      { name: "Víz", amount: 22, unit: "liter" },
      { name: "Só", amount: 1.8, unit: "kg" },
      { name: "Élesztő", amount: 1.5, unit: "kg" },
      { name: "Lisztjavító", amount: 0.3, unit: "kg" },
      { name: "Cukor", amount: 1, unit: "lapátnyi" },
      { name: "Burgonypehely", amount: 1, unit: "lapátnyi" },
      { name: "Sikér", amount: 1, unit: "lapátnyi" },
      { name: "Zsír", amount: 2, unit: "kg" }
    ],
    note: "A víz, élesztő mennyisége a liszt minősége és az időjárás függvényében változhat."
  },
  {
    id: "fitt-kenyer",
    name: "Fitt kenyér",
    baseAmount: 96,
    baseUnit: "db",
    ingredients: [
      { name: "Kovász", amount: 36, unit: "kg" },
      { name: "Liszt (50% tk.)", amount: 45, unit: "kg" },
      { name: "Víz", amount: 26, unit: "liter" },
      { name: "Só", amount: 1.8, unit: "kg" },
      { name: "Élesztő", amount: 1.5, unit: "kg" },
      { name: "Lisztjavító", amount: 0.3, unit: "kg" },
      { name: "Sikér", amount: 1, unit: "lapátnyi" }
    ],
    note: "A víz, élesztő mennyisége a liszt minősége és az időjárás függvényében változhat."
  },
  {
    id: "hetmagvas",
    name: "Hétmagvas kenyér",
    baseAmount: 1,
    baseUnit: "db",
    ingredients: [
      { name: "Fehér tészta", amount: 0.45, unit: "kg" },
      { name: "Hétmagvas keverék", amount: 3, unit: "dkg" },
      { name: "Sikér", amount: 2, unit: "dkg" },
      { name: "Víz", amount: 1, unit: "dl" }
    ]
  },
  {
    id: "kovasz",
    name: "Kovász",
    baseAmount: 36,
    baseUnit: "kg",
    ingredients: [
      { name: "Liszt", amount: 23, unit: "kg" },
      { name: "Víz", amount: 14, unit: "liter" }
    ]
  }
];
