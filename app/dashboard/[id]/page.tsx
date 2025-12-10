"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

// Define specific types for Campaign fields
interface Persona {
  name?: string;
  demographics?: string;
  pain_points?: string;
  behaviors?: string;
  goals?: string;
  preferred_channels?: string;
}

interface Messaging {
  google_ads?: {
    headline?: string;
    description?: string;
  };
  linkedin_post?: string;
  email_campaign?: {
    subject?: string;
    body?: string;
  };
}

interface BudgetKPI {
  lean_budget_proposal?: string[];
  kpis?: string[];
}

interface CalendarItem {
  day?: string;
  activity?: string;
  caption?: string;
}

interface RiskAnalysis {
  risk_score?: number;
  justification?: string;
}

interface Campaign {
  id: string;
  campaign_name?: string;
  personas?: Persona[];
  messaging?: Messaging;
  channels?: string[];
  calendar?: CalendarItem[];
  budget?: BudgetKPI;
  budget_kpis?: BudgetKPI;
  competitors?: string[];
  risk_analysis?: RiskAnalysis;
  created_at: string;
}

interface TabData {
  campaignName: string;
  selectedTab: string;
}

const TABS = [
  { id: "personas", label: "Personas" },
  { id: "messaging", label: "Messaging" },
  { id: "channels", label: "Channel Ranking" },
  { id: "calendar", label: "Content Calendar" },
  { id: "budget", label: "Budget/KPIs" },
] as const;

// Mock data for when actual data is null
const MOCK_RISK_ANALYSIS: RiskAnalysis = {
  risk_score: 6,
  justification: "Moderate risk due to competitive market landscape. Key factors include seasonal demand variations and potential budget constraints. Recommend close monitoring of customer acquisition costs and market response rates."
};

const MOCK_COMPETITORS = [
  "MarketLeader Corp",
  "InnovativeStartup Inc",
  "EstablishedBrand Ltd",
  "TechDisruptor Co",
  "LocalCompetitor LLC"
];

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
}) {
  const params = useParams();
  const router = useRouter();
  // Safely handle params.id, which could be string, string[], or undefined
  const campaignId = Array.isArray(params?.id) ? params.id[0] : params?.id || "";

  const [tabData, setTabData] = useState<TabData>({
    campaignName: "",
    selectedTab: "personas",
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch specific campaign by ID
  const fetchCampaignById = async (id: string): Promise<Campaign> => {
    try {
      const response = await fetch(`/api/dashboard/${id}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch campaign");
      }
      return data.campaign;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to fetch campaign");
    }
  };

  // Fetch all campaigns for the dropdown
  const fetchAllCampaigns = async (): Promise<Campaign[]> => {
    try {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch campaigns");
      }
      return data.campaigns || [];
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to fetch campaigns");
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
            fetchAllCampaigns(),
          ]);

          setCampaigns(allCampaigns);
          setSelectedCampaign(specificCampaign);
          setTabData((prev) => ({
            ...prev,
            campaignName: specificCampaign.campaign_name || "Dashboard",
          }));
        } else {
          // If no specific ID, fetch all campaigns and select the first one
          const allCampaigns = await fetchAllCampaigns();
          setCampaigns(allCampaigns);

          if (allCampaigns && allCampaigns.length > 0) {
            setSelectedCampaign(allCampaigns[0]);
            setTabData((prev) => ({
              ...prev,
              campaignName: allCampaigns[0].campaign_name || "Dashboard",
            }));
            // Update URL to reflect the selected campaign
            router.replace(`/dashboard/${allCampaigns[0].id}`);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch campaign data");
        console.error("Error fetching campaign data:", err);
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
    setTabData((prev) => ({
      ...prev,
      campaignName: campaign.campaign_name || "Untitled Campaign",
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
              onClick={() => router.push("/dashboard")}
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
              onClick={() => router.push("/dashboard")}
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
              {personasData && Array.isArray(personasData) && personasData.length > 0 ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-6">Target Personas</h4>
                  <div className="space-y-6">
                    {personasData.map((persona, index) => (
                      <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-900 mb-3">
                          Persona {index + 1}: {persona.name || ""}
                        </h5>
                        <div className="space-y-3">
                          {persona.demographics && (
                            <div>
                              <span className="font-medium text-gray-700">Demographics: </span>
                              <span className="text-gray-600">{persona.demographics}</span>
                            </div>
                          )}
                          {persona.pain_points && (
                            <div>
                              <span className="font-medium text-gray-700">Pain Points: </span>
                              <span className="text-gray-600">{persona.pain_points}</span>
                            </div>
                          )}
                          {persona.behaviors && (
                            <div>
                              <span className="font-medium text-gray-700">Behaviors: </span>
                              <span className="text-gray-600">{persona.behaviors}</span>
                            </div>
                          )}
                          {persona.goals && (
                            <div>
                              <span className="font-medium text-gray-700">Goals: </span>
                              <span className="text-gray-600">{persona.goals}</span>
                            </div>
                          )}
                          {persona.preferred_channels && (
                            <div>
                              <span className="font-medium text-gray-700">Preferred Channels: </span>
                              <span className="text-gray-600">{persona.preferred_channels}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No personas data available</p>
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
                  <h4 className="font-medium text-gray-900 mb-6">Campaign Messaging</h4>
                  <div className="space-y-6">
                    {messagingData.google_ads && (
                      <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">
                            Google Ads
                          </span>
                        </h5>
                        <div className="space-y-3">
                          {messagingData.google_ads.headline && (
                            <div>
                              <span className="font-medium text-gray-700">Headline: </span>
                              <span className="text-gray-800 font-medium">`{messagingData.google_ads.headline}`</span>
                            </div>
                          )}
                          {messagingData.google_ads.description && (
                            <div>
                              <span className="font-medium text-gray-700">Description: </span>
                              <span className="text-gray-600">`{messagingData.google_ads.description}`</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {messagingData.linkedin_post && (
                      <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-3">
                            LinkedIn Post
                          </span>
                        </h5>
                        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <p className="text-gray-800 italic">{messagingData.linkedin_post}</p>
                        </div>
                      </div>
                    )}
                    {messagingData.email_campaign && (
                      <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">
                            Email Campaign
                          </span>
                        </h5>
                        <div className="space-y-3">
                          {messagingData.email_campaign.subject && (
                            <div>
                              <span className="font-medium text-gray-700">Subject: </span>
                              <span className="text-gray-800 font-medium">`{messagingData.email_campaign.subject}`</span>
                            </div>
                          )}
                          {messagingData.email_campaign.body && (
                            <div>
                              <span className="font-medium text-gray-700">Body: </span>
                              <div className="bg-gray-50 p-3 rounded mt-2">
                                <p className="text-gray-600 text-sm">{messagingData.email_campaign.body}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No messaging data available</p>
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
              {channelsData && Array.isArray(channelsData) && channelsData.length > 0 ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-6">Recommended Marketing Channels</h4>
                  <div className="space-y-4">
                    {channelsData.map((channel, index) => (
                      <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 flex items-start">
                        <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mr-4 flex-shrink-0">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 mb-2">{channel}</h5>
                          <p className="text-gray-600 text-sm">
                            Recommended based on your target personas and campaign objectives.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No channel ranking data available</p>
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
              {calendarData && Array.isArray(calendarData) && calendarData.length > 0 ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-6">Weekly Content Calendar</h4>
                  <div className="space-y-4">
                    {calendarData.map((item, index) => (
                      <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                                {item.day || "N/A"}
                              </span>
                            </div>
                            <h5 className="font-medium text-gray-900 mb-2">{item.activity || "No activity"}</h5>
                            <p className="text-gray-600 text-sm">{item.caption || "No description"}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No calendar data available</p>
                </div>
              )}
            </div>
          </div>
        );

      case "budget":
        const budgetKpis = selectedCampaign.budget_kpis || selectedCampaign.budget;
        // Use actual data if available, otherwise use mock data
        const riskAnalysis = selectedCampaign.risk_analysis || MOCK_RISK_ANALYSIS;
        const competitors = selectedCampaign.competitors || MOCK_COMPETITORS;
        const isRiskMock = !selectedCampaign.risk_analysis;
        const isCompetitorsMock = !selectedCampaign.competitors || selectedCampaign.competitors.length === 0;

        return (
          <div className="space-y-6">
            <div className={cardClass}>
              {budgetKpis ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-6">Budget & KPIs</h4>
                  <div className="space-y-6">
                    {budgetKpis.lean_budget_proposal && Array.isArray(budgetKpis.lean_budget_proposal) && (
                      <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-900 mb-4">Budget Allocation</h5>
                        <div className="space-y-3">
                          {budgetKpis.lean_budget_proposal.map((phase, index) => (
                            <div key={index} className="flex items-start">
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-3 flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="text-gray-800">{phase}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {budgetKpis.kpis && Array.isArray(budgetKpis.kpis) && (
                      <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-900 mb-4">Key Performance Indicators</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {budgetKpis.kpis.map((kpi, index) => (
                            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                              <span className="text-gray-800 capitalize">{kpi}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Risk Analysis - Always show (real data or mock) */}
                    <div className="bg-white p-5 rounded-lg border border-gray-200 relative">
                      {isRiskMock && (
                        <div className="absolute top-2 right-2">
                         
                        </div>
                      )}
                      <h5 className="font-semibold text-gray-900 mb-4">Risk Analysis</h5>
                      <div className="flex items-center mb-3">
                        <span className="text-sm text-gray-600 mr-2">Risk Score:</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            riskAnalysis.risk_score && riskAnalysis.risk_score >= 8
                              ? "bg-red-100 text-red-800"
                              : riskAnalysis.risk_score && riskAnalysis.risk_score >= 5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {(riskAnalysis.risk_score ?? 0)}/10
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {riskAnalysis.justification || "No justification provided"}
                      </p>
                    </div>

                    {/* Competitors - Always show (real data or mock) */}
                    <div className="bg-white p-5 rounded-lg border border-gray-200 relative">
                      {isCompetitorsMock && (
                        <div className="absolute top-2 right-2">
                          
                        </div>
                      )}
                      <h5 className="font-semibold text-gray-900 mb-4">Key Competitors</h5>
                      <div className="flex flex-wrap gap-2">
                        {competitors.map((competitor, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {competitor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No budget/KPIs data available</p>
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
            {campaigns.length > 1 && (
              <div className="mt-4">
                <select
                  value={selectedCampaign?.id || ""}
                  onChange={(e) => {
                    const campaign = campaigns.find((c) => c.id === e.target.value);
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
              {selectedCampaign && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Campaign Info</h4>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(selectedCampaign.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">ID: {selectedCampaign.id}</p>
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