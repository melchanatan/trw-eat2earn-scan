"use client";
import { useEffect, useState } from "react";
import Searchbar from "../../components/global/Searchbar";
import SortByTimestamp from "../../utils/sortByTimestamp";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/v1/user`
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if(selectedUser) fetchUserHistory();
  }, [selectedUser])

  const fetchUserHistory = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URI + "/v1/user/pointhistory/" + selectedUser.id, { method: "GET" }
      );
      const data = await response.json();
      if(response.status == 200){
        const sorted = SortByTimestamp(data)
        setHistory(sorted);
        setUserLoading(false);
      }
  }

  const handleSelect = () => {
    setUserLoading(true);
    setTimeout(() => {
      setUserLoading(false);
    }, 2000);
  };

  return (
    <main className="flex flex-col items-center justify-center p-12">
      <h1 className="font-bold mb-4">Dashboard</h1>
      <label htmlFor="" className="mb-2">
        Please enter the user phone number:
      </label>
      {loading ? (
        <p className="text-gray-600 h-12">Loading...</p>
      ) : (
        <Searchbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          setSelectedItem={setSelectedUser}
          allItems={users.map((user) => {
            return { name: user.firstName + " " + user.id, ...user };
          })}
          onSelect={handleSelect}
        />
      )}
      <h2 className="m-5">User Info</h2>
      <p className="mb-1 text-gray-600">Name: {selectedUser.firstName} {selectedUser.lastName}</p>
      <p className="mb-1 text-gray-600">Phone: {selectedUser.phone}</p>
      <p className="mb-1 text-gray-600">Email: {selectedUser.email}</p>
      <p className="mb-1 text-gray-600">Point: {selectedUser.point}</p>
      <p className="mb-1 text-gray-600">Creation Date: {selectedUser.creationDate ? new Date(selectedUser.creationDate).toString(): ""}</p>
      <h2 className="mb-6 mt-6">User point history</h2>
      {userLoading || loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        history.length > 0 ?
        <div className="bg-gradient-accent-lighter rounded-t-[14px] p-5 overflow-y-auto">
          {history.map((item) => (
            <HistoryListUser 
              key = {item.dateTime}
              dateTime = {item.dateTime}
              resName = {item.name}
              resId = {item.resId}
              amount = {item.amount}
              image = {item.image}
            />
          ))}
        </div>:
        <p className="text-gray-600">None</p>
      )}
    </main>
  );
}

const HistoryListUser = ({dateTime, resName, resId, amount, image}) => {
  return (
    <div className="w-full border-background border-[1px] rounded-[12px] text-background p-5 flex justify-between mb-4">
      <div className="pr-5">
        <p className="opacity-60 font-thin">Point</p>
        <h3 className="text-xl">ResName: {resName}</h3>
        <h3 className="text-xl">ResId: {resId}</h3>
        <h3 className="text-xl">DateTime: {new Date(dateTime).toString()}</h3>
        <h3 className="flex flex-row items-center gap-2 text-xl ">
          {Number(amount) > 0 ? "+"+amount : amount}
        </h3>
      </div>

      <img src={image} className="h-64"/>
    </div>
  );
};


