export const CompanyInfo = {
  name: "Travelo",
  tagline: "Your trusted travel booking companion 🌍✈️",

  about: `
Travelo is a modern travel booking platform that allows users to explore, plan, 
and book hotels seamlessly. It offers both an Admin Panel and a User Panel 
to manage bookings efficiently and provide the best travel experience.
`,

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

  famousPlaces: {
    kolkata: [
      {
        name: "Victoria Memorial",
        description: "A grand marble museum dedicated to Queen Victoria, showcasing British-era history and art.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Victoria_Memorial_Kolkata.jpg"
      },
      {
        name: "Howrah Bridge",
        description: "An iconic cantilever bridge over the Hooghly River, one of the busiest in the world.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Howrah_bridge_at_night.jpg"
      },
      {
        name: "Dakshineswar Kali Temple",
        description: "A historic Hindu temple dedicated to Goddess Kali, located by the Hooghly River.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Dakshineswar_Kali_Temple_Bharat_Chatterjee_Wikipedia.jpg"
      }
    ],
    mumbai: [
      {
        name: "Gateway of India",
        description: "A historic arch monument overlooking the Arabian Sea, built during the British Raj.",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gateway_of_India_Mumbai.jpg"
      },
      {
        name: "Marine Drive",
        description: "A 3.6 km-long boulevard along the Arabian Sea, also known as the Queen's Necklace.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Marine_Drive_Mumbai_at_night.jpg"
      },
      {
        name: "Elephanta Caves",
        description: "A UNESCO World Heritage Site with rock-cut cave temples dedicated to Lord Shiva.",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Elephanta_caves_trimurti.jpg"
      }
    ]
  },

  categories: [
    "Luxury Hotels",
    "Budget Stays",
    "Resorts",
    "Business Hotels",
    "Family Friendly",
    "Adventure Stays"
  ],

  services: [
    "Hotel booking and cancellations",
    "User profile and booking history management",
    "AI-powered chatbot support",
    "Personalized recommendations",
    "Admin panel for hotel management",
    "Dummy payment checkout (upgradeable to real integration)"
  ],

  support: {
    faqs: [
      { q: "How do I book a hotel?", a: "Go to the User Panel, browse hotels, and click 'Book Now' to complete your booking." },
      { q: "Can I cancel my booking?", a: "Yes, you can cancel bookings from your 'My Bookings' page, based on hotel policy." },
      { q: "How do admins add new hotels?", a: "Admins can log in to the Admin Panel and use the 'Add Hotel' option." },
      { q: "Is payment supported?", a: "Currently, Travelo supports dummy checkout flow. Full payment integration can be added." }
    ],
    contact: {
      email: "support@travelo.com",
      phone: "+91-9876543210",
      address: "Travelo HQ, Kolkata, India"
    }
  },

  vision: `
Travelo aims to simplify travel planning by providing a single platform for 
users to discover the best stays, explore famous places, and for admins to 
manage their properties efficiently.
`,

  mission: `
To make travel booking seamless, transparent, and enjoyable while 
empowering property owners with easy management tools.
`
};
