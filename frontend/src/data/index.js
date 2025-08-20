// ============================
// User Data
// ============================

export const user = {
  name: "Lisa",
  email: "lisa@example.com",
  loyaltyPoints: 125,
  recentTable: [
    {
      id: 1,
      table: "Table No 3",
      date: "2025-08-15",
      time: "18:30",
      people: "2",
      duration: "2-Hours",
      day: "Tuesday",
    },
    {
      id: 2,
      table: "Table No 6",
      date: "2025-08-19",
      time: "21:00",
      people: "2",
      duration: "2-Hours",
      day: "Sunday",
    },
    {
      id: 3,
      table: "Table No 8",
      date: "2025-08-21",
      time: "20:00",
      people: "4",
      duration: "3-Hours",
      day: "Thursday",
    },
    {
      id: 4,
      table: "Table No 5",
      date: "2025-08-21",
      time: "20:00",
      people: "4",
      duration: "3-Hours",
      day: "Thursday",
    },
  ],
  favorites: ["Grilled Steak", "Fresh Garden Salad"],
};

// ============================
// admin data
// ============================

export const admin = {
  name: "Sarah Johnson",
  email: "admin@restaurant.com",
  role: "Administrator",
  profilePicture: "", // leave empty to show default icon
};


// ============================
// User Dashboard Nav Links
// ============================
import { FaUtensils, FaCalendarAlt, FaGift } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

export const dashNavLinks = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: RxDashboard,
  },
  {
    path: "/table",
    label: "Book a Table",
    icon: FaUtensils,
  },
  {
    path: "/reservation",
    label: "Reservations",
    icon: FaCalendarAlt,
  },
  {
    path: "/offer",
    label: "Offers",
    icon: FaGift,
  },
];

// ============================
// Menu Data
// ============================

import dish1 from "../assets/chickenkabab.jpg";
import dish2 from "../assets/pasta.png";
import dish3 from "../assets/steak.jpg";
import dish4 from "../assets/salad.jpg";

export const menuItems = [
  {
    id: 1,
    name: "Chicken Kabab",
    description: "Spiced grilled chicken served with garlic sauce.",
    price: "$12.99",
    image: dish1,
  },
  {
    id: 2,
    name: "Creamy Alfredo Pasta",
    description: "Rich Alfredo sauce over fettuccine and grilled chicken.",
    price: "$10.49",
    image: dish2,
  },
  {
    id: 3,
    name: "Grilled Steak",
    description: "Juicy sirloin steak grilled to perfection with herbs.",
    price: "$17.25",
    image: dish3,
  },
  {
    id: 4,
    name: "Fresh Garden Salad",
    description: "Crisp greens, cherry tomatoes, and vinaigrette.",
    price: "$7.99",
    image: dish4,
  },
];

// ============================
// Services Data
// ============================

import {
  FaGlassCheers,
  FaBirthdayCake,
  FaTruck,
  FaConciergeBell,
  FaLeaf,
} from "react-icons/fa";

export const servicesData = [
  {
    icon: FaUtensils,
    color: "text-orange-500",
    title: "Fine Dining Experience",
    desc: "Enjoy a sophisticated dining atmosphere with our chef’s curated menu featuring fresh, seasonal ingredients.",
  },
  {
    icon: FaGlassCheers,
    color: "text-pink-500",
    title: "Private Events",
    desc: "From corporate dinners to family celebrations, we provide a personalized dining experience for your special occasions.",
  },
  {
    icon: FaBirthdayCake,
    color: "text-yellow-500",
    title: "Custom Celebrations",
    desc: "Make birthdays, anniversaries, and engagements unforgettable with our themed setups and signature desserts.",
  },
  {
    icon: FaTruck,
    color: "text-green-500",
    title: "Home Delivery",
    desc: "Enjoy restaurant-quality meals from the comfort of your home with our fast and fresh delivery service.",
  },
  {
    icon: FaConciergeBell,
    color: "text-blue-500",
    title: "Table Reservation",
    desc: "Book your table online for a hassle-free dining experience with priority seating.",
  },
  {
    icon: FaLeaf,
    color: "text-emerald-500",
    title: "Healthy & Vegan Options",
    desc: "Our menu includes a variety of wholesome, plant-based meals without compromising on flavor.",
  },
];

// ============================
// Reviews Data
// ============================

export const reviews = [
  {
    id: 1,
    name: "Malik Farhan",
    rating: 5,
    comment: "Absolutely amazing food and quick service. Highly recommended!",
  },
  {
    id: 2,
    name: "Dawood Amjad",
    rating: 4,
    comment: "Lovely ambiance and tasty meals. Will definitely come again.",
  },
  {
    id: 3,
    name: "Naveed Asghar",
    rating: 3,
    comment: "Food was good but the waiting time was a bit long.",
  },
  {
    id: 4,
    name: "Donald J Trump",
    rating: 5,
    comment: "Absolutely amazing food and quick service. Highly recommended!",
  },
  {
    id: 5,
    name: "Satoshi Nakamoto",
    rating: 4,
    comment: "Lovely ambiance and tasty meals. Will definitely come again.",
  },
  {
    id: 6,
    name: "David Johnson",
    rating: 3,
    comment: "Food was good but the waiting time was a bit long.",
  },
];

// ============================
// Admin Dashboard Data
// ============================

export const statsData = [
  {
    id: 1,
    title: "Reservations",
    value: 12,
    gradient: "from-orange-400 to-orange-600",
  },
  {
    id: 2,
    title: "Active Tables",
    value: 10,
    gradient: "from-blue-400 to-blue-600",
  },
];

export const reservationsData = [
  { id: 1, name: "Ali", table: 5, date: "2025-08-18" },
  { id: 2, name: "Sara", table: 4, date: "2025-08-19" },
  { id: 3, name: "Usman", table: 8, date: "2025-08-20" },
  { id: 4, name: "Hina", table: 2, date: "2025-08-21" },
];

export const adminReservations = [
  {
    id: 1,
    customer: "Ali Khan",
    email: "ali@example.com",
    table: 5,
    guest: 2,
    duration: "2 hrs",
    date: "2025-08-18",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Sara Ahmed",
    email: "sara@example.com",
    table: 9,
    guest: 2,
    duration: "2 hrs",
    date: "2025-08-19",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Usman Tariq",
    email: "usman@example.com",
    table: 8,
    guest: 2,
    duration: "2 hrs",
    date: "2025-08-20",
    status: "Cancelled",
  },
  {
    id: 4,
    customer: "Hina Fatima",
    email: "hina@example.com",
    table: 2,
    guest: 2,
    duration: "2 hrs",
    date: "2025-08-21",
    status: "Pending",
  },
  {
    id: 5,
    customer: "sana",
    email: "hina@example.com",
    table: 2,
    guest: 2,
    duration: "2 hrs",
    date: "2025-08-21",
    status: "Confirmed",
  },
  {
    id: 6,
    customer: "akram",
    email: "hina@example.com",
    table: 2,
    guest: 2,
    duration: "2 hrs",
    date: "2025-08-21",
    status: "Confirmed",
  },
  {
    id: 7,
    customer: "farhan",
    email: "hina@example.com",
    table: 2,
    guest: 2,
    duration: "2 hrs",
    date: "2025-08-21",
    status: "Confirmed",
  },
];

export const adminTables = [
  { id: 1, Guest: 2, status: "Available" },
  { id: 2, Guest: 4, status: "Available" },
  { id: 3, Guest: 2, status: "Reserved" },
  { id: 4, Guest: 4, status: "Reserved" },
  { id: 5, Guest: 2, status: "Available" },
  { id: 6, Guest: 2, status: "Available" },
  { id: 7, Guest: 4, status: "Available" },
  { id: 8, Guest: 2, status: "Available" },
  { id: 9, Guest: 4, status: "Available" },
  { id: 10,Guest: 2, status: "Available" },
];
