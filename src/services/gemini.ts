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

interface ItineraryParams {
  destination: string;
  startDate: string;
  duration: string;
  budget: string;
  travelStyle: string;
  groupSize: string;
  otherPreferences: string;
  preferences: {
    accommodation: string;
    transportation: string;
    food: string;
  };
}

export async function generateItinerary(params: ItineraryParams) {
  if (!params.destination) {
    throw new Error('Destination is required');
  }

  // Find destination details from our data
  let destinationDetails: Destination | undefined;
  for (const category of Object.values(destinationData)) {
    const found = [...category.popular, ...category.alternatives]
      .find(dest => dest.id.toString() === params.destination);
    if (found) {
      destinationDetails = found;
      break;
    }
  }

  if (!destinationDetails) {
    throw new Error('Invalid destination selected');
  }

  const prompt = `Generate a detailed ${params.duration}-day itinerary for ${destinationDetails.name}, ${destinationDetails.location} in the Philippines.

  Destination Details:
  - Name: ${destinationDetails.name}
  - Location: ${destinationDetails.location}
  - Description: ${destinationDetails.description}
  - Available Activities: ${destinationDetails.activities.join(', ')}
  - Best Time to Visit: ${destinationDetails.bestTime}

  Trip Parameters:
  - Start Date: ${params.startDate}
  - Duration: ${params.duration} days
  - Budget: ₱${params.budget} per day
  - Travel Style: ${params.travelStyle}
  - Group Size: ${params.groupSize} people
  - Accommodation Preference: ${params.preferences.accommodation}
  - Transportation Preference: ${params.preferences.transportation}
  - Food Preference: ${params.preferences.food}
  - Additional Preferences: ${params.otherPreferences}

  Create a comprehensive day-by-day itinerary that:
  1. Incorporates the available activities mentioned above
  2. Considers local transportation times and logistics
  3. Includes specific local food recommendations
  4. Accounts for the best time to visit
  5. Matches the specified travel style and preferences
  
  Return ONLY a JSON object with this exact structure, no additional text:
  {
    "title": "string",
    "overview": "string",
    "days": [
      {
        "day": number,
        "activities": [
          {
            "time": "string (e.g., '09:00 AM')",
            "activity": "string",
            "description": "string",
            "location": "string",
            "tips": "string (optional)"
          }
        ]
      }
    ],
    "additionalTips": ["string"],
    "estimatedBudget": {
      "total": "string (e.g., '₱15,000')",
      "breakdown": [
        {
          "category": "string",
          "amount": "string",
          "details": "string"
        }
      ]
    }
  }`;

  console.log('=== PROMPT SENT TO API ===');
  console.log(prompt);
  console.log('========================\n');

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
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
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
    
    console.log('=== RAW API RESPONSE ===');
    console.log(textContent);
    console.log('========================\n');
    
    // More robust JSON extraction
    let jsonContent;
    try {
      // First attempt: Try to find JSON object with regex
      const jsonMatch = textContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log('=== MATCHED JSON ===');
        console.log(jsonMatch[0]);
        console.log('===================\n');

        const cleanedJson = jsonMatch[0]
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
          .replace(/\\n/g, " ")
          .replace(/\s+/g, " ")
          .replace(/,\s*([}\]])/g, "$1") // Remove trailing commas
          .trim();
        
        console.log('=== CLEANED JSON ===');
        console.log(cleanedJson);
        console.log('===================\n');
        
        jsonContent = JSON.parse(cleanedJson);
      } else {
        // Second attempt: Try to parse the entire response
        console.log('No JSON match found, trying to parse entire response');
        jsonContent = JSON.parse(textContent);
      }
    } catch (parseError) {
      console.error('First Parse Error:', parseError);
      
      // Third attempt: Try to fix common JSON issues
      try {
        const fixedContent = textContent
          .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
          .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // Quote unquoted keys
          .replace(/'/g, '"') // Replace single quotes with double quotes
          .replace(/\n/g, ' ') // Remove newlines
          .trim();
        
        console.log('=== FIXED CONTENT ===');
        console.log(fixedContent);
        console.log('=====================\n');
        
        jsonContent = JSON.parse(fixedContent);
      } catch (finalError) {
        console.error('Final Parse Error:', finalError);
        throw new Error('Failed to parse API response as JSON');
      }
    }

    // Validate the parsed JSON structure
    if (!jsonContent.title || !jsonContent.overview || !Array.isArray(jsonContent.days)) {
      throw new Error('Invalid itinerary data structure');
    }

    // Ensure the response matches expected structure
    return {
      title: String(jsonContent.title),
      overview: String(jsonContent.overview),
      days: Array.isArray(jsonContent.days) ? jsonContent.days.map(day => ({
        day: Number(day.day),
        activities: Array.isArray(day.activities) ? day.activities.map(activity => ({
          time: String(activity.time || ''),
          activity: String(activity.activity || ''),
          description: String(activity.description || ''),
          location: activity.location ? String(activity.location) : undefined,
          tips: activity.tips ? String(activity.tips) : undefined
        })) : []
      })) : [],
      additionalTips: Array.isArray(jsonContent.additionalTips) 
        ? jsonContent.additionalTips.map(tip => String(tip))
        : [],
      estimatedBudget: {
        total: String(jsonContent.estimatedBudget?.total || '₱0'),
        breakdown: Array.isArray(jsonContent.estimatedBudget?.breakdown)
          ? jsonContent.estimatedBudget.breakdown.map(item => ({
              category: String(item.category || ''),
              amount: String(item.amount || '₱0'),
              details: String(item.details || '')
            }))
          : []
      }
    };

  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error; // Re-throw the error to be handled by the UI
  }
} 