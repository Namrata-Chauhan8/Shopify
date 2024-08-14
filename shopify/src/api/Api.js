const backendDomain = "http://localhost:8080";

const apiUrl = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  login: {
    url: `${backendDomain}/api/login`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout: {
    url: `${backendDomain}/api/logout`,
    method: "get",
  },
  allUsers : {
    url: `${backendDomain}/api/allUsers`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProducts:{
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  editProduct:{
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  categoryProduct:{
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "get",
  },
  productsByCategory:{
    url: `${backendDomain}/api/get-productsByCategory`,
    method: "post",
  },
  productDetails:{
    url: `${backendDomain}/api/get-productDetails`,
    method: "post",
  },
  addToCart:{
    url: `${backendDomain}/api/add-to-cart`,
    method: "post",
  },
  cartCount:{
    url: `${backendDomain}/api/get-cart-count`,
    method: "get",
  },
  addToCartProductView:{
    url: `${backendDomain}/api/view-card-product`,
    method: "get",
  },
  updateCart:{
    url: `${backendDomain}/api/update-addToCart`,
    method: "post",
  },
};
export default apiUrl