const url = `https://api.cloudinary.com/v1_1/dujfzjrw5/image/upload`;
const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern-product");
  const dataResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return await dataResponse.json();
};

export default uploadImage;
