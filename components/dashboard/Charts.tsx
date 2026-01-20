'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Job } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';
import { Select } from '@/components/ui/Select';
import { Calendar, TrendingUp, Target } from 'lucide-react';

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

type InsightView = 'deadlines' | 'velocity' | 'metrics';

export function Charts({ jobs }: ChartsProps) {
  const [insightView, setInsightView] = useState<InsightView>('deadlines');
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

  // Insights Panel Data Processing
  
  // Deadlines data
  const now = new Date();
  const upcomingDeadlines = jobs
    .filter(j => j.deadline)
    .map(j => ({
      ...j,
      daysUntil: Math.ceil((new Date(j.deadline!).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    }))
    .filter(j => j.daysUntil >= 0 && j.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const deadlineData = [
    { 
      category: 'This Week', 
      count: upcomingDeadlines.filter(j => j.daysUntil <= 7).length,
      fill: '#ef4444' 
    },
    { 
      category: 'Next Week', 
      count: upcomingDeadlines.filter(j => j.daysUntil > 7 && j.daysUntil <= 14).length,
      fill: '#f59e0b' 
    },
    { 
      category: 'This Month', 
      count: upcomingDeadlines.filter(j => j.daysUntil > 14).length,
      fill: '#10b981' 
    },
  ];

  // Velocity data (last 8 weeks)
  const weeklyData: Record<string, number> = {};
  const weeksAgo = 8;
  for (let i = weeksAgo - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - (i * 7));
    const weekLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    weeklyData[weekLabel] = 0;
  }
  
  jobs.forEach(job => {
    if (job.dateApplied) {
      const appDate = new Date(job.dateApplied);
      const diffTime = now.getTime() - appDate.getTime();
      const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
      if (diffWeeks < weeksAgo) {
        const date = new Date();
        date.setDate(date.getDate() - (diffWeeks * 7));
        const weekLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const key = Object.keys(weeklyData).find(k => k === weekLabel);
        if (key) weeklyData[key]++;
      }
    }
  });

  const velocityData = Object.entries(weeklyData).map(([week, count]) => ({ week, count }));

  // Success metrics
  const totalApps = jobs.length;
  const withResponses = jobs.filter(j => 
    j.status === 'Under Review' || 
    j.status === 'Interview' || 
    j.status === 'Offer' || 
    j.status === 'Rejected'
  ).length;
  const interviews = jobs.filter(j => j.status === 'Interview' || j.status === 'Offer').length;
  const offers = jobs.filter(j => j.status === 'Offer').length;
  
  const responseRate = totalApps > 0 ? Math.round((withResponses / totalApps) * 100) : 0;
  const interviewRate = totalApps > 0 ? Math.round((interviews / totalApps) * 100) : 0;
  const offerRate = totalApps > 0 ? Math.round((offers / totalApps) * 100) : 0;

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

      {/* Insights Panel */}
      <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {insightView === 'deadlines' && <><Calendar className="w-5 h-5" /> Upcoming Deadlines</>}
              {insightView === 'velocity' && <><TrendingUp className="w-5 h-5" /> Application Velocity</>}
              {insightView === 'metrics' && <><Target className="w-5 h-5" /> Success Metrics</>}
            </CardTitle>
            <Select 
              value={insightView} 
              onChange={(e) => setInsightView(e.target.value as InsightView)}
              className="w-40"
            >
              <option value="deadlines">Deadlines</option>
              <option value="velocity">Velocity</option>
              <option value="metrics">Metrics</option>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Deadlines View */}
          {insightView === 'deadlines' && (
            <div>
              {upcomingDeadlines.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={deadlineData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                      <XAxis type="number" className="fill-gray-600 dark:fill-gray-400" />
                      <YAxis type="category" dataKey="category" className="fill-gray-600 dark:fill-gray-400" width={100} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--tooltip-bg)',
                          border: 'none',
                          borderRadius: '8px',
                          color: 'var(--tooltip-text)',
                        }}
                        formatter={(value: number) => [`${value} application${value !== 1 ? 's' : ''}`, 'Count']}
                      />
                      <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                        {deadlineData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Next Deadline:
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">{upcomingDeadlines[0].company}</span>
                      {upcomingDeadlines[0].title && ` - ${upcomingDeadlines[0].title}`}
                      <span className="ml-2 text-northeastern-red font-medium">
                        ({upcomingDeadlines[0].daysUntil} day{upcomingDeadlines[0].daysUntil !== 1 ? 's' : ''})
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-[280px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No upcoming deadlines in the next 30 days</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Velocity View */}
          {insightView === 'velocity' && (
            <div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={velocityData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8102E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#C8102E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="week" className="fill-gray-600 dark:fill-gray-400" tick={{ fontSize: 11 }} />
                  <YAxis className="fill-gray-600 dark:fill-gray-400" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'var(--tooltip-text)',
                    }}
                    formatter={(value: number) => [`${value} application${value !== 1 ? 's' : ''}`, 'This Week']}
                  />
                  <Area type="monotone" dataKey="count" stroke="#C8102E" fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total (8 weeks)</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {velocityData.reduce((sum, d) => sum + d.count, 0)}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Weekly Avg</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(velocityData.reduce((sum, d) => sum + d.count, 0) / 8).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metrics View */}
          {insightView === 'metrics' && (
            <div className="h-[300px] flex flex-col justify-center">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Response Rate</p>
                      <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{responseRate}%</p>
                    </div>
                    <div className="text-blue-600 dark:text-blue-400">
                      <div className="text-right text-sm">{withResponses}/{totalApps}</div>
                      <div className="text-xs text-blue-500 dark:text-blue-400">replies</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 dark:text-green-300 font-medium">Interview Rate</p>
                      <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-1">{interviewRate}%</p>
                    </div>
                    <div className="text-green-600 dark:text-green-400">
                      <div className="text-right text-sm">{interviews}/{totalApps}</div>
                      <div className="text-xs text-green-500 dark:text-green-400">interviews</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Offer Rate</p>
                      <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">{offerRate}%</p>
                    </div>
                    <div className="text-emerald-600 dark:text-emerald-400">
                      <div className="text-right text-sm">{offers}/{totalApps}</div>
                      <div className="text-xs text-emerald-500 dark:text-emerald-400">offers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
