import { products } from "../data/productsData.js";

export const getProducts = async () => {
  // simulate network delay (optional but nice)
  return new Promise((resolve) => {
    console.log("Space",products);
    setTimeout(() => {
      resolve(products);
    }, 300);
  });
};
