import { destinationData } from '@/data/destinations';

// Use environment variables
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = process.env.NEXT_PUBLIC_GEMINI_API_URL;

// Add interfaces for better type safety
interface Activity {
  name: string;
  description: string;
}

interface CuisineItem {
  name: string;
  description: string;
}

interface ParsedData {
  name: string;
  location: string;
  description: string;
  bestTimeToVisit: {
    period: string;
    details: string;
  };
  activities: Activity[];
  cuisine: CuisineItem[];
  travelTips: string[];
  transportation: {
    howToGetThere: string;
    localTransport: string;
  };
  accommodation: {
    budget: string[];
    midRange: string[];
    luxury: string[];
  };
}

// Rest of your existing interfaces and destination images...

// Add validation for environment variables
const validateEnvironmentVariables = () => {
  if (!GEMINI_API_KEY || !GEMINI_API_URL) {
    throw new Error('Missing required environment variables for Gemini API');
  }
};

export async function fetchDestinations(experienceType: string): Promise<Destination[]> {
  validateEnvironmentVariables();
  
  // Rest of fetchDestinations implementation...
}

export async function fetchDestinationDetails(destinationId: string): Promise<DestinationDetails> {
  validateEnvironmentVariables();

  // First try to find the destination in our existing data
  for (const category of Object.values(destinationData)) {
    const destination = [...category.popular, ...category.alternatives]
      .find(dest => dest.id.toString() === destinationId);
    
    if (destination) {
      return {
        name: destination.name,
        location: destination.location,
        description: destination.description,
        imageUrl: destination.imageUrl,
        bestTimeToVisit: {
          period: destination.bestTime,
          details: `Best time to visit ${destination.name} is during ${destination.bestTime} when the weather is most favorable for all activities.`
        },
        activities: destination.activities.map(activity => ({
          name: activity,
          description: `Experience ${activity} in ${destination.name}`
        })),
        cuisine: [
          {
            name: "Local Specialties",
            description: `Try the local delicacies and fresh seafood in ${destination.name}`
          },
          {
            name: "Street Food",
            description: "Experience authentic Filipino street food and snacks"
          }
        ],
        travelTips: [
          `Best to visit ${destination.name} during ${destination.bestTime}`,
          "Book accommodations in advance",
          "Bring appropriate clothing and gear",
          "Learn basic Filipino phrases",
          "Always carry cash for local purchases"
        ],
        transportation: {
          howToGetThere: `You can reach ${destination.name} through ${destination.location}'s main transportation hubs.`,
          localTransport: "Local transportation options include tricycles, jeepneys, and boats for island destinations."
        },
        accommodation: {
          budget: ["Local guesthouses", "Backpacker hostels", "Homestays"],
          midRange: ["Boutique hotels", "Beach resorts", "City hotels"],
          luxury: ["5-star resorts", "Luxury villas", "Premium hotels"]
        }
      };
    }
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate detailed information about this Philippine destination with ID ${destinationId}...`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      throw new Error('Invalid API response structure');
    }

    try {
      const cleanedJson = textContent
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        .replace(/\\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const parsedData = JSON.parse(cleanedJson) as ParsedData;

      return {
        name: parsedData.name,
        location: parsedData.location,
        description: parsedData.description,
        bestTimeToVisit: parsedData.bestTimeToVisit,
        activities: parsedData.activities.map(activity => ({
          name: String(activity.name),
          description: String(activity.description)
        })),
        cuisine: parsedData.cuisine.map(item => ({
          name: String(item.name),
          description: String(item.description)
        })),
        travelTips: parsedData.travelTips.map(String),
        transportation: {
          howToGetThere: String(parsedData.transportation.howToGetThere),
          localTransport: String(parsedData.transportation.localTransport)
        },
        accommodation: {
          budget: parsedData.accommodation.budget.map(String),
          midRange: parsedData.accommodation.midRange.map(String),
          luxury: parsedData.accommodation.luxury.map(String)
        }
      };

    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Raw content:', textContent);
      throw new Error('Failed to parse destination details');
    }

  } catch (error) {
    console.error('Error fetching destination details:', error);
    return {
      name: "Sample Destination",
      location: "Sample Location",
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

// Rest of your code (generateItinerary function) remains the same... 