import { axiosInstance } from "@/app/axios";
import Link from "next/link";

const getMyProducts = async () => {
  try {
    const res = await axiosInstance.get('/products/my-products');
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default async function MyProducts() {
  const products = await getMyProducts();

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { class: 'bg-green-100 text-green-800', label: 'Published' },
      draft: { class: 'bg-yellow-100 text-yellow-800', label: 'Draft' },
      archived: { class: 'bg-gray-100 text-gray-800', label: 'Archived' },
      out_of_stock: { class: 'bg-red-100 text-red-800', label: 'Out of Stock' }
    };
    
    return statusConfig[status] || { class: 'bg-gray-100 text-gray-800', label: status };
  };

  const getStockLevel = (stock) => {
    if (stock > 20) return { class: 'text-green-600', label: 'In Stock' };
    if (stock > 5) return { class: 'text-yellow-600', label: 'Low Stock' };
    if (stock > 0) return { class: 'text-orange-600', label: 'Very Low' };
    return { class: 'text-red-600', label: 'Out of Stock' };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>  
              <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your product listings and inventory
              </p>
            </div> 
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Link
                href="/products/new"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </Link>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first product.</p>
              <div className="mt-6">
                <Link
                  href="/products/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Product
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => {
                    const status = getStatusBadge(product.status);
                    const stockLevel = getStockLevel(product.stock);
                    const createdDate = new Date(product.createdAt).toLocaleDateString();
                    
                    return (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg overflow-hidden">
                              {product.image ? (
                                <img
                                  className="h-10 w-10 object-cover"
                                  src={product.image}
                                  alt={product.title}
                                />
                              ) : (
                                <div className="h-10 w-10 flex items-center justify-center bg-gray-100">
                                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                {product.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.category || 'Uncategorized'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.class}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <span className={`font-medium ${stockLevel.class}`}>
                              {stockLevel.label}
                            </span>
                            <div className="text-xs text-gray-500">
                              {product.stock} units
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {createdDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/products/${product._id}`}
                              className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                              View
                            </Link>
                            <Link
                              href={`/products/${product._id}/edit`}
                              className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                              onClick={() => {
                                // Delete functionality would go here
                                if (confirm('Are you sure you want to delete this product?')) {
                                  // Handle delete
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        {products.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{products.length}</dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Published</dt>
                <dd className="mt-1 text-3xl font-semibold text-green-600">
                  {products.filter(p => p.status === 'published').length}
                </dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Out of Stock</dt>
                <dd className="mt-1 text-3xl font-semibold text-red-600">
                  {products.filter(p => p.stock === 0).length}
                </dd>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600">
                  ${products.reduce((sum, product) => sum + (product.price * product.stock), 0).toLocaleString()}
                </dd>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}