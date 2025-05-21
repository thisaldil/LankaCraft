import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchDiscounted = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/products/discounted"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load discounted products", err);
      }
    };
    fetchDiscounted();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold mb-6">
          Seasonal Offers (Discounted)
        </h2>

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
          >
            ◀
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
          >
            ▶
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 no-scrollbar scroll-smooth py-2 px-1"
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="min-w-[200px] max-w-[200px] flex-shrink-0 cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-2">
                  <img
                    src={product.image}
                    alt={product.product}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-md font-medium mb-1">{product.product}</h3>
                <p className="text-blue-600 font-semibold text-sm">
                  ${product.price.toFixed(2)}{" "}
                  <span className="line-through text-gray-500 text-xs ml-2">
                    $
                    {(product.price / ((100 - product.discount) / 100)).toFixed(
                      2
                    )}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
