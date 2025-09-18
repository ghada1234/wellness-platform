export interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  ingredients: string[];
  instructions: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  // Micronutrients
  vitaminA?: number; // mcg
  vitaminC?: number; // mg
  vitaminD?: number; // mcg
  vitaminE?: number; // mg
  vitaminK?: number; // mcg
  thiamine?: number; // mg
  riboflavin?: number; // mg
  niacin?: number; // mg
  folate?: number; // mcg
  vitaminB12?: number; // mcg
  calcium?: number; // mg
  iron?: number; // mg
  magnesium?: number; // mg
  phosphorus?: number; // mg
  potassium?: number; // mg
  zinc?: number; // mg
  copper?: number; // mg
  manganese?: number; // mg
  selenium?: number; // mcg
  // Additional nutritional info
  cholesterol?: number; // mg
  saturatedFat?: number; // g
  monounsaturatedFat?: number; // g
  polyunsaturatedFat?: number; // g
  omega3?: number; // g
  omega6?: number; // g
  transFat?: number; // g
  tags: string[]; // e.g., ['vegetarian', 'gluten-free', 'high-protein']
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number;
  source: string; // cookbook or source name
}

export const RECIPE_DATABASE: Recipe[] = [
  // BREAKFAST RECIPES - INTERNATIONAL CUISINES
  
  // MEDITERRANEAN
  {
    id: 'breakfast-001',
    name: 'Mediterranean Avocado Toast',
    description: 'Creamy avocado on whole grain toast with tomatoes and feta',
    cuisine: 'mediterranean',
    mealType: 'breakfast',
    ingredients: [
      '2 slices whole grain bread',
      '1 ripe avocado',
      '1/2 cup cherry tomatoes, halved',
      '2 tbsp crumbled feta cheese',
      '1 tbsp extra virgin olive oil',
      '1 tsp lemon juice',
      'Salt and pepper to taste',
      'Red pepper flakes (optional)'
    ],
    instructions: '1. Toast the bread slices until golden. 2. Mash the avocado with lemon juice, salt, and pepper. 3. Spread avocado mixture on toast. 4. Top with cherry tomatoes and feta. 5. Drizzle with olive oil and sprinkle with red pepper flakes if desired.',
    prepTime: 10,
    cookTime: 5,
    totalTime: 15,
    calories: 320,
    protein: 12,
    carbohydrates: 28,
    fat: 22,
    fiber: 12,
    sugar: 4,
    sodium: 480,
    vitaminA: 45,
    vitaminC: 18,
    vitaminE: 2.1,
    vitaminK: 28,
    thiamine: 0.2,
    riboflavin: 0.3,
    niacin: 2.8,
    folate: 85,
    calcium: 180,
    iron: 2.1,
    magnesium: 65,
    phosphorus: 220,
    potassium: 680,
    zinc: 1.2,
    copper: 0.3,
    manganese: 0.8,
    selenium: 15,
    cholesterol: 25,
    saturatedFat: 4.2,
    monounsaturatedFat: 12.8,
    polyunsaturatedFat: 3.1,
    omega3: 0.2,
    omega6: 2.8,
    transFat: 0,
    tags: ['vegetarian', 'high-fiber', 'healthy-fats'],
    difficulty: 'easy',
    servings: 1,
    source: 'Mediterranean Cookbook'
  },

  // JAPANESE
  {
    id: 'breakfast-002',
    name: 'Japanese Miso Soup with Tofu',
    description: 'Traditional miso soup with silken tofu and seaweed',
    cuisine: 'japanese',
    mealType: 'breakfast',
    ingredients: [
      '2 cups dashi stock',
      '3 tbsp white miso paste',
      '1/2 cup silken tofu, cubed',
      '1 sheet nori, cut into strips',
      '2 green onions, sliced',
      '1 tsp soy sauce',
      '1/2 tsp sesame oil'
    ],
    instructions: '1. Heat dashi stock to simmer. 2. Dissolve miso paste in hot stock. 3. Add tofu cubes and simmer 2 minutes. 4. Add nori strips and green onions. 5. Season with soy sauce and sesame oil. 6. Serve hot.',
    prepTime: 10,
    cookTime: 8,
    totalTime: 18,
    calories: 120,
    protein: 8,
    carbohydrates: 12,
    fat: 4,
    fiber: 2,
    sugar: 4,
    sodium: 680,
    vitaminA: 15,
    vitaminC: 8,
    vitaminE: 0.8,
    vitaminK: 45,
    thiamine: 0.1,
    riboflavin: 0.2,
    niacin: 1.2,
    folate: 25,
    vitaminB12: 0.8,
    calcium: 120,
    iron: 2.8,
    magnesium: 45,
    phosphorus: 85,
    potassium: 280,
    zinc: 1.1,
    copper: 0.2,
    manganese: 0.6,
    selenium: 8,
    cholesterol: 0,
    saturatedFat: 0.8,
    monounsaturatedFat: 1.2,
    polyunsaturatedFat: 1.8,
    omega3: 0.3,
    omega6: 1.4,
    transFat: 0,
    tags: ['low-calorie', 'fermented', 'umami', 'vegan'],
    difficulty: 'easy',
    servings: 1,
    source: 'Japanese Cooking Fundamentals'
  },

  // FRENCH
  {
    id: 'breakfast-003',
    name: 'French Omelette with Herbs',
    description: 'Classic French omelette with fresh herbs and gruyère cheese',
    cuisine: 'french',
    mealType: 'breakfast',
    ingredients: [
      '3 large eggs',
      '2 tbsp gruyère cheese, grated',
      '1 tbsp fresh chives, chopped',
      '1 tbsp fresh parsley, chopped',
      '1 tbsp butter',
      'Salt and pepper to taste'
    ],
    instructions: '1. Beat eggs with salt and pepper. 2. Heat butter in non-stick pan over medium heat. 3. Pour eggs into pan, stir gently with fork. 4. When eggs start to set, add cheese and herbs. 5. Fold omelette in half. 6. Serve immediately.',
    prepTime: 5,
    cookTime: 8,
    totalTime: 13,
    calories: 280,
    protein: 20,
    carbohydrates: 2,
    fat: 22,
    fiber: 0,
    sugar: 1,
    sodium: 420,
    vitaminA: 180,
    vitaminC: 4,
    vitaminD: 2.5,
    vitaminE: 1.2,
    vitaminK: 12,
    thiamine: 0.1,
    riboflavin: 0.5,
    niacin: 0.1,
    folate: 45,
    vitaminB12: 1.2,
    calcium: 180,
    iron: 1.8,
    magnesium: 20,
    phosphorus: 280,
    potassium: 180,
    zinc: 1.8,
    copper: 0.1,
    manganese: 0.1,
    selenium: 25,
    cholesterol: 480,
    saturatedFat: 10.2,
    monounsaturatedFat: 8.1,
    polyunsaturatedFat: 2.8,
    omega3: 0.1,
    omega6: 2.6,
    transFat: 0,
    tags: ['high-protein', 'low-carb', 'keto-friendly'],
    difficulty: 'medium',
    servings: 1,
    source: 'French Culinary Arts'
  },

  // MEXICAN
  {
    id: 'breakfast-004',
    name: 'Mexican Huevos Rancheros',
    description: 'Fried eggs on corn tortillas with ranchero sauce and beans',
    cuisine: 'mexican',
    mealType: 'breakfast',
    ingredients: [
      '2 corn tortillas',
      '2 large eggs',
      '1/2 cup black beans, cooked',
      '1/4 cup ranchero sauce',
      '2 tbsp queso fresco, crumbled',
      '1 tbsp cilantro, chopped',
      '1 tbsp olive oil',
      '1/4 avocado, sliced',
      'Salt and pepper to taste'
    ],
    instructions: '1. Warm tortillas in dry pan. 2. Heat olive oil, fry eggs sunny-side up. 3. Warm black beans and ranchero sauce. 4. Place tortillas on plate, top with beans. 5. Add fried eggs and ranchero sauce. 6. Garnish with queso fresco, cilantro, and avocado.',
    prepTime: 10,
    cookTime: 12,
    totalTime: 22,
    calories: 420,
    protein: 22,
    carbohydrates: 38,
    fat: 22,
    fiber: 12,
    sugar: 6,
    sodium: 720,
    vitaminA: 220,
    vitaminC: 15,
    vitaminE: 2.8,
    vitaminK: 35,
    thiamine: 0.3,
    riboflavin: 0.4,
    niacin: 2.1,
    folate: 120,
    vitaminB12: 1.1,
    calcium: 180,
    iron: 3.2,
    magnesium: 85,
    phosphorus: 320,
    potassium: 680,
    zinc: 2.1,
    copper: 0.4,
    manganese: 1.2,
    selenium: 18,
    cholesterol: 360,
    saturatedFat: 6.8,
    monounsaturatedFat: 10.2,
    polyunsaturatedFat: 3.8,
    omega3: 0.2,
    omega6: 3.4,
    transFat: 0,
    tags: ['high-protein', 'fiber-rich', 'spicy'],
    difficulty: 'easy',
    servings: 1,
    source: 'Authentic Mexican Cooking'
  },

  // INDIAN
  {
    id: 'breakfast-005',
    name: 'Indian Masala Oats',
    description: 'Spiced oatmeal with vegetables and Indian spices',
    cuisine: 'indian',
    mealType: 'breakfast',
    ingredients: [
      '1/2 cup rolled oats',
      '1/4 cup diced onion',
      '1/4 cup diced tomato',
      '1/4 cup diced bell pepper',
      '1 tsp ginger, minced',
      '1 clove garlic, minced',
      '1/2 tsp turmeric',
      '1/2 tsp cumin seeds',
      '1/4 tsp garam masala',
      '1 tbsp coconut oil',
      'Salt to taste',
      'Fresh cilantro'
    ],
    instructions: '1. Heat coconut oil, add cumin seeds. 2. Add onion, ginger, garlic, sauté 2 minutes. 3. Add vegetables, cook 3 minutes. 4. Add oats, turmeric, garam masala, salt. 5. Add water, cook until oats are tender. 6. Garnish with cilantro.',
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    calories: 280,
    protein: 8,
    carbohydrates: 42,
    fat: 10,
    fiber: 8,
    sugar: 6,
    sodium: 320,
    vitaminA: 45,
    vitaminC: 35,
    vitaminE: 1.8,
    vitaminK: 25,
    thiamine: 0.3,
    riboflavin: 0.1,
    niacin: 1.2,
    folate: 25,
    vitaminB12: 0,
    calcium: 45,
    iron: 2.8,
    magnesium: 85,
    phosphorus: 180,
    potassium: 320,
    zinc: 1.2,
    copper: 0.3,
    manganese: 1.8,
    selenium: 12,
    cholesterol: 0,
    saturatedFat: 8.2,
    monounsaturatedFat: 1.2,
    polyunsaturatedFat: 0.4,
    omega3: 0.1,
    omega6: 0.3,
    transFat: 0,
    tags: ['vegetarian', 'vegan', 'spicy', 'anti-inflammatory'],
    difficulty: 'easy',
    servings: 1,
    source: 'Indian Spice Kitchen'
  },

  // LUNCH RECIPES - INTERNATIONAL CUISINES
  
  // THAI
  {
    id: 'lunch-001',
    name: 'Thai Green Curry with Chicken',
    description: 'Aromatic green curry with chicken, vegetables, and jasmine rice',
    cuisine: 'thai',
    mealType: 'lunch',
    ingredients: [
      '4 oz chicken breast, sliced',
      '1/2 cup jasmine rice',
      '1/4 cup green curry paste',
      '1/2 cup coconut milk',
      '1/4 cup bell peppers, sliced',
      '1/4 cup bamboo shoots',
      '2 tbsp fish sauce',
      '1 tbsp palm sugar',
      '1 tbsp lime juice',
      'Fresh basil leaves',
      'Thai chilies (optional)'
    ],
    instructions: '1. Cook jasmine rice. 2. Heat curry paste in pan, add coconut milk. 3. Add chicken, cook 5 minutes. 4. Add vegetables, simmer 8 minutes. 5. Season with fish sauce, palm sugar, lime juice. 6. Serve over rice, garnish with basil.',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    calories: 480,
    protein: 32,
    carbohydrates: 45,
    fat: 18,
    fiber: 4,
    sugar: 8,
    sodium: 920,
    vitaminA: 85,
    vitaminC: 45,
    vitaminE: 2.1,
    vitaminK: 15,
    thiamine: 0.2,
    riboflavin: 0.3,
    niacin: 8.2,
    folate: 35,
    vitaminB12: 0.8,
    calcium: 45,
    iron: 2.1,
    magnesium: 65,
    phosphorus: 280,
    potassium: 480,
    zinc: 2.8,
    copper: 0.3,
    manganese: 1.2,
    selenium: 25,
    cholesterol: 85,
    saturatedFat: 12.8,
    monounsaturatedFat: 3.2,
    polyunsaturatedFat: 1.8,
    omega3: 0.1,
    omega6: 1.6,
    transFat: 0,
    tags: ['spicy', 'coconut', 'aromatic', 'gluten-free'],
    difficulty: 'medium',
    servings: 1,
    source: 'Thai Cooking Made Easy'
  },

  // ITALIAN
  {
    id: 'lunch-002',
    name: 'Italian Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    cuisine: 'italian',
    mealType: 'lunch',
    ingredients: [
      '4 oz fresh mozzarella',
      '2 medium tomatoes, sliced',
      '1/4 cup fresh basil leaves',
      '2 tbsp extra virgin olive oil',
      '1 tbsp balsamic vinegar',
      '1 tsp balsamic glaze',
      'Salt and pepper to taste'
    ],
    instructions: '1. Slice mozzarella and tomatoes. 2. Arrange alternating slices on plate. 3. Tuck basil leaves between slices. 4. Drizzle with olive oil and balsamic vinegar. 5. Season with salt and pepper. 6. Finish with balsamic glaze.',
    prepTime: 10,
    cookTime: 0,
    totalTime: 10,
    calories: 320,
    protein: 18,
    carbohydrates: 8,
    fat: 24,
    fiber: 2,
    sugar: 6,
    sodium: 480,
    vitaminA: 120,
    vitaminC: 25,
    vitaminE: 2.8,
    vitaminK: 45,
    thiamine: 0.1,
    riboflavin: 0.4,
    niacin: 1.2,
    folate: 25,
    vitaminB12: 1.8,
    calcium: 420,
    iron: 0.8,
    magnesium: 25,
    phosphorus: 280,
    potassium: 320,
    zinc: 2.1,
    copper: 0.1,
    manganese: 0.2,
    selenium: 15,
    cholesterol: 45,
    saturatedFat: 12.8,
    monounsaturatedFat: 8.2,
    polyunsaturatedFat: 2.1,
    omega3: 0.1,
    omega6: 1.8,
    transFat: 0,
    tags: ['vegetarian', 'fresh', 'mediterranean', 'low-carb'],
    difficulty: 'easy',
    servings: 1,
    source: 'Italian Home Cooking'
  },

  // CHINESE
  {
    id: 'lunch-003',
    name: 'Chinese Kung Pao Chicken',
    description: 'Spicy stir-fried chicken with peanuts and vegetables',
    cuisine: 'chinese',
    mealType: 'lunch',
    ingredients: [
      '4 oz chicken breast, diced',
      '1/2 cup jasmine rice',
      '2 tbsp peanuts',
      '1/4 cup bell peppers, diced',
      '1/4 cup zucchini, diced',
      '2 tbsp soy sauce',
      '1 tbsp hoisin sauce',
      '1 tbsp rice vinegar',
      '1 tsp sesame oil',
      '1 tsp cornstarch',
      '2 cloves garlic, minced',
      '1 tsp ginger, minced',
      'Dried chilies (optional)'
    ],
    instructions: '1. Cook jasmine rice. 2. Marinate chicken with soy sauce and cornstarch. 3. Heat oil, stir-fry chicken until cooked. 4. Add vegetables, garlic, ginger, cook 3 minutes. 5. Add sauces, vinegar, peanuts. 6. Serve over rice.',
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    calories: 420,
    protein: 28,
    carbohydrates: 38,
    fat: 16,
    fiber: 3,
    sugar: 6,
    sodium: 820,
    vitaminA: 35,
    vitaminC: 45,
    vitaminE: 1.8,
    vitaminK: 8,
    thiamine: 0.2,
    riboflavin: 0.3,
    niacin: 6.8,
    folate: 25,
    vitaminB12: 0.8,
    calcium: 35,
    iron: 1.8,
    magnesium: 45,
    phosphorus: 220,
    potassium: 420,
    zinc: 2.1,
    copper: 0.3,
    manganese: 0.8,
    selenium: 22,
    cholesterol: 65,
    saturatedFat: 3.2,
    monounsaturatedFat: 6.8,
    polyunsaturatedFat: 4.2,
    omega3: 0.2,
    omega6: 3.8,
    transFat: 0,
    tags: ['spicy', 'high-protein', 'stir-fry', 'gluten-free'],
    difficulty: 'medium',
    servings: 1,
    source: 'Chinese Culinary Arts'
  },

  // DINNER RECIPES - INTERNATIONAL CUISINES
  
  // FRENCH
  {
    id: 'dinner-001',
    name: 'French Coq au Vin',
    description: 'Classic French chicken braised in red wine with vegetables',
    cuisine: 'french',
    mealType: 'dinner',
    ingredients: [
      '5 oz chicken thigh',
      '1/2 cup red wine',
      '1/4 cup chicken stock',
      '1/4 cup pearl onions',
      '1/4 cup mushrooms, sliced',
      '2 strips bacon, diced',
      '2 cloves garlic, minced',
      '1 tbsp tomato paste',
      '1 tsp fresh thyme',
      '1 bay leaf',
      'Salt and pepper to taste'
    ],
    instructions: '1. Season chicken, brown in pan. 2. Remove chicken, cook bacon until crisp. 3. Add onions, mushrooms, garlic, cook 5 minutes. 4. Add wine, stock, tomato paste, herbs. 5. Return chicken, simmer 25 minutes. 6. Season and serve.',
    prepTime: 20,
    cookTime: 35,
    totalTime: 55,
    calories: 380,
    protein: 28,
    carbohydrates: 12,
    fat: 18,
    fiber: 2,
    sugar: 4,
    sodium: 680,
    vitaminA: 25,
    vitaminC: 8,
    vitaminE: 1.2,
    vitaminK: 12,
    thiamine: 0.2,
    riboflavin: 0.4,
    niacin: 8.2,
    folate: 15,
    vitaminB12: 1.2,
    calcium: 35,
    iron: 2.8,
    magnesium: 45,
    phosphorus: 220,
    potassium: 480,
    zinc: 2.8,
    copper: 0.2,
    manganese: 0.3,
    selenium: 25,
    cholesterol: 95,
    saturatedFat: 6.8,
    monounsaturatedFat: 7.2,
    polyunsaturatedFat: 2.8,
    omega3: 0.2,
    omega6: 2.4,
    transFat: 0,
    tags: ['wine-braised', 'classic', 'comfort-food'],
    difficulty: 'hard',
    servings: 1,
    source: 'French Culinary Arts'
  },

  // INDIAN
  {
    id: 'dinner-002',
    name: 'Indian Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken and basmati rice',
    cuisine: 'indian',
    mealType: 'dinner',
    ingredients: [
      '4 oz chicken breast, cubed',
      '1/2 cup basmati rice',
      '1/4 cup tomato puree',
      '1/4 cup heavy cream',
      '2 tbsp butter',
      '1 tbsp garam masala',
      '1 tsp turmeric',
      '1 tsp cumin',
      '1 tsp coriander',
      '2 cloves garlic, minced',
      '1 tsp ginger, minced',
      'Salt to taste',
      'Fresh cilantro'
    ],
    instructions: '1. Cook basmati rice. 2. Marinate chicken with spices. 3. Heat butter, cook chicken until done. 4. Add tomato puree, simmer 10 minutes. 5. Add cream, simmer 5 minutes. 6. Serve over rice, garnish with cilantro.',
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    calories: 520,
    protein: 32,
    carbohydrates: 42,
    fat: 24,
    fiber: 3,
    sugar: 8,
    sodium: 720,
    vitaminA: 85,
    vitaminC: 15,
    vitaminE: 2.8,
    vitaminK: 8,
    thiamine: 0.2,
    riboflavin: 0.3,
    niacin: 6.8,
    folate: 25,
    vitaminB12: 1.1,
    calcium: 85,
    iron: 2.1,
    magnesium: 45,
    phosphorus: 280,
    potassium: 420,
    zinc: 2.8,
    copper: 0.3,
    manganese: 1.2,
    selenium: 22,
    cholesterol: 95,
    saturatedFat: 12.8,
    monounsaturatedFat: 6.2,
    polyunsaturatedFat: 2.8,
    omega3: 0.2,
    omega6: 2.4,
    transFat: 0,
    tags: ['creamy', 'spicy', 'aromatic', 'comfort-food'],
    difficulty: 'medium',
    servings: 1,
    source: 'Indian Spice Kitchen'
  },

  // JAPANESE
  {
    id: 'dinner-003',
    name: 'Japanese Teriyaki Salmon',
    description: 'Glazed salmon with steamed rice and pickled vegetables',
    cuisine: 'japanese',
    mealType: 'dinner',
    ingredients: [
      '5 oz salmon fillet',
      '1/2 cup jasmine rice',
      '2 tbsp teriyaki sauce',
      '1 tbsp mirin',
      '1 tbsp soy sauce',
      '1 tsp sesame oil',
      '1/4 cup pickled vegetables',
      '1 tsp sesame seeds',
      '1 green onion, sliced'
    ],
    instructions: '1. Cook jasmine rice. 2. Mix teriyaki sauce, mirin, soy sauce. 3. Pan-sear salmon, brush with sauce. 4. Cook until glazed and fish flakes easily. 5. Serve over rice with pickled vegetables. 6. Garnish with sesame seeds and green onion.',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    calories: 450,
    protein: 35,
    carbohydrates: 38,
    fat: 18,
    fiber: 2,
    sugar: 8,
    sodium: 920,
    vitaminA: 45,
    vitaminC: 8,
    vitaminD: 8.5,
    vitaminE: 2.1,
    vitaminK: 15,
    thiamine: 0.3,
    riboflavin: 0.4,
    niacin: 8.8,
    folate: 25,
    vitaminB12: 3.2,
    calcium: 45,
    iron: 1.8,
    magnesium: 65,
    phosphorus: 420,
    potassium: 680,
    zinc: 1.8,
    copper: 0.2,
    manganese: 0.8,
    selenium: 35,
    cholesterol: 85,
    saturatedFat: 3.8,
    monounsaturatedFat: 6.2,
    polyunsaturatedFat: 6.8,
    omega3: 2.8,
    omega6: 1.2,
    transFat: 0,
    tags: ['omega-3', 'glazed', 'umami', 'healthy'],
    difficulty: 'easy',
    servings: 1,
    source: 'Japanese Cooking Fundamentals'
  },
  {
    id: 'breakfast-002',
    name: 'Protein-Packed Greek Yogurt Bowl',
    description: 'Greek yogurt with berries, nuts, and honey',
    cuisine: 'greek',
    mealType: 'breakfast',
    ingredients: [
      '1 cup Greek yogurt (2% fat)',
      '1/2 cup mixed berries',
      '2 tbsp chopped almonds',
      '1 tbsp honey',
      '1 tbsp chia seeds',
      '1 tsp vanilla extract'
    ],
    instructions: '1. Mix Greek yogurt with vanilla extract. 2. Top with mixed berries. 3. Sprinkle with chopped almonds and chia seeds. 4. Drizzle with honey. 5. Serve immediately.',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    calories: 280,
    protein: 20,
    carbohydrates: 32,
    fat: 8,
    fiber: 8,
    sugar: 24,
    sodium: 80,
    tags: ['high-protein', 'low-fat', 'antioxidants'],
    difficulty: 'easy',
    servings: 1,
    source: 'Greek Cuisine Essentials'
  },
  {
    id: 'breakfast-003',
    name: 'Mexican Breakfast Burrito',
    description: 'Scrambled eggs with black beans, peppers, and cheese in a tortilla',
    cuisine: 'mexican',
    mealType: 'breakfast',
    ingredients: [
      '2 large eggs',
      '1/4 cup black beans, rinsed',
      '1/4 cup diced bell peppers',
      '2 tbsp shredded cheddar cheese',
      '1 whole wheat tortilla',
      '1 tbsp olive oil',
      '1/4 tsp cumin',
      'Salt and pepper to taste',
      'Fresh cilantro (optional)'
    ],
    instructions: '1. Heat olive oil in a pan. 2. Sauté bell peppers for 2-3 minutes. 3. Add black beans and cumin, cook 1 minute. 4. Scramble eggs in the same pan. 5. Warm tortilla and fill with egg mixture. 6. Top with cheese and cilantro.',
    prepTime: 10,
    cookTime: 8,
    totalTime: 18,
    calories: 380,
    protein: 22,
    carbohydrates: 32,
    fat: 18,
    fiber: 8,
    sugar: 4,
    sodium: 620,
    tags: ['high-protein', 'fiber-rich', 'spicy'],
    difficulty: 'easy',
    servings: 1,
    source: 'Authentic Mexican Cooking'
  },

  // LUNCH RECIPES
  {
    id: 'lunch-001',
    name: 'Grilled Chicken Quinoa Bowl',
    description: 'Grilled chicken breast with quinoa, roasted vegetables, and tahini dressing',
    cuisine: 'middle-eastern',
    mealType: 'lunch',
    ingredients: [
      '4 oz chicken breast',
      '1/2 cup cooked quinoa',
      '1/2 cup roasted vegetables (zucchini, bell peppers)',
      '2 tbsp tahini',
      '1 tbsp lemon juice',
      '1 tsp olive oil',
      '1/4 tsp garlic powder',
      'Salt and pepper to taste',
      'Fresh parsley'
    ],
    instructions: '1. Season chicken with garlic powder, salt, and pepper. 2. Grill chicken for 6-8 minutes per side. 3. Mix tahini with lemon juice and olive oil for dressing. 4. Arrange quinoa in bowl, top with sliced chicken and vegetables. 5. Drizzle with tahini dressing and garnish with parsley.',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    calories: 420,
    protein: 35,
    carbohydrates: 32,
    fat: 16,
    fiber: 6,
    sugar: 4,
    sodium: 480,
    tags: ['high-protein', 'gluten-free', 'balanced'],
    difficulty: 'medium',
    servings: 1,
    source: 'Middle Eastern Flavors'
  },
  {
    id: 'lunch-002',
    name: 'Mediterranean Salmon Salad',
    description: 'Pan-seared salmon over mixed greens with olives, tomatoes, and balsamic vinaigrette',
    cuisine: 'mediterranean',
    mealType: 'lunch',
    ingredients: [
      '4 oz salmon fillet',
      '3 cups mixed greens',
      '1/4 cup cherry tomatoes',
      '2 tbsp kalamata olives',
      '1/4 cup cucumber, sliced',
      '2 tbsp balsamic vinegar',
      '1 tbsp olive oil',
      '1 tsp Dijon mustard',
      'Salt and pepper to taste'
    ],
    instructions: '1. Season salmon with salt and pepper. 2. Pan-sear salmon for 4-5 minutes per side. 3. Whisk together balsamic vinegar, olive oil, and mustard for dressing. 4. Toss greens with dressing. 5. Top salad with salmon, tomatoes, olives, and cucumber.',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    calories: 380,
    protein: 28,
    carbohydrates: 12,
    fat: 24,
    fiber: 4,
    sugar: 8,
    sodium: 520,
    tags: ['omega-3', 'low-carb', 'antioxidants'],
    difficulty: 'easy',
    servings: 1,
    source: 'Mediterranean Diet Cookbook'
  },
  {
    id: 'lunch-003',
    name: 'Thai Chicken Lettuce Wraps',
    description: 'Ground chicken with vegetables in lettuce cups with peanut sauce',
    cuisine: 'thai',
    mealType: 'lunch',
    ingredients: [
      '4 oz ground chicken',
      '4 large lettuce leaves',
      '1/4 cup shredded carrots',
      '1/4 cup bean sprouts',
      '2 tbsp chopped peanuts',
      '1 tbsp soy sauce',
      '1 tsp sesame oil',
      '1 tsp ginger, minced',
      '1 clove garlic, minced',
      '2 tbsp peanut butter',
      '1 tbsp lime juice'
    ],
    instructions: '1. Cook ground chicken with garlic and ginger. 2. Add soy sauce and sesame oil. 3. Mix peanut butter with lime juice for sauce. 4. Fill lettuce leaves with chicken mixture. 5. Top with carrots, bean sprouts, and peanuts. 6. Drizzle with peanut sauce.',
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    calories: 320,
    protein: 26,
    carbohydrates: 16,
    fat: 18,
    fiber: 4,
    sugar: 6,
    sodium: 680,
    tags: ['low-carb', 'gluten-free', 'spicy'],
    difficulty: 'medium',
    servings: 1,
    source: 'Thai Cooking Made Easy'
  },

  // DINNER RECIPES
  {
    id: 'dinner-001',
    name: 'Herb-Crusted Baked Cod',
    description: 'Baked cod with herb crust, roasted sweet potato, and steamed broccoli',
    cuisine: 'american',
    mealType: 'dinner',
    ingredients: [
      '5 oz cod fillet',
      '1 medium sweet potato',
      '1 cup broccoli florets',
      '2 tbsp breadcrumbs',
      '1 tbsp fresh herbs (parsley, dill)',
      '1 tbsp olive oil',
      '1 tsp lemon zest',
      'Salt and pepper to taste'
    ],
    instructions: '1. Preheat oven to 400°F. 2. Mix breadcrumbs with herbs and lemon zest. 3. Season cod and top with herb mixture. 4. Cut sweet potato into wedges, season and roast for 25-30 minutes. 5. Bake cod for 12-15 minutes. 6. Steam broccoli for 5 minutes. 7. Serve together.',
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    calories: 380,
    protein: 32,
    carbohydrates: 35,
    fat: 12,
    fiber: 8,
    sugar: 12,
    sodium: 420,
    tags: ['low-fat', 'high-protein', 'omega-3'],
    difficulty: 'medium',
    servings: 1,
    source: 'Healthy American Cuisine'
  },
  {
    id: 'dinner-002',
    name: 'Vegetarian Buddha Bowl',
    description: 'Roasted vegetables, chickpeas, and quinoa with tahini dressing',
    cuisine: 'middle-eastern',
    mealType: 'dinner',
    ingredients: [
      '1/2 cup cooked quinoa',
      '1/2 cup roasted chickpeas',
      '1/2 cup roasted vegetables (cauliflower, carrots)',
      '1/4 avocado, sliced',
      '2 tbsp tahini',
      '1 tbsp lemon juice',
      '1 tsp olive oil',
      '1/4 tsp cumin',
      'Salt and pepper to taste',
      'Fresh herbs'
    ],
    instructions: '1. Roast chickpeas and vegetables with olive oil, cumin, salt, and pepper. 2. Cook quinoa according to package instructions. 3. Mix tahini with lemon juice for dressing. 4. Arrange quinoa in bowl, top with roasted vegetables and chickpeas. 5. Add avocado slices and drizzle with tahini dressing. 6. Garnish with fresh herbs.',
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    calories: 420,
    protein: 16,
    carbohydrates: 48,
    fat: 18,
    fiber: 12,
    sugar: 8,
    sodium: 380,
    tags: ['vegetarian', 'vegan', 'high-fiber'],
    difficulty: 'medium',
    servings: 1,
    source: 'Plant-Based Cooking'
  },
  {
    id: 'dinner-003',
    name: 'Italian Turkey Meatballs',
    description: 'Lean turkey meatballs with marinara sauce over zucchini noodles',
    cuisine: 'italian',
    mealType: 'dinner',
    ingredients: [
      '4 oz ground turkey',
      '1 medium zucchini, spiralized',
      '1/2 cup marinara sauce',
      '2 tbsp breadcrumbs',
      '1 egg white',
      '1 tbsp parmesan cheese',
      '1 tsp Italian herbs',
      '1 clove garlic, minced',
      'Salt and pepper to taste',
      'Fresh basil'
    ],
    instructions: '1. Mix turkey with breadcrumbs, egg white, parmesan, herbs, garlic, salt, and pepper. 2. Form into meatballs. 3. Bake meatballs at 375°F for 20-25 minutes. 4. Heat marinara sauce. 5. Sauté zucchini noodles for 2-3 minutes. 6. Serve meatballs over zucchini noodles with marinara sauce. 7. Garnish with fresh basil.',
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    calories: 340,
    protein: 28,
    carbohydrates: 18,
    fat: 16,
    fiber: 4,
    sugar: 8,
    sodium: 720,
    tags: ['low-carb', 'high-protein', 'gluten-free'],
    difficulty: 'medium',
    servings: 1,
    source: 'Italian Home Cooking'
  },

  // Additional recipes for variety
  {
    id: 'breakfast-004',
    name: 'Japanese Miso Soup with Tofu',
    description: 'Traditional miso soup with silken tofu and seaweed',
    cuisine: 'japanese',
    mealType: 'breakfast',
    ingredients: [
      '2 cups dashi stock',
      '3 tbsp white miso paste',
      '1/2 cup silken tofu, cubed',
      '1 sheet nori, cut into strips',
      '2 green onions, sliced',
      '1 tsp soy sauce',
      '1/2 tsp sesame oil'
    ],
    instructions: '1. Heat dashi stock to simmer. 2. Dissolve miso paste in hot stock. 3. Add tofu cubes and simmer 2 minutes. 4. Add nori strips and green onions. 5. Season with soy sauce and sesame oil. 6. Serve hot.',
    prepTime: 10,
    cookTime: 8,
    totalTime: 18,
    calories: 120,
    protein: 8,
    carbohydrates: 12,
    fat: 4,
    fiber: 2,
    sugar: 4,
    sodium: 680,
    tags: ['low-calorie', 'fermented', 'umami'],
    difficulty: 'easy',
    servings: 1,
    source: 'Japanese Cooking Fundamentals'
  },
  {
    id: 'lunch-004',
    name: 'Indian Dal with Basmati Rice',
    description: 'Spiced lentil curry with fragrant basmati rice',
    cuisine: 'indian',
    mealType: 'lunch',
    ingredients: [
      '1/2 cup red lentils',
      '1/2 cup basmati rice',
      '1/4 cup diced onion',
      '2 cloves garlic, minced',
      '1 tsp ginger, minced',
      '1 tsp curry powder',
      '1/2 tsp turmeric',
      '1/4 tsp cumin',
      '1 tbsp coconut oil',
      'Salt to taste',
      'Fresh cilantro'
    ],
    instructions: '1. Cook rice according to package instructions. 2. Rinse lentils and cook until tender. 3. Heat coconut oil, sauté onion, garlic, and ginger. 4. Add spices and cook 1 minute. 5. Add cooked lentils and simmer 10 minutes. 6. Season with salt. 7. Serve dal over rice, garnish with cilantro.',
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    calories: 380,
    protein: 16,
    carbohydrates: 68,
    fat: 8,
    fiber: 12,
    sugar: 4,
    sodium: 420,
    tags: ['vegetarian', 'vegan', 'spicy', 'fiber-rich'],
    difficulty: 'medium',
    servings: 1,
    source: 'Indian Spice Kitchen'
  }
];

// Helper functions for recipe selection
export function getRecipesByCuisine(cuisine: string): Recipe[] {
  return RECIPE_DATABASE.filter(recipe => 
    recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
  );
}

export function getRecipesByMealType(mealType: 'breakfast' | 'lunch' | 'dinner'): Recipe[] {
  return RECIPE_DATABASE.filter(recipe => recipe.mealType === mealType);
}

export function getRecipesByTags(tags: string[]): Recipe[] {
  return RECIPE_DATABASE.filter(recipe => 
    tags.some(tag => recipe.tags.includes(tag.toLowerCase()))
  );
}

export function getRecipesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Recipe[] {
  return RECIPE_DATABASE.filter(recipe => recipe.difficulty === difficulty);
}

export function getRandomRecipes(count: number, filters?: {
  cuisine?: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner';
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}): Recipe[] {
  let filteredRecipes = RECIPE_DATABASE;
  
  if (filters?.cuisine) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.cuisine.toLowerCase().includes(filters.cuisine!.toLowerCase())
    );
  }
  
  if (filters?.mealType) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.mealType === filters.mealType);
  }
  
  if (filters?.tags) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      filters.tags!.some(tag => recipe.tags.includes(tag.toLowerCase()))
    );
  }
  
  if (filters?.difficulty) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === filters.difficulty);
  }
  
  // Shuffle and return requested count
  const shuffled = [...filteredRecipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
