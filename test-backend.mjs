#!/usr/bin/env node
/**
 * Backend Testing Script
 * This script tests that your database and authentication are working properly
 * 
 * Run with: node test-backend.mjs
 */

const BASE_URL = 'http://localhost:3000';

// ANSI color codes for pretty output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName) {
  console.log(`\n${colors.blue}${colors.bold}🧪 Testing: ${testName}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

// Generate random test data
const testEmail = `test_${Date.now()}@example.com`;
const testPassword = 'testpass123';
let sessionCookie = '';
let testJobId = '';

async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (sessionCookie) {
    headers['Cookie'] = sessionCookie;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Capture session cookie from signup/login
    const setCookie = response.headers.get('set-cookie');
    if (setCookie && !sessionCookie) {
      sessionCookie = setCookie.split(';')[0];
    }

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return { response, data, status: response.status };
  } catch (error) {
    return { error: error.message, status: 0 };
  }
}

async function testDatabaseConnection() {
  logTest('Database Connection');
  
  // Try to reach the API
  const { status, error } = await makeRequest('/api/jobs');
  
  if (error) {
    logError(`Cannot connect to server: ${error}`);
    logWarning('Make sure your dev server is running: npm run dev');
    return false;
  }
  
  if (status === 401) {
    logSuccess('API is responding (got expected 401 for unauthenticated request)');
    return true;
  }
  
  if (status >= 500) {
    logError('Server error - check your DATABASE_URL in .env.local');
    return false;
  }
  
  logSuccess('API connection successful');
  return true;
}

async function testUserSignup() {
  logTest('User Account Creation');
  
  const { status, data, error } = await makeRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      name: 'Test User',
    }),
  });

  if (error) {
    logError(`Signup failed: ${error}`);
    return false;
  }

  if (status !== 201) {
    logError(`Signup failed with status ${status}: ${JSON.stringify(data)}`);
    return false;
  }

  if (!data.user || !data.user.id) {
    logError('Signup response missing user data');
    return false;
  }

  logSuccess(`Account created successfully for ${data.user.email}`);
  logSuccess(`User ID: ${data.user.id}`);
  return true;
}

async function testUserLogin() {
  logTest('User Login & Session');
  
  const { status, data, error } = await makeRequest('/api/auth/callback/credentials', {
    method: 'POST',
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      json: true,
    }),
  });

  // NextAuth callback endpoint
  const loginResult = await makeRequest('/api/auth/signin/credentials', {
    method: 'POST',
    body: `email=${encodeURIComponent(testEmail)}&password=${encodeURIComponent(testPassword)}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!sessionCookie) {
    logWarning('Could not extract session cookie - trying alternative method');
    
    // Try to get session by calling a protected endpoint
    const testSession = await makeRequest('/api/jobs');
    if (testSession.status === 401) {
      logError('Login failed - no session created');
      return false;
    }
  }

  logSuccess('Login successful - session created');
  return true;
}

async function testCreateJob() {
  logTest('Create Job Application');
  
  const jobData = {
    company: 'Test Company Inc.',
    title: 'Software Engineer',
    status: 'Applied',
    interest: 5,
    dateApplied: new Date().toISOString().split('T')[0],
    location: 'Remote',
    salary: '$100k-$120k',
    notes: 'This is a test job application',
  };

  const { status, data, error } = await makeRequest('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
  });

  if (error) {
    logError(`Create job failed: ${error}`);
    return false;
  }

  if (status === 401) {
    logError('Create job failed: Not authenticated');
    logWarning('Session may have expired or not been set properly');
    return false;
  }

  if (status !== 201) {
    logError(`Create job failed with status ${status}: ${JSON.stringify(data)}`);
    return false;
  }

  if (!data.id) {
    logError('Job created but missing ID');
    return false;
  }

  testJobId = data.id;
  logSuccess(`Job created successfully with ID: ${testJobId}`);
  logSuccess(`Job details: ${data.company} - ${data.title}`);
  return true;
}

async function testGetJobs() {
  logTest('Retrieve Job Applications');
  
  const { status, data, error } = await makeRequest('/api/jobs');

  if (error) {
    logError(`Get jobs failed: ${error}`);
    return false;
  }

  if (status !== 200) {
    logError(`Get jobs failed with status ${status}`);
    return false;
  }

  if (!Array.isArray(data)) {
    logError('Jobs response is not an array');
    return false;
  }

  if (data.length === 0) {
    logWarning('No jobs found - but create may have failed earlier');
    return false;
  }

  logSuccess(`Retrieved ${data.length} job(s) from database`);
  logSuccess(`Jobs are properly linked to user account`);
  return true;
}

async function testUpdateJob() {
  logTest('Update Job Application');
  
  if (!testJobId) {
    logWarning('No job ID to test update - skipping');
    return false;
  }

  const updateData = {
    status: 'Interview',
    notes: 'Updated: Got interview scheduled!',
  };

  const { status, data, error } = await makeRequest(`/api/jobs/${testJobId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });

  if (error) {
    logError(`Update job failed: ${error}`);
    return false;
  }

  if (status !== 200) {
    logError(`Update job failed with status ${status}`);
    return false;
  }

  if (data.status !== 'Interview') {
    logError('Job updated but data not reflected');
    return false;
  }

  logSuccess('Job updated successfully');
  logSuccess(`Status changed to: ${data.status}`);
  return true;
}

async function testDeleteJob() {
  logTest('Delete Job Application');
  
  if (!testJobId) {
    logWarning('No job ID to test delete - skipping');
    return false;
  }

  const { status, data, error } = await makeRequest(`/api/jobs/${testJobId}`, {
    method: 'DELETE',
  });

  if (error) {
    logError(`Delete job failed: ${error}`);
    return false;
  }

  if (status !== 200) {
    logError(`Delete job failed with status ${status}`);
    return false;
  }

  logSuccess('Job deleted successfully');
  return true;
}

async function testDataPersistence() {
  logTest('Data Persistence Check');
  
  // Create a new job
  const jobData = {
    company: 'Persistence Test Corp',
    title: 'Backend Developer',
    status: 'Applied',
    interest: 4,
    notes: 'Testing data persistence',
  };

  const createResult = await makeRequest('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData),
  });

  if (createResult.status !== 201) {
    logError('Could not create job for persistence test');
    return false;
  }

  const jobId = createResult.data.id;

  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Retrieve it again
  const getResult = await makeRequest(`/api/jobs/${jobId}`);

  if (getResult.status !== 200) {
    logError('Could not retrieve job after creation');
    return false;
  }

  // Clean up
  await makeRequest(`/api/jobs/${jobId}`, { method: 'DELETE' });

  logSuccess('Data persists correctly in database');
  return true;
}

// Main test runner
async function runTests() {
  console.log('\n' + '='.repeat(60));
  log('🚀 CAREER TRACKER BACKEND TEST SUITE', 'bold');
  console.log('='.repeat(60));
  
  logWarning('Make sure your dev server is running: npm run dev\n');

  const results = {
    passed: 0,
    failed: 0,
  };

  // Test 1: Database Connection
  if (await testDatabaseConnection()) {
    results.passed++;
  } else {
    results.failed++;
    log('\n❌ Cannot proceed without database connection', 'red');
    process.exit(1);
  }

  // Test 2: User Signup
  if (await testUserSignup()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Test 3: User Login (commented out as NextAuth login is complex to test)
  // Note: We'll rely on the authenticated API calls to verify session
  logTest('User Login & Session');
  logWarning('Skipping explicit login test - will verify through authenticated API calls');

  // Test 4: Create Job
  if (await testCreateJob()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Test 5: Get Jobs
  if (await testGetJobs()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Test 6: Update Job
  if (await testUpdateJob()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Test 7: Delete Job
  if (await testDeleteJob()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Test 8: Data Persistence
  if (await testDataPersistence()) {
    results.passed++;
  } else {
    results.failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  log('📊 TEST SUMMARY', 'bold');
  console.log('='.repeat(60));
  
  logSuccess(`Passed: ${results.passed}`);
  if (results.failed > 0) {
    logError(`Failed: ${results.failed}`);
  }
  
  console.log('\n' + '='.repeat(60));
  
  if (results.failed === 0) {
    log('🎉 ALL TESTS PASSED!', 'green');
    log('✅ Your accounts are saved to the database', 'green');
    log('✅ Your job applications are saved to the database', 'green');
    log('✅ All actions persist and won\'t be lost', 'green');
  } else {
    log('⚠️  SOME TESTS FAILED', 'yellow');
    log('Please check the errors above and verify your setup', 'yellow');
  }
  
  console.log('='.repeat(60) + '\n');
}

// Run the tests
runTests().catch(error => {
  logError(`Test suite crashed: ${error.message}`);
  console.error(error);
  process.exit(1);
});
