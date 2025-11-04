function Button({ className = '', children, ...props }) {
    return (
        <>
            <button
                className={`btn bg-primary hover:bg-orange-700 text-white py-2 px-4 text-center rounded-md border-0 ${className}`}
                {...props}
            >
                {children}
            </button>
        </>
    );
}

export default Button;
