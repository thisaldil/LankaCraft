import React from "react";
import ProductCard from "./ProductCard";
export const FeaturedProducts = () => {
  const products = [
    {
      name: "Vintage Leather Tote",
      image:
        "https://i.pinimg.com/736x/5e/a9/4d/5ea94d8d354cccc9a00a424f98185270.jpg",
      price: 89.99,
      originalPrice: 129.99,
      isOnSale: true,
    },
    {
      name: "Pearl Necklace",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      price: 199.99,
      originalPrice: 299.99,
      isOnSale: true,
    },
    {
      name: "Crystal Earrings",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
      price: 59.99,
      originalPrice: 89.99,
      isOnSale: true,
    },
    {
      name: "Designer Clutch",
      image:
        "https://i.pinimg.com/736x/f3/71/34/f37134a931577b331f2acca8a7c1b2a0.jpg",
      price: 149.99,
      originalPrice: 199.99,
      isOnSale: true,
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-bold mb-8">Seasonal Offers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};
export default FeaturedProducts;
