import React from "react";
import CategoryList from "../../components/CategoryList";
import BannerProduct from "../../components/BannerProduct";
import HorizontalCartProducts from "../../components/HorizontalCartProducts";

const Home = () => {
  return (
    <div className="min-h-screen">
      <CategoryList />
      <BannerProduct />
      <HorizontalCartProducts category={"airpods"} heading={"Airpods"} />
      <HorizontalCartProducts category={"speakers"} heading={"Speakers"} />
      <HorizontalCartProducts
        category={"watches"}
        heading={"Popular Watches"}
      />
      <HorizontalCartProducts category={"camera"} heading={"Cameras"} />
      <HorizontalCartProducts category={"earphones"} heading={"Earphones"} />
      <HorizontalCartProducts category={"mobiles"} heading={"Smartphones"} />
      <HorizontalCartProducts category={"mouse"} heading={"Mouse"} />
      <HorizontalCartProducts category={"printers"} heading={"Printers"} />
      <HorizontalCartProducts category={"processor"} heading={"Processors"} />
      <HorizontalCartProducts
        category={"refrigerator"}
        heading={"Refrigerators"}
      />
      <HorizontalCartProducts
        category={"televisions"}
        heading={"Smart Televisions"}
      />
      <HorizontalCartProducts category={"trimmers"} heading={"Trimmers"} />
    </div>
  );
};

export default Home;
