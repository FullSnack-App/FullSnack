function Button({ className = '', children, ...props }) {
    return (
        <>
            <button
                className={`btn bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 text-center rounded-md ${className}`}
                {...props}
            >
                {children}
            </button>
        </>
    );
}

export default Button;
