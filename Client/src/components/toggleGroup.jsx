function TogglerGroup({ categories, activeCategory, onchange, className = '' }) {
    return (
        <div className={`space-y-8 ${className}`}>
            <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                    <button
                        key={category}
                        value={category}
                        onClick={() => onchange(category)}
                        className={`px-4 py-2 rounded-full border transition-all duration-200 capitalize
                        ${
                            activeCategory === category
                                ? 'bg-orange-600 text-white border-orange-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TogglerGroup;
