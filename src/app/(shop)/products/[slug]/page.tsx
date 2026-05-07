import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found - Lakshya Nutrition",
    };
  }

  return {
    title: `${product.title} - Lakshya Nutrition`,
    description: product.description.substring(0, 160),
    openGraph: {
      images: product.images.map((img) => img.url),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(8)
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && p.category.slug === product.category.slug
  ).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
