"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Campaign {
  id: string;
  industry: string;
  created_at: string;
  title: string;
  description: string;
  campaign_name?: string;
  // Add other fields as they exist in your database
}

export default function History() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch campaigns from API
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch campaigns');
        }
        
        setCampaigns(data.campaigns || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } 
    }

    fetchCampaigns();
  }, []);

  // Handle campaign click - redirect to dashboard
  const handleCampaignClick = (campaignId: string) => {
    router.push(`/dashboard/${campaignId}`);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Calculate stats from actual data
  const stats = [
    { label: "Total Strategies", value: campaigns.length, color: "#6366F1" },
    { label: "Industries Covered", value: new Set(campaigns.map(c => c.industry)).size, color: "#14B8A6" },
    { label: "Success Rate", value: "92%", color: "#22C55E" }, // This might need to be calculated based on your data
    { label: "Avg. Completion Time", value: "3.2hrs", color: "#F59E0B" }, // This might need to be calculated
    { label: "Revenue Generated", value: "$2.4M", color: "#8B5CF6" }, // This might need to be calculated
    { label: "Active Projects", value: campaigns.filter(c => {
      // Assuming campaigns created in last 30 days are active
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(c.created_at) > thirtyDaysAgo;
    }).length, color: "#EF4444" },
  ];

  // Industry color mapping for tags
  const industryColors = {
    FinTech: { bg: "#EEF2FF", text: "#6366F1", border: "#C7D2FE" },
    HealthTech: { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
    EdTech: { bg: "#FEF3C7", text: "#D97706", border: "#FDE68A" },
    RetailTech: { bg: "#FCE7F3", text: "#DB2777", border: "#F9A8D4" },
    PropTech: { bg: "#F3E8FF", text: "#9333EA", border: "#DDD6FE" },
    AgriTech: { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading campaigns: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-0.5">
      {/* Header Section */}
      <div className="bg-slate-900 shadow-lg rounded-2xl my-5">
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              History Campaign Dashboard
            </h1>
            <p className="text-orange-100 text-lg opacity-90">
              Transform your idea into a comprehensive strategy
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-full">
          {/* Recent Strategies */}
          <motion.div
            className="xl:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold text-gray-900">
                Recent Strategies
              </h2>
            </div>

            <div className="space-y-4">
              {campaigns.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No campaigns found</p>
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    Create Your First Campaign
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {campaigns.map((campaign, index) => (
                    <motion.div
                      key={campaign.id}
                      className="p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/60 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer group relative overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: index * 0.1,
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      onClick={() => handleCampaignClick(campaign.id)}
                    >
                      {/* Aurora background effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative">
                        <div className="flex items-center gap-3 mb-3">
                          {campaign.industry && (
                            <span
                              className="px-3 py-1 text-xs font-medium rounded-full border"
                              style={{
                                backgroundColor:
                                  industryColors[campaign.industry as keyof typeof industryColors]?.bg || "#F3F4F6",
                                color:
                                  industryColors[campaign.industry as keyof typeof industryColors]?.text || "#374151",
                                borderColor:
                                  industryColors[campaign.industry as keyof typeof industryColors]?.border ||
                                  "#E5E7EB",
                              }}
                            >
                              {campaign.industry}
                            </span>
                          )}
                          <p className="text-xs text-gray-400">{formatDate(campaign.created_at)}</p>
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                          {campaign.title || campaign.campaign_name || `Campaign ${campaign.id}`}
                        </h3>

                        {/* <p className="text-sm text-gray-600 leading-relaxed">
                          {campaign.description || "No description available"}
                        </p> */}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side: Stats */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-semibold text-gray-900">Analytics</h2>

            {/* Stats Grid */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full p-3 text-left bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                >
                  <span className="text-indigo-700 font-medium">
                    Create New Strategy
                  </span>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-green-700 font-medium">
                    Export Reports
                  </span>
                </button>
                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <span className="text-purple-700 font-medium">
                    View Analytics
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}