const services = [
  { id: 1, title: "Residential Cleaning", description: "Complete home cleaning services tailored to your needs", icon: "🏠" },
  { id: 2, title: "Commercial Cleaning", description: "Professional office and business space cleaning", icon: "🏢" },
  { id: 3, title: "Deep Cleaning", description: "Thorough deep clean for neglected spaces", icon: "✨" },
  { id: 4, title: "Move-in/Move-out", description: "Comprehensive cleaning for moving transitions", icon: "📦" },
  { id: 5, title: "Post-construction", description: "Specialized cleanup after construction projects", icon: "🔨" },
  { id: 6, title: "Recurring Maintenance", description: "Scheduled cleaning for consistent freshness", icon: "📅" }
]

export const getServices = () => services
export const getServiceById = (id) => services.find(s => s.id === id)