"use client";
import { motion } from "framer-motion";

export default function History() {
  // Mock history data
  const historyItems = [
    {
      id: 1,
      industry: "FinTech",
      date: "2025-09-20",
      title: "Payment Platform Strategy",
      description: "Comprehensive go-to-market strategy for digital payment solution targeting SMB merchants",
    },
    {
      id: 2,
      industry: "HealthTech",
      date: "2025-09-18",
      title: "Telemedicine Expansion",
      description: "Market penetration strategy for AI-powered telehealth platform in rural markets",
    },
    {
      id: 3,
      industry: "EdTech",
      date: "2025-09-15",
      title: "Online Learning Platform",
      description: "Student acquisition strategy for adaptive learning platform targeting K-12 education",
    },
    {
      id: 4,
      industry: "RetailTech",
      date: "2025-09-12",
      title: "E-commerce Expansion",
      description: "Multi-channel retail strategy for emerging markets with focus on mobile-first approach",
    },
    {
      id: 5,
      industry: "PropTech",
      date: "2025-09-10",
      title: "Smart Building Solutions",
      description: "B2B sales strategy for IoT-enabled property management systems targeting enterprise clients",
    },
    {
      id: 6,
      industry: "AgriTech",
      date: "2025-09-08",
      title: "Smart Farming Platform",
      description: "Farmer acquisition strategy for precision agriculture platform in developing regions",
    },
  ];

  // Mock stats data
  const stats = [
    { label: "Total Strategies", value: 42, color: "#6366F1" },
    { label: "Industries Covered", value: 8, color: "#14B8A6" },
    { label: "Success Rate", value: "92%", color: "#22C55E" },
    { label: "Avg. Completion Time", value: "3.2hrs", color: "#F59E0B" },
    { label: "Revenue Generated", value: "$2.4M", color: "#8B5CF6" },
    { label: "Active Projects", value: 5, color: "#EF4444" },
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

  return (
    <div className="text-gray-900 min-h-screen w-60vh">
      <motion.div
        className="w-full border-t-4 border-indigo-600 pt-8 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900">Strategy History Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your GTM strategies and performance metrics</p>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-full">
          
          <motion.div
            className="xl:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold text-gray-900">Recent Strategies</h2>
            </div>
            
            <div className="grid gap-4">
              {historyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/60 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer group relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  {/* Aurora background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="px-3 py-1 text-xs font-medium rounded-full border"
                        style={{ 
                          backgroundColor: industryColors[item.industry]?.bg || "#F3F4F6",
                          color: industryColors[item.industry]?.text || "#374151",
                          borderColor: industryColors[item.industry]?.border || "#E5E7EB"
                        }}
                      >
                        {item.industry}
                      </span>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Stats - Takes 1/3 of space */}
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
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-sm font-medium text-gray-600">{stat.label}</span>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                  <span className="text-indigo-700 font-medium">Create New Strategy</span>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <span className="text-green-700 font-medium">Export Reports</span>
                </button>
                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <span className="text-purple-700 font-medium">View Analytics</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}