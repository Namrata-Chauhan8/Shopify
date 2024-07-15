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
};
export default apiUrl