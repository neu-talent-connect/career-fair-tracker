'use client';

import { useState } from 'react';
import { useAppData } from '@/hooks/useAppData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Trash2, Mail, Linkedin, Phone, Calendar, AlertCircle } from 'lucide-react';
import { formatDate, getPriorityColor, getStatusColor, getTodayDate, isOverdue } from '@/lib/utils';
import { Contact, FollowUp } from '@/types';

export default function NetworkingPage() {
  const { data, addContact, deleteContact, addFollowUp, updateFollowUp, deleteFollowUp } = useAppData();
  const [activeTab, setActiveTab] = useState<'contacts' | 'followups'>('contacts');
  const [contactForm, setContactForm] = useState<Partial<Contact>>({
    type: 'Career Fair',
    strength: 'Cold',
  });
  const [followupForm, setFollowupForm] = useState<Partial<FollowUp>>({
    type: 'Thank You',
    priority: 'Medium',
    status: 'Pending',
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name) return;
    
    addContact(contactForm as any);
    setContactForm({ type: 'Career Fair', strength: 'Cold' });
  };

  const handleFollowupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followupForm.company || !followupForm.dueDate) return;
    
    addFollowUp(followupForm as any);
    setFollowupForm({ type: 'Thank You', priority: 'Medium', status: 'Pending' });
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  const handleDeleteFollowup = (id: string) => {
    if (confirm('Are you sure you want to delete this follow-up?')) {
      deleteFollowUp(id);
    }
  };

  const sortedContacts = [...data.contacts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const sortedFollowups = [...data.followups].sort((a, b) => {
    // Sort by status (pending first), then by due date
    if (a.status !== b.status) {
      return a.status === 'Pending' ? -1 : 1;
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const pendingFollowups = sortedFollowups.filter(f => f.status === 'Pending');
  const overdueFollowups = pendingFollowups.filter(f => isOverdue(f.dueDate));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Networking
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage contacts and follow-up reminders in one place.
        </p>
      </div>

      {/* Alert for overdue follow-ups */}
      {overdueFollowups.length > 0 && (
        <Card className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 animate-fade-in">
          <div className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-200">
                {overdueFollowups.length} Overdue Follow-up{overdueFollowups.length > 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                You have follow-ups that need attention!
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <Button
          variant={activeTab === 'contacts' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts ({data.contacts.length})
        </Button>
        <Button
          variant={activeTab === 'followups' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('followups')}
        >
          Follow-ups ({pendingFollowups.length})
        </Button>
      </div>

      {/* Contacts Tab */}
      {activeTab === 'contacts' && (
        <>
          {/* Add Contact Form */}
          <Card className="mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <form onSubmit={handleContactSubmit} className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Add New Contact
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <Input
                  label="Name"
                  required
                  placeholder="e.g., John Doe"
                  value={contactForm.name || ''}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
                
                <Input
                  label="Company"
                  placeholder="e.g., Microsoft"
                  value={contactForm.company || ''}
                  onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                />

                <Input
                  label="Position"
                  placeholder="e.g., Senior Recruiter"
                  value={contactForm.position || ''}
                  onChange={(e) => setContactForm({ ...contactForm, position: e.target.value })}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="john.doe@company.com"
                  value={contactForm.email || ''}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />

                <Input
                  label="LinkedIn URL"
                  type="url"
                  placeholder="https://linkedin.com/in/johndoe"
                  value={contactForm.linkedin || ''}
                  onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                />

                <Input
                  label="Phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={contactForm.phone || ''}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                />

                <Select
                  label="Connection Type"
                  value={contactForm.type || 'Career Fair'}
                  onChange={(e) => setContactForm({ ...contactForm, type: e.target.value as any })}
                >
                  <option value="Career Fair">Career Fair</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Referral">Referral</option>
                  <option value="Cold Outreach">Cold Outreach</option>
                  <option value="Event">Event</option>
                </Select>

                <Select
                  label="Relationship Strength"
                  value={contactForm.strength || 'Cold'}
                  onChange={(e) => setContactForm({ ...contactForm, strength: e.target.value as any })}
                >
                  <option value="Cold">Cold</option>
                  <option value="Warm">Warm</option>
                  <option value="Hot">Hot</option>
                </Select>
              </div>

              <Textarea
                label="Notes"
                placeholder="Personal details, conversation topics, preferences..."
                value={contactForm.notes || ''}
                onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                className="mb-4"
              />

              <Button type="submit">
                Add Contact
              </Button>
            </form>
          </Card>

          {/* Contacts List */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {sortedContacts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No contacts added yet. Start networking!
                </p>
              </Card>
            ) : (
              sortedContacts.map((contact, index) => (
                <Card 
                  key={contact.id} 
                  className="p-6 hover:shadow-lg transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {contact.name}
                          </h3>
                          {contact.company && (
                            <p className="text-gray-600 dark:text-gray-400">
                              {contact.position ? `${contact.position} at ` : ''}{contact.company}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{contact.type}</Badge>
                          <Badge 
                            variant={
                              contact.strength === 'Hot' ? 'success' : 
                              contact.strength === 'Warm' ? 'warning' : 
                              'default'
                            }
                          >
                            {contact.strength}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm mb-3">
                        {contact.email && (
                          <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-northeastern-red transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </a>
                        )}
                        {contact.linkedin && (
                          <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-northeastern-red transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                          </a>
                        )}
                        {contact.phone && (
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-northeastern-red transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </a>
                        )}
                      </div>

                      {contact.notes && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {contact.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </>
      )}

      {/* Follow-ups Tab */}
      {activeTab === 'followups' && (
        <>
          {/* Add Follow-up Form */}
          <Card className="mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <form onSubmit={handleFollowupSubmit} className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Add Follow-Up Reminder
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  label="Company"
                  required
                  placeholder="e.g., Meta"
                  value={followupForm.company || ''}
                  onChange={(e) => setFollowupForm({ ...followupForm, company: e.target.value })}
                />
                
                <Input
                  label="Contact Person"
                  placeholder="e.g., Sarah Johnson"
                  value={followupForm.contact || ''}
                  onChange={(e) => setFollowupForm({ ...followupForm, contact: e.target.value })}
                />

                <Select
                  label="Task Type"
                  value={followupForm.type || 'Thank You'}
                  onChange={(e) => setFollowupForm({ ...followupForm, type: e.target.value as any })}
                >
                  <option value="Thank You">Thank You Email</option>
                  <option value="Check-in">Check-in</option>
                  <option value="Application Status">Application Status</option>
                  <option value="LinkedIn Connection">LinkedIn Connection</option>
                </Select>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      required
                      value={followupForm.dueDate || ''}
                      onChange={(e) => setFollowupForm({ ...followupForm, dueDate: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setFollowupForm({ ...followupForm, dueDate: getTodayDate() })}
                    >
                      Today
                    </Button>
                  </div>
                </div>

                <Select
                  label="Priority"
                  value={followupForm.priority || 'Medium'}
                  onChange={(e) => setFollowupForm({ ...followupForm, priority: e.target.value as any })}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>

                <Select
                  label="Status"
                  value={followupForm.status || 'Pending'}
                  onChange={(e) => setFollowupForm({ ...followupForm, status: e.target.value as any })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Select>
              </div>

              <div className="mt-4">
                <Button type="submit">
                  Add Follow-Up
                </Button>
              </div>
            </form>
          </Card>

          {/* Follow-ups List */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {sortedFollowups.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No follow-ups scheduled yet.
                </p>
              </Card>
            ) : (
              sortedFollowups.map((followup, index) => {
                const overdue = followup.status === 'Pending' && isOverdue(followup.dueDate);
                return (
                  <Card 
                    key={followup.id} 
                    className={`p-6 hover:shadow-lg transition-all animate-slide-up ${
                      overdue ? 'border-red-300 dark:border-red-800' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {followup.company}
                              </h3>
                              {overdue && (
                                <Badge variant="danger" className="flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Overdue
                                </Badge>
                              )}
                            </div>
                            {followup.contact && (
                              <p className="text-gray-600 dark:text-gray-400">
                                Contact: {followup.contact}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{followup.type}</Badge>
                          <Badge className={getPriorityColor(followup.priority)}>
                            {followup.priority} Priority
                          </Badge>
                          <Badge className={getStatusColor(followup.status)}>
                            {followup.status}
                          </Badge>
                          <Badge variant="default" className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Due: {formatDate(followup.dueDate)}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {followup.status === 'Pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateFollowUp(followup.id, { status: 'Completed' })}
                          >
                            Mark Complete
                          </Button>
                        )}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteFollowup(followup.id)}
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
        </>
      )}
    </div>
  );
}
