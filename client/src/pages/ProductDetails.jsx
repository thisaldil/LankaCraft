import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../pages/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.image); // Assuming main image is single `image` field
        setLoading(false);
      } catch (err) {
        setError("Product not found");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      id: product._id, // if from DB
      product: product.product, // name
      image: product.image || product.images?.[0],
      price: product.price,
      quantity: 1,
    });

    navigate("/cart");
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <button className="mb-4 text-blue-600" onClick={() => navigate("/")}>
        ← Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg mb-4">
            <img
              src={selectedImage}
              alt={product.product}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* If future support for gallery is added */}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.product}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Category: {product.category} / {product.subcategory}
          </p>
          <p className="text-2xl text-blue-600 font-semibold mb-6">
            ${product.price.toFixed(2)}
            {product.discount > 0 && (
              <span className="ml-3 line-through text-gray-500 text-lg">
                ${(product.price / ((100 - product.discount) / 100)).toFixed(2)}
              </span>
            )}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
