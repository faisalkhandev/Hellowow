import { removeBackground } from '@imgly/background-removal';

export const removeBackgroundFromImage = async (file:File) => {
  try {
    const imageUrl = URL.createObjectURL(file);
    const result = await removeBackground(imageUrl);
    return URL.createObjectURL(result);
  } catch (error) {
    console.error('Error removing background:', error);
    throw new Error('Error removing background');
  }
}; 



export const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result.toString().split(",")[1] || "");
      } else {
        reject(new Error("File reading failed"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
