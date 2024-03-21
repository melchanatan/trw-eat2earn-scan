"use client";
import Image from "next/image";
import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar";
export default function Home() {
  const defaultItems = ["hello world", "hi", "its me"];
  const { Canvas } = useQRCode();
  const [restaurantId, setRestaurantId] = "1234567890";
  const [loading, setLoading] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const fetchRestaurantData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/v1/rest`
      );
      const data = await response.json();
      setRestaurantsData(data);
      console.log(data);
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          setSelectedItem={setSelectedRestaurant}
          allItems={restaurantsData.map((restaurant) => {
            return { name: restaurant.name, id: restaurant.id };
          })}
        />
      )}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Generate QR code
      </button>
      <h1>Restaurant id</h1>
      <p>{selectedRestaurant.id}</p>
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
