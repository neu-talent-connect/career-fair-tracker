'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Copy, Check, Mail, Users, RefreshCw, MessageSquare, Briefcase } from 'lucide-react';

const emailTemplates = [
  {
    id: 'career-fair-thank-you',
    icon: Mail,
    title: 'Post-Career Fair Thank You',
    description: 'Follow up after meeting a recruiter at a career fair',
    template: `Subject: Thank You - [Your Name] from Northeastern Talent Connect

Dear [Recruiter Name],

Thank you for taking the time to speak with me at Talent Connect on [day] about [specific role/topic]. I was particularly excited to learn about [specific detail from conversation].

As we discussed, my experience in [relevant skill/project] aligns well with [specific need they mentioned]. [Add specific example connecting your background to their needs].

I've applied to [specific position] on your careers portal and attached my resume for your reference. I would welcome the opportunity to discuss how my [specific skill] could contribute to [team/project].

Thank you again for your insights about [something specific they shared].

Best regards,
[Your Name]
[Email] | [LinkedIn] | [Phone]`,
  },
  {
    id: 'alumni-outreach',
    icon: Users,
    title: 'Alumni Outreach',
    description: 'Reach out to alumni for career advice and insights',
    template: `Subject: Fellow Husky Seeking Talent Connect Insights

Hi [Name],

I'm [Your name], a [year/major] at Northeastern. I'll be attending Talent Connect next week and noticed you're at [Company]. Your path from Northeastern to [their role] is really inspiring.

I'm particularly interested in [specific aspect of company/role]. Would you have 10 minutes for a quick call or coffee to share insights about [Company]'s culture and what they look for in candidates?

If unavailable, any quick tips for standing out at the career fair would be greatly appreciated!

Go Huskies!
[Your name]`,
  },
  {
    id: 'follow-up-no-response',
    icon: RefreshCw,
    title: 'Follow-Up (No Response)',
    description: 'Politely follow up when you haven\'t heard back',
    template: `Subject: Following Up - [Your Name] - [Position] at [Company]

Hi [Recruiter Name],

I wanted to follow up on my application for the [position] role at [Company] that we discussed at Talent Connect on [date].

I remain very enthusiastic about the opportunity to contribute to [specific project/team discussed]. Since we spoke, I've [relevant update - e.g., completed a relevant project, earned a certification, etc.].

I understand you have a busy schedule. Is there any additional information I can provide to support my application?

Thank you for your time and consideration.

Best regards,
[Your Name]`,
  },
  {
    id: 'linkedin-connection',
    icon: MessageSquare,
    title: 'LinkedIn Connection Request',
    description: 'Connect with recruiters and professionals on LinkedIn',
    template: `Hi [Name],

It was great meeting you at Northeastern's Talent Connect career fair and learning about [specific topic discussed] at [Company]. I'm very interested in [specific opportunity] and would love to stay connected as I pursue opportunities in [field/industry].

Looking forward to connecting!

Best,
[Your Name]
Northeastern University | [Major] [Year]`,
  },
  {
    id: 'informational-interview',
    icon: Briefcase,
    title: 'Informational Interview Request',
    description: 'Request a conversation to learn about a role or company',
    template: `Subject: Northeastern Student - Quick Question about [Company/Role]

Dear [Name],

I'm [Your name], a [year] [major] student at Northeastern University. I found your profile through [LinkedIn/Alumni network/etc.] and was impressed by your journey from [their background] to [current role] at [Company].

I'm exploring career paths in [field] and would greatly value your perspective on [specific topic - e.g., breaking into the industry, skill development, company culture].

Would you have 15-20 minutes for a brief phone call or virtual coffee chat in the next couple of weeks? I'm happy to work around your schedule.

Thank you for considering my request.

Best regards,
[Your Name]
[LinkedIn profile]`,
  },
];

export default function ResourcesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (template: string, id: string) => {
    try {
      await navigator.clipboard.writeText(template);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy template. Please try selecting and copying manually.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Email Templates & Resources
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Professional email templates to accelerate your job search. Click to copy and customize.
        </p>
      </div>

      {/* Tips Card */}
      <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
            💡 Tips for Using These Templates
          </h2>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
            <li className="flex items-start gap-2">
              <span className="text-northeastern-red font-bold mt-0.5">•</span>
              <span>Replace all [bracketed text] with your specific information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-northeastern-red font-bold mt-0.5">•</span>
              <span>Reference specific details from your conversation to show genuine interest</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-northeastern-red font-bold mt-0.5">•</span>
              <span>Keep emails concise - aim for 3-4 short paragraphs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-northeastern-red font-bold mt-0.5">•</span>
              <span>Send follow-ups within 24-48 hours of meeting someone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-northeastern-red font-bold mt-0.5">•</span>
              <span>Always proofread before sending - typos can hurt your chances</span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Email Templates */}
      <div className="space-y-6">
        {emailTemplates.map((item, index) => {
          const Icon = item.icon;
          const isCopied = copiedId === item.id;
          
          return (
            <Card 
              key={item.id} 
              className="overflow-hidden hover:shadow-lg transition-all animate-slide-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-northeastern-red/10 rounded-lg">
                      <Icon className="w-6 h-6 text-northeastern-red" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isCopied ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => copyToClipboard(item.template, item.id)}
                    className="flex-shrink-0"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Template
                      </>
                    )}
                  </Button>
                </div>

                {/* Template */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                    {item.template}
                  </pre>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Additional Resources */}
      <Card className="mt-8 animate-fade-in" style={{ animationDelay: '800ms' }}>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Additional Career Resources
          </h2>
          <div className="space-y-3 text-sm">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                📚 Recommended Reading
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                <li>• "The 2-Hour Job Search" by Steve Dalton</li>
                <li>• "Cracking the Coding Interview" by Gayle Laakmann McDowell</li>
                <li>• "What Color Is Your Parachute?" by Richard N. Bolles</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                🎯 Best Practices
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                <li>• Follow up within 24-48 hours of networking events</li>
                <li>• Keep a spreadsheet of all interactions (hint: you're already doing this!)</li>
                <li>• Customize your resume for each application</li>
                <li>• Practice your elevator pitch before career fairs</li>
                <li>• Research companies thoroughly before applying</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ⏰ Follow-Up Timeline
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                <li>• Thank you email: Within 24 hours</li>
                <li>• First follow-up: 1-2 weeks after initial contact</li>
                <li>• Second follow-up: 2 weeks after first follow-up</li>
                <li>• LinkedIn connection: Within 48 hours of meeting</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
