export const academyInfo = {
  name: "Champions Sports Academy",
  tagline: "Forging Champions Since 2014",
  description: "Egypt's premier multi-sport training academy with world-class coaches, state-of-the-art facilities, and a proven track record of developing elite athletes across swimming, tennis, and more.",
  yearFounded: 2014,
  yearsOfExcellence: 10,
};

export const stats = [
  { label: "Years of Excellence", value: 10, suffix: "+" },
  { label: "Branches Across Egypt", value: 8, suffix: "" },
  { label: "Active Students", value: 2500, suffix: "+" },
  { label: "Awards Won", value: 150, suffix: "+" },
];

export const milestones = [
  { year: 2014, title: "Founded", description: "Champions Academy established in Cairo with swimming & tennis programs." },
  { year: 2016, title: "First National Title", description: "Our swimmers won 12 gold medals at the Egyptian National Championships." },
  { year: 2018, title: "Expansion", description: "Opened 3 new branches in Alexandria, Giza, and New Cairo." },
  { year: 2020, title: "Digital Transformation", description: "Launched virtual training & performance analytics platform." },
  { year: 2022, title: "International Stage", description: "15 athletes represented Egypt in international competitions." },
  { year: 2024, title: "8 Branches Strong", description: "Expanded to 8 branches across Egypt, serving 2500+ students." },
];

export const sports = [
  {
    id: "swimming",
    name: "Swimming",
    icon: "🏊",
    coach: "Coach Ahmed Hassan",
    schedule: "Sun, Tue, Thu — 4:00 PM",
    achievements: "120+ national medals",
    description: "Olympic-standard pools with certified coaches. Programs for beginners to competitive swimmers.",
    students: 800,
    color: "primary",
  },
  {
    id: "tennis",
    name: "Tennis",
    icon: "🎾",
    coach: "Coach Sarah El-Masry",
    schedule: "Mon, Wed, Sat — 5:00 PM",
    achievements: "50+ tournament victories",
    description: "Professional clay and hard courts with advanced training methodologies.",
    students: 450,
    color: "accent-green",
  },
  {
    id: "football",
    name: "Football",
    icon: "⚽",
    coach: "Coach Omar Farouk",
    schedule: "Mon, Wed, Fri — 4:30 PM",
    achievements: "Regional league champions 2023",
    description: "Full-size pitches with professional coaching for youth development.",
    students: 600,
    color: "accent-red",
  },
  {
    id: "basketball",
    name: "Basketball",
    icon: "🏀",
    coach: "Coach Layla Nour",
    schedule: "Tue, Thu, Sat — 3:00 PM",
    achievements: "Inter-academy champions 2024",
    description: "Indoor courts with strength & conditioning programs included.",
    students: 350,
    color: "gold",
  },
  {
    id: "gymnastics",
    name: "Gymnastics",
    icon: "🤸",
    coach: "Coach Nadia Kamal",
    schedule: "Mon, Wed, Fri — 2:00 PM",
    achievements: "National team selections",
    description: "Fully equipped gym with foam pits, beams, and professional apparatus.",
    students: 200,
    color: "primary",
  },
  {
    id: "martial-arts",
    name: "Martial Arts",
    icon: "🥋",
    coach: "Coach Youssef Amin",
    schedule: "Sun, Tue, Thu — 6:00 PM",
    achievements: "30+ black belt graduates",
    description: "Karate, Taekwondo & Judo programs for discipline and self-defense.",
    students: 300,
    color: "accent-red",
  },
];

export const upcomingEvents = [
  {
    id: 1,
    title: "National Swimming Championship",
    date: "March 15, 2026",
    location: "Cairo International Stadium",
    sport: "Swimming",
    description: "Annual national championship featuring top swimmers from all branches.",
  },
  {
    id: 2,
    title: "Spring Tennis Open",
    date: "April 5, 2026",
    location: "Alexandria Sports Club",
    sport: "Tennis",
    description: "Open tournament for all skill levels with prizes and trophies.",
  },
  {
    id: 3,
    title: "Inter-Branch Football Cup",
    date: "April 20, 2026",
    location: "Giza Sports Complex",
    sport: "Football",
    description: "Annual football competition between all 8 branches.",
  },
  {
    id: 4,
    title: "Summer Sports Festival",
    date: "June 1, 2026",
    location: "All Branches",
    sport: "Multi-Sport",
    description: "Week-long celebration of sports featuring exhibitions, demos, and family events.",
  },
];

export const testimonials = [
  {
    name: "Fatima Al-Rashid",
    role: "Parent",
    text: "My daughter's confidence has skyrocketed since joining Champions. The coaches are exceptional and truly care about each child's development.",
    avatar: "FA",
  },
  {
    name: "Mohamed Saeed",
    role: "Student, Age 16",
    text: "I've been training here for 4 years and won my first national medal last year. The facilities and coaching are world-class.",
    avatar: "MS",
  },
  {
    name: "Dr. Hana Mostafa",
    role: "Parent",
    text: "The progress tracking dashboard helps me stay connected to my children's development. Best academy in Egypt, no doubt.",
    avatar: "HM",
  },
];

export const branches = [
  { id: 1, name: "Maadi Branch", city: "Cairo", address: "15 Street 9, Maadi, Cairo", phone: "+20 2 2345 6789", lat: 29.96, lng: 31.25 },
  { id: 2, name: "New Cairo Branch", city: "Cairo", address: "90th Street, Fifth Settlement", phone: "+20 2 2345 6790", lat: 30.03, lng: 31.47 },
  { id: 3, name: "Heliopolis Branch", city: "Cairo", address: "45 Merghani St, Heliopolis", phone: "+20 2 2345 6791", lat: 30.09, lng: 31.34 },
  { id: 4, name: "6th October Branch", city: "Giza", address: "Central Axis, 6th October City", phone: "+20 2 2345 6792", lat: 29.97, lng: 30.93 },
  { id: 5, name: "Alexandria Branch", city: "Alexandria", address: "Corniche Road, Gleem", phone: "+20 3 4567 8901", lat: 31.22, lng: 29.95 },
  { id: 6, name: "Zamalek Branch", city: "Cairo", address: "26 July St, Zamalek", phone: "+20 2 2345 6793", lat: 30.06, lng: 31.22 },
  { id: 7, name: "Sheikh Zayed Branch", city: "Giza", address: "Beverly Hills, Sheikh Zayed", phone: "+20 2 2345 6794", lat: 30.03, lng: 31.01 },
  { id: 8, name: "Mansoura Branch", city: "Dakahlia", address: "El-Gomhoria St, Mansoura", phone: "+20 50 234 5678", lat: 31.04, lng: 31.38 },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Branches", href: "/branches" },
  { label: "Membership", href: "/membership" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
