

export const CompanyInfo = {
  name: "Travelo",
  tagline: "Your trusted travel booking companion 🌍✈️",
  about: `
Travelo is a modern travel booking platform that allows users to explore, plan, 
and book hotels seamlessly. It offers both an Admin Panel and a User Panel 
to manage bookings efficiently and provide the best travel experience.`,
  
  features: {
    userPanel: [
      "Browse hotels with photos, prices, and details",
      "Filter and search by location, category, or price",
      "Book hotels instantly with a smooth checkout flow",
      "View and manage your personal bookings",
      "Get recommendations based on travel preferences",
      "Chatbot support for FAQs and quick help"
    ],
    adminPanel: [
      "Admin login and authentication",
      "Add, update, or remove hotels",
      "Manage hotel categories and pricing",
      "Track all bookings made by users",
      "View user details and booking history",
      "Monitor analytics for platform performance"
    ]
  },

  support: {
    faqs: [
      { q: "How do I book a hotel?", a: "Go to the User Panel, browse hotels, and click 'Book Now' to complete your booking." },
      { q: "Can I cancel my booking?", a: "Yes, you can cancel bookings from your 'My Bookings' page, based on hotel policy." },
      { q: "How do admins add new hotels?", a: "Admins can log in to the Admin Panel and use the 'Add Hotel' option." },
      { q: "Is payment supported?", a: "Currently, Travelo supports dummy checkout flow. Full payment integration can be added." }
    ],
    contact: "For any help, email us at support@travelo.com"
  },

  categories: [
    "Luxury Hotels",
    "Budget Stays",
    "Resorts",
    "Business Hotels",
    "Family Friendly",
    "Adventure Stays"
  ],

  vision: `
Travelo aims to simplify travel planning by providing a single platform for 
users to discover the best stays and for admins to manage their properties efficiently.`
};
