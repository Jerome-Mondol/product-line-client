export const Features = () => {

    const features = [
        {
            title: "Fast Shipping",
            description: "Free delivery on orders over $50",
            icon: "🚚"
        },
        {
            title: "Secure Payment",
            description: "100% secure payment processing",
            icon: "🔒"
        },
        {
            title: "24/7 Support",
            description: "Round the clock customer service",
            icon: "💬"
        },
        {
            title: "Easy Returns",
            description: "30-day money back guarantee",
            icon: "↩️"
        }
    ];


    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose ProductLine?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We provide the best shopping experience with these amazing features
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}