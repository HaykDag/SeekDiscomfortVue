import { AppUrl } from "@/plugins/AppData";
import axios from "axios";

export const uploadImage = async (imageData) => {
  let imgId, imgUrl;
  const formData = new FormData();
  formData.append("upload_preset", "segebppr");
  formData.append("file", imageData);

  try {
    const response = await axios.post(AppUrl.Cloudinary_upload, formData, {
      withCredentials: false,
    });
    imgId = response.data.public_id;
    imgUrl = response.data.url;
  } catch (err) {
    console.log(err);
  }
  return { imgId, imgUrl };
};
