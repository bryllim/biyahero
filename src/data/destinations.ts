// Fallback images for each category
const fallbackImages = {
  beaches: "https://images.unsplash.com/photo-1559494007-9f5847c49d94",
  mountains: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  food: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
  festivals: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  shopping: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
  heritage: "https://images.unsplash.com/photo-1578468565854-6e5856e0e488"
};

// Helper function to get image URL with fallback
const getImageUrl = (category: string, imageUrl: string) => {
  // Try the provided URL first
  if (imageUrl && imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If no valid URL, use category fallback
  return fallbackImages[category as keyof typeof fallbackImages] || fallbackImages.heritage;
};

export const destinationData = {
  beaches: {
    popular: [
      {
        id: 1,
        name: "Boracay",
        location: "Aklan",
        description: "World-famous white beach paradise with crystal clear waters",
        activities: ["Swimming", "Island Hopping", "Water Sports", "Sunset Sailing"],
        bestTime: "November to May",
        imageUrl: "https://images.unsplash.com/photo-1551966775-8b8c7a8b7755"
      },
      {
        id: 2,
        name: "El Nido",
        location: "Palawan",
        description: "Stunning limestone cliffs and crystal-clear lagoons",
        activities: ["Island Hopping", "Kayaking", "Snorkeling", "Cave Exploration"],
        bestTime: "December to March",
        imageUrl: "https://images.unsplash.com/photo-1573978125674-b8c047dc6aaa"
      },
      {
        id: 3,
        name: "Siargao",
        location: "Surigao del Norte",
        description: "Surfing capital of the Philippines with pristine beaches",
        activities: ["Surfing", "Island Hopping", "Swimming", "Beach Camping"],
        bestTime: "September to November",
        imageUrl: "https://images.unsplash.com/photo-1584350954229-fb6a353c6610"
      },
      {
        id: 4,
        name: "Coron",
        location: "Palawan",
        description: "Famous for wreck diving and pristine lagoons",
        activities: ["Diving", "Snorkeling", "Lake Tours", "Beach Hopping"],
        bestTime: "December to March",
        imageUrl: "https://images.unsplash.com/photo-1573790387438-4da905039392"
      },
      {
        id: 5,
        name: "Panglao",
        location: "Bohol",
        description: "White sand beaches and vibrant marine life",
        activities: ["Diving", "Dolphin Watching", "Island Tours", "Beach Relaxation"],
        bestTime: "March to May",
        imageUrl: "https://images.unsplash.com/photo-1552939452-8b1c50ea2f10"
      }
    ],
    alternatives: [
      {
        id: 6,
        name: "Calaguas Islands",
        location: "Camarines Norte",
        description: "Pristine beaches with powdery white sand and unspoiled beauty",
        activities: ["Camping", "Snorkeling", "Beach Activities"],
        bestTime: "March to May",
        advantages: ["Less crowded than Boracay", "More authentic island experience"],
        comparedTo: "Boracay",
        priceRange: "$",
        imageUrl: "https://images.unsplash.com/photo-1597953601374-1ff2d5640c85"
      },
      {
        id: 7,
        name: "Port Barton",
        location: "Palawan",
        description: "Quiet alternative to El Nido with similar natural beauty",
        activities: ["Island Hopping", "Diving", "Beach Relaxation"],
        bestTime: "December to March",
        advantages: ["More peaceful atmosphere", "Better value for money"],
        comparedTo: "El Nido",
        priceRange: "$$",
        imageUrl: "https://images.unsplash.com/photo-1591373/pexels-photo-1591373.jpeg"
      },
      {
        id: 8,
        name: "Seco Island",
        location: "Antique",
        description: "Remote sandbar with pristine waters",
        activities: ["Kitesurfing", "Swimming", "Photography"],
        bestTime: "December to May",
        advantages: ["Uncrowded kitesurfing spot", "Pristine environment"],
        comparedTo: "Boracay",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg"
      },
      {
        id: 9,
        name: "Jomalig Island",
        location: "Quezon",
        description: "Golden sand beaches and untouched coastal beauty",
        activities: ["Beach Camping", "Fishing", "Island Exploration"],
        bestTime: "March to May",
        advantages: ["Off the tourist radar", "Raw natural beauty"],
        comparedTo: "Boracay",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg"
      },
      {
        id: 10,
        name: "Mantigue Island",
        location: "Camiguin",
        description: "Small island paradise with white sand and rich marine life",
        activities: ["Snorkeling", "Swimming", "Picnicking"],
        bestTime: "March to September",
        advantages: ["Less touristy", "Great for day trips"],
        comparedTo: "Panglao",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg"
      }
    ]
  },
  mountains: {
    popular: [
      {
        id: 11,
        name: "Mt. Pulag",
        location: "Benguet",
        description: "Highest peak in Luzon famous for its sea of clouds",
        activities: ["Hiking", "Camping", "Photography", "Stargazing"],
        bestTime: "December to February",
        imageUrl: "https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg"
      },
      {
        id: 12,
        name: "Mt. Apo",
        location: "Davao",
        description: "Highest peak in the Philippines with diverse landscapes",
        activities: ["Hiking", "Camping", "Bird Watching", "Hot Springs"],
        bestTime: "March to May",
        imageUrl: "https://images.unsplash.com/photo-1601789453634-6e3fd2684ea7"
      },
      {
        id: 13,
        name: "Mt. Pinatubo",
        location: "Zambales",
        description: "Famous crater lake and volcanic landscapes",
        activities: ["Hiking", "4x4 Riding", "Photography", "Swimming"],
        bestTime: "December to May",
        imageUrl: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35"
      },
      {
        id: 14,
        name: "Mt. Mayon",
        location: "Albay",
        description: "Perfect cone volcano with challenging trails",
        activities: ["Hiking", "ATV Rides", "Photography", "Cultural Tours"],
        bestTime: "February to April",
        imageUrl: "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg"
      },
      {
        id: 15,
        name: "Mt. Dulang-dulang",
        location: "Bukidnon",
        description: "Second highest peak with mossy forests",
        activities: ["Hiking", "Bird Watching", "Nature Photography", "Camping"],
        bestTime: "March to May",
        imageUrl: "https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg"
      }
    ],
    alternatives: [
      {
        id: 16,
        name: "Mt. Ulap",
        location: "Benguet",
        description: "Scenic trail with grassland slopes and pine forests",
        activities: ["Day Hiking", "Photography", "Cultural Visits"],
        bestTime: "November to February",
        advantages: ["Easier trail than Mt. Pulag", "Shorter travel time"],
        comparedTo: "Mt. Pulag",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/2562992/pexels-photo-2562992.jpeg"
      },
      {
        id: 17,
        name: "Mt. Kupapey",
        location: "Mountain Province",
        description: "Rice terraces and sunrise views",
        activities: ["Day Hiking", "Cultural Immersion", "Photography"],
        bestTime: "December to February",
        advantages: ["Less touristy", "Authentic cultural experience"],
        comparedTo: "Mt. Pulag",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg"
      },
      {
        id: 18,
        name: "Mt. Daraitan",
        location: "Rizal",
        description: "River and mountain adventure near Manila",
        activities: ["Hiking", "River Swimming", "Caving"],
        bestTime: "December to May",
        advantages: ["Accessible from Manila", "Combined activities"],
        comparedTo: "Mt. Pinatubo",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg"
      },
      {
        id: 19,
        name: "Mt. Pico de Loro",
        location: "Cavite",
        description: "Distinctive rock formation with coastal views",
        activities: ["Hiking", "Rock Climbing", "Beach Visit"],
        bestTime: "January to May",
        advantages: ["Beach nearby", "Unique rock formation"],
        comparedTo: "Mt. Pinatubo",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg"
      },
      {
        id: 20,
        name: "Mt. Ugo",
        location: "Benguet",
        description: "Pine forests and traditional villages",
        activities: ["Multi-day Hiking", "Cultural Visits", "Camping"],
        bestTime: "November to April",
        advantages: ["Less crowded", "Cultural immersion"],
        comparedTo: "Mt. Pulag",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg"
      }
    ]
  },
  food: {
    popular: [
      {
        id: 21,
        name: "Binondo Food Crawl",
        location: "Manila",
        description: "World's oldest Chinatown food tour",
        activities: ["Food Tasting", "Cultural Tours", "Market Visits"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg"
      },
      {
        id: 22,
        name: "Pampanga Food Tour",
        location: "San Fernando",
        description: "Culinary capital of the Philippines",
        activities: ["Cooking Classes", "Restaurant Hopping", "Market Tours"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg"
      },
      {
        id: 23,
        name: "Cebu Lechon Trail",
        location: "Cebu City",
        description: "Famous roasted pig and local delicacies",
        activities: ["Food Tasting", "Cooking Demo", "Market Visits"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/1833337/pexels-photo-1833337.jpeg"
      },
      {
        id: 24,
        name: "Iloilo Food Circuit",
        location: "Iloilo City",
        description: "Traditional Ilonggo cuisine tour",
        activities: ["Food Tasting", "Heritage Tours", "Cooking Classes"],
        bestTime: "January to May",
        imageUrl: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
      },
      {
        id: 25,
        name: "Davao Food Tour",
        location: "Davao City",
        description: "Exotic fruits and Mindanaoan cuisine",
        activities: ["Fruit Tasting", "Market Tours", "Restaurant Hopping"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg"
      }
    ],
    alternatives: [
      {
        id: 26,
        name: "Maginhawa Food Park",
        location: "Quezon City",
        description: "Hip street food and local eateries",
        activities: ["Street Food", "Food Park Hopping", "Night Market"],
        bestTime: "Year-round",
        advantages: ["More affordable", "Variety of choices"],
        comparedTo: "Binondo Food Crawl",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg"
      },
      {
        id: 27,
        name: "Baguio Public Market",
        location: "Baguio City",
        description: "Mountain region specialties and fresh produce",
        activities: ["Market Tour", "Food Tasting", "Souvenir Shopping"],
        bestTime: "December to February",
        advantages: ["Local atmosphere", "Fresh ingredients"],
        comparedTo: "Pampanga Food Tour",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg"
      },
      {
        id: 28,
        name: "Liloan Cebu Food Circuit",
        location: "Liloan, Cebu",
        description: "Off-the-beaten-path Cebuano cuisine",
        activities: ["Local Food Tasting", "Bakery Tours", "Coffee Shops"],
        bestTime: "Year-round",
        advantages: ["Less touristy", "Authentic local food"],
        comparedTo: "Cebu Lechon Trail",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg"
      },
      {
        id: 29,
        name: "Silay Heritage Food Tour",
        location: "Silay City",
        description: "Historical mansions and traditional cuisine",
        activities: ["Heritage Tours", "Local Delicacies", "Coffee Shops"],
        bestTime: "Year-round",
        advantages: ["Historical setting", "Unique atmosphere"],
        comparedTo: "Iloilo Food Circuit",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/1833337/pexels-photo-1833337.jpeg"
      },
      {
        id: 30,
        name: "Farmers Market Cubao",
        location: "Quezon City",
        description: "Local market and food court experience",
        activities: ["Market Shopping", "Local Food", "Seafood Dining"],
        bestTime: "Year-round",
        advantages: ["Local prices", "Fresh ingredients"],
        comparedTo: "Binondo Food Crawl",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
      }
    ]
  },
  festivals: {
    popular: [
      {
        id: 31,
        name: "Sinulog Festival",
        location: "Cebu City",
        description: "Grand cultural and religious festival honoring the Santo Niño",
        activities: ["Street Dancing", "Cultural Shows", "Religious Processions", "Food Festival"],
        bestTime: "January",
        imageUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
      },
      {
        id: 32,
        name: "Ati-Atihan Festival",
        location: "Kalibo, Aklan",
        description: "Mother of all Philippine festivals with tribal dance celebrations",
        activities: ["Street Dancing", "Tribal Performances", "Cultural Shows", "Food Fair"],
        bestTime: "January",
        imageUrl: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg"
      },
      {
        id: 33,
        name: "Panagbenga Festival",
        location: "Baguio City",
        description: "Month-long flower festival celebrating spring and Cordilleran culture",
        activities: ["Flower Parade", "Street Dancing", "Garden Shows", "Cultural Events"],
        bestTime: "February",
        imageUrl: "https://images.pexels.com/photos/2441454/pexels-photo-2441454.jpeg"
      },
      {
        id: 34,
        name: "MassKara Festival",
        location: "Bacolod City",
        description: "Festival of smiling masks and street dancing",
        activities: ["Mask Parade", "Street Dancing", "Food Festival", "Art Exhibits"],
        bestTime: "October",
        imageUrl: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg"
      },
      {
        id: 35,
        name: "Kadayawan Festival",
        location: "Davao City",
        description: "Harvest festival celebrating Mindanao's cultural heritage",
        activities: ["Cultural Shows", "Food Festival", "Floral Parade", "Street Dancing"],
        bestTime: "August",
        imageUrl: "https://images.pexels.com/photos/3419680/pexels-photo-3419680.jpeg"
      }
    ],
    alternatives: [
      {
        id: 36,
        name: "Pahiyas Festival",
        location: "Lucban, Quezon",
        description: "Colorful harvest festival with house decorations",
        activities: ["House Viewing", "Food Tasting", "Cultural Shows"],
        bestTime: "May",
        advantages: ["More authentic", "Less crowded"],
        comparedTo: "Panagbenga Festival",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg"
      },
      {
        id: 37,
        name: "Moriones Festival",
        location: "Marinduque",
        description: "Holy Week festival with masked penitents",
        activities: ["Processions", "Cultural Shows", "Religious Events"],
        bestTime: "Holy Week",
        advantages: ["Unique experience", "Cultural immersion"],
        comparedTo: "Sinulog Festival",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
      },
      {
        id: 38,
        name: "Lanzones Festival",
        location: "Camiguin",
        description: "Harvest festival celebrating the local lanzones fruit",
        activities: ["Fruit Festival", "Street Dancing", "Cultural Shows"],
        bestTime: "October",
        advantages: ["Unique theme", "Island experience"],
        comparedTo: "MassKara Festival",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg"
      },
      {
        id: 39,
        name: "Pintados Festival",
        location: "Tacloban City",
        description: "Body painting festival celebrating ancient tattooing traditions",
        activities: ["Body Painting", "Cultural Shows", "Parades"],
        bestTime: "June",
        advantages: ["Historical significance", "Unique tradition"],
        comparedTo: "Ati-Atihan Festival",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/2441454/pexels-photo-2441454.jpeg"
      },
      {
        id: 40,
        name: "Dinagyang Festival",
        location: "Iloilo City",
        description: "Religious and cultural festival honoring Santo Niño",
        activities: ["Street Dancing", "Religious Events", "Food Festival"],
        bestTime: "January",
        advantages: ["Less commercialized", "More intimate"],
        comparedTo: "Sinulog Festival",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/3419680/pexels-photo-3419680.jpeg"
      }
    ]
  },
  heritage: {
    popular: [
      {
        id: 41,
        name: "Vigan Heritage City",
        location: "Ilocos Sur",
        description: "UNESCO World Heritage site with Spanish colonial architecture",
        activities: ["Heritage Tours", "Kalesa Rides", "Cultural Shows", "Food Tours"],
        bestTime: "November to April",
        imageUrl: "https://images.pexels.com/photos/1174136/pexels-photo-1174136.jpeg"
      },
      {
        id: 42,
        name: "Intramuros",
        location: "Manila",
        description: "Historic walled city from Spanish colonial period",
        activities: ["Walking Tours", "Museum Visits", "Cultural Shows", "Food Tours"],
        bestTime: "December to February",
        imageUrl: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg"
      },
      {
        id: 43,
        name: "Rice Terraces",
        location: "Banaue, Ifugao",
        description: "UNESCO World Heritage rice terraces carved into mountains",
        activities: ["Trekking", "Cultural Tours", "Photography", "Village Visits"],
        bestTime: "December to May",
        imageUrl: "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg"
      },
      {
        id: 44,
        name: "San Agustin Church",
        location: "Manila",
        description: "UNESCO World Heritage baroque church",
        activities: ["Church Tours", "Museum Visits", "Historical Tours", "Photography"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg"
      },
      {
        id: 45,
        name: "Miagao Church",
        location: "Iloilo",
        description: "UNESCO World Heritage baroque church with unique facade",
        activities: ["Church Tours", "Historical Tours", "Photography", "Cultural Visits"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg"
      }
    ],
    alternatives: [
      {
        id: 46,
        name: "Las Casas Filipinas",
        location: "Bataan",
        description: "Heritage park with restored Spanish colonial houses",
        activities: ["Heritage Tours", "Cultural Shows", "Workshops"],
        bestTime: "November to February",
        advantages: ["Interactive experience", "Less crowded"],
        comparedTo: "Vigan Heritage City",
        priceRange: "$$$",
        imageUrl: "https://images.pexels.com/photos/1174136/pexels-photo-1174136.jpeg"
      },
      {
        id: 47,
        name: "Batanes Stone Houses",
        location: "Batanes",
        description: "Traditional Ivatan stone houses and landscapes",
        activities: ["Cultural Tours", "Village Visits", "Photography"],
        bestTime: "March to May",
        advantages: ["Unique architecture", "Pristine setting"],
        comparedTo: "Vigan Heritage City",
        priceRange: "$$$",
        imageUrl: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg"
      },
      {
        id: 48,
        name: "Mahatao Church",
        location: "Batanes",
        description: "Historic stone church with panoramic ocean views",
        activities: ["Church Visits", "Photography", "Cultural Tours"],
        bestTime: "March to May",
        advantages: ["Unique location", "Less touristy"],
        comparedTo: "San Agustin Church",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg"
      },
      {
        id: 49,
        name: "Pila Heritage Town",
        location: "Laguna",
        description: "Well-preserved Spanish colonial town",
        activities: ["Heritage Walks", "Museum Visits", "Food Tours"],
        bestTime: "December to February",
        advantages: ["Off the tourist trail", "Authentic atmosphere"],
        comparedTo: "Vigan Heritage City",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg"
      },
      {
        id: 50,
        name: "Nagcarlan Underground Cemetery",
        location: "Laguna",
        description: "Historic underground cemetery from Spanish era",
        activities: ["Guided Tours", "Photography", "Historical Tours"],
        bestTime: "November to February",
        advantages: ["Unique site", "Historical significance"],
        comparedTo: "San Agustin Church",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg"
      }
    ]
  },
  shopping: {
    popular: [
      {
        id: 51,
        name: "SM Mall of Asia",
        location: "Pasay City",
        description: "One of the largest malls in Asia with entertainment and dining",
        activities: ["Shopping", "Dining", "Entertainment", "Bay Views"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg"
      },
      {
        id: 52,
        name: "Divisoria Market",
        location: "Manila",
        description: "Famous bargain shopping district with wholesale prices",
        activities: ["Bargain Shopping", "Street Food", "Wholesale Shopping"],
        bestTime: "Weekdays",
        imageUrl: "https://images.pexels.com/photos/1368690/pexels-photo-1368690.jpeg"
      },
      {
        id: 53,
        name: "Greenhills Shopping Center",
        location: "San Juan",
        description: "Popular for electronics, fashion, and pearls",
        activities: ["Pearl Shopping", "Electronics", "Fashion Shopping"],
        bestTime: "Year-round",
        imageUrl: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg"
      },
      {
        id: 54,
        name: "BGC High Street",
        location: "Taguig",
        description: "Modern outdoor shopping and lifestyle destination",
        activities: ["Shopping", "Dining", "Art Viewing", "Cafes"],
        bestTime: "November to February",
        imageUrl: "https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg"
      },
      {
        id: 55,
        name: "Session Road",
        location: "Baguio City",
        description: "Historic shopping street with local goods and souvenirs",
        activities: ["Souvenir Shopping", "Local Crafts", "Cafe Hopping"],
        bestTime: "December to February",
        imageUrl: "https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg"
      }
    ],
    alternatives: [
      {
        id: 56,
        name: "Legazpi Sunday Market",
        location: "Makati",
        description: "Weekend market for artisanal and organic products",
        activities: ["Local Products", "Food Shopping", "Crafts"],
        bestTime: "Sundays",
        advantages: ["Unique items", "Local producers"],
        comparedTo: "SM Mall of Asia",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg"
      },
      {
        id: 57,
        name: "Baclaran Market",
        location: "Parañaque",
        description: "Local market known for affordable clothing and textiles",
        activities: ["Textile Shopping", "Bargain Hunting", "Street Food"],
        bestTime: "Weekdays",
        advantages: ["Better prices", "Local experience"],
        comparedTo: "Divisoria Market",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/1368690/pexels-photo-1368690.jpeg"
      },
      {
        id: 58,
        name: "Salcedo Saturday Market",
        location: "Makati",
        description: "Upscale weekend market with gourmet food and crafts",
        activities: ["Gourmet Food", "Artisanal Products", "Brunch"],
        bestTime: "Saturdays",
        advantages: ["High-quality products", "Relaxed atmosphere"],
        comparedTo: "BGC High Street",
        priceRange: "$$$",
        imageUrl: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg"
      },
      {
        id: 59,
        name: "Quiapo Market",
        location: "Manila",
        description: "Traditional market known for cameras and local goods",
        activities: ["Camera Shopping", "Cultural Items", "Street Food"],
        bestTime: "Weekdays",
        advantages: ["Authentic experience", "Specialty items"],
        comparedTo: "Greenhills Shopping Center",
        priceRange: "$",
        imageUrl: "https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg"
      },
      {
        id: 60,
        name: "Tiendesitas",
        location: "Pasig",
        description: "Filipino-themed shopping complex for local products",
        activities: ["Local Products", "Pet Shopping", "Filipino Food"],
        bestTime: "Year-round",
        advantages: ["Local products", "Less crowded"],
        comparedTo: "Greenhills Shopping Center",
        priceRange: "$$",
        imageUrl: "https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg"
      }
    ]
  }
};

// Update all image URLs in the data to use the fallback system
Object.keys(destinationData).forEach(category => {
  const data = destinationData[category as keyof typeof destinationData];
  
  // Update popular destinations
  data.popular = data.popular.map(dest => ({
    ...dest,
    imageUrl: getImageUrl(category, dest.imageUrl)
  }));
  
  // Update alternative destinations
  data.alternatives = data.alternatives.map(dest => ({
    ...dest,
    imageUrl: getImageUrl(category, dest.imageUrl)
  }));
});

export type Destination = {
  id: number;
  name: string;
  location: string;
  description: string;
  activities: string[];
  bestTime: string;
  imageUrl: string;
  advantages?: string[];
  comparedTo?: string;
  priceRange?: string;
};

export type ExperienceData = {
  popular: Destination[];
  alternatives: Destination[];
};