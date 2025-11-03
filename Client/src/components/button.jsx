function ButtonComp({ className = '', children }) {
    return (
        <>
            <button
                className={`btn bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 text-center rounded-md ${className}`}
            >
                {children}
            </button>
        </>
    );
}

export default ButtonComp;
