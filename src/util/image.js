export const generateBase64FromImage = (imageFile) => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    // Return the promise based on filereader event listeners
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
  });

  // Blob => URL representing files data
  reader.readAsDataURL(imageFile);
  return promise;
};
