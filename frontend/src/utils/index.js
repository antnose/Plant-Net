// Without try catch
// import axios from "axios";

// Upload image into imagebb
// export const imageUpload = async (imageData) => {
//   const formData = new FormData();
//   formData.append("image", imageData);

//   const { data } = await axios.post(
//     `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
//     formData
//   );
//   console.log(data);

//   return data?.data?.display_url;
// };

// utils/index.js

// With try catch
import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );
    console.log("ImgBB success:", data);
    return data?.data?.display_url;
  } catch (err) {
    console.log("ImgBB error:", err.response?.data);
    throw err;
  }
};

// save or update user in db
export const saveOrUpdateUser = async (userData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user`,
      userData
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
