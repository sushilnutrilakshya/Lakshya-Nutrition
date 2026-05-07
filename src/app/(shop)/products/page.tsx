import ProductsClient from "./ProductsClient";
import { getProducts } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products - Lakshya Nutrition",
  description: "Browse our premium sports nutrition products. Scientifically formulated, lab-tested supplements engineered to help you shatter your limits.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsClient initialProducts={products} />;
}
