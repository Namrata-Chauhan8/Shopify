import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import apiUrl from "./api/Api";
import Context from "./context";
import { setUserDetails } from "./redux/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
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
    console.log("dataResponse", dataResponse);

    } catch (error) {
      console.error("error", error);
    }
   

  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
    <Context.Provider value={{
      fetchUserDetails //user details fetch
    }}>
      <Toaster />
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
