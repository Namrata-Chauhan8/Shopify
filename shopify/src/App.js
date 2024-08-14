import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import apiUrl from "./api/Api";
import Context from "./context";
import { setUserDetails } from "./redux/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const [cartCount, setCartCount] = useState(0);
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(apiUrl.current_user.url, {
        method: apiUrl.current_user.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const res = await fetch(apiUrl.cartCount.url, {
        method: apiUrl.cartCount.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setCartCount(data?.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartCount,
          fetchUserAddToCart,
        }}
      >
        <Toaster />
        <Navbar />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
