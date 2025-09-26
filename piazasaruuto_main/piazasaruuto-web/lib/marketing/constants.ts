export const SITE = {
  name: "Piazza Salute",
  subtitle: "Hoya Hair Salon",
  tel: "03-3978-4800",
  email: "info@piazza-salute.com",
  address: "5-35-8 Minami-Oizumi, Nerima-ku, Tokyo 178-0064",
  access: "1 minute walk from Seibu Ikebukuro Line Hoya Station (North Exit). Walk along the tracks and turn left at the first corner.",
  parking: "Coin parking is available nearby. Please call ahead if you plan to drive.",
  hours_note: "Tue–Fri 10:00–19:30 (last cut 18:30) / Sat–Sun & Hol. 9:00–18:30 / Closed on Mondays",
  bookingUrl: "/booking",
  hotpepperUrl: "https://beauty.hotpepper.jp/",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.081599976219!2d139.56598757700579!3d35.74879907256545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018ee1b8f0e4e4f%3A0x1234567890abcdef!2z5Lqs6YO95LyJ6aas5Yy65Y2X5aSn5rOJ77yV77yN77yT77yV77yN77yY!5e0!3m2!1sja!2sjp!4v1234567890123!5m2!1sja!2sjp",
  instagramUrl: "https://www.instagram.com/",
} as const;

export const MENU = {
  cut: [
    { name: "Cut (shampoo & blow dry)", price: "¥5,040" },
    { name: "Fringe cut", price: "¥1,500" },
  ],
  color: [
    { name: "Oil color", price: "¥9,880" },
    { name: "Henna color", price: "¥8,070" },
  ],
  perm: [
    { name: "Perm & cut", price: "¥13,000" },
    { name: "Bangs straight perm", price: "Quote" },
  ],
  spa: [
    { name: "Head spa", price: "¥6,250" },
  ],
  treatment: [
    { name: "TOKIO inkarami", price: "¥8,100" },
  ],
  extension: [
    { name: "Airy extension 100 strands", price: "¥4,400" },
    { name: "Airy extension 300 strands", price: "¥13,200" },
  ],
} as const;

export const STYLISTS = [
  {
    name: "Takako Matsumoto",
    title: "Lead Stylist",
    years: "15 years experience",
    catch: "Precision cuts that enhance natural movement.",
    profile:
      "Takako focuses on creating easy-to-maintain styles that suit each guest's lifestyle. Ask her about refined bobs and short looks.",
    specialties: "Short & bob styles",
    image: "/assets/images/マツモトタカコ.png",
  },
  {
    name: "Yoshimi Kakuta",
    title: "Senior Colorist",
    years: "15 years experience",
    catch: "Gray blending and hair-quality treatments specialist.",
    profile:
      "Born and raised in Hoya, Yoshimi offers warm service and customized care. She excels at gentle gray blending and hair repair menus.",
    specialties: "Gray blending / hair quality control",
    image: "/assets/images/カクタヨシミ.png",
  },
  {
    name: "Mayu Nakayama",
    title: "Owner & Airy Extension Artist",
    years: "3 years experience",
    catch: "Natural-looking volume that boosts confidence.",
    profile:
      "Mayu focuses on non-damaging airy extensions and scalp-friendly solutions. She supports every guest through detailed consultations.",
    specialties: "Volume-up extensions",
    image: "/assets/images/ナカヤママユ.png",
  },
] as const;

export const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Concept", href: "#concept" },
  { label: "Menu", href: "#menu" },
  { label: "Stylists", href: "#stylist" },
  { label: "Access", href: "#access" },
  { label: "Instagram", href: "#instagram" },
] as const;
