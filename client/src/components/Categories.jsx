import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/featured");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load featured products", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-bold mb-8">Seasonal Offers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.product}
            image={product.image}
            price={product.price}
            originalPrice={product.price / ((100 - product.discount) / 100)} // calculate
            isOnSale={product.discount > 0}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
