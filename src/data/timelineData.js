export const CATEGORIES = {
  ALL: { id: "all", label: "All Milestones", color: "#FFB800" },
  GENESIS: { id: "genesis", label: "Genesis & Facilities", color: "#FFB800", bg: "rgba(255, 184, 0, 0.15)" },
  SHOWCASE: { id: "showcase", label: "Showcases & Exhibitions", color: "#00E5FF", bg: "rgba(0, 229, 255, 0.15)" },
  HACKATHONS: { id: "hackathons", label: "Hackathons & Contests", color: "#FF2A6D", bg: "rgba(255, 42, 109, 0.15)" },
  WORKSHOPS: { id: "workshops", label: "Workshops & Outreach", color: "#05FFA1", bg: "rgba(5, 255, 161, 0.15)" },
  DIGITAL: { id: "digital", label: "Digital Innovations", color: "#9D4EDD", bg: "rgba(157, 78, 221, 0.15)" }
};

let timelineMapping = {};
try {
  timelineMapping = require("./timeline_firebase_mapping.json");
} catch (e) {
  // Mapping file will be generated after running upload_to_firebase.py
}

const resolveImg = (path) => timelineMapping[path] || path;

export const timelineData = [
  {
    id: 1,
    year: "2015",
    date: "24th December 2015",
    title: "Genesis of SCIEnT Facility",
    category: CATEGORIES.GENESIS,
    summary: "Inauguration of SCIEnT by Mr. Uma Maheswaran (Mission Director, GSLV ISRO) and Dr. Sundarrajan (Director, NIT Trichy).",
    description: "At their Silver Jubilee, the 1990's batch of REC came up with a vision to support and nurture technological development and innovation at NITT. SCIEnT was founded as a platform for alumni to contribute to their alma mater. On December 24, 2015, the facility was officially inaugurated.",
    image: resolveImg("/assets/timeline/foam_board_1.png"),
    images: [
      resolveImg("/assets/timeline/foam_board_1.png"),
      resolveImg("/assets/timeline/foam_board_2.png"),
      resolveImg("/assets/timeline/foam_board_3.png"),
      resolveImg("/assets/timeline/tools_board.jpg")
    ],
    location: "SCIEnT Lab, NIT Trichy",
    highlights: ["Inaugurated by ISRO GSLV Mission Director", "Funded by REC 1990 Alumni Batch", "First Innovation & Multi-Disciplinary Hub at NITT"]
  },
  {
    id: 2,
    year: "2018",
    date: "April 2018",
    title: "Launch of 'Open House' Showcase",
    category: CATEGORIES.SHOWCASE,
    summary: "Initiation of the annual project showcase event for student tech clubs and innovators.",
    description: "The annual project showcase event, 'Open House,' was initiated in 2018. SCIEnT hosted the event where multiple technical clubs and students displayed their groundbreaking hardware and software projects before a credited professor judging panel.",
    image: resolveImg("/assets/timeline/tools_board.jpg"),
    images: [
      resolveImg("/assets/timeline/tools_board.jpg"),
      resolveImg("/assets/timeline/foam_board_4.png"),
      resolveImg("/assets/timeline/open_house_1.jpg")
    ],
    location: "SCIEnT Complex",
    highlights: ["Credit Judging Panel", "Attractive Cash Prizes", "30+ Projects Displayed"]
  },
  {
    id: 3,
    year: "2020",
    date: "January 2020",
    title: "Alumni Interaction & Tech Meet",
    category: CATEGORIES.GENESIS,
    summary: "Distinguished alumni interaction sessions and technical knowledge exchange at SCIEnT.",
    description: "Interactive session bringing alumni innovators and current campus club leads together to discuss mentorship, hardware prototyping funds, and industry applications.",
    image: resolveImg("/assets/timeline/alumni_1.jpg"),
    images: [
      resolveImg("/assets/timeline/alumni_1.jpg"),
      resolveImg("/assets/timeline/alumni_2.jpg"),
      resolveImg("/assets/timeline/alumni_3.jpg"),
      resolveImg("/assets/timeline/gam_1.jpg")
    ],
    location: "SCIEnT Conference Room",
    highlights: ["Alumni Mentorship Network", "Project Funding Grants", "Industry Exposure"]
  },
  {
    id: 4,
    year: "2020",
    date: "Academic Year 2020",
    title: "Virtual Transition & GAM 2020 Tech Series",
    category: CATEGORIES.WORKSHOPS,
    summary: "Online workshops, webinars, and technical series during restricted physical access.",
    description: "During the lockdown period, when physical gatherings were restricted, SCIEnT shifted focus to digital channels. Guest lectures, workshops, and GAM 2020 tech series were conducted across online platforms to keep the campus innovation spirit vibrant.",
    image: resolveImg("/assets/timeline/gam_1.jpg"),
    images: [
      resolveImg("/assets/timeline/gam_1.jpg"),
      resolveImg("/assets/timeline/gam_2.jpg"),
      resolveImg("/assets/timeline/ttw_1.jpg")
    ],
    location: "Online / Virtual Campus",
    highlights: ["20+ Virtual Webinars", "Cross-domain Skill Series", "Global Alumni Speaker Sessions"]
  },
  {
    id: 5,
    year: "2022",
    date: "October 2022",
    title: "Return to Campus & 'TransfiNITTe' Hackathon",
    category: CATEGORIES.HACKATHONS,
    summary: "48-hour flagship hackathon in collaboration with the Technical Council.",
    description: "Re-energizing post-lockdown technical enthusiasm on campus, SCIEnT collaborated with the Technical Council to organize 'TransfiNITTe', a 48-hour non-stop hackathon fostering real-world software and hardware problem solving.",
    image: resolveImg("/assets/timeline/transfinitte_1.jpg"),
    images: [
      resolveImg("/assets/timeline/transfinitte_1.jpg"),
      resolveImg("/assets/timeline/transfinitte_2.jpg"),
      resolveImg("/assets/timeline/transfinitte_3.jpg"),
      resolveImg("/assets/timeline/transfinitte_4.jpg")
    ],
    location: "Barn Hall & SCIEnT Labs",
    highlights: ["48-Hour Continuous Sprint", "100+ Student Teams", "Hardware Prototyping Support"]
  },
  {
    id: 6,
    year: "2023",
    date: "February 2023",
    title: "E-Summit Entrepreneurship Conclave",
    category: CATEGORIES.WORKSHOPS,
    summary: "3-day entrepreneurship summit in partnership with E-Cell NIT Trichy.",
    description: "Collaborating with E-Cell, SCIEnT hosted 'E-Summit', bringing together startup founders, venture capitalists, and student innovators for keynote talks, panel sessions, and pitch competitions.",
    image: resolveImg("/assets/timeline/annual_meet_2023.jpg"),
    images: [
      resolveImg("/assets/timeline/annual_meet_2023.jpg"),
      resolveImg("/assets/timeline/ttw_2.jpg")
    ],
    location: "GJCH, NIT Trichy",
    highlights: ["3 Days of Keynotes & Panels", "VC Investor Pitch Sessions", "Startup Incubation Track"]
  },
  {
    id: 7,
    year: "2023",
    date: "March 2023",
    title: "Open House × Pragyan Collaboration",
    category: CATEGORIES.SHOWCASE,
    summary: "Mega showcase at Golden Jubilee Convention Hall during Pragyan fest.",
    description: "Open House made a massive comeback in partnership with Pragyan. Held at GJCH, it showcased project exhibits from all campus technical clubs alongside special showcase exhibits from the Pragyan design team.",
    image: resolveImg("/assets/timeline/open_house_2.jpg"),
    images: [
      resolveImg("/assets/timeline/open_house_2.jpg"),
      resolveImg("/assets/timeline/open_house_3.jpg"),
      resolveImg("/assets/timeline/open_house_4.jpg")
    ],
    location: "Golden Jubilee Convention Hall (GJCH)",
    highlights: ["Joint Event with Pragyan Fest", "40+ Club Exhibits", "Over 3,000 Visitors"]
  },
  {
    id: 8,
    year: "2023",
    date: "October 2023",
    title: "TransfiNITTe & Genesis Hackathon",
    category: CATEGORIES.HACKATHONS,
    summary: "Flagship hackathons conducted in association with Technical Council and IIC.",
    description: "TransfiNITTe returned bigger alongside 'Genesis' (in collaboration with the Institution's Innovation Council), bringing interdisciplinary teams to solve societal and industrial challenges.",
    image: resolveImg("/assets/timeline/transfinitte_2.jpg"),
    images: [
      resolveImg("/assets/timeline/transfinitte_2.jpg"),
      resolveImg("/assets/timeline/transfinitte_3.jpg"),
      resolveImg("/assets/timeline/transfinitte_4.jpg")
    ],
    location: "SCIEnT Complex & Campus Venues",
    highlights: ["Over ₹1.5L Prize Pool", "Hardware & Software Tracks", "IIC Incubation Fast-track"]
  },
  {
    id: 9,
    year: "2024",
    date: "March 2024",
    title: "Open House '24 with Pragyan",
    category: CATEGORIES.SHOWCASE,
    summary: "Next-gen annual exhibition of ground-breaking engineering marvels.",
    description: "Pragyan and SCIEnT presented Open House '24, providing student builders an unmatched stage to demonstrate robotic, electrical, and AI solutions to guest professors and industry judges.",
    image: resolveImg("/assets/timeline/annual_day_invite.png"),
    images: [
      resolveImg("/assets/timeline/annual_day_invite.png"),
      resolveImg("/assets/timeline/open_house_1.jpg"),
      resolveImg("/assets/timeline/open_house_3.jpg")
    ],
    location: "GJCH Complex",
    highlights: ["Inter-Club Competition", "Patenting Mentorship", "Faculty Evaluation Panel"]
  },
  {
    id: 10,
    year: "2024",
    date: "April 2024",
    title: "Annual Day & Project Celebration '24",
    category: CATEGORIES.GENESIS,
    summary: "Celebrating campus innovation achievements followed by Annual Day honors.",
    description: "A showcase of engineering breakthroughs developed at the SCIEnT Lab across the academic year, concluding with awards and recognition for top-performing club leads and innovators.",
    image: resolveImg("/assets/timeline/annual_day_1.jpg"),
    images: [
      resolveImg("/assets/timeline/annual_day_1.jpg"),
      resolveImg("/assets/timeline/annual_day_2.jpg"),
      resolveImg("/assets/timeline/annual_day_3.jpg"),
      resolveImg("/assets/timeline/annual_day_4.jpg")
    ],
    location: "SCIEnT Lab & Auditorium",
    highlights: ["Best Innovation Club Award", "Annual Project Grants", "Alumni & Director Address"]
  },
  {
    id: 11,
    year: "2024",
    date: "August 2024",
    title: "Open Day '24 Project Judgement",
    category: CATEGORIES.SHOWCASE,
    summary: "Comprehensive professor evaluation of department and club technical projects.",
    description: "Open Day features all campus technical clubs presenting ongoing projects, individually evaluated by faculty professors for technical feasibility, impact, and research publishing potential.",
    image: resolveImg("/assets/timeline/open_house_4.jpg"),
    images: [
      resolveImg("/assets/timeline/open_house_4.jpg"),
      resolveImg("/assets/timeline/open_house_2.jpg"),
      resolveImg("/assets/timeline/open_house_1.jpg")
    ],
    location: "SCIEnT Exhibition Bay",
    highlights: ["Direct Faculty Reviews", "Research Paper Scouting", "Equipment Allocation"]
  },
  {
    id: 12,
    year: "2024",
    date: "August 2024",
    title: "TransfiNITTe 2024 (42-Hour Flagship)",
    category: CATEGORIES.HACKATHONS,
    summary: "Flagship 42-hour hackathon with 100+ competing teams.",
    description: "Conducted by Technical Council in association with SCIEnT, 100+ teams hacked round the clock to engineer hardware prototypes and full-stack software solutions.",
    image: resolveImg("/assets/timeline/transfinitte_3.jpg"),
    images: [
      resolveImg("/assets/timeline/transfinitte_3.jpg"),
      resolveImg("/assets/timeline/transfinitte_4.jpg"),
      resolveImg("/assets/timeline/transfinitte_1.jpg")
    ],
    location: "SCIEnT Innovation Hall",
    highlights: ["100+ Teams", "42 Hours Non-stop", "Industry Problem Statements"]
  },
  {
    id: 13,
    year: "2024",
    date: "October 2024",
    title: "CONTRIVE Product Design Challenge",
    category: CATEGORIES.HACKATHONS,
    summary: "Campus Development Edition design challenge with Designer Consortium.",
    description: "A product design competition offering ₹7K in prizes and opportunities for patenting, publishing, and 'Fully Funded Project Development and Implementation' using SCIEnT fabrication facilities.",
    image: resolveImg("/assets/timeline/foam_board_3.png"),
    images: [
      resolveImg("/assets/timeline/foam_board_3.png"),
      resolveImg("/assets/timeline/tools_board.jpg")
    ],
    location: "SCIEnT Prototyping Workshop",
    highlights: ["Campus Infrastructure Edition", "Full Development Funding", "Patent & Fab Lab Access"]
  },
  {
    id: 14,
    year: "2024",
    date: "22nd October 2024",
    title: "CFI IIT Madras Innovation Exchange Visit",
    category: CATEGORIES.WORKSHOPS,
    summary: "12-member SCIEnT delegation visit to Centre for Innovation (CFI) IIT Madras.",
    description: "SCIEnT student leads and Manager Mr. Sivanesan visited CFI at IIT Madras, interacting with flagship student teams including ABHIYAAN, AGNIRATH, ABHYUDAY, ANVESHAK, AVISHKAR HYPERLOOP, NIRMAAN, and RAFTAR RACING.",
    image: resolveImg("/assets/timeline/alumni_2.jpg"),
    images: [
      resolveImg("/assets/timeline/alumni_2.jpg"),
      resolveImg("/assets/timeline/alumni_3.jpg")
    ],
    location: "CFI, IIT Madras",
    highlights: ["Cross-Institute Knowledge Sharing", "Interacting with 8 World-Class Teams", "Lab Operations Insights"]
  },
  {
    id: 15,
    year: "2024",
    date: "December 2024",
    title: "CONNECT Interdisciplinary Program Launch",
    category: CATEGORIES.WORKSHOPS,
    summary: "Bridging student talent and faculty projects across multi-disciplinary domains.",
    description: "CONNECT reaches out to campus professors to identify high-impact research requirements and matches interested student developers across engineering disciplines to cultivate interdisciplinary research.",
    image: resolveImg("/assets/timeline/ttw_1.jpg"),
    images: [
      resolveImg("/assets/timeline/ttw_1.jpg"),
      resolveImg("/assets/timeline/ttw_2.jpg")
    ],
    location: "SCIEnT Platform",
    highlights: ["Multi-disciplinary Matchmaking", "Faculty Research Mentorship", "Student Project stipends"]
  },
  {
    id: 16,
    year: "2024",
    date: "December 2024",
    title: "Pragyan Open House Exhibition",
    category: CATEGORIES.SHOWCASE,
    summary: "2-day exhibition during Pragyan featuring year-long technical projects.",
    description: "Students showcased annual projects to visiting faculty, industrial representatives, and student delegates across India, creating avenues for commercial deployment.",
    image: resolveImg("/assets/timeline/open_house_3.jpg"),
    images: [
      resolveImg("/assets/timeline/open_house_3.jpg"),
      resolveImg("/assets/timeline/open_house_1.jpg"),
      resolveImg("/assets/timeline/open_house_2.jpg")
    ],
    location: "Golden Jubilee Convention Hall",
    highlights: ["2-Day Public Exhibition", "Investor & Industry Visibility", "Live Working Demonstrations"]
  },
  {
    id: 17,
    year: "2025",
    date: "January 2025",
    title: "Launch of Official SCIEnT Portal",
    category: CATEGORIES.DIGITAL,
    summary: "Launch of scient.nitt.edu with Room Booking & Inventory Database.",
    description: "The official web platform scient.nitt.edu was launched to centralize operations, featuring automated room booking portals, inventory equipment tracking, and digital project showcases.",
    image: resolveImg("/assets/timeline/foam_board_2.png"),
    images: [
      resolveImg("/assets/timeline/foam_board_2.png"),
      resolveImg("/assets/timeline/foam_board_1.png")
    ],
    location: "scient.nitt.edu",
    highlights: ["Online Room Booking Portal", "Live Hardware Inventory Search", "Centralized Project Repository"]
  },
  {
    id: 18,
    year: "2025",
    date: "February 2025",
    title: "Facility Open Visit & Tech Tour",
    category: CATEGORIES.GENESIS,
    summary: "Interactive facility exploration of advanced tools and machinery.",
    description: "Campus community tour introducing students to high-precision tools, 3D printers, CNC machinery, and project bays shaping the future of technical innovation at NITT.",
    image: resolveImg("/assets/timeline/tools_board.jpg"),
    images: [
      resolveImg("/assets/timeline/tools_board.jpg"),
      resolveImg("/assets/timeline/annexe_3.jpg"),
      resolveImg("/assets/timeline/annexe_4.jpg")
    ],
    location: "SCIEnT Lab Complex",
    highlights: ["Live Machine Demos", "Tool Safety Training", "Workspace Access Pass"]
  },
  {
    id: 19,
    year: "2025",
    date: "April 2025",
    title: "Hands-on Fabrication Workshop Series",
    category: CATEGORIES.WORKSHOPS,
    summary: "3-day practical training on 3D Printing, Lathe Operations, Welding & Drones.",
    description: "Comprehensive hands-on skill workshops from April 3-5 providing practical fabrication training across 3D printing, lathe operations, metal welding, and drone assembly with certifications.",
    image: resolveImg("/assets/timeline/ttw_2.jpg"),
    images: [
      resolveImg("/assets/timeline/ttw_2.jpg"),
      resolveImg("/assets/timeline/tools_board.jpg")
    ],
    location: "SCIEnT Workshop Bays",
    highlights: ["Hands-on Tool Operations", "Certified Skill Completion", "3D Printing & Drone Tracks"]
  },
  {
    id: 20,
    year: "2025",
    date: "July 2025",
    title: "Robotics Awareness Outreach Program",
    category: CATEGORIES.WORKSHOPS,
    summary: "Teaching REC Middle School students basics of robotics using LEGO WeDo 2.0.",
    description: "Initiative proposed by alumna Dr. Sangeetha introducing Class 6 REC Middle School students to robotics in collaboration with Apeksha, using donated LEGO WeDo 2.0 educational kits.",
    image: resolveImg("/assets/timeline/alumni_3.jpg"),
    images: [
      resolveImg("/assets/timeline/alumni_3.jpg"),
      resolveImg("/assets/timeline/alumni_1.jpg")
    ],
    location: "REC Middle School & SCIEnT",
    highlights: ["Community STEM Outreach", "LEGO WeDo 2.0 Educational Kits", "Young Minds Inspiration"]
  },
  {
    id: 21,
    year: "2025",
    date: "August 2025",
    title: "Official SCIEnT Mobile App Launch",
    category: CATEGORIES.DIGITAL,
    summary: "Digital transformation with room booking, inventory tracking, and RFID lab access.",
    description: "Major milestone launching the official mobile application to streamline facility access, automated inventory checkout, meeting room scheduling, and real-time announcements.",
    image: resolveImg("/assets/timeline/foam_board_4.png"),
    images: [
      resolveImg("/assets/timeline/foam_board_4.png"),
      resolveImg("/assets/timeline/foam_board_1.png")
    ],
    location: "Android & iOS Stores",
    highlights: ["RFID Lab Access", "Mobile Inventory Checkout", "Instant Room Reservations"]
  },
  {
    id: 22,
    year: "2025",
    date: "September 2025",
    title: "INVENTIVE × Vishwakarma Awards Cohort",
    category: CATEGORIES.HACKATHONS,
    summary: "Semester-long innovation journey transforming raw ideas into patents & prototypes.",
    description: "In partnership with Maker Bhavan Foundation's Vishwakarma awards, INVENTIVE empowers teams with expert mentorship, seed funding, incubation access, and patenting support.",
    image: resolveImg("/assets/timeline/transfinitte_4.jpg"),
    images: [
      resolveImg("/assets/timeline/transfinitte_4.jpg"),
      resolveImg("/assets/timeline/transfinitte_1.jpg")
    ],
    location: "SCIEnT Innovation Incubator",
    highlights: ["Semester-long Accelerator", "Patent Filing Support", "Maker Bhavan Sponsorship"]
  },
  {
    id: 23,
    year: "2025",
    date: "4th December 2025",
    title: "SCIEnT Annexe Building Inauguration",
    category: CATEGORIES.GENESIS,
    summary: "Grand inauguration of the state-of-the-art SCIEnT Annexe facility.",
    description: "Unveiling of the brand new SCIEnT Annexe expansion, equipped with advanced BPCL laboratory tools, augmented collaboration bays, and expanded prototyping hardware.",
    image: resolveImg("/assets/timeline/annexe_1.png"),
    images: [
      resolveImg("/assets/timeline/annexe_1.png"),
      resolveImg("/assets/timeline/annexe_2.jpg"),
      resolveImg("/assets/timeline/annexe_3.jpg"),
      resolveImg("/assets/timeline/annexe_4.jpg")
    ],
    location: "SCIEnT Annexe Building",
    highlights: ["Expanded Fabrication Space", "BPCL Sponsored Equipment", "State-of-the-Art Prototyping"]
  },
  {
    id: 24,
    year: "2026",
    date: "February 2026",
    title: "Open House 2026 Grand Showcase",
    category: CATEGORIES.SHOWCASE,
    summary: "Record-breaking annual exhibition showcasing next-gen student innovations.",
    description: "The largest Open House to date, featuring over 50+ interdisciplinary projects ranging from autonomous rovers and solar mobility to AI healthcare solutions.",
    image: resolveImg("/assets/timeline/open_house_1.jpg"),
    images: [
      resolveImg("/assets/timeline/open_house_1.jpg"),
      resolveImg("/assets/timeline/open_house_2.jpg"),
      resolveImg("/assets/timeline/open_house_3.jpg"),
      resolveImg("/assets/timeline/open_house_4.jpg")
    ],
    location: "SCIEnT Annexe & GJCH",
    highlights: ["50+ Interdisciplinary Projects", "Record Student & Faculty Footfall", "Industry Commercialization Support"]
  }
];

export const STATS = [
  { value: "10+", label: "Years of Heritage" },
  { value: "24+", label: "Major Milestones" },
  { value: "100+", label: "Hackathon Teams" },
  { value: "50+", label: "Live Prototypes" }
];
