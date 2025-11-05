import { useEffect, useState } from "react";
import { useMenu } from "../../../hooks/useMenu";
import { addMenuItem, toggleActivateItem } from "../../../services/menuItemServices";
import toast from "react-hot-toast";

export default function AdminMenuItem() {
  const { menuItems, loading, setMenuItems } = useMenu();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "meal",
    imageUrl: "",
  });

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price) {
      toast.error("Please fill required fields (name, price)");
      return;
    }

    const itemToAdd = {
      ...newItem,
      price: parseFloat(newItem.price),
      rate: 0,
      isAvailable: true,
    };

    try {
      const savedItem = await addMenuItem(itemToAdd);
      setMenuItems([...menuItems, savedItem]);
      setIsModalOpen(false);
      toast.success("Item added successfully!", { duration: 1500 });
      setNewItem({
        name: "",
        description: "",
        price: "",
        category: "meal",
        imageUrl: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item!");
    }
  };

  const handleActivate = async (id, isAvailable) => {
    const actionText = isAvailable ? "Deactivate" : "Activate";
    setButtonsDisabled(true);

    const autoResetTimer = setTimeout(() => {
      setButtonsDisabled(false);
    }, 3000);

    toast.custom((t) => (
      <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col gap-3 max-w-sm">
        <p className="font-medium">
          Are you sure you want to {actionText.toLowerCase()} this item?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-sm btn-success text-white"
            onClick={async () => {
              clearTimeout(autoResetTimer);
              toast.dismiss(t.id);
              await toggleActivateItem(id, menuItems, setMenuItems);
              toast.success(`Item ${actionText.toLowerCase()}d successfully!`, {
                duration: 1000,
                style: {
                  background: "#22c55e",
                  color: "white",
                  fontWeight: "500",
                },
                icon: "✔️",
              });
              setTimeout(() => setButtonsDisabled(false), 1000);
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => {
              clearTimeout(autoResetTimer);
              toast.dismiss(t.id);
              setButtonsDisabled(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Menu Items</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          + Add Item
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
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
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-4 py-3">
                    <div className="skeleton h-12 w-12 rounded-md"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="skeleton h-4 w-32 rounded-md"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="skeleton h-4 w-20 rounded-md"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="skeleton h-4 w-16 rounded-md"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="skeleton h-4 w-12 rounded-md"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="skeleton h-4 w-10 rounded-md"></div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="skeleton h-8 w-20 rounded-md"></div>
                  </td>
                </tr>
              ))
            ) : (
              menuItems.map((item) => (
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
                  <td className="text-center">
                    {item.isAvailable ? (
                      <button
                        onClick={() => handleActivate(item._id, item.isAvailable)}
                        disabled={buttonsDisabled}
                        className={`btn btn-sm w-28 bg-red-600 hover:bg-red-700 text-white border-none ${buttonsDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                          }`}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate(item._id, item.isAvailable)}
                        disabled={buttonsDisabled}
                        className={`btn btn-sm w-28 bg-green-600 hover:bg-green-700 text-white border-none ${buttonsDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                          }`}
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box w-11/12 max-w-lg">
            <h3 className="font-bold text-lg mb-4">Add New Item</h3>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Item Name"
                className="input input-bordered w-full"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              ></textarea>

              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
              />

              <select
                className="select select-bordered w-full"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
              >
                <option value="meal">Meal</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
                <option value="appetizer">Appetizer</option>
              </select>

              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered w-full"
                value={newItem.imageUrl}
                onChange={(e) =>
                  setNewItem({ ...newItem, imageUrl: e.target.value })
                }
              />
            </div>

            <div className="modal-action">
              <button onClick={handleAddItem} className="btn btn-success text-white">
                Save
              </button>
              <button onClick={() => setIsModalOpen(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
