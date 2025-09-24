'use client';

import { useState, useCallback } from 'react';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';

interface TabData {
  campaignName: string;
  selectedTab: string;
}

const TABS = [
  { id: 'personas', label: 'Personas' },
  { id: 'messaging', label: 'Messaging/Copy' },
  { id: 'channels', label: 'Channel Ranking' },
  { id: 'calendar', label: 'Content Calendar' },
  { id: 'budget', label: 'Budget/KPIs' },
] as const;

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

function LockableInput({
  field,
  value,
  locked,
  placeholders,
  onChange,
  onSubmit,
  onUnlock,
  label,
  description,
}: {
  field: keyof TabData;
  value: string;
  locked: boolean;
  placeholders: string[];
  onChange: (field: keyof TabData, value: string) => void;
  onSubmit: (field: keyof TabData, value: string) => void;
  onUnlock: (field: keyof TabData) => void;
  label: string;
  description: string;
}) {
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (inputValue.trim()) {
        onChange(field, inputValue);
        onSubmit(field, inputValue);
      }
    },
    [field, onChange, onSubmit],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <label className="text-lg font-semibold text-gray-900">{label}</label>
        <span className="text-red-500">*</span>
      </div>
      <p className="text-gray-600">{description}</p>
      {locked ? (
        <div className="relative group">
          <div className="w-full p-4 border-2 border-green-200 rounded-xl bg-green-50 text-gray-800 flex items-center justify-between relative">
            <span className="flex-1 pr-4 z-10">{value || `No ${field} entered`}</span>
            <button
              type="button"
              onClick={() => onUnlock(field)}
              className="flex-shrink-0 p-2 text-indigo-600 hover:text-indigo-800 hover:bg-white rounded-lg transition-all duration-200 z-10"
              title={`Edit ${field}`}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div onBlur={handleBlur}>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(field, e.target.value)}
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              onSubmit(field, value);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [tabData, setTabData] = useState<TabData>({
    campaignName: '',
    selectedTab: 'personas',
  });
  const [lockedFields, setLockedFields] = useState({
    campaignName: false,
  });

  const handleInputChange = useCallback((field: keyof TabData, value: string) => {
    setTabData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleInputSubmit = useCallback((field: keyof TabData, value: string) => {
    if (value.trim()) {
      setTabData((prev) => ({ ...prev, [field]: value }));
      setTimeout(() => {
        setLockedFields((prev) => ({ ...prev, [field]: true }));
      }, 500);
    }
  }, []);

  const unlockField = useCallback((field: keyof TabData) => {
    setLockedFields((prev) => ({ ...prev, [field]: false }));
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setTabData((prev) => ({ ...prev, selectedTab: tab }));
  }, []);

  const renderTabContent = () => {
    switch (tabData.selectedTab) {
      case 'personas':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">User Personas</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Persona 1: Young Professional</h4>
              <ul className="text-gray-600 space-y-2">
                <li><strong>Demographics:</strong> 25-35 years old, urban, single or newly married</li>
                <li><strong>Pain Points:</strong> Limited time, high career ambitions, tech-savvy</li>
                <li><strong>Behaviors:</strong> Active on LinkedIn, values efficiency, prefers mobile apps</li>
              </ul>
              <h4 className="font-medium text-gray-900 mt-6 mb-4">Persona 2: Small Business Owner</h4>
              <ul className="text-gray-600 space-y-2">
                <li><strong>Demographics:</strong> 30-50 years old, suburban, 1-10 employees</li>
                <li><strong>Pain Points:</strong> Budget constraints, lack of marketing expertise</li>
                <li><strong>Behaviors:</strong> Seeks cost-effective solutions, active in local business groups</li>
              </ul>
            </div>
          </div>
        );
      case 'messaging':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Messaging & Copy</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Sample Slogans</h4>
              <ul className="text-gray-600 space-y-2">
                <li>"Empower Your Future: Unleash Limitless Possibilities"</li>
                <li>"Grow Smarter, Not Harder: Your Success, Our Mission"</li>
              </ul>
              <h4 className="font-medium text-gray-900 mt-6 mb-4">Email Copy</h4>
              <p className="text-gray-600">
                Subject: Transform Your Business Today!<br />
                Hi [Name],<br />
                Ready to take your business to the next level? Our platform offers tailored solutions to save you time and boost your growth. Join thousands of satisfied customers and start today!<br />
                [CTA Button: Get Started Now]
              </p>
            </div>
          </div>
        );
      case 'channels':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Channel Ranking</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <table className="w-full text-left text-gray-600">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 font-medium">Rank</th>
                    <th className="py-2 font-medium">Channel</th>
                    <th className="py-2 font-medium">Justification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">1</td>
                    <td>Social Media</td>
                    <td>High engagement, cost-effective, broad reach</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">2</td>
                    <td>Email Marketing</td>
                    <td>Personalized, high ROI, direct communication</td>
                  </tr>
                  <tr>
                    <td className="py-2">3</td>
                    <td>SEO</td>
                    <td>Long-term visibility, organic traffic growth</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Content Calendar</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <table className="w-full text-left text-gray-600">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 font-medium">Date</th>
                    <th className="py-2 font-medium">Task</th>
                    <th className="py-2 font-medium">Channel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Oct 1, 2025</td>
                    <td>Launch campaign announcement</td>
                    <td>Social Media</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Oct 5, 2025</td>
                    <td>Send promotional email</td>
                    <td>Email</td>
                  </tr>
                  <tr>
                    <td className="py-2">Oct 10, 2025</td>
                    <td>Publish blog post</td>
                    <td>Website</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'budget':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Budget & KPIs</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Budget Allocation</h4>
              <table className="w-full text-left text-gray-600">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 font-medium">Category</th>
                    <th className="py-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Social Media Ads</td>
                    <td>$2,000</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Email Marketing</td>
                    <td>$1,000</td>
                  </tr>
                  <tr>
                    <td className="py-2">Content Creation</td>
                    <td>$1,500</td>
                  </tr>
                </tbody>
              </table>
              <h4 className="font-medium text-gray-900 mt-6 mb-4">Key Performance Indicators</h4>
              <ul className="text-gray-600 space-y-2">
                <li><strong>Click-Through Rate:</strong> Target 2.5% on email campaigns</li>
                <li><strong>Engagement Rate:</strong> Target 10% on social media posts</li>
                <li><strong>Conversion Rate:</strong> Target 5% on landing pages</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 shadow-lg rounded-xl my-5 max-w-7xl mx-auto">
        <div className="px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Marketing Campaign Dashboard</h1>
            <p className="text-gray-300 text-lg">Plan and track your marketing strategy</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <LockableInput
            field="campaignName"
            value={tabData.campaignName}
            locked={lockedFields.campaignName}
            placeholders={[
              'Spring Product Launch',
              'Holiday Sales Campaign',
              'Brand Awareness Drive',
              'Customer Retention Program',
              'New Market Expansion',
            ]}
            onChange={handleInputChange}
            onSubmit={handleInputSubmit}
            onUnlock={unlockField}
            label="Campaign Name"
            description="Enter a name for your marketing campaign"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Campaign Progress</h3>
              <div className="space-y-6">
                {TABS.map(({ id, label }, index) => (
                  <div key={id} className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tabData.selectedTab === id
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {tabData.selectedTab === id ? <CheckIcon /> : index + 1}
                    </div>
                    <span className="text-gray-700">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">💡 Campaign Tips</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Tailor personas to specific audience segments</li>
                <li>• Craft clear and compelling messaging</li>
                <li>• Prioritize high-ROI channels</li>
                <li>• Plan content for consistent engagement</li>
                <li>• Track KPIs to measure success</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className={`flex-1 py-4 px-6 text-center font-medium ${
                      tabData.selectedTab === id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="p-8">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}