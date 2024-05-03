import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBusAlt } from "react-icons/fa";


const TripStatus = () => {
 const navigate =  useNavigate();
  const location = useLocation();
  console.log(location.search);
  const url = location.search;

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

  if (isLoading) {
    return <div>loading</div>;
  } else if (isError) {
    // Render error state
    console.error(error);
    return <div>Error: Failed to fetch route data</div>;
  }

    // Calculate taxes and fees per passenger
    const taxPercentage = 0.1; // 10% tax rate
    const surcharge = 5; // Fixed surcharge amount
    const totalCostPerPassenger = data.cost + (data.cost * taxPercentage) + surcharge;
  
    // Calculate taxes and fees for all passengers
    const numberOfPassengers = 1; // Assuming only 1 passenger for now
    const totalCostForAll = totalCostPerPassenger * numberOfPassengers;
  

  return (
    <div>
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
        <div className="ml-6">
          <p>
            <strong>Distance:</strong> {data.distance} km
          </p>
          <p>
            <strong>Cost Per Passenger:</strong> ${totalCostPerPassenger.toFixed(2)}
          </p>
          <p>
            <strong>Total Cost for All Passengers:</strong> ${totalCostForAll.toFixed(2)}
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

    </div>
  </div>
  )
};

export default TripStatus;
