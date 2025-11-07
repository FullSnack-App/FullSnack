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
            <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-2">
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-black placeholder:text-gray-400 focus:ring-2 transition-all autofill:bg-gray-100 autofill:text-red-500 focus:outline-none focus:ring-primary"
                {...props}
            />
        </div>
    );
};

export default Input;
