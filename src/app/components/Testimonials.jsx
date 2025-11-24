export const Testimonials = () => {

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Regular Customer",
            content: "ProductLine has completely transformed my shopping experience. Fast delivery and great prices!",
            avatar: "/api/placeholder/100/100"
        },
        {
            name: "Mike Chen",
            role: "Tech Enthusiast",
            content: "The product quality is exceptional. I've purchased multiple electronics and they all exceeded expectations.",
            avatar: "/api/placeholder/100/100"
        },
        {
            name: "Emily Davis",
            role: "Fashion Blogger",
            content: "Love the variety and the customer service is outstanding. Highly recommended!",
            avatar: "/api/placeholder/100/100"
        }
    ];


    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-xl text-gray-600">
                        Don't just take our word for it
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-gray-600">Avatar</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}