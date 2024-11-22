const GEMINI_API_KEY = 'AIzaSyBxWXimHVJ2sdPd57U95vV6C1Mbm72uuG8';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Curated image URLs for different destinations
const destinationImages = {
  beaches: [
    'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
    'https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg'
  ],
  mountains: [
    'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg',
    'https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg',
    'https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg',
    'https://images.pexels.com/photos/2562992/pexels-photo-2562992.jpeg',
    'https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg'
  ],
  food: [
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    'https://images.pexels.com/photos/1833337/pexels-photo-1833337.jpeg',
    'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg',
    'https://images.pexels.com/photos/3338497/pexels-photo-3338497.jpeg'
  ],
  festivals: [
    'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg',
    'https://images.pexels.com/photos/2441454/pexels-photo-2441454.jpeg',
    'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg',
    'https://images.pexels.com/photos/3419680/pexels-photo-3419680.jpeg'
  ],
  shopping: [
    'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg',
    'https://images.pexels.com/photos/1368690/pexels-photo-1368690.jpeg',
    'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
    'https://images.pexels.com/photos/2292953/pexels-photo-2292953.jpeg',
    'https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg'
  ],
  heritage: [
    'https://images.pexels.com/photos/1174136/pexels-photo-1174136.jpeg',
    'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg',
    'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg',
    'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg',
    'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg'
  ]
};

export interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  imageUrl: string;
  activities: string[];
  bestTime: string;
  isAlternative?: boolean;
  advantages?: string[];
  comparedTo?: string; // Reference to the popular destination it's an alternative to
  crowdLevel?: string;
  priceRange?: string;
}

export async function fetchDestinations(experienceType: string): Promise<Destination[]> {
  const prompt = `Give me a list of destinations in the Philippines for ${experienceType}, including both popular spots and their lesser-known alternatives. 

    For each destination, provide:
    - name
    - location (province/region)
    - a brief description
    - rating out of 5
    - list of activities (at least 3)
    - best time to visit

    For alternative destinations also include:
    - advantages (list at least 2 advantages)
    - which popular destination it's an alternative to
    - crowd level (must be either: "Low", "Medium", or "High")
    - price range (must be either: "$", "$$", or "$$$")
    
    Format the response as a JSON array. Each object must have these keys:
    - id (number)
    - name (string)
    - location (string)
    - description (string, max 100 chars)
    - rating (number between 1-5)
    - activities (array of strings)
    - bestTime (string)
    - isAlternative (boolean)
    - advantages (array of strings, required for alternatives)
    - comparedTo (string, required for alternatives)
    - crowdLevel (string, required for alternatives)
    - priceRange (string, required for alternatives)

    Make sure each popular destination has at least one alternative option.
    Ensure all required fields are included and properly formatted.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid API response structure');
    }

    const textContent = data.candidates[0].content.parts[0].text;
    console.log('Text Content:', textContent); // Debug log

    const jsonMatch = textContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No JSON found in:', textContent);
      throw new Error('No JSON data found in response');
    }

    try {
      const destinations: Destination[] = JSON.parse(jsonMatch[0]);
      console.log('Parsed Destinations:', destinations); // Debug log

      // Get the image array for this experience type
      const images = destinationImages[experienceType as keyof typeof destinationImages] || destinationImages.heritage;

      // Add images to destinations
      return destinations.map((dest, index) => ({
        ...dest,
        imageUrl: images[index % images.length]
      }));

    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Failed to parse JSON from response');
    }

  } catch (error) {
    console.error('Error fetching from Gemini:', error);
    // Return comprehensive fallback data
    return [
      {
        id: 1,
        name: "Boracay",
        location: "Aklan",
        description: "World-famous white beach paradise with crystal clear waters",
        rating: 4.9,
        imageUrl: destinationImages.beaches[0],
        activities: ["Swimming", "Island Hopping", "Water Sports"],
        bestTime: "November to May",
        isAlternative: false
      },
      {
        id: 2,
        name: "Calaguas Islands",
        location: "Camarines Norte",
        description: "Pristine beaches with powdery white sand and unspoiled beauty",
        rating: 4.7,
        imageUrl: destinationImages.beaches[1],
        activities: ["Camping", "Snorkeling", "Beach Activities"],
        bestTime: "March to May",
        isAlternative: true,
        advantages: [
          "Less crowded than Boracay",
          "More authentic island experience",
          "Lower costs"
        ],
        comparedTo: "Boracay",
        crowdLevel: "Low",
        priceRange: "$"
      },
      {
        id: 3,
        name: "El Nido",
        location: "Palawan",
        description: "Stunning limestone cliffs and crystal-clear lagoons",
        rating: 4.8,
        imageUrl: destinationImages.beaches[2],
        activities: ["Island Hopping", "Kayaking", "Snorkeling"],
        bestTime: "December to March",
        isAlternative: false
      },
      {
        id: 4,
        name: "Port Barton",
        location: "Palawan",
        description: "Quiet alternative to El Nido with similar natural beauty",
        rating: 4.6,
        imageUrl: destinationImages.beaches[3],
        activities: ["Island Hopping", "Diving", "Beach Relaxation"],
        bestTime: "December to March",
        isAlternative: true,
        advantages: [
          "More peaceful atmosphere",
          "Better value for money",
          "Less commercialized"
        ],
        comparedTo: "El Nido",
        crowdLevel: "Low",
        priceRange: "$$"
      }
    ].filter(dest => {
      // If it's beaches, return all. Otherwise return just 2 items to avoid confusion
      if (experienceType === 'beaches') return true;
      return dest.id <= 2;
    });
  }
}

export async function fetchDestinationDetails(destinationId: string) {
  const prompt = `Generate detailed information about this Philippine destination with ID ${destinationId}.
    Include the following sections:
    - A comprehensive description (at least 200 words)
    - Best time to visit with weather conditions
    - Top activities and experiences (at least 5)
    - Local cuisine highlights
    - Travel tips and recommendations
    - How to get there
    - Accommodation options (budget, mid-range, luxury)
    
    Format the response as a JSON object with these keys:
    - name (string)
    - description (string)
    - bestTimeToVisit (object with 'period' and 'details' keys)
    - activities (array of objects with 'name' and 'description' keys)
    - cuisine (array of objects with 'name' and 'description' keys)
    - travelTips (array of strings)
    - transportation (object with 'howToGetThere' and 'localTransport' keys)
    - accommodation (object with 'budget', 'midRange', and 'luxury' arrays)
    
    Make it detailed and informative for travelers. Ensure the response is valid JSON format.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid API response structure');
    }

    const textContent = data.candidates[0].content.parts[0].text;
    
    try {
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', textContent);
        throw new Error('No JSON data found in response');
      }

      const cleanedJson = jsonMatch[0].replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
      const parsedData = JSON.parse(cleanedJson);

      // Ensure all arrays are properly formatted
      return {
        name: parsedData.name || "Unknown Destination",
        description: parsedData.description || "",
        bestTimeToVisit: {
          period: parsedData.bestTimeToVisit?.period || "",
          details: parsedData.bestTimeToVisit?.details || ""
        },
        activities: Array.isArray(parsedData.activities) ? parsedData.activities : [],
        cuisine: Array.isArray(parsedData.cuisine) ? parsedData.cuisine : [],
        travelTips: Array.isArray(parsedData.travelTips) ? parsedData.travelTips : [],
        transportation: {
          howToGetThere: typeof parsedData.transportation?.howToGetThere === 'string' 
            ? parsedData.transportation.howToGetThere 
            : "Information not available",
          localTransport: typeof parsedData.transportation?.localTransport === 'string'
            ? parsedData.transportation.localTransport
            : "Information not available"
        },
        accommodation: {
          budget: Array.isArray(parsedData.accommodation?.budget) 
            ? parsedData.accommodation.budget 
            : [],
          midRange: Array.isArray(parsedData.accommodation?.midRange)
            ? parsedData.accommodation.midRange
            : [],
          luxury: Array.isArray(parsedData.accommodation?.luxury)
            ? parsedData.accommodation.luxury
            : []
        }
      };

    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Failed to parse destination details');
    }

  } catch (error) {
    console.error('Error fetching destination details:', error);
    // Return fallback data with proper structure
    return {
      name: "Sample Destination",
      description: "A beautiful destination in the Philippines...",
      bestTimeToVisit: {
        period: "November to April",
        details: "The dry season offers perfect weather conditions..."
      },
      activities: [
        {
          name: "Island Hopping",
          description: "Explore nearby islands and hidden coves..."
        },
        {
          name: "Water Sports",
          description: "Try various water activities..."
        }
      ],
      cuisine: [
        {
          name: "Local Seafood",
          description: "Fresh catches prepared in traditional style..."
        },
        {
          name: "Tropical Fruits",
          description: "Sample fresh local fruits..."
        }
      ],
      travelTips: [
        "Book accommodations in advance",
        "Bring reef-safe sunscreen",
        "Stay hydrated"
      ],
      transportation: {
        howToGetThere: "Accessible via direct flights...",
        localTransport: "Local transportation options include..."
      },
      accommodation: {
        budget: ["Backpacker hostels", "Budget guesthouses"],
        midRange: ["Boutique hotels", "Beach resorts"],
        luxury: ["5-star resorts", "Private villas"]
      }
    };
  }
} 