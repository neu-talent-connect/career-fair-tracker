'use client';

import { useState } from 'react';
import { useAppData } from '@/hooks/useAppData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Trash2, Calendar } from 'lucide-react';
import { formatDate, getInterestDisplay, getTodayDate } from '@/lib/utils';
import { Company } from '@/types';

export default function CareerFairsPage() {
  const { data, addCompany, updateCompany, deleteCompany } = useAppData();
  const [formData, setFormData] = useState<Partial<Company>>({
    interest: 3,
    optFriendly: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    addCompany(formData as any);
    setFormData({ interest: 3, optFriendly: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this company?')) {
      deleteCompany(id);
    }
  };

  const sortedCompanies = [...data.companies].sort((a, b) => 
    b.interest - a.interest
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Career Fair Tracker
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track companies you meet at career fairs before applying.
        </p>
      </div>

      {/* Add Company Form */}
      <Card className="mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Add Company from Career Fair
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Input
              label="Company Name"
              required
              placeholder="e.g., Google"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            
            <Select
              label="Industry"
              value={formData.industry || ''}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            >
              <option value="">Select Industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Consulting">Consulting</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Education">Education</option>
              <option value="Non-profit">Non-profit</option>
              <option value="Other">Other</option>
            </Select>

            <Select
              label="Interest Level (1-5)"
              value={formData.interest || 3}
              onChange={(e) => setFormData({ ...formData, interest: Number(e.target.value) })}
            >
              <option value="5">5 - Extremely Interested</option>
              <option value="4">4 - Very Interested</option>
              <option value="3">3 - Interested</option>
              <option value="2">2 - Somewhat Interested</option>
              <option value="1">1 - Low Interest</option>
            </Select>

            <Input
              label="Booth Number/Session Time"
              placeholder="e.g., Booth 42 or 2:00 PM Virtual"
              value={formData.booth || ''}
              onChange={(e) => setFormData({ ...formData, booth: e.target.value })}
            />

            <Input
              label="Recruiter Name"
              placeholder="e.g., Jane Smith"
              value={formData.recruiter || ''}
              onChange={(e) => setFormData({ ...formData, recruiter: e.target.value })}
            />

            <Input
              label="Position of Interest"
              placeholder="e.g., Software Engineer Co-op"
              value={formData.position || ''}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />

            <Select
              label="OPT/CPT Friendly?"
              value={formData.optFriendly || ''}
              onChange={(e) => setFormData({ ...formData, optFriendly: e.target.value as any })}
            >
              <option value="">Unknown</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Case-by-case">Case by Case</option>
            </Select>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Application Deadline
              </label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={formData.deadline || ''}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setFormData({ ...formData, deadline: getTodayDate() })}
                >
                  Today
                </Button>
              </div>
            </div>
          </div>

          <Textarea
            label="Key Takeaways"
            placeholder="What excited you about this company? Any concerns?"
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="mb-4"
          />

          <Button type="submit">
            Add Company
          </Button>
        </form>
      </Card>

      {/* Companies List */}
      <div className="space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
        {sortedCompanies.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No companies added yet. Add your first company above!
            </p>
          </Card>
        ) : (
          sortedCompanies.map((company, index) => {
            const interestDisplay = getInterestDisplay(company.interest);
            return (
              <Card 
                key={company.id} 
                className="p-6 hover:shadow-lg transition-all animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`text-2xl font-bold ${interestDisplay.color}`}>
                        {company.interest}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {company.name}
                        </h3>
                        {company.industry && (
                          <Badge variant="secondary" className="mb-2">
                            {company.industry}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {company.position && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Position: </span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {company.position}
                          </span>
                        </div>
                      )}
                      {company.recruiter && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Recruiter: </span>
                          <span className="text-gray-900 dark:text-white">
                            {company.recruiter}
                          </span>
                        </div>
                      )}
                      {company.booth && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Booth/Session: </span>
                          <span className="text-gray-900 dark:text-white">
                            {company.booth}
                          </span>
                        </div>
                      )}
                      {company.optFriendly && (
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">OPT/CPT: </span>
                          <Badge 
                            variant={company.optFriendly === 'Yes' ? 'success' : 'default'}
                          >
                            {company.optFriendly}
                          </Badge>
                        </div>
                      )}
                      {company.deadline && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-500 dark:text-gray-400">Deadline: </span>
                          <span className="text-gray-900 dark:text-white">
                            {formatDate(company.deadline)}
                          </span>
                        </div>
                      )}
                    </div>

                    {company.notes && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {company.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(company.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
