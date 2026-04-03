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
  category?: string;
  tags?: string[];
}

export const fallbackMenuItems: MenuItem[] = [
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
];
