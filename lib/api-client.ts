// API client for authenticated users
import { Job, Contact, FollowUp, Interview } from '@/types';

const API_BASE = '/api';

// Helper for API calls
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

// Jobs API
export const jobsApi = {
  getAll: () => apiCall<Job[]>('/jobs'),
  create: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => 
    apiCall<Job>('/jobs', { method: 'POST', body: JSON.stringify(job) }),
  update: (id: string, updates: Partial<Job>) =>
    apiCall<Job>(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  delete: (id: string) =>
    apiCall<{ success: boolean }>(`/jobs/${id}`, { method: 'DELETE' }),
};

// Contacts API
export const contactsApi = {
  getAll: () => apiCall<Contact[]>('/contacts'),
  create: (contact: Omit<Contact, 'id' | 'createdAt'>) =>
    apiCall<Contact>('/contacts', { method: 'POST', body: JSON.stringify(contact) }),
  update: (id: string, updates: Partial<Contact>) =>
    apiCall<Contact>(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  delete: (id: string) =>
    apiCall<{ success: boolean }>(`/contacts/${id}`, { method: 'DELETE' }),
};

// Follow-ups API
export const followupsApi = {
  getAll: () => apiCall<FollowUp[]>('/followups'),
  create: (followup: Omit<FollowUp, 'id' | 'createdAt'>) =>
    apiCall<FollowUp>('/followups', { method: 'POST', body: JSON.stringify(followup) }),
  update: (id: string, updates: Partial<FollowUp>) =>
    apiCall<FollowUp>(`/followups/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  delete: (id: string) =>
    apiCall<{ success: boolean }>(`/followups/${id}`, { method: 'DELETE' }),
};

// Interviews API
export const interviewsApi = {
  getAll: () => apiCall<Interview[]>('/interviews'),
  create: (interview: Omit<Interview, 'id' | 'createdAt'>) =>
    apiCall<Interview>('/interviews', { method: 'POST', body: JSON.stringify(interview) }),
  update: (id: string, updates: Partial<Interview>) =>
    apiCall<Interview>(`/interviews/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  delete: (id: string) =>
    apiCall<{ success: boolean }>(`/interviews/${id}`, { method: 'DELETE' }),
};
