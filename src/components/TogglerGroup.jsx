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
                                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
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
