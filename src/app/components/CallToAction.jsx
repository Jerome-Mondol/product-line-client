import Link from "next/link"

export const CallToAction = () => {
    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Start Shopping?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                    Join thousands of satisfied customers and discover amazing products today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/register"
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Create Account
                    </Link>
                    <Link
                        href="/products"
                        className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        </section>
    )
}