function SkeletonMenuItem() {
    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <div className="skeleton h-40 w-full rounded-xl"></div>
                <div className="skeleton h-4 w-28 rounded-md"></div>
                <div className="skeleton h-4 w-full rounded-md"></div>
                <div className="skeleton h-4 w-full rounded-md"></div>
            </div>
        </>
    );
}

export default SkeletonMenuItem;
