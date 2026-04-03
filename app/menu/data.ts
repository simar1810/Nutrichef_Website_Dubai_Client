export interface MenuItem {
  id: string;
  title: string;
  description: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  isNew: boolean;
  imageUrl: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    title: "Chicken Tikka Wrap with Mango Raita",
    description: "and a crunchy kachumber salad",
    calories: 500,
    macros: { protein: 46, carbs: 47, fat: 14 },
    isNew: true,
    imageUrl: "https://cdn.calo.app/food/46cfb754-32c1-4f59-93fa-026430ae9918/square@3x.jpg"
  },
  {
    id: "2",
    title: "Chicken Corn Soup",
    description: "a delicious classic",
    calories: 247,
    macros: { protein: 12, carbs: 25, fat: 11 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/cf8efb7d-e521-4600-9421-6e785847bffa/square@3x.jpg"
  },
  {
    id: "3",
    title: "Tangy Tamarind Sea Bass with Potato",
    description: "a fish that's tamarind-ly delicious",
    calories: 442,
    macros: { protein: 27, carbs: 50, fat: 15 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/2d81b2cc-c45c-4269-b90d-1bd8c282790e/square@3x.jpg"
  },
  {
    id: "4",
    title: "Cacao Yoghurt",
    description: "with raspberry coulis and granola",
    calories: 512,
    macros: { protein: 55, carbs: 35, fat: 17 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/77e539d7-b64f-49cd-a595-998fbbe8bb06/square@3x.jpg"
  },
  {
    id: "5",
    title: "Cacao and Coffee Truffles",
    description: "Cacao and Coffee Truffles",
    calories: 228,
    macros: { protein: 7, carbs: 26, fat: 11 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/46cfb754-32c1-4f59-93fa-026430ae9918/square@3x.jpg"
  },
  {
    id: "6",
    title: "High Protein Cacao Yoghurt",
    description: "with raspberry coulis and granola",
    calories: 519,
    macros: { protein: 59, carbs: 34, fat: 16 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/cf8efb7d-e521-4600-9421-6e785847bffa/square@3x.jpg"
  },
  {
    id: "7",
    title: "Poached Prawns and Grapefruit Salad",
    description: "with lime fish sauce",
    calories: 569,
    macros: { protein: 38, carbs: 37, fat: 30 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/2d81b2cc-c45c-4269-b90d-1bd8c282790e/square@3x.jpg"
  },
  {
    id: "8",
    title: "Bang Bang Chicken High Protein",
    description: "with a crunchy chopped salad, and a peanut and sriracha dressing",
    calories: 443,
    macros: { protein: 48, carbs: 23, fat: 18 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/77e539d7-b64f-49cd-a595-998fbbe8bb06/square@3x.jpg"
  },
  {
    id: "9",
    title: "Beef and Spiced Jollof Rice High Protein",
    description: "Spiced Jollof Rice with Tender Beef",
    calories: 495,
    macros: { protein: 39, carbs: 41, fat: 19 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/46cfb754-32c1-4f59-93fa-026430ae9918/square@3x.jpg"
  },
  {
    id: "10",
    title: "Tamarind Glazed Sea Bass with Potato",
    description: "a fish that's tamarind-ly delicious",
    calories: 523,
    macros: { protein: 45, carbs: 38, fat: 21 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/cf8efb7d-e521-4600-9421-6e785847bffa/square@3x.jpg"
  },
  {
    id: "11",
    title: "Tiramisu Chia Pudding",
    description: "a twist on tradition?",
    calories: 274,
    macros: { protein: 6, carbs: 18, fat: 20 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/2d81b2cc-c45c-4269-b90d-1bd8c282790e/square@3x.jpg"
  },
  {
    id: "12",
    title: "Creamy Porridge with Strawberries",
    description: "straw-berry delicious",
    calories: 298,
    macros: { protein: 11, carbs: 49, fat: 7 },
    isNew: false,
    imageUrl: "https://cdn.calo.app/food/77e539d7-b64f-49cd-a595-998fbbe8bb06/square@3x.jpg"
  }
];
