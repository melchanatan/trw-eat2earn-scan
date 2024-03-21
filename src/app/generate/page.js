"use client";
import Image from "next/image";
import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar";
export default function Home() {
  const defaultItems = ["hello world", "hi", "its me"];
  const { Canvas } = useQRCode();
  const restaurantId = "1234567890";
  const [loading, setLoading] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [filteredItems, setFilteredItems] = useState(defaultItems);
  const [searchTerm, setSearchTerm] = useState([]);

  const fetchRestaurantData = async () => {
    try {
      const response = await fetch(
        `https://backend-thai-restaurant-week.vercel.app/v1/rest`
      );
      const data = await response.json();
      setRestaurantsData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1>QR code generator</h1>
      <label htmlFor="">Please enter the restaurant name:</label>
      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
        allItems={defaultItems}
      />
      <Canvas
        text={`${process.env.NEXT_PUBLIC_URI}/scan/${restaurantId}`}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        }}
      />
    </main>
  );
}
