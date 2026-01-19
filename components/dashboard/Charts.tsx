'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Job } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface ChartsProps {
  jobs: Job[];
}

const STATUS_COLORS = {
  'Not Started': '#9ca3af',
  'In Progress': '#3b82f6',
  'Submitted': '#a855f7',
  'Under Review': '#eab308',
  'Interview': '#22c55e',
  'Rejected': '#ef4444',
  'Offer': '#10b981',
};

const INTEREST_COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#6b7280'];

export function Charts({ jobs }: ChartsProps) {
  // Status breakdown data
  const statusData = Object.entries(
    jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({
    status,
    count,
    fill: STATUS_COLORS[status as keyof typeof STATUS_COLORS] || '#94a3b8',
  }));

  // Interest level data
  const interestData = [5, 4, 3, 2, 1].map(level => ({
    level: `${level} - ${level === 5 ? 'Dream' : level === 4 ? 'High' : level === 3 ? 'Medium' : level === 2 ? 'Backup' : 'Practice'}`,
    count: jobs.filter(j => j.interest === level).length,
    fill: INTEREST_COLORS[5 - level],
  })).filter(d => d.count > 0);

  // Monthly activity data
  const monthlyData = jobs.reduce((acc, job) => {
    if (job.dateApplied) {
      const date = new Date(job.dateApplied);
      const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const monthlyChartData = Object.entries(monthlyData)
    .map(([month, count]) => ({ month, count }))
    .slice(-6); // Last 6 months

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Breakdown */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Interest Level Breakdown */}
      <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <CardHeader>
          <CardTitle className="text-lg">Interest Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interestData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis 
                dataKey="level" 
                className="fill-gray-600 dark:fill-gray-400"
                tick={{ fontSize: 12 }}
              />
              <YAxis className="fill-gray-600 dark:fill-gray-400" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'var(--tooltip-text)',
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {interestData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Activity */}
      {monthlyChartData.length > 0 && (
        <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="text-lg">Application Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="fill-gray-600 dark:fill-gray-400" />
                <YAxis className="fill-gray-600 dark:fill-gray-400" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'var(--tooltip-text)',
                  }}
                />
                <Bar dataKey="count" fill="#C8102E" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
