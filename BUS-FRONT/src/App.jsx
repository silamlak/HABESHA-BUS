import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import SearchRoutes from "./pages/booking/SearchRoutes";
import RouteResult from "./pages/booking/RouteResult";
import RouteSelection from "./pages/booking/RouteSelection";
import PassengerForm from "./pages/booking/PassengerForm";
import SeatSelection from "./pages/booking/SeatSelection";
import Payment from "./pages/booking/Payment";
import Confirmation from "./pages/booking/Confirmation";
import BookingHome from "./pages/booking/BookingHome";
import MyBooking from "./pages/MyBooking";
import TripStatus from "./pages/TripStatus";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact/:id",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/book",
      element: <SearchRoutes />,
    },
    {
      path: "/book/route/booking",
      element: <RouteResult />,
    },
    {
      path: "/book/route/route-selection",
      element: <RouteSelection />,
    },
    {
      path: "/book/route/passenger-info",
      element: <PassengerForm />,
    },
    {
      path: "/book/route/seat-selection",
      element: <SeatSelection />,
    },

    {
      path: "/book/route/payment",
      element: <Payment />,
    },
    {
      path: "/book/confirmation",
      element: <Confirmation />,
    },
    {
      path: "/book/home",
      element: <BookingHome />,
    },
    {
      path: "/book/home/mybooking",
      element: <MyBooking />,
    },
    {
      path: "/book/home/trip/status",
      element: <TripStatus />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
