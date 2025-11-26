import { axiosInstance } from "@/app/axios";
import Link from "next/link";

const getProduct = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  };

  const createdDate = formatDate(product.createdAt);
  const updatedDate = formatDate(product.updatedAt);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to products
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          <div className="flex flex-col">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                  <span className="text-gray-400 text-sm">No image available</span>
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="hidden sm:grid grid-cols-4 gap-2 mt-4">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="rounded-md object-cover cursor-pointer h-20 w-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.title}
            </h1>

            {/* Price and meta info */}
            <div className="mt-4">
              <p className="text-3xl text-gray-900 font-semibold">${product.price}</p>
              
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                {product.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                )}
                
                {product.stock !== undefined && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                )}
                
                {product.rating && (
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <svg
                          key={rating}
                          className={`h-5 w-5 flex-shrink-0 ${
                            product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">({product.rating})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-4">
                {product.description ? (
                  <p className="whitespace-pre-line leading-relaxed">{product.description}</p>
                ) : (
                  <p className="text-gray-500 italic">No description available.</p>
                )}
              </div>
            </div>

            {/* Additional details */}
            {(product.brand || product.sku || createdDate) && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Product details</h3>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {product.brand && (
                    <div className="flex">
                      <span className="text-gray-500 w-16 flex-shrink-0">Brand</span>
                      <span className="text-gray-900 font-medium ml-4">{product.brand}</span>
                    </div>
                  )}
                  
                  {product.sku && (
                    <div className="flex">
                      <span className="text-gray-500 w-16 flex-shrink-0">SKU</span>
                      <span className="text-gray-900 font-medium ml-4">{product.sku}</span>
                    </div>
                  )}
                  
                  {createdDate && (
                    <div className="flex">
                      <span className="text-gray-500 w-16 flex-shrink-0">Added</span>
                      <span className="text-gray-900 font-medium ml-4">{createdDate}</span>
                    </div>
                  )}
                  
                  {updatedDate && updatedDate !== createdDate && (
                    <div className="flex">
                      <span className="text-gray-500 w-16 flex-shrink-0">Updated</span>
                      <span className="text-gray-900 font-medium ml-4">{updatedDate}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex space-x-4">
                <button
                  type="button"
                  disabled={!product.stock || product.stock === 0}
                  className={`flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    (!product.stock || product.stock === 0) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Add to cart
                </button>
                
                <button
                  type="button"
                  className="p-3 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Free shipping on orders over $50
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}