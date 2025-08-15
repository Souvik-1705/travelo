export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "myPhotos"); // your preset name

  const cloudName = "dxqh8amla"; // from dashboard

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // returns final image URL
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
}
