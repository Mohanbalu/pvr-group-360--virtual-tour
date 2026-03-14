import { 
  Building2, 
  Trees, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Waves, 
  Dumbbell, 
  Theater, 
  ShoppingBag, 
  Gamepad2, 
  Baby, 
  UtensilsCrossed,
  GraduationCap,
  Hospital,
  ShoppingBasket,
  Stethoscope
} from 'lucide-react';

export const COMPANY_NAME = "PVR Group";
export const TAGLINE = "Building Tomorrow's Legacy Today";

export const STATS = [
  { label: "Acres Land", value: 3.25, suffix: "", icon: Trees },
  { label: "Premium Flats", value: 275, suffix: "", icon: Building2 },
  { label: "BHK Range", value: "2, 3 & 4", suffix: "", icon: MapPin },
  { label: "Premium Amenities", value: 15, suffix: "+", icon: ShieldCheck },
];

export const INDOOR_AMENITIES = [
  { title: "Clubhouse", icon: Building2 },
  { title: "Multipurpose Hall", icon: Users },
  { title: "Gym", icon: Dumbbell },
  { title: "Yoga Room", icon: Waves },
  { title: "Gaming Zone", icon: Gamepad2 },
  { title: "Mini Theatre", icon: Theater },
  { title: "Guest Rooms", icon: Building2 },
  { title: "Supermarket", icon: ShoppingBag },
];

export const OUTDOOR_AMENITIES = [
  { title: "Swimming Pool", icon: Waves },
  { title: "Walking Track", icon: MapPin },
  { title: "Kids Play Area", icon: Baby },
  { title: "Shuttle Courts", icon: Building2 },
  { title: "Cricket Nets", icon: Building2 },
  { title: "Outdoor Gym", icon: Dumbbell },
];

export const NEARBY_LOCATIONS = [
  { name: "Future Education Zone", distance: "0 mins", icon: GraduationCap },
  { name: "Top Universities", distance: "5 mins", icon: GraduationCap },
  { name: "Multi-speciality Hospital", distance: "10 mins", icon: Hospital },
  { name: "Shopping Mall", distance: "12 mins", icon: ShoppingBasket },
  { name: "International School", distance: "8 mins", icon: GraduationCap },
];

export const FLOOR_PLANS = [
  { type: "2 BHK", area: "1250 - 1350 sq.ft", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800" },
  { type: "3 BHK", area: "1650 - 1850 sq.ft", image: "https://images.unsplash.com/photo-1585128719715-46776b56a0d1?auto=format&fit=crop&q=80&w=800" },
  { type: "4 BHK", area: "2250 - 2450 sq.ft", image: "https://images.unsplash.com/photo-1600607687940-47a04b697a63?auto=format&fit=crop&q=80&w=800" },
];

export const TESTIMONIALS = [
  { name: "Anil Kumar", role: "IT Professional", text: "The quality of construction and the attention to detail is impressive. PVR Group has truly delivered on their promise of luxury.", rating: 5 },
  { name: "Saritha Reddy", role: "Business Owner", text: "The location in the future education zone is what attracted me most. It's a great investment for my children's future.", rating: 5 },
  { name: "Vikram Singh", role: "NRI Investor", text: "Smooth booking process and professional team. Looking forward to moving into our dream home.", rating: 4 },
];

export const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800", title: "Exterior View" },
  { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", title: "Swimming Pool" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", title: "Luxury Living Room" },
  { url: "https://images.unsplash.com/photo-1600607687940-47a04b697a63?auto=format&fit=crop&q=80&w=800", title: "Modern Kitchen" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800", title: "Aerial View" },
  { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", title: "Construction Progress" },
];
