export default function OffersTable({
  offers,
  loading,
  buttonsDisabled,
  handleActivate,
  onEdit,
}) {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-800 text-white text-center">
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Items</th>
            <th>Discount</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? skeletonRows.map((_, i) => (
              <tr key={i} className="animate-pulse text-center">
                <td>
                  <div className="w-16 h-16 bg-gray-200 rounded-md mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-28 mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div>
                </td>
                <td>
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))
            : offers.map((offer) => (
              <tr key={offer._id} className="hover:bg-gray-50 text-center">
                <td>
                  {offer.imageUrl && (
                    <div className="tooltip" data-tip={offer.imageUrl}>
                      <img
                        src={offer.imageUrl}
                        alt={offer.title}
                        className="w-16 h-16 object-cover rounded-md border hover:scale-110 transition-transform mx-auto"
                      />
                    </div>
                  )}
                </td>
                <td>{offer.title}</td>
                <td>{offer.description || "-"}</td>
                <td>
                  {offer.menuItems?.map((item) => item.name).join(", ")}
                </td>
                <td>{offer.discountPercent} %</td>
                <td>
                  {offer.isActive ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-error">Inactive</span>
                  )}
                </td>

                {/* ✅ Actions */}
                <td className="text-center align-middle">
                  <div className="flex justify-center gap-2">
                    {/* Edit button */}
                    <button
                      className={`btn btn-sm w-28 bg-warning hover:bg-warning-600 text-white border-none ${buttonsDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                        }`}
                      onClick={() => onEdit(offer)}
                      disabled={buttonsDisabled}
                    >
                      Edit
                    </button>

                    {/* Activate/Deactivate button */}
                    <button
                      className={`btn btn-sm w-28 border-none text-white ${offer.isActive
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                        } ${buttonsDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                        }`}
                      onClick={() => handleActivate(offer)}
                      disabled={buttonsDisabled}
                    >
                      {offer.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
