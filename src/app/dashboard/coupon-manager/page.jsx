"use client";
import { useEffect, useState } from "react";
import Searchbar from "../../../components/global/Searchbar";
import SortByTimestamp from "../../../utils/SortByTimestamp";
import BackButton from "../../../components/global/BackButton";
import { create } from "domain";
import { fetchData } from "next-auth/client/_utils";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [detail, setDetail] = useState();
  const [point, setPoint] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expDate, setExpDate] = useState();
  const [useWithInDays, setUseWithInDays] = useState();
  const [coupon, setCoupon] = useState([]);

  const createCoupon = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URI + "/v1/coupon/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            restId: selectedRestaurant.id,
            name: name,
            type: type,
            detail: detail,
            point: point,
            quantity: quantity,
            expDate:  new Date(expDate).getTime(),
            useWithInDays: useWithInDays
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      fetchCoupon();
    } catch (error) {
      console.log(error)
    }
  };

  const fetchCoupon = async() => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/coupon",
      { method: "GET" }
    );
    const data = await response.json();
    if (response.status == 200) {
      setCoupon(data);
    }
  }

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
    fetchCoupon();
    fetchRestaurantData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center p-6">
      <BackButton />
      <h1 className="font-bold mt-6 mb-4">Coupon Manager</h1>
      <h2 className="mb-2 mt-4">Create Coupon</h2>
      <label htmlFor="" className="mb-2">
        Please enter the coupon info:
      </label>
      <p className="mb-1 text-gray-600">
        Restaurant Id: {loading ? (
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
          onSelect={() => {}}
        />
      )}
      </p>
      <p className="mb-1 text-gray-600">
        Name: <input type="text" placeholder="Coupon Name" onChange={e => setName(e.target.value)}></input>
      </p>
      <p className="mb-1 text-gray-600">
        Type: <input type="text" placeholder="Coupon Type" onChange={e => setType(e.target.value)}></input>
      </p>
      <p className="mb-1 text-gray-600">
        Detail: <input type="text" placeholder="Coupon Detail" onChange={e => setDetail(e.target.value)}></input>
      </p>
      <p className="mb-1 text-gray-600">
        Point: <input type="number" placeholder="0" onChange={e => setPoint(e.target.value)}></input>
      </p>
      <p className="mb-1 text-gray-600">
        Quantity: <input type="number" placeholder="1" onChange={e => setQuantity(e.target.value)}></input>
      </p>
      <p className="mb-1 text-gray-600">
        Expire Date: <input type="date" onChange={e => setExpDate(e.target.value)}></input>
      </p>
      <p className="mb-1 text-gray-600">
        Use within days: <input type="number" placeholder="7" onChange={e => setUseWithInDays(e.target.value)}></input>
      </p>
      <button onClick={createCoupon} className="underline cursor-pointer">
        Create
      </button>
      <h2 className="mb-6 mt-6">All Coupons</h2>
      <div className="bg-gradient-accent-lighter overflow-y-auto">
        {coupon.map((item) => (
          <div className="mb-4 bg-gray-200 p-2 rounded-xl" key={item.couponId}>
            <p className="text-xs">CouponId: {item.couponId}</p>
            <p className="text-xs">RestId: {item.restId}</p>
            <p className="text-xs">Name: {item.name}</p>
            <p className="text-xs">Detail: {item.detail}</p>
            <p className="text-xs">Type: {item.type}</p>
            <p className="text-xs">Point: {item.point}</p>
            <p className="text-xs">Quantity: {item.quantity}</p>
            <p className="text-xs">ExpDate: {item.expDate}</p>
          </div>
        ))}
      </div>
    </main>
  );
}