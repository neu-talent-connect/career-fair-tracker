'use client';

import { Card } from '@/components/ui/Card';
import { TrendingUp, Send, Calendar, Award } from 'lucide-react';
import { Job } from '@/types';

interface StatsCardsProps {
  jobs: Job[];
}

export function StatsCards({ jobs }: StatsCardsProps) {
  const stats = {
    total: jobs.length,
    submitted: jobs.filter(j => j.status === 'Submitted' || j.status === 'Under Review' || j.status === 'Interview' || j.status === 'Offer').length,
    interviews: jobs.filter(j => j.status === 'Interview').length,
    offers: jobs.filter(j => j.status === 'Offer').length,
  };

  const cards = [
    {
      title: 'Total Applications',
      value: stats.total,
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Submitted',
      value: stats.submitted,
      icon: Send,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Interviews',
      value: stats.interviews,
      icon: Calendar,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Offers',
      value: stats.offers,
      icon: Award,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card 
            key={card.title} 
            className="hover:shadow-lg transition-shadow animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
