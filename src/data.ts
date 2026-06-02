import { MenuItem, SpecialItem, GalleryItem, Testimonial } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- BREAKFAST ---
  {
    id: 'b1',
    name: 'Quacks & Stacks',
    price: 15.99,
    category: 'Breakfast',
    subcategory: 'Signature Platters',
    description: 'Two eggs, any style with your choice of bacon, sausage, or ham; half order of biscuits & gravy; & two fluffy pancakes. A Hurley House giant!',
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b2',
    name: 'Hungry Man Platter',
    price: 10.49,
    category: 'Breakfast',
    subcategory: 'Signature Platters',
    description: 'Two eggs, any style with your choice of bacon, sausage, or ham; toast or biscuit; and two delicious pancakes.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b3',
    name: 'Sunrise Special',
    price: 6.99,
    category: 'Breakfast',
    subcategory: 'Eggs & Meat',
    description: 'Two eggs, any style with your choice of center-cut bacon, savory sausage, or cured ham, with your choice of toast or flaky biscuit.',
    image: 'https://images.unsplash.com/photo-1496116211227-15d2a297e682?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b4',
    name: 'Biscuits & Gravy (Full Order)',
    price: 6.29,
    category: 'Breakfast',
    subcategory: 'Southern Classics',
    description: 'Two freshly baked buttermilk biscuits covered generously with our legendary homemade sausage gravy.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b5',
    name: 'Biscuits & Gravy (Half Order)',
    price: 3.99,
    category: 'Breakfast',
    subcategory: 'Southern Classics',
    description: 'One warm scratch-made biscuit smothered in thick homemade country sausage gravy.',
  },
  {
    id: 'b6',
    name: 'Dolly Biscuit Platter',
    price: 8.29,
    category: 'Breakfast',
    subcategory: 'Southern Classics',
    description: 'Two fluffy buttermilk biscuits topped with premium grilled sausage patties and completely smothered in homemade sausage gravy.',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b7',
    name: 'Breakfast Burrito',
    price: 7.29,
    category: 'Breakfast',
    subcategory: 'On The Go',
    description: 'An 8-inch soft flour tortilla stuffed with fluffy scrambled eggs, shredded cheddar-jack cheese, and your choice of crumbled bacon, sausage, or ham.',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b8',
    name: 'Pancake Platter',
    price: 8.29,
    category: 'Breakfast',
    subcategory: 'Griddle Favorites',
    description: 'Two of our fluffy signature sweet cakes served hot with your choice of sizzling bacon, savory sausage, or cured ham.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b9',
    name: 'French Toast Platter',
    price: 7.99,
    category: 'Breakfast',
    subcategory: 'Griddle Favorites',
    description: 'Two thick slices of bread dipped in egg custard, grilled to golden-brown, dusted with powdered sugar, served with breakfast syrup & choice of meat.',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'b10',
    name: 'French Toast Sticks',
    price: 4.49,
    category: 'Breakfast',
    subcategory: 'Griddle Favorites',
    description: 'Five sweet, fun-to-dip french toast sticks heavily sprinkled with powdered sugar.',
  },

  // --- OMELETS ---
  {
    id: 'om1',
    name: 'Western Omelet',
    price: 9.79,
    category: 'Omelets',
    subcategory: 'Traditional',
    description: 'Three local farm-raised eggs filled with melted American cheese, diced bacon, savory sausage, smoked ham, onions, green bell peppers, and fresh tomatoes.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1510629900280-d5ee11000210?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'om2',
    name: 'Meat & Cheese Omelet',
    price: 8.49,
    category: 'Omelets',
    subcategory: 'Traditional',
    description: 'Three egg omelet loaded with melted American cheese and your choice of high-quality bacon, sausage, or country ham.',
  },
  {
    id: 'om3',
    name: 'Veggie Omelet',
    price: 7.39,
    category: 'Omelets',
    subcategory: 'Traditional',
    description: 'Three egg omelet with local melted American cheese, diced onions, fresh mushrooms, bell peppers, and sweet vine tomatoes.',
    isGlutenFree: true,
  },
  {
    id: 'om4',
    name: 'All Meat & Cheese Omelet',
    price: 9.79,
    category: 'Omelets',
    subcategory: 'Traditional',
    description: 'Three egg masterpiece packed with American cheese, bacon, country sausage, and cured ham. A meat lover’s dream!',
    image: 'https://images.unsplash.com/photo-1510629900280-d5ee11000210?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'om5',
    name: 'Cheese Omelet',
    price: 6.79,
    category: 'Omelets',
    subcategory: 'Traditional',
    description: 'The cheesiest three-egg omelet loaded to the brim with warm, gooey melted American cheese.',
  },

  // --- SOUTHERN STYLE BISCUITS ---
  {
    id: 'sb1',
    name: 'Egg Biscuit',
    price: 2.99,
    category: 'Southern Style Biscuits',
    subcategory: 'Handmade Biscuits',
    description: 'A farm-fresh egg cooked your way on our daily scratch-made golden buttermilk biscuit.',
  },
  {
    id: 'sb2',
    name: 'Egg & Cheese Biscuit',
    price: 3.49,
    category: 'Southern Style Biscuits',
    subcategory: 'Handmade Biscuits',
    description: 'Farm egg and melted American cheese on a warm, flaky buttermilk biscuit.',
  },
  {
    id: 'sb3',
    name: 'Bacon, Sausage or Ham Biscuit',
    price: 3.29,
    category: 'Southern Style Biscuits',
    subcategory: 'Handmade Biscuits',
    description: 'Your choice of crispy applewood bacon, thick country sausage, or grilled ham tucked inside our fresh biscuit.',
    isPopular: true,
  },
  {
    id: 'sb4',
    name: 'Meat, Egg & Cheese Biscuit',
    price: 5.29,
    category: 'Southern Style Biscuits',
    subcategory: 'Handmade Biscuits',
    description: 'The ultimate biscuit: your choice of meat, a fried egg, and gooey melted cheese on a handmade biscuit.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600'
  },

  // --- PANCAKES ---
  {
    id: 'p1',
    name: 'Single Pancake',
    price: 2.89,
    category: 'Pancakes',
    subcategory: 'Scratch Pancakes',
    description: 'One large scratch-made, fluffy, sweet buttermilk pancake served with butter and warm maple syrup.',
  },
  {
    id: 'p2',
    name: 'Double Stack Pancakes',
    price: 5.59,
    category: 'Pancakes',
    subcategory: 'Scratch Pancakes',
    description: 'Two giant, fluffy homemade buttermilk pancakes grilled to gold, with butter and rich maple syrup.',
    isPopular: true,
  },
  {
    id: 'p3',
    name: 'Chocolate Chip Pancake',
    price: 3.99,
    category: 'Pancakes',
    subcategory: 'Sweet Options',
    description: 'Fluffy pancake loaded with sweet Hershey milk chocolate chips, topped with whipped butter.',
  },
  {
    id: 'p4',
    name: 'Blueberry Pancake',
    price: 3.99,
    category: 'Pancakes',
    subcategory: 'Sweet Options',
    description: 'Fluffy pancake bursting with fresh juicy cultivated wild blueberries. Served with butter & warm syrup.',
  },
  {
    id: 'p5',
    name: 'Gluten Free Pancake',
    price: 3.99,
    category: 'Pancakes',
    subcategory: 'Dietary',
    description: 'Our sweet, delicious, homecrafted fluffy recipe made with gluten-free flour blends.',
    isGlutenFree: true,
  },

  // --- BREAKFAST SANDWICHES ---
  {
    id: 'bs1',
    name: 'Traditional Egg Sandwich',
    price: 2.99,
    category: 'Breakfast Sandwiches',
    subcategory: 'Toast Sandwiches',
    description: 'Egg cooked your way with light mayo, served on your choice of butter-grilled White, Wheat, or thick Texas Toast.',
  },
  {
    id: 'bs2',
    name: 'Bacon, Lettuce & Egg Toast',
    price: 4.49,
    category: 'Breakfast Sandwiches',
    subcategory: 'Toast Sandwiches',
    description: 'Perfect breakfast stack with choice of crispy meat, fried egg, served on fresh toast.',
  },
  {
    id: 'bs3',
    name: 'Ultimate Breakfast Club Sandwich',
    price: 5.49,
    category: 'Breakfast Sandwiches',
    subcategory: 'Signature',
    description: 'Your choice of thick bacon, sausage, or ham with scrambled egg and melted cheddar cheese on double-stacked Texas toast.',
    isPopular: true,
  },

  // --- HASHBROWNS ---
  {
    id: 'hb1',
    name: 'Regular Hashbrowns',
    price: 3.99,
    category: 'Hashbrowns',
    subcategory: 'Shredded Potatoes',
    description: 'A large portion of shredded Idaho russet potatoes, grilled flat and crispy golden brown.',
  },
  {
    id: 'hb2',
    name: 'Hashbrowns with Onions & Cheese',
    price: 5.49,
    category: 'Hashbrowns',
    subcategory: 'Elevated Potatoes',
    description: 'Crispy shredded potatoes grilled with diced yellow sweet onions and topped with melted American cheese.',
    isPopular: true,
  },
  {
    id: 'hb3',
    name: 'Big Joe Hashbrowns',
    price: 8.29,
    category: 'Hashbrowns',
    subcategory: 'Signature Platters',
    description: 'Crispy golden hashbrowns loaded with savory chopped bacon, grilled onions, sautéed mushrooms, sliced jalapeños, and topped with 3 melted cheeses.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600'
  },

  // --- FISH & SHRIMP ---
  {
    id: 'fs1',
    name: 'Farm-Raised Catfish Dinner (2-piece)',
    price: 13.99,
    category: 'Fish & Shrimp',
    subcategory: 'Southern Seafood',
    description: 'Two large tender, Arkansas farm-raised catfish fillets, hand-breaded in seasoned cornmeal and fried crispy. Served with French fries, homemade slaw, and golden hushpuppies.',
    isPopular: true,
  },
  {
    id: 'fs2',
    name: 'Farm-Raised Catfish Dinner (3-piece)',
    price: 17.99,
    category: 'Fish & Shrimp',
    subcategory: 'Southern Seafood',
    description: 'Three massive catfish fillets, hand-breaded and fried golden-brown. Served with french fries, fresh coleslaw, and scratch hushpuppies.',
    isPopular: true,
  },
  {
    id: 'fs3',
    name: 'Grilled Shrimp Skillet',
    price: 17.99,
    category: 'Fish & Shrimp',
    subcategory: 'Seafood Classics',
    description: 'Eight jumbo succulent shrimp sautéed in a blazing hot cast-iron skillet with real butter, minced garlic, herbs, and finished with fresh-squeezed lemon juice.',
    isGlutenFree: true,
  },
  {
    id: 'fs4',
    name: 'Fried Butterfly Shrimp (10-piece)',
    price: 12.59,
    category: 'Fish & Shrimp',
    subcategory: 'Seafood Classics',
    description: 'Ten premium crispy hand-breaded butterfly shrimp, deep fried to amber perfection. Served with crinkle cut fries, house-made tartar, and slaw.',
  },
  {
    id: 'fs5',
    name: 'Honey-Battered Shrimp Platter',
    price: 14.99,
    category: 'Fish & Shrimp',
    subcategory: 'Signature Seafood',
    description: 'Marinated in spicy Cajun dry rub, hand-dipped in special honey butter breading, and fried crispy. A sweet & spicy sensory feast!',
    isPopular: true,
  },

  // --- DINNERS ---
  {
    id: 'dn1',
    name: '16oz Hand-Cut Ribeye Steak',
    price: 29.99,
    category: 'Lunch & Dinner',
    subcategory: 'Butcher Block',
    description: 'Thick, beautifully marbled 16oz USDA Choice Ribeye, hand-cut in-house, charbroiled over open flames to your exact temperature. Served with two sides and Texas toast.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'dn2',
    name: 'Southern Pork Chops',
    price: 12.29,
    category: 'Lunch & Dinner',
    subcategory: 'Country Dinners',
    description: 'Two juicy 4oz pork bone-in chops, either grilled with garlic-herb seasoning or hand-breaded and southern-fried till golden.',
  },
  {
    id: 'dn3',
    name: 'Chicken Fried Steak',
    price: 12.29,
    category: 'Lunch & Dinner',
    subcategory: 'Country Dinners',
    description: 'Tenderized premium sirloin, seasoned and double-battered, fried crispy and smothered in rich, white creamy country pepper gravy.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'dn4',
    name: 'Hamburger Steak Platter',
    price: 12.29,
    category: 'Lunch & Dinner',
    subcategory: 'Country Dinners',
    description: 'A half-pound patty of fresh ground beef, flame-grilled and smothered in rich, dark savory brown gravy and caramelized sweet onions.',
  },

  // --- BURGERS & SANDWICHES ---
  {
    id: 'bsd1',
    name: 'The Big Joe Burger',
    price: 10.49,
    category: 'Burgers & Sandwiches',
    subcategory: 'Signature Burgers',
    description: 'Flame-grilled half-pound burger with crispy center-cut bacon, melted Colby-cheese, monterey jack, pepper jack, loaded with caramelized onions and sautéed mushrooms.',
    isPopular: true,
  },
  {
    id: 'bsd2',
    name: 'Ultimate BBQ Chicken Sandwich',
    price: 10.39,
    category: 'Burgers & Sandwiches',
    subcategory: 'Premium Sandwiches',
    description: 'Tender grilled chicken breast basted in house BBQ sauce, topped with two bacon strips, melted Colby, Monterey, and spicy Pepper Jack cheese.',
  },
  {
    id: 'bsd3',
    name: 'Texas Philly Cheesesteak',
    price: 8.79,
    category: 'Burgers & Sandwiches',
    subcategory: 'Premium Sandwiches',
    description: 'Thinly sliced ribeye steak grilled with green bell peppers and yellow onions, blanketed with melted Pepper Jack cheese on butter-toasted Texas toast.',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'bsd4',
    name: 'Catfish Fillet Sandwich',
    price: 9.99,
    category: 'Burgers & Sandwiches',
    subcategory: 'Seafood Sandwiches',
    description: 'Handbreaded golden catfish fillet fried crispy, served with house tangy tartar sauce, sliced onions, and pickles on a toasted bun.',
  },
  {
    id: 'bsd5',
    name: 'Triple Decker Club Sandwich',
    price: 8.49,
    category: 'Burgers & Sandwiches',
    subcategory: 'Deli',
    description: 'Classic three-tier sandwich with generous layers of smoked ham, turkey chest, applewood bacon, visual Monterey Jack cheese, fresh lettuce, tomato, and mayo on toasted white bread.',
  },
  {
    id: 'bsd6',
    name: 'Patty Melt Classic',
    price: 7.79,
    category: 'Burgers & Sandwiches',
    subcategory: 'Griddle Melts',
    description: 'Flame-grilled half-pound beef patty with melted swiss and cheddar cheeses, topped with plenty of grilled sweet onions on griddled thick Texas toast.',
  },
  {
    id: 'bsd7',
    name: 'Turkey, Bacon, & Avocado Sandwich',
    price: 9.79,
    category: 'Burgers & Sandwiches',
    subcategory: 'Healthy & Light',
    description: 'Toasted organic sourdough bread spread with ripe sliced avocados, crispy bacon, smoked turkey breast, Pepper Jack cheese, crisp red onion, lettuce, and vine tomato.',
    isPopular: true,
  },
  {
    id: 'bsd8',
    name: 'Classic Southern Cheeseburger (Regular)',
    price: 8.59,
    category: 'Burgers & Sandwiches',
    subcategory: 'Classic Burgers',
    description: 'Fresh hand-crafted half-pound beef patty, melted cheddar, crisp lettuce, vine tomatoes, red onion, mustard/mayo combination on toasted brioche.',
  },

  // --- SIDES ---
  {
    id: 'sd1',
    name: 'Fried Green Tomatoes',
    price: 4.99,
    category: 'Premium Sides',
    subcategory: 'Appetizers & Sides',
    description: 'Five crisp, tangy heirloom green tomatoes sliced, coated in cornmeal, fried golden, served with creamy buttermilk ranch.',
    isPopular: true,
  },
  {
    id: 'sd2',
    name: 'Crispy Fried Okra',
    price: 3.09,
    category: 'Sides',
    subcategory: 'Vegetables',
    description: 'Sliced Southern okra rolled in cornmeal flour and fried super crispy.',
  },
  {
    id: 'sd3',
    name: 'Fried Yellow Squash',
    price: 3.09,
    category: 'Sides',
    subcategory: 'Vegetables',
    description: 'Freshly sliced local yellow summer squash, battered and fried golden.',
  },
  {
    id: 'sd4',
    name: 'Hushpuppies (4-piece)',
    price: 3.09,
    category: 'Sides',
    subcategory: 'Breads',
    description: 'Four deep-fried cornmeal balls flavored with finely minced sweet onions and Southern spices.',
  },
  {
    id: 'sd5',
    name: 'Loaded Baked Potato',
    price: 4.09,
    category: 'Premium Sides',
    subcategory: 'Potatoes',
    description: 'Large Idaho baking potato stuffed with butter, sour cream, shredded cheddar cheese, and real crumbled bacon bits.',
  },

  // --- FRIED PIES ---
  {
    id: 'fp1',
    name: 'Homemade Apple Fried Pie',
    price: 3.39,
    category: 'Fried Pies',
    subcategory: 'Fried Pies',
    description: 'Our award-winning dessert: freshly sliced orchard apples seasoned with cinnamon and nutmeg, folded in flaky sweet dough, fried golden. Heaven on earth!',
    isPopular: true,
  },
  {
    id: 'fp2',
    name: 'Southern Peach Fried Pie',
    price: 3.39,
    category: 'Fried Pies',
    subcategory: 'Fried Pies',
    description: 'Sweet, juicy yellow Georgia peaches cooked in sugar, inside our golden fried pastry crust.',
    isPopular: true,
  },
  {
    id: 'fp3',
    name: 'Creamy Coconut Fried Pie',
    price: 3.39,
    category: 'Fried Pies',
    subcategory: 'Fried Pies',
    description: 'Rich, smooth coconut custard baked in our flaky hand-pie shell and lightly glazed.',
  },
  {
    id: 'fp4',
    name: 'Rich Chocolate Fried Pie',
    price: 3.39,
    category: 'Fried Pies',
    subcategory: 'Fried Pies',
    description: 'Decadent fudge chocolate filling, served hot in our crispy outer pie shell. Perfect with vanilla ice cream!',
  },

  // --- BEVERAGES ---
  {
    id: 'bv1',
    name: 'Freshly Brewed Coffee',
    price: 1.24,
    category: 'Beverages',
    subcategory: 'Hot Drinks',
    description: 'Freshly ground arabica blend coffee, continually brewed hot. Free refills inside the cafe!',
    isPopular: true,
  },
  {
    id: 'bv2',
    name: 'Southern Sweet Iced Tea',
    price: 2.29,
    category: 'Beverages',
    subcategory: 'Cold Drinks',
    description: 'Classic Southern-style sweet tea, brewed from orange pekoe leaves and served ice cold with lemon slices.',
    isPopular: true,
  }
];

export const SHIFTED_PICS = {
  pancakes: '', // dynamically injected later
  catfish: '',
  burger: '',
  interior: ''
};

export const TODAY_SPECIALS: SpecialItem[] = [
  {
    id: 's1',
    day: 'Monday',
    name: 'Mama’s Meatloaf Platter',
    description: 'Thick, glazed slice of seasoned beef meatloaf served with garlic mashed potatoes, green beans, cornbread, and sweet sweet tea.',
    price: 10.99,
    time: '11:00 AM - 8:00 PM'
  },
  {
    id: 's2',
    day: 'Tuesday',
    name: 'Southern Fried Chicken Basket',
    description: 'Three crispy pieces of hand-battered golden fried chicken, hot homemade waffle, honey drizzle, and butter.',
    price: 11.49,
    time: '11:00 AM - 8:00 PM'
  },
  {
    id: 's3',
    day: 'Wednesday',
    name: 'Smoked BBQ Ribs Half-Stack',
    description: 'Slow-cooked baby back ribs basted in house-special honey-peach BBQ sauce, served with baked beans and potato salad.',
    price: 13.99,
    time: '11:00 AM - 8:30 PM'
  },
  {
    id: 's4',
    day: 'Thursday',
    name: 'Pork Chop Thursday',
    description: 'Two center-cut pork chops flame-grilled or country fried, served with squash medley, cornbread stuffing, and apple cider glaze.',
    price: 11.99,
    time: '11:00 AM - 8:00 PM'
  },
  {
    id: 's5',
    day: 'Friday',
    name: 'Catfish & Shrimp Friday Feast',
    description: 'Two cornmeal catfish fillets, four jumbo butterfly fried shrimp, hushpuppies, french fries, sweet slaw, and tartar.',
    price: 16.99,
    time: '11:00 AM - 9:00 PM'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Fluffy Pancakes Tower',
    category: 'Breakfast',
    image: 'pancakes', // will map to local pancakes icon
    aspect: 'portrait'
  },
  {
    id: 'g2',
    title: 'Golden Catfish Fillet',
    category: 'Dinner',
    image: 'catfish',
    aspect: 'landscape'
  },
  {
    id: 'g4',
    title: 'The Great Big Joe Burger',
    category: 'Lunch',
    image: 'burger',
    aspect: 'square'
  },
  {
    id: 'g3',
    title: 'Scratch-Made Fried Okra',
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
    aspect: 'landscape'
  },
  {
    id: 'g5',
    title: 'Warm Pot of Fresh Cooked Coffee',
    category: 'Ambiance',
    image: 'interior',
    aspect: 'portrait'
  },
  {
    id: 'g6',
    title: 'Cozy Dining Booth',
    category: 'Ambiance',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
    aspect: 'square'
  }
];

export const REVIEWS: Testimonial[] = [
  {
    id: 'r1',
    name: 'Debbie Graham',
    location: 'Hazen, AR',
    text: 'Best breakfast in the state! The Quacks & Stacks is legendary. The pancakes are so light and sweet, they melt right in your mouth. Truly feels like eating at my grandmas country table.',
    rating: 5,
    date: '2 weeks ago'
  },
  {
    id: 'r2',
    name: 'Keith Sutton',
    location: 'Little Rock, AR',
    text: 'Hurley House is an absolute gem. Sizzling cast iron shrimp, crisp fried catfish, and those fried pies! I literally drive 45 minutes just to pick up three apple fried pies on Fridays.',
    rating: 5,
    date: '1 month ago'
  },
  {
    id: 'r3',
    name: 'Sarah Parker',
    location: 'Memphis, TN',
    text: 'A gorgeous rustic atmosphere where the service is incredibly warm and fast. Southern hospitality at its absolute finest. Try the Big Joe hashbrowns—they are loaded with flavors!',
    rating: 5,
    date: '3 days ago'
  },
  {
    id: 'r4',
    name: 'John Miller',
    location: 'Stuttgart, AR',
    text: 'If you want genuine Arkansas comfort food, this is the sanctuary. The hamburger steak with caramelized onions and dark gravy is pure perfection. Generous portions, fair prices!',
    rating: 5,
    date: '3 weeks ago'
  }
];
