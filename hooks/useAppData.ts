import { useLocalStorage } from './useLocalStorage';
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

/**
 * Custom hook to manage application data
 */
export function useAppData() {
  const [data, setData] = useLocalStorage<AppData>(STORAGE_KEY, initialData);

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
    setData(prev => ({
      ...prev,
      jobs: prev.jobs.filter(job => job.id !== id),
    }));
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
    setData(prev => ({
      ...prev,
      companies: prev.companies.filter(company => company.id !== id),
    }));
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
    setData(prev => ({
      ...prev,
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
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
    setData(prev => ({
      ...prev,
      followups: prev.followups.filter(followup => followup.id !== id),
    }));
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
    setData(prev => ({
      ...prev,
      interviews: prev.interviews.filter(interview => interview.id !== id),
    }));
  };

  // Bulk operations
  const clearAllData = () => {
    setData(initialData);
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

  return {
    data,
    // Jobs
    addJob,
    updateJob,
    deleteJob,
    // Companies
    addCompany,
    updateCompany,
    deleteCompany,
    // Contacts
    addContact,
    updateContact,
    deleteContact,
    // Follow-ups
    addFollowUp,
    updateFollowUp,
    deleteFollowUp,
    // Interviews
    addInterview,
    updateInterview,
    deleteInterview,
    // Bulk
    clearAllData,
    loadSampleData,
  };
}
