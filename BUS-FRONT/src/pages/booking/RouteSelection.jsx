import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBusAlt } from "react-icons/fa";

const RouteSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.search);
  const url = location.search;


  const searchParams = new URLSearchParams(location.search);
    const passenger = searchParams.get('passenger');

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["searchRoute"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/route/search${url}`
        );
        console.log(res.data[0]);
        return res.data[0];
      } catch (error) {
        throw error;
      }
    },
  });

  const [totalCostPerPassenger, setTotalCostPerPassenger] = useState(null);
  const [totalCostForAll, setTotalCostForAll] = useState(null);
  const [surcharges, setSurcharges] = useState(null);
  const [journeyCost, setJourneyCost] = useState(null);

  useEffect(() => {
    if (data) {
      calculateTaxesAndFees();
    }
  }, [data]);

  const calculateTaxesAndFees = () => {
    const taxPercentage = 0.1; // 10% tax rate
    const tax = taxPercentage * data.cost
    const totalTax = tax * passenger
    const foodSurchargePerPassenger = 2 * passenger
    const freeJourneyCost = data.cost - (totalTax + foodSurchargePerPassenger)
    setSurcharges(foodSurchargePerPassenger)
    setJourneyCost(freeJourneyCost)
    setTotalCostPerPassenger(tax);
    setTotalCostForAll(totalTax);
  };

  const handleBooking = () => {
    const durl = `/book/route-selection${url}`;
    navigate(durl);
  };

  if (isLoading) {
    return <div>loading</div>;
  } else if (isError) {
    console.error(error);
    return <div>Error: Failed to fetch route data</div>;
  }

  return (
    <div className="grid grid-cols-2">
      <div className="mx-auto max-w-screen-xl bg-white shadow-lg rounded-lg p-6 m-4 flex flex-col ">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-bold mr-4">{data.origin}</h2>
            <svg
              className="w-[200px] h-1 mx-4"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
            <FaBusAlt className="text-pink-600 text-2xl" />
            <svg
              className="w-[200px] h-1 mx-4"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="0"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
            <h2 className="text-xl font-bold ml-4">{data.destination}</h2>
          </div>

        </div>
        <div className="text-end">
          <button
            onClick={handleBooking}
            type="button"
            className="text-white text-xl bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:outline-none dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
          >
            Continue
          </button>
        </div>
      </div>
                <div className="ml-6">
                <p>
              <strong>Journey Cost:</strong>{" "}
              {journeyCost !== null
                ? `$${journeyCost.toFixed(2)}`
                : "Calculating..."}
            </p>
            <p>
              <strong>Taxes Per Passenger:</strong>{" "}
              {totalCostPerPassenger !== null
                ? `$${totalCostPerPassenger.toFixed(2)}`
                : "Calculating..."}
            </p>
            <p>
              <strong>Total Taxes for All Passengers:</strong>{" "}
              {totalCostForAll !== null
                ? `$${totalCostForAll.toFixed(2)}`
                : "Calculating..."}
            </p>
            <p>
              <strong>Duration:</strong> {data.duration} minutes
            </p>
            <p>
              <strong>Bus ID:</strong> {data.busId}
            </p>
            <p>
              <strong>Date Added:</strong>{" "}
              {new Date(data.dateAdded).toDateString()}
            </p>
          </div>
    </div>
  );
};

export default RouteSelection;
