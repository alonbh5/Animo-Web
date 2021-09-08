export const uploadImage = async (imageFile: any) => {
  if (imageFile) {
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'profileImages');
    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/animo-mta/image/upload',
        {
          method: 'POST',
          body: data
        });
      const file = await res.json();
      return { isValid: true, imageUrl: file.secure_url };
    } catch (err) {
      return { isValid: false, imageUrl: undefined };
    }
  }
  return { isValid: true, imageUrl: undefined };
};
