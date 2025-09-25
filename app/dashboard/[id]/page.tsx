"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

interface Campaign {
  id: string;
  campaign_name?: string;
  personas?: any;
  messaging?: any;
  channels?: any;
  calendar?: any;
  budget?: any;
  created_at: string;
}

interface TabData {
  campaignName: string;
  selectedTab: string;
}

interface DashboardPageProps {
  initialCampaignName?: string;
}

const TABS = [
  { id: "personas", label: "Personas" },
  { id: "messaging", label: "Messaging" },
  { id: "channels", label: "Channel Ranking" },
  { id: "calendar", label: "Content Calendar" },
  { id: "budget", label: "Budget/KPIs" },
] as const;

const AnimatedCircle = () => (
  <motion.div
    className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center"
    initial={{ scale: 0.8, opacity: 0.6 }}
    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg
      className="w-5 h-5 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  </motion.div>
);

const ArrowRight = () => (
  <svg
    className="h-5 w-5 text-black-500 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

export default function DashboardPage({
  initialCampaignName = "abc",
}: DashboardPageProps) {
  const params = useParams();
  const router = useRouter();
  const campaignId = params?.id as string;

  const [tabData, setTabData] = useState<TabData>({
    campaignName: initialCampaignName,
    selectedTab: "personas",
  });
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch specific campaign by ID
  const fetchCampaignById = async (id: string) => {
    try {
      const response = await fetch(`/api/dashboard/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        return data.campaign;
      } else {
        throw new Error(data.error || 'Failed to fetch campaign');
      }
    } catch (err) {
      throw err;
    }
  };

  // Fetch all campaigns for the dropdown
  const fetchAllCampaigns = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      
      if (response.ok) {
        return data.campaigns || [];
      } else {
        throw new Error(data.error || 'Failed to fetch campaigns');
      }
    } catch (err) {
      throw err;
    }
  };

  // Main effect to fetch data based on URL
  useEffect(() => {
    const loadCampaignData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (campaignId) {
          // If we have a specific campaign ID from the URL, fetch that campaign
          const [specificCampaign, allCampaigns] = await Promise.all([
            fetchCampaignById(campaignId),
            fetchAllCampaigns()
          ]);

          setCampaigns(allCampaigns);
          setSelectedCampaign(specificCampaign);
          setTabData(prev => ({
            ...prev,
            campaignName: specificCampaign.campaign_name || "Untitled Campaign"
          }));
        } else {
          // If no specific ID, fetch all campaigns and select the first one
          const allCampaigns = await fetchAllCampaigns();
          setCampaigns(allCampaigns);
          
          if (allCampaigns && allCampaigns.length > 0) {
            setSelectedCampaign(allCampaigns[0]);
            setTabData(prev => ({
              ...prev,
              campaignName: allCampaigns[0].campaign_name || "Untitled Campaign"
            }));
            // Update URL to reflect the selected campaign
            router.replace(`/dashboard/${allCampaigns[0].id}`);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch campaign data');
        console.error('Error fetching campaign data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCampaignData();
  }, [campaignId, router]);

  const handleTabChange = useCallback((tab: string) => {
    setTabData((prev) => ({ ...prev, selectedTab: tab }));
  }, []);

  const handleCampaignChange = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setTabData(prev => ({
      ...prev,
      campaignName: campaign.campaign_name || "Untitled Campaign"
    }));
    // Update URL to reflect the new campaign
    router.push(`/dashboard/${campaign.id}`);
  };

  const handleRegenerate = useCallback(() => {
    console.log("Regenerate button clicked");
    // Add regeneration logic here
  }, []);

  const renderTabContent = () => {
    const cardClass =
      "bg-white-50 p-6 rounded-xl border border-black-200 shadow-sm";

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-2 text-gray-600">Loading campaign data...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-red-600 text-center">
            <p className="text-lg font-medium">Error loading campaign</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }

    if (!selectedCampaign) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 text-center">
            <p className="text-lg font-medium">Campaign not found</p>
            <p className="text-sm">The requested campaign could not be found</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              View All Campaigns
            </button>
          </div>
        </div>
      );
    }

    switch (tabData.selectedTab) {
      case "personas":
        const personasData = selectedCampaign.personas;
        return (
          <div className="space-y-6">
            <div className={cardClass}>
              {personasData ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Campaign Personas</h4>
                  <pre className="text-gray-800 text-sm bg-gray-50 p-4 rounded overflow-auto">
                    {JSON.stringify(personasData, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">
                    Persona 1: Young Professional
                  </h4>
                  <ul className="text-gray-800 space-y-2 text-sm">
                    <li>
                      <strong>Demographics:</strong> 25-35 years old, urban, single
                      or newly married
                    </li>
                    <li>
                      <strong>Pain Points:</strong> Limited time, high career
                      ambitions, tech-savvy
                    </li>
                    <li>
                      <strong>Behaviors:</strong> Active on LinkedIn, values
                      efficiency, prefers mobile apps
                    </li>
                  </ul>
                  <h4 className="font-medium text-gray-900 mt-6 mb-4">
                    Persona 2: Small Business Owner
                  </h4>
                  <ul className="text-gray-800 space-y-2 text-sm">
                    <li>
                      <strong>Demographics:</strong> 30-50 years old, suburban, 1-10
                      employees
                    </li>
                    <li>
                      <strong>Pain Points:</strong> Budget constraints, lack of
                      marketing expertise
                    </li>
                    <li>
                      <strong>Behaviors:</strong> Seeks cost-effective solutions,
                      active in local business groups
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      
      case "messaging":
        const messagingData = selectedCampaign.messaging;
        return (
          <div className="space-y-6">
            <div className={cardClass}>
              {messagingData ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Campaign Messaging</h4>
                  <pre className="text-gray-800 text-sm bg-gray-50 p-4 rounded overflow-auto">
                    {JSON.stringify(messagingData, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Sample Slogans</h4>
                  <ul className="text-gray-800 space-y-2 text-sm">
                    <li>"Empower Your Future: Unleash Limitless Possibilities"</li>
                    <li>"Grow Smarter, Not Harder: Your Success, Our Mission"</li>
                  </ul>
                  <h4 className="font-medium text-gray-900 mt-6 mb-4">Email Copy</h4>
                  <p className="text-gray-800 text-sm">
                    Subject: Transform Your Business Today!
                    <br />
                    Hi [Name],
                    <br />
                    Ready to take your business to the next level? Our platform
                    offers tailored solutions to save you time and boost your
                    growth. Join thousands of satisfied customers and start today!
                    <br />
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      
      case "channels":
        const channelsData = selectedCampaign.channels;
        return (
          <div className="space-y-6">
            <div className={cardClass}>
              {channelsData ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Channel Ranking</h4>
                  <pre className="text-gray-800 text-sm bg-gray-50 p-4 rounded overflow-auto">
                    {JSON.stringify(channelsData, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <table className="w-full text-left text-gray-800 text-sm">
                    <thead>
                      <tr className="border-b border-orange-200">
                        <th className="py-3 font-medium">Rank</th>
                        <th className="py-3 font-medium">Channel</th>
                        <th className="py-3 font-medium">Justification</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-orange-200">
                        <td className="py-3">1</td>
                        <td>Social Media</td>
                        <td>High engagement, cost-effective, broad reach</td>
                      </tr>
                      <tr className="border-b border-orange-200">
                        <td className="py-3">2</td>
                        <td>Email Marketing</td>
                        <td>Personalized, high ROI, direct communication</td>
                      </tr>
                      <tr>
                        <td className="py-3">3</td>
                        <td>SEO</td>
                        <td>Long-term visibility, organic traffic growth</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      
      case "calendar":
        const calendarData = selectedCampaign.calendar;
        return (
          <div className="space-y-6">
            <div className={cardClass}>
              {calendarData ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Content Calendar</h4>
                  <pre className="text-gray-800 text-sm bg-gray-50 p-4 rounded overflow-auto">
                    {JSON.stringify(calendarData, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <table className="w-full text-left text-gray-800 text-sm">
                    <thead>
                      <tr className="border-b border-orange-200">
                        <th className="py-3 font-medium">Date</th>
                        <th className="py-3 font-medium">Task</th>
                        <th className="py-3 font-medium">Channel</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-orange-200">
                        <td className="py-3">Oct 1, 2025</td>
                        <td>Launch campaign announcement</td>
                        <td>Social Media</td>
                      </tr>
                      <tr className="border-b border-orange-200">
                        <td className="py-3">Oct 5, 2025</td>
                        <td>Send promotional email</td>
                        <td>Email</td>
                      </tr>
                      <tr>
                        <td className="py-3">Oct 10, 2025</td>
                        <td>Publish blog post</td>
                        <td>Website</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      
      case "budget":
        const budgetData = selectedCampaign.budget;
        return (
          <div className="space-y-6">
            <div className={cardClass}>
              {budgetData ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Budget & KPIs</h4>
                  <pre className="text-gray-800 text-sm bg-gray-50 p-4 rounded overflow-auto">
                    {JSON.stringify(budgetData, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Budget Allocation</h4>
                  <table className="w-full text-left text-gray-800 text-sm">
                    <thead>
                      <tr className="border-b border-orange-200">
                        <th className="py-3 font-medium">Category</th>
                        <th className="py-3 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-orange-200">
                        <td className="py-3">Social Media Ads</td>
                        <td>$2,000</td>
                      </tr>
                      <tr className="border-b border-orange-200">
                        <td className="py-3">Email Marketing</td>
                        <td>$1,000</td>
                      </tr>
                      <tr>
                        <td className="py-3">Content Creation</td>
                        <td>$1,500</td>
                      </tr>
                    </tbody>
                  </table>
                  <h4 className="font-medium text-gray-900 mt-6 mb-4">
                    Key Performance Indicators
                  </h4>
                  <ul className="text-gray-800 space-y-2 text-sm">
                    <li>
                      <strong>Click-Through Rate:</strong> Target 2.5% on email
                      campaigns
                    </li>
                    <li>
                      <strong>Engagement Rate:</strong> Target 10% on social media
                      posts
                    </li>
                    <li>
                      <strong>Conversion Rate:</strong> Target 5% on landing pages
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-slate-900 shadow-lg rounded-2xl mx-5 mt-5">
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-8 flex justify-between items-center">
          <div className="text-center flex-grow">
            <h1 className="text-4xl font-bold text-white mb-2">
              {tabData.campaignName || "Your Marketing Campaign Dashboard"}
            </h1>
            <p className="text-orange-100 text-lg opacity-90">
              Transform your idea into a comprehensive strategy
            </p>
            
            {/* Campaign Selector */}
            {campaigns.length > 1 && (
              <div className="mt-4">
                <select
                  value={selectedCampaign?.id || ''}
                  onChange={(e) => {
                    const campaign = campaigns.find(c => c.id === e.target.value);
                    if (campaign) handleCampaignChange(campaign);
                  }}
                  className="bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2 backdrop-blur-sm"
                >
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id} className="text-gray-900">
                      {campaign.campaign_name || `Campaign ${campaign.id}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <button
            onClick={handleRegenerate}
            className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <AnimatedCircle />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Campaign Progress
              </h3>
              <div className="space-y-4">
                {TABS.map(({ id, label }, index) => (
                  <button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className="flex items-center space-x-4 w-full text-left"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tabData.selectedTab === id
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {tabData.selectedTab === id ? (
                        <AnimatedCircle />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-gray-900 ${
                        tabData.selectedTab === id ? "font-medium" : ""
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Campaign Info */}
              {selectedCampaign && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Campaign Info</h4>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(selectedCampaign.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    ID: {selectedCampaign.id}
                  </p>
                </div>
              )}
            </div>

            {/* Campaign Tips */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 flex-1 flex flex-col">
              <h4 className="font-semibold text-gray-900 mb-3">
                💡 Campaign Tips
              </h4>
              <ul className="text-sm text-gray-600 space-y-3 flex-1">
                {[
                  "Tailor personas to specific audience segments for maximum relevance",
                  "Craft clear and compelling messaging that resonates",
                  "Prioritize high-ROI channels for better resource allocation",
                  "Plan content for consistent engagement and brand presence",
                  "Track KPIs to measure success and optimize performance",
                  "Test different approaches and iterate based on results",
                  "Maintain brand consistency across all touchpoints",
                  "Focus on user experience and customer journey optimization",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex-1 flex flex-col">
              {/* Tabs row */}
              <div className="flex flex-wrap gap-3 border-b border-gray-200 px-6 py-4">
                {TABS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className={`flex-none px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                      tabData.selectedTab === id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <motion.div
                className="p-8 bg-orange-50 border border-orange-200 shadow-md rounded-b-xl flex-1"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {renderTabContent()}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
}