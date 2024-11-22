import { RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { User } from '@/types/user';

interface AIInsightsProps {
  user: User;
}

export default function AIInsightsCard({ user }: AIInsightsProps) {
  const generateInsights = (user: User) => {
    const insights = [
      {
        title: "Travel Style",
        content: `You enjoy ${user.visitedPlaces[0]?.type.toLowerCase()} destinations with cultural experiences.`
      },
      {
        title: "Next Adventure",
        content: `Based on your profile, consider visiting Batanes for its unique landscapes.`
      }
    ];
    return insights;
  };

  const insights = generateInsights(user);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <SparklesIcon className="w-4 h-4 text-blue-600" />
        <h2 className="text-sm font-semibold text-gray-900">AI Insights</h2>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-blue-100"
          >
            <h3 className="text-xs font-medium text-blue-900 mb-1 flex items-center gap-1.5">
              <RocketLaunchIcon className="w-3 h-3 text-blue-500" />
              {insight.title}
            </h3>
            <p className="text-xs text-gray-600">
              {insight.content}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-[10px] text-gray-500 flex items-center gap-1">
        <SparklesIcon className="w-2.5 h-2.5" />
        <span>AI-powered travel recommendations</span>
      </div>
    </div>
  );
} 