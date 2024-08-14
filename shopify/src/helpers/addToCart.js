import apiUrl from "../api/Api";
import { toast } from "react-hot-toast";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  const res = await fetch(apiUrl.addToCart.url, {
    method: apiUrl.addToCart.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const data = await res.json();
  if (data.success) {
    toast.success(data.message);
  }
  if (data.error) {
    toast.error(data.message);
  }
  return data;
};

export default addToCart;
