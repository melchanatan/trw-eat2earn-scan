"use client";
import Image from "next/image";
import { useQRCode } from "next-qrcode";
import { useEffect, useState } from "react";
import Searchbar from "../../components/global/Searchbar";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const defaultItems = ["hello world", "hi", "its me"];
  const { Canvas } = useQRCode();
  const [restaurantId, setRestaurantId] = "1234567890";
  const [loading, setLoading] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [qrLoading, setQrLoading] = useState(false);

  const fetchRestaurantData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/v1/rest`
      );
      const data = await response.json();
      setRestaurantsData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  const handleQrLoading = () => {
    setQrLoading(true);
    setTimeout(() => {
      setQrLoading(false);
    }, 200);
  };

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-10">QR code generator</h1>
      <label htmlFor="" className="mb-2">
        Please enter the restaurant name:
      </label>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          setSelectedItem={setSelectedRestaurant}
          allItems={restaurantsData.map((restaurant) => {
            return { name: restaurant.title, id: restaurant.id };
          })}
          onSelect={handleQrLoading}
        />
      )}
      <h1 className="mt-5">Restaurant id</h1>
      <p className="mb-5 text-gray-400">{selectedRestaurant.id}</p>
      {qrLoading || loading ? (
        <p className="text-gray-600">Generating...</p>
      ) : (
        <Canvas
          text={`${process.env.NEXT_PUBLIC_URI}/scan/${selectedRestaurant.id}`}
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
      )}
    </main>
  );
}
