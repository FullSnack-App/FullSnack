export default function MenuTable({
  loading,
  menuItems,
  buttonsDisabled,
  handleActivate,
  onEdit,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800">
      <table className="table w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rate</th>
            <th>Available</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? skeletonRows.map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td>
                  <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-10"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))
            : menuItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                </td>
                <td>{item.name}</td>
                <td className="capitalize">{item.category}</td>
                <td>{item.price} EGP</td>
                <td>{item.rate} ⭐</td>
                <td>
                  {item.isAvailable ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="text-center align-middle">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        handleActivate(item._id, item.isAvailable)
                      }
                      disabled={buttonsDisabled}
                      className={`btn btn-sm w-28 ${item.isAvailable
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                        } text-white border-none ${buttonsDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                        }`}
                    >
                      {item.isAvailable ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="btn btn-sm w-28 bg-warning hover:bg-warning-600 text-white border-none"
                      onClick={() => onEdit(item)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!loading && totalItems > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="flex space-x-1">
            {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`px-3 py-2 text-sm font-medium rounded-md ${page === currentPage
                  ? 'bg-[#FF5722] text-white border border-[#FF5722]'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
