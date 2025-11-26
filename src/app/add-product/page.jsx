// app/add-product/page.js
"use client";

import { useState } from "react";
import { secureAxiosInstance } from "../axios";

export default function AddProduct() {

    const createProductInDB = async (formData) => {
        const product = await secureAxiosInstance.post('/products/add-products',
            { formData },
            { withCredentials: true }
        )
    }


    const [formData, setFormData] = useState({
        // Product Details
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
        
        // Seller Details
        sellerName: "",
        sellerEmail: "",
        sellerPhone: "",
        sellerAddress: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProductInDB(formData);
        alert("Product added!");
        setFormData({
            title: "",
            description: "",
            price: "",
            image: "",
            category: "",
            sellerName: "",
            sellerEmail: "",
            sellerPhone: "",
            sellerAddress: ""
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen text-gray-900 bg-gray-50 pt-20">
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8">Add Product</h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Product Details Column */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-center mb-6 pb-2 border-b">Product Details</h2>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter product title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="home">Home & Garden</option>
                                    <option value="sports">Sports</option>
                                    <option value="books">Books</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter product description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price ($) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter price"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        {/* Seller Details Column */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-center mb-6 pb-2 border-b">Seller Details</h2>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Seller Name *
                                </label>
                                <input
                                    type="text"
                                    name="sellerName"
                                    value={formData.sellerName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter seller name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Seller Email *
                                </label>
                                <input
                                    type="email"
                                    name="sellerEmail"
                                    value={formData.sellerEmail}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="seller@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="sellerPhone"
                                    value={formData.sellerPhone}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    name="sellerAddress"
                                    value={formData.sellerAddress}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter seller address"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 pt-6 border-t">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium text-lg"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}