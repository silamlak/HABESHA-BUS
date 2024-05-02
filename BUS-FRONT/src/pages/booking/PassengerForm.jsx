import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setPassInfo } from "../../app/feature/passenger-info";

const PassengerForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const info = useSelector((state) => state.info.passanger_info);
    const [pi, setPi] = useState({
      name: "",
      email: "",
    });
  const dataPersist = () => {
    setPi(info)
  }
  useEffect(() => {
    dataPersist() 
  },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPi((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBooking = () => {
    dispatch(setPassInfo(pi)); // Passing pi to the action creator
    const durl = `/book/route/seat-selection${location.search}`;
    navigate(durl);
  };

  return (
    <div>
      <div className="max-w-sm mx-auto my-[50px]">
        <div className="mb-5">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            value={pi.name}
            onChange={handleChange}
            type="text"
            id="text"
            name="name" // Add name attribute
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            value={pi.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email" // Add name attribute
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
        </div>

        <button
          onClick={handleBooking}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PassengerForm;
