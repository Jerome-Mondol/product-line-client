import Link from "next/link";
export const FeaturedProducts = () => {

    const featuredProducts = [
        {
            id: 1,
            name: "Wireless Headphones",
            description: "Premium sound quality with noise cancellation",
            price: "$199.99",
            image: "/api/placeholder/300/300"
        },
        {
            id: 2,
            name: "Smart Watch",
            description: "Track your fitness and stay connected",
            price: "$299.99",
            image: "/api/placeholder/300/300"
        },
        {
            id: 3,
            name: "Laptop Backpack",
            description: "Durable and stylish with multiple compartments",
            price: "$79.99",
            image: "/api/placeholder/300/300"
        },
        {
            id: 4,
            name: "Bluetooth Speaker",
            description: "360° surround sound with deep bass",
            price: "$129.99",
            image: "/api/placeholder/300/300"
        },
        {
            id: 5,
            name: "Gaming Mouse",
            description: "High precision with RGB lighting",
            price: "$59.99",
            image: "/api/placeholder/300/300"
        },
        {
            id: 6,
            name: "Phone Case",
            description: "Protective case with sleek design",
            price: "$24.99",
            image: "/api/placeholder/300/300"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Featured Products
                    </h2>
                    <p className="text-xl text-gray-600">
                        Check out our most popular items
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:scale-105"
                        >
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">Product Image</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-blue-600">
                                        {product.price}
                                    </span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link
                        href="/products"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    )
}

