'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useUndo } from '@/hooks/useUndo';
import { useToast } from '@/components/Toast';
import { AppData, Job, Company, Contact, FollowUp, Interview } from '@/types';
import { generateId } from '@/lib/utils';

const STORAGE_KEY = 'careerFairData';

const initialData: AppData = {
  companies: [],
  contacts: [],
  jobs: [],
  followups: [],
  interviews: [],
};

interface AppDataContextType {
  data: AppData;
  // Jobs
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => Job;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  // Companies
  addCompany: (company: Omit<Company, 'id' | 'createdAt'>) => Company;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  // Contacts
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => Contact;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  // Follow-ups
  addFollowUp: (followup: Omit<FollowUp, 'id' | 'createdAt'>) => FollowUp;
  updateFollowUp: (id: string, updates: Partial<FollowUp>) => void;
  deleteFollowUp: (id: string) => void;
  // Interviews
  addInterview: (interview: Omit<Interview, 'id' | 'createdAt'>) => Interview;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
  // Bulk
  clearAllData: () => void;
  loadSampleData: () => void;
  // Undo
  undo: () => void;
  canUndo: boolean;
  undoCount: number;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useLocalStorage<AppData>(STORAGE_KEY, initialData);
  const { addToUndoStack, popFromUndoStack, canUndo, undoCount } = useUndo();
  const { showToast } = useToast();

  // Jobs CRUD
  const addJob = (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newJob: Job = {
      ...job,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setData(prev => ({
      ...prev,
      jobs: [...prev.jobs, newJob],
    }));
    
    return newJob;
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setData(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === id
          ? { ...job, ...updates, updatedAt: new Date().toISOString() }
          : job
      ),
    }));
  };

  const deleteJob = (id: string) => {
    const job = data.jobs.find(j => j.id === id);
    if (!job) return;

    const deletedJob = { ...job };

    addToUndoStack({
      type: 'job',
      data: deletedJob,
      deletedAt: new Date().toISOString(),
    });

    setData(prev => ({
      ...prev,
      jobs: prev.jobs.filter(job => job.id !== id),
    }));

    showToast(
      `Deleted ${job.company}${job.title ? ` - ${job.title}` : ''}`,
      'success',
      {
        label: 'UNDO',
        onClick: () => {
          console.log('=== UNDO CLICKED ===');
          console.log('Restoring job:', deletedJob.id, deletedJob.company);
          
          // Restore with original ID, check if it doesn't already exist
          setData(prev => {
            console.log('Current jobs count:', prev.jobs.length);
            console.log('Current job IDs:', prev.jobs.map(j => j.id));
            
            // Check if job with this ID already exists (safety check)
            const exists = prev.jobs.some(j => j.id === deletedJob.id);
            console.log('Job already exists?', exists);
            
            if (exists) {
              console.warn('Job already exists, skipping restore');
              return prev;
            }
            
            const newJobs = [...prev.jobs, deletedJob];
            console.log('After restore, jobs count:', newJobs.length);
            
            return {
              ...prev,
              jobs: newJobs,
            };
          });
          showToast('Restored!', 'success');
        },
      }
    );
  };

  // Companies CRUD
  const addCompany = (company: Omit<Company, 'id' | 'createdAt'>) => {
    const newCompany: Company = {
      ...company,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    setData(prev => ({
      ...prev,
      companies: [...prev.companies, newCompany],
    }));
    
    return newCompany;
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setData(prev => ({
      ...prev,
      companies: prev.companies.map(company =>
        company.id === id ? { ...company, ...updates } : company
      ),
    }));
  };

  const deleteCompany = (id: string) => {
    const company = data.companies.find(c => c.id === id);
    if (!company) return;

    const deletedCompany = { ...company };

    addToUndoStack({
      type: 'company',
      data: deletedCompany,
      deletedAt: new Date().toISOString(),
    });

    setData(prev => ({
      ...prev,
      companies: prev.companies.filter(company => company.id !== id),
    }));

    showToast(
      `Deleted company: ${company.name}`,
      'success',
      {
        label: 'UNDO',
        onClick: () => {
          setData(prev => ({
            ...prev,
            companies: [...prev.companies, deletedCompany],
          }));
          showToast('Restored!', 'success');
        },
      }
    );
  };

  // Contacts CRUD
  const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    setData(prev => ({
      ...prev,
      contacts: [...prev.contacts, newContact],
    }));
    
    return newContact;
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setData(prev => ({
      ...prev,
      contacts: prev.contacts.map(contact =>
        contact.id === id ? { ...contact, ...updates } : contact
      ),
    }));
  };

  const deleteContact = (id: string) => {
    const contact = data.contacts.find(c => c.id === id);
    if (!contact) return;

    const deletedContact = { ...contact };

    addToUndoStack({
      type: 'contact',
      data: deletedContact,
      deletedAt: new Date().toISOString(),
    });

    setData(prev => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));

    showToast(
      `Deleted contact: ${contact.name}`,
      'success',
      {
        label: 'UNDO',
        onClick: () => {
          setData(prev => ({
            ...prev,
            contacts: [...prev.contacts, deletedContact],
          }));
          showToast('Restored!', 'success');
        },
      }
    );
  };

  // Follow-ups CRUD
  const addFollowUp = (followup: Omit<FollowUp, 'id' | 'createdAt'>) => {
    const newFollowUp: FollowUp = {
      ...followup,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    setData(prev => ({
      ...prev,
      followups: [...prev.followups, newFollowUp],
    }));
    
    return newFollowUp;
  };

  const updateFollowUp = (id: string, updates: Partial<FollowUp>) => {
    setData(prev => ({
      ...prev,
      followups: prev.followups.map(followup =>
        followup.id === id ? { ...followup, ...updates } : followup
      ),
    }));
  };

  const deleteFollowUp = (id: string) => {
    const followup = data.followups.find(f => f.id === id);
    if (!followup) return;

    const deletedFollowUp = { ...followup };

    addToUndoStack({
      type: 'followup',
      data: deletedFollowUp,
      deletedAt: new Date().toISOString(),
    });

    setData(prev => ({
      ...prev,
      followups: prev.followups.filter(followup => followup.id !== id),
    }));

    showToast(
      `Deleted follow-up`,
      'success',
      {
        label: 'UNDO',
        onClick: () => {
          setData(prev => ({
            ...prev,
            followups: [...prev.followups, deletedFollowUp],
          }));
          showToast('Restored!', 'success');
        },
      }
    );
  };

  // Interviews CRUD
  const addInterview = (interview: Omit<Interview, 'id' | 'createdAt'>) => {
    const newInterview: Interview = {
      ...interview,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    setData(prev => ({
      ...prev,
      interviews: [...prev.interviews, newInterview],
    }));
    
    return newInterview;
  };

  const updateInterview = (id: string, updates: Partial<Interview>) => {
    setData(prev => ({
      ...prev,
      interviews: prev.interviews.map(interview =>
        interview.id === id ? { ...interview, ...updates } : interview
      ),
    }));
  };

  const deleteInterview = (id: string) => {
    const interview = data.interviews.find(i => i.id === id);
    if (!interview) return;

    const deletedInterview = { ...interview };

    addToUndoStack({
      type: 'interview',
      data: deletedInterview,
      deletedAt: new Date().toISOString(),
    });

    setData(prev => ({
      ...prev,
      interviews: prev.interviews.filter(interview => interview.id !== id),
    }));

    showToast(
      `Deleted interview`,
      'success',
      {
        label: 'UNDO',
        onClick: () => {
          setData(prev => ({
            ...prev,
            interviews: [...prev.interviews, deletedInterview],
          }));
          showToast('Restored!', 'success');
        },
      }
    );
  };

  // Bulk operations
  const clearAllData = () => {
    setData(initialData);
  };

  // Global undo function
  const undo = () => {
    const item = popFromUndoStack();
    if (!item) {
      showToast('Nothing to undo', 'info');
      return;
    }

    // Restore with original ID, don't create new
    switch (item.type) {
      case 'job':
        setData(prev => ({
          ...prev,
          jobs: [...prev.jobs, item.data],
        }));
        showToast(`Restored ${item.data.company}`, 'success');
        break;
      case 'company':
        setData(prev => ({
          ...prev,
          companies: [...prev.companies, item.data],
        }));
        showToast(`Restored ${item.data.name}`, 'success');
        break;
      case 'contact':
        setData(prev => ({
          ...prev,
          contacts: [...prev.contacts, item.data],
        }));
        showToast(`Restored ${item.data.name}`, 'success');
        break;
      case 'followup':
        setData(prev => ({
          ...prev,
          followups: [...prev.followups, item.data],
        }));
        showToast('Restored follow-up', 'success');
        break;
      case 'interview':
        setData(prev => ({
          ...prev,
          interviews: [...prev.interviews, item.data],
        }));
        showToast('Restored interview', 'success');
        break;
    }
  };

  const loadSampleData = () => {
    const sampleData: AppData = {
      companies: [
        {
          id: generateId(),
          name: 'Google',
          industry: 'Technology',
          interest: 5,
          booth: 'Booth 42',
          recruiter: 'Sarah Johnson',
          position: 'Software Engineer Intern',
          optFriendly: 'Yes',
          deadline: '2026-02-15',
          notes: 'Really interested in their ML team',
          createdAt: new Date().toISOString(),
        },
      ],
      contacts: [
        {
          id: generateId(),
          name: 'John Doe',
          company: 'Microsoft',
          position: 'Senior Recruiter',
          email: 'john.doe@microsoft.com',
          linkedin: 'https://linkedin.com/in/johndoe',
          type: 'Career Fair',
          strength: 'Warm',
          notes: 'Met at fall career fair, interested in cloud computing',
          createdAt: new Date().toISOString(),
        },
      ],
      jobs: [
        {
          id: generateId(),
          company: 'Amazon',
          title: 'Software Development Engineer Intern',
          status: 'Submitted',
          interest: 4,
          dateApplied: '2026-01-05',
          deadline: '2026-01-20',
          location: 'Seattle, WA',
          salary: '$40-45/hour',
          notes: 'Applied through university portal',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          company: 'Meta',
          title: 'Frontend Engineer Intern',
          status: 'Interview',
          interest: 5,
          dateApplied: '2025-12-15',
          location: 'Menlo Park, CA',
          notes: 'Phone screen scheduled for next week',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      followups: [
        {
          id: generateId(),
          company: 'Google',
          contact: 'Sarah Johnson',
          type: 'Thank You',
          dueDate: '2026-01-10',
          priority: 'High',
          status: 'Pending',
          createdAt: new Date().toISOString(),
        },
      ],
      interviews: [],
    };
    
    setData(sampleData);
  };

  const value: AppDataContextType = {
    data,
    addJob,
    updateJob,
    deleteJob,
    addCompany,
    updateCompany,
    deleteCompany,
    addContact,
    updateContact,
    deleteContact,
    addFollowUp,
    updateFollowUp,
    deleteFollowUp,
    addInterview,
    updateInterview,
    deleteInterview,
    clearAllData,
    loadSampleData,
    undo,
    canUndo,
    undoCount,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
}
