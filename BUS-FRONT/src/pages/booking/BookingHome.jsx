import React, { useState } from "react";
import BookingTab from "../tabs/BookingTab";
import ManageMyTripTab from "../tabs/ManageMyTripTab";
import TripStatusTab from "../tabs/TripStatusTab";

const BookingHome = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-3xl">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="default-tab"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg focus:outline-none ${
                  activeTab === "profile" ? "border-b-2 border-blue-500" : ""
                }`}
                id="profile-tab"
                onClick={() => handleTabClick("profile")}
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected={activeTab === "profile" ? "true" : "false"}
              >
                Boog A Trip
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg focus:outline-none hover:text-gray-600 dark:hover:text-gray-300 ${
                  activeTab === "dashboard" ? "border-b-2 border-blue-500" : ""
                }`}
                id="dashboard-tab"
                onClick={() => handleTabClick("dashboard")}
                type="button"
                role="tab"
                aria-controls="dashboard"
                aria-selected={activeTab === "dashboard" ? "true" : "false"}
              >
                Manage my Trips
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg focus:outline-none hover:text-gray-600 dark:hover:text-gray-300 ${
                  activeTab === "settings" ? "border-b-2 border-blue-500" : ""
                }`}
                id="settings-tab"
                onClick={() => handleTabClick("settings")}
                type="button"
                role="tab"
                aria-controls="settings"
                aria-selected={activeTab === "settings" ? "true" : "false"}
              >
                Trip Status
              </button>
            </li>
          </ul>
        </div>
        <div id="default-tab-content">
          <div
            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
              activeTab === "profile" ? "block" : "hidden"
            }`}
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <BookingTab />
          </div>
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "dashboard" ? "block" : "hidden"
          }`}
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <ManageMyTripTab />
        </div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "settings" ? "block" : "hidden"
          }`}
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <TripStatusTab />
        </div>
      </div>
    </div>
  );
};

export default BookingHome;
