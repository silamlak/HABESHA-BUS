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
        
      ]
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
      path: "/book/booking",
      element: <RouteResult />,
    },
    {
      path: "/book/route-selection",
      element: <RouteSelection />,
    },
    {
      path: "/book/passenger-info",
      element: <PassengerForm />,
    },
    {
      path: "/book/seat-selection",
      element: <SeatSelection />,
    },
   
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
