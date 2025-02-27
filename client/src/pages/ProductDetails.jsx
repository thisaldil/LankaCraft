// ProductDetails.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Classic Leather Backpack",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc888?auto=format&fit=crop&q=80",
    ],
    description: "A stylish and durable leather backpack for everyday use.",
    additionalInfo:
      "Made of 100% genuine leather, available in multiple colors.",
    reviews: ["Great quality!", "Loved the material and design."],
  },
  {
    id: 2,
    name: "Urban Laptop Bag",
    price: 69.99,
    images: [
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1547949003-9792a18a2611?auto=format&fit=crop&q=80",
    ],
    description: "Sleek and modern laptop bag with extra compartments.",
    additionalInfo: "Fits up to 15-inch laptops, water-resistant material.",
    reviews: ["Very comfortable to carry.", "Stylish and practical."],
  },
  {
    id: 3,
    name: "Travel Duffel Bag",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565026057447-bc90a3dce888?auto=format&fit=crop&q=80",
    ],
    description: "Spacious duffel bag perfect for travel and gym.",
    additionalInfo: "Lightweight and durable with multiple compartments.",
    reviews: ["Perfect for weekend trips!", "Great size and very sturdy."],
  },
  {
    id: 4,
    name: "Designer Handbag",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b8c?auto=format&fit=crop&q=80",
    ],
    description: "Elegant designer handbag for every occasion.",
    additionalInfo:
      "Luxury vegan leather, available in limited edition colors.",
    reviews: ["Absolutely love it!", "Looks premium and stylish."],
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <button className="mb-4 text-blue-600" onClick={() => navigate("/")}>
        ← Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index}`}
              className="w-full h-auto rounded-lg mb-4"
            />
          ))}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">{product.additionalInfo}</p>
          <p className="text-2xl text-blue-600 font-semibold mb-6">
            ${product.price}
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold">
            Add to Cart
          </button>
          <h3 className="text-xl font-semibold mt-6">Reviews:</h3>
          <ul>
            {product.reviews.map((review, index) => (
              <li key={index} className="text-gray-700 mt-2">
                - {review}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
