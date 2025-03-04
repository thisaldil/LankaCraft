import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Classic Leather Backpack",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Urban Laptop Bag",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Travel Duffel Bag",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Designer Handbag",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80",
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-medium mb-1">{product.name}</h3>
              <p className="text-blue-600 font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
