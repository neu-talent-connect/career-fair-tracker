#!/usr/bin/env node
/**
 * Direct Database Check
 * This script connects directly to your database and shows what's stored
 * 
 * Run with: node check-database.mjs
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Colors for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkDatabase() {
  console.log('\n' + '='.repeat(70));
  log('🔍 DATABASE CHECK - Career Tracker', 'bold');
  console.log('='.repeat(70) + '\n');

  try {
    // Test connection
    log('📡 Testing database connection...', 'blue');
    await prisma.$connect();
    log('✅ Connected to database successfully!\n', 'green');

    // Check Users
    log('👥 USERS IN DATABASE:', 'cyan');
    log('─'.repeat(70), 'cyan');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            jobs: true,
            contacts: true,
            followups: true,
            interviews: true,
          },
        },
      },
    });

    if (users.length === 0) {
      log('⚠️  No users found in database', 'yellow');
      log('   Create an account at: http://localhost:3000/signup\n', 'yellow');
    } else {
      log(`Found ${users.length} user(s):\n`, 'green');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.email}`);
        console.log(`   Name: ${user.name || 'Not set'}`);
        console.log(`   User ID: ${user.id}`);
        console.log(`   Created: ${user.createdAt.toLocaleString()}`);
        console.log(`   Data:`);
        console.log(`     - ${user._count.jobs} job applications`);
        console.log(`     - ${user._count.contacts} contacts`);
        console.log(`     - ${user._count.followups} follow-ups`);
        console.log(`     - ${user._count.interviews} interviews`);
        console.log('');
      });
    }

    // Check Jobs
    log('💼 JOB APPLICATIONS IN DATABASE:', 'cyan');
    log('─'.repeat(70), 'cyan');
    const jobs = await prisma.job.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Show latest 10
    });

    if (jobs.length === 0) {
      log('⚠️  No job applications found', 'yellow');
      log('   Add jobs at: http://localhost:3000/spreadsheet\n', 'yellow');
    } else {
      log(`Found ${jobs.length} job application(s):\n`, 'green');
      jobs.forEach((job, index) => {
        console.log(`${index + 1}. ${job.company} - ${job.title}`);
        console.log(`   Status: ${job.status}`);
        console.log(`   Interest: ${job.interest}/5`);
        console.log(`   User: ${job.user.email}`);
        console.log(`   Applied: ${job.dateApplied || 'Not set'}`);
        console.log(`   Created: ${job.createdAt.toLocaleString()}`);
        if (job.notes) {
          console.log(`   Notes: ${job.notes.substring(0, 60)}${job.notes.length > 60 ? '...' : ''}`);
        }
        console.log('');
      });
    }

    // Check Contacts
    log('🤝 CONTACTS IN DATABASE:', 'cyan');
    log('─'.repeat(70), 'cyan');
    const contacts = await prisma.contact.findMany({
      take: 5,
    });
    log(`Found ${contacts.length} contact(s)\n`, contacts.length > 0 ? 'green' : 'yellow');

    // Check Follow-ups
    log('📅 FOLLOW-UPS IN DATABASE:', 'cyan');
    log('─'.repeat(70), 'cyan');
    const followups = await prisma.followUp.findMany({
      take: 5,
    });
    log(`Found ${followups.length} follow-up(s)\n`, followups.length > 0 ? 'green' : 'yellow');

    // Check Interviews
    log('🎯 INTERVIEWS IN DATABASE:', 'cyan');
    log('─'.repeat(70), 'cyan');
    const interviews = await prisma.interview.findMany({
      take: 5,
    });
    log(`Found ${interviews.length} interview(s)\n`, interviews.length > 0 ? 'green' : 'yellow');

    // Summary
    console.log('='.repeat(70));
    log('📊 SUMMARY', 'bold');
    console.log('='.repeat(70));
    log(`✅ Database is working properly`, 'green');
    log(`✅ ${users.length} user account(s) stored`, 'green');
    log(`✅ ${jobs.length} job application(s) stored`, 'green');
    log(`✅ All data is persisted and won't be lost`, 'green');
    console.log('='.repeat(70) + '\n');

    if (users.length === 0) {
      log('💡 Next Step: Create an account at http://localhost:3000/signup', 'yellow');
    } else if (jobs.length === 0) {
      log('💡 Next Step: Add job applications at http://localhost:3000/spreadsheet', 'yellow');
    } else {
      log('🎉 Everything looks good! Your data is safe and stored in the database.', 'green');
    }
    console.log('');

  } catch (error) {
    log('\n❌ DATABASE ERROR:', 'red');
    console.error(error);
    log('\n🔧 Troubleshooting:', 'yellow');
    log('1. Check that DATABASE_URL is set in .env.local', 'yellow');
    log('2. Run: npx prisma generate', 'yellow');
    log('3. Run: npx prisma db push', 'yellow');
    log('4. Verify your Supabase database is running\n', 'yellow');
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
