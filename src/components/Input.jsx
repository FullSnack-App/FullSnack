const Input = ({
    label,
    type = 'text',
    id,
    value,
    onChange,
    placeholder,
    required = false,
    className = '',
    ...props
}) => {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 transition-all autofill:bg-gray-100 dark:autofill:bg-gray-700 autofill:text-red-500 focus:outline-none focus:ring-primary"
                {...props}
            />
        </div>
    );
};

export default Input;
