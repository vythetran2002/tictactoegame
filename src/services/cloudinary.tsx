interface CloudinaryResponse {
  secure_url: string;
  error?: {
    message: string;
  };
}

export const UploadImageToCloudinary = async (
  formData: FormData,
): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/djvo6b8ih/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data: CloudinaryResponse = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Upload failed:", data);
      return undefined;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return undefined;
  }
};
