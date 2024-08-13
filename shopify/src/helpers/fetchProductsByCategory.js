const { default: apiUrl } = require("../api/Api");

const fetProductsByCategory = async (category) => {
  const res = await fetch(apiUrl.productsByCategory.url, {
    method: apiUrl.productsByCategory.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });
  const data = await res.json();
  return data;
};

export default fetProductsByCategory;
