import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const ManageMyTripTab = () => {
  const navigate = useNavigate()
  const [cCode, setCCode] = useState("");

  const handleChange = (e) => {
    setCCode(e.target.value);
  };

  const handleSearch = () => {
    console.log(cCode);
    const url = `/book/home/mybooking?npr=${cCode}`;
    navigate(url)
  };

  return (
    <div>
      <div className="max-w-sm mx-auto">
        <div className="mb-5">
          <input
            type="text"
            id="text"
            onChange={handleChange}
            value={cCode}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Confirmation CODE"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ManageMyTripTab;
