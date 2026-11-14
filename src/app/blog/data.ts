// src/app/blog/data.ts

export interface BlogBlock {
  type:
    | "paragraph"
    | "subheading"
    | "list"
    | "callout"
    | "image"
    | "heading"
    | "divider"
    | "slideshow"
    | "table";
  text?: string;
  items?: string[];
  style?: string; // e.g. "bullet" | "numbered" | "h2" | "h3" | "h4"
  src?: string;
  alt?: string;
  caption?: string;
  layout?: string; // e.g. "left-image" | "right-image" | "top-image" | "bottom-image" | "none"
  images?: Array<{ src: string; alt?: string; caption?: string }>;
  buttonText?: string;
  buttonLink?: string;
  tableData?: string[][];
}

export interface BlogPost {
  id?: string;
  _id?: string;
  slug: string;
  category: string;
  icon: string;
  tag: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  readTime: string;
  thumbClass: string;
  featured?: boolean;
  publishedDate: string;
  bannerImage?: string;
  bannerImageAlt?: string;
  mobileBannerImage?: string;
  mobileBannerImageAlt?: string;
  previewImage?: string;
  previewImageAlt?: string;
  author: {
    name: string;
    avatarInitials: string;
  };
  content: BlogBlock[];
}

export type FilterCategory =
  | "all"
  | "guides"
  | "customs"
  | "logistics"
  | "gifting"
  | "news";

export const CATEGORIES: { id: FilterCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "guides", label: "Shipping Guides" },
  { id: "customs", label: "Customs & Compliance" },
  { id: "logistics", label: "International Logistics" },
  { id: "gifting", label: "Festive & Gifting" },
  { id: "news", label: "Company News" },
];

export const FEATURED_POST: BlogPost = {
  id: "featured",
  slug: "complete-guide-shipping-india-to-canada",
  category: "guides",
  icon: "🇨🇦",
  tag: "Shipping Guides",
  title: "Complete Guide: Shipping Personal Effects & Cargo from India to Canada",
  description:
    "Planning to ship parcels, household goods, or commercial merchandise from India to Canada? Learn about transit times, documentation, customs regulations, and how door-to-door logistics saves you money.",
  readTime: "7 min",
  thumbClass: "thumb-featured",
  featured: true,
  publishedDate: "November 14, 2026",
  author: {
    name: "DCW Logistics Team",
    avatarInitials: "DCW",
  },
  content: [
    {
      type: "paragraph",
      text: "Moving to Canada or sending care packages, garments, sweets, and essential goods from India across the Pacific can seem daunting. With differing customs jurisdictions, strict CBSA guidelines, and multiple handling points, having a clear roadmap is crucial.",
    },
    {
      type: "paragraph",
      text: "At **DCW Solutions Inc.**, we specialize in seamless door-to-door delivery connecting cities across India—including Delhi NCR, Punjab, Mumbai, Gujarat, and Hyderabad—directly to Canadian doorsteps across Ontario, British Columbia, Alberta, and beyond.",
    },
    {
      type: "heading",
      text: "1. Understanding Transit Times & Flight Connectivity",
      style: "h2",
    },
    {
      type: "paragraph",
      text: "Standard express courier services typically take **4 to 7 business days** for major metropolitan hubs like Toronto (YYZ), Vancouver (YVR), and Montreal (YUL). For regional towns, allow an additional 1 to 2 business days for domestic final-mile delivery.",
    },
    {
      type: "list",
      style: "bullet",
      items: [
        "**Express Air Courier:** 4-6 business days for time-sensitive documents and personal parcels.",
        "**Standard Air Cargo:** 7-10 business days for consolidated commercial shipments.",
        "**Sea Freight (LCL / FCL):** 35-50 days for bulk commercial cargo and full household relocations.",
      ],
    },
    {
      type: "callout",
      text: "💡 **Pro Tip:** Always declare exact parcel weights and dimensions. Volumetric weight is calculated using the standard IATA formula: (Length × Width × Height in cm) ÷ 5000.",
      buttonText: "Calculate Rate",
      buttonLink: "/get-quote",
    },
  ],
};

export const BLOG_POSTS: BlogPost[] = [
  FEATURED_POST,
  {
    id: "post-2",
    slug: "canadian-customs-cbsa-duty-guide-2026",
    category: "customs",
    icon: "📋",
    tag: "Customs & Compliance",
    title: "Navigating Canadian Customs (CBSA): Taxes, Duties, and Exemptions",
    description:
      "Everything you need to know about Canada Border Services Agency regulations, GST/HST thresholds, duty rates on apparel, and personal gifts from overseas.",
    readTime: "6 min",
    thumbClass: "thumb-customs",
    featured: false,
    publishedDate: "November 10, 2026",
    author: {
      name: "DCW Compliance Team",
      avatarInitials: "DCW",
    },
    content: [
      {
        type: "paragraph",
        text: "Importing goods into Canada requires navigating the regulations enforced by the Canada Border Services Agency (CBSA). Whether you are an individual receiving a gift or a business importing inventory, understanding duty and tax liabilities avoids unexpected clearance bills.",
      },
    ],
  },
  {
    id: "post-3",
    slug: "how-door-to-door-courier-booking-works",
    category: "logistics",
    icon: "📦",
    tag: "International Logistics",
    title: "How DCW's Door-to-Door Courier Service Works from Pickup to Delivery",
    description:
      "Step-by-step breakdown of how our reverse logistics and scheduled pickup model delivers packages right from Indian pin codes directly to Canadian addresses.",
    readTime: "5 min",
    thumbClass: "thumb-logistics",
    featured: false,
    publishedDate: "November 5, 2026",
    author: {
      name: "DCW Operations",
      avatarInitials: "DCW",
    },
    content: [
      {
        type: "paragraph",
        text: "Booking international shipping used to mean visiting physical courier shops, filling out stacks of carbon-copy forms, and guessing when your parcel would arrive. DCW has modernized this process with transparent pricing and end-to-end management.",
      },
    ],
  },
];

