import { gif1, gif10, gif11, gif12, gif13, gif14, gif15, gif16, gif17, gif18, gif19, gif2, gif20, gif21, gif22, gif3, gif4, gif5, gif6, gif7, gif8, gif9 } from "@/assets";

export const services = [
  {
    id: 1,
    carType: "SEDAN",
    serviceType: "PROTECTION FILM",
    serviceName: "Paint Protection film (Half front)",
    priceBefore: 1990,
    priceAfter: 1590,
    gif: gif1
  },
  {
    id: 2,
    carType: "SEDAN",
    serviceType: "PROTECTION FILM",
    serviceName: "Paint Protection film (Full front)",
    priceBefore: 3990,
    priceAfter: 3190,
    gif: gif2
  },
  {
    id: 3,
    carType: "SEDAN",
    serviceType: "PROTECTION FILM",
    serviceName: "Paint Protection film (Brigh Full Body)",
    priceBefore: 11990,
    priceAfter: 9590,
    gif: gif3
  },
  {
    id: 4,
    carType: "SEDAN",
    serviceType: "PROTECTION FILM",
    serviceName: "Paint Protection film (MAT Full Body)",
    priceBefore: 13990,
    priceAfter: 11190,
    gif: gif4
  },
  {
    id: 5,
    carType: "SEDAN",
    serviceType: "Window Film",
    serviceName: "Thermal Tint",
    priceBefore: 1090,
    priceAfter: 890,
    gif: gif5
  },
  {
    id: 6,
    carType: "SEDAN",
    serviceType: "Window Film",
    serviceName: "Windshield Protection",
    priceBefore: 1090,
    priceAfter: 890,
    gif: gif6
  },
  {
    id: 7,
    carType: "SEDAN",
    serviceType: "Polishing",
    serviceName: "Full Polishing",
    priceBefore: 990,
    priceAfter: 790,
    gif: gif7
  },
  {
    id: 8,
    carType: "SEDAN",
    serviceType: "Polishing",
    serviceName: "Exterior Polish",
    priceBefore: 790,
    priceAfter: 590,
    gif: gif8
  },
  {
    id: 9,
    carType: "SEDAN",
    serviceType: "Nano Ceramic",
    serviceName: "Full Nano Cermaic",
    priceBefore: 1990,
    priceAfter: 1590,
    gif: gif9
  },
  {
    id: 10,
    carType: "SEDAN",
    serviceType: "Nano Ceramic",
    serviceName: "Exterior Nano Cermaic",
    priceBefore: 990,
    priceAfter: 790,
    gif: gif10
  },
  {
    id: 11,
    carType: "SEDAN",
    serviceType: "Nano Ceramic",
    serviceName: "Interior Nano Cermaic",
    priceBefore: 1190,
    priceAfter: 990,
    gif: gif11
  },
  {
    id: 12,
    carType: "SUV",
    serviceType: "PROTECTION FILM",
    serviceName: "Paint Protection film (Half front)",
    priceBefore: 2390,
    priceAfter: 1990,
    gif: gif12
  },
  {
    id: 13,
    carType: "SUV",
    serviceType: "PROTECTION FILM",
    serviceName: "Paint Protection film (Full front)",
    priceBefore: 4590,
    priceAfter: 3690,
    gif: gif13
  },
  {
    id: 14,
    carType: "SUV",
    serviceType: "PROTECTION FILM",
    serviceName: "Paint Protection film (Brigh Full Body)",
    priceBefore: 13990,
    priceAfter: 1190,
    gif: gif14
  },
  {
    id: 15,
    carType: "SUV",
    serviceType: "PROTECTION FILM",
    serviceName: "Paint Protection film (MAT Full Body)",
    priceBefore: 15990,
    priceAfter: 12790,
    gif: gif15
  },
  {
    id: 16,
    carType: "SUV",
    serviceType: "Window Film",
    serviceName: "Thermal Tint",
    priceBefore: 1290,
    priceAfter: 1090,
    gif: gif16
  },
  {
    id: 17,
    carType: "SUV",
    serviceType: "Window Film",
    serviceName: "Windshield Protection",
    priceBefore: 1090,
    priceAfter: 890,
    gif: gif17
  },
  {
    id: 18,
    carType: "SUV",
    serviceType: "Polishing",
    serviceName: "Full Polishing",
    priceBefore: 1090,
    priceAfter: 890,
    gif: gif18
  },
  {
    id: 19,
    carType: "SUV",
    serviceType: "Polishing",
    serviceName: "Exterior Polish",
    priceBefore: 890,
    priceAfter: 690,
    gif: gif19
  },
  {
    id: 20,
    carType: "SUV",
    serviceType: "Nano Ceramic",
    serviceName: "Full Nano Cermaic",
    priceBefore: 2190,
    priceAfter: 1790,
    gif: gif20
  },
  {
    id: 21,
    carType: "SUV",
    serviceType: "Nano Ceramic",
    serviceName: "Exterior Nano Cermaic",
    priceBefore: 1090,
    priceAfter: 890,
    gif: gif21
  },
  {
    id: 22,
    carType: "SUV",
    serviceType: "Nano Ceramic",
    serviceName: "Interior Nano Cermaic",
    priceBefore: 1290,
    priceAfter: 1090,
    gif: gif22
  },
];

export const API_ROUTES = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  createBooking: '/api/v1/bookings',
};

export const voucherCodes = [
  {
    name: 'Voucher 1',
    type: 'percentage',
    value: 10,
    code: 'VOUCHER10'
  },
  {
    name: 'Voucher 2',
    type: 'fixed',
    value: 15,
    code: 'VOUCHER15'
  },
]
