import Link from "next/link.js";
import { axiosInstance } from "../axios.js";

const getData = async () => {
    const res = await axiosInstance.get("/products/all-products");
    return res.data;
};

export default async function Products() {
    const products = await getData();

    return (
        <div className="min-h-screen bg-gray-50  text-gray-900 pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Our Products
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Discover amazing products at great prices
                    </p>
                </div>

                {/* UI-ONLY Search + Category */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full sm:w-1/2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none"
                    />

                    <select
                        className="w-full sm:w-1/4 px-4 py-3 border rounded-lg shadow-sm"
                    >
                        <option>All Categories</option>
                        <option>Electronics</option>
                        <option>Clothes</option>
                        <option>Books</option>
                        <option>Grocery</option>
                    </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Image */}
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500">No Image</span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {product.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${product.price}
                                    </span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                        <Link
                                            href={`/products/${product._id}`}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
