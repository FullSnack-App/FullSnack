import React, { useState } from "react";

export default function AdminMenuItem() {
  const [items, setItems] = useState([
    {
      _id: "6902b02283965e8e039ab81d",
      name: "Beef Burger",
      description: "Juicy grilled beef patty with lettuce and cheese",
      price: 120,
      category: "meal",
      rate: 4.5,
      isAvailable: true,
      imagesUrl:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    },
    {
            _id: '6902b03083965e8e039ab81f',
            name: 'Fries',
            description: 'Crispy golden fries with salt',
            price: 50,
            category: 'appetizer',
            rate: 4.2,
            isAvailable: true,
            imagesUrl:
                'https://imgs.search.brave.com/ShRp-hjBX_3YUGEBpVXAA13tgJMQLEyr5HicsKXL78o/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NzI0OTgz/Mjk0NjctYjI3ZTJh/OTdkMjliP2l4bGli/PXJiLTQuMS4wJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4T1h4OFpuSmxi/bU5vSlRJd1puSnBa/WE44Wlc1OE1IeDhN/SHg4ZkRBPSZmbT1q/cGcmcT02MCZ3PTMw/MDA',
            createdAt: '2025-10-30T00:24:16.006Z',
            updatedAt: '2025-10-30T00:24:16.006Z',
            offer: {
                title: 'Burger & Fries Combo',
                discountPercent: '20%',
                priceAfterDiscount: 40,
            },
        },
        {
            _id: '6902b03683965e8e039ab821',
            name: 'El-Mzfltaaaaaa',
            description: 'The best Item in menu',
            price: 80,
            category: 'dessert',
            rate: 5,
            isAvailable: true,
            imagesUrl:
                'https://blaban.net/data/files//ice-1.jpg',
            createdAt: '2025-10-30T00:24:22.783Z',
            updatedAt: '2025-10-30T00:24:22.783Z',
            offer: {
                title: 'Dessert Deal',
                discountPercent: '10%',
                priceAfterDiscount: 72,
            },
        },
        {
            _id: '6902b03d83965e8e039ab823',
            name: 'Fresh Orange Juice',
            description: 'Freshly squeezed orange juice',
            price: 40,
            category: 'drink',
            rate: 4.6,
            isAvailable: true,
            imagesUrl:
                'https://imgs.search.brave.com/DyLJtQOrCjiP1DTYwZXBIZt_jZQqsdmB12JSOAd6wJw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/b3JjaGlkc2FuZHN3/ZWV0dGVhLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/OC9GcmVzaGx5LVNx/dWVlemVkLU9yYW5n/ZS1KdWljZS5qcGc',
            createdAt: '2025-10-30T00:24:29.467Z',
            updatedAt: '2025-10-30T00:24:29.467Z',
            offer: {
                title: 'Healthy Combo',
                discountPercent: '15%',
                priceAfterDiscount: 34,
            },
        },
        {
            _id: '6902b04483965e8e039ab825',
            name: 'Grilled Chicken',
            description: 'Grilled chicken breast with herbs',
            price: 150,
            category: 'meal',
            rate: 4.7,
            isAvailable: true,
            imagesUrl:
                'https://imgs.search.brave.com/PPelJD-GHC0gBLxnIBVc9vl72mm4-bOCWdGrgj2TeuA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20vd2V5by93ZXlv/MTYwNC93ZXlvMTYw/NDAwMDc4LzU1MjM0/ODE3LWdyaWxsZWQt/Y2hpY2tlbi1icmVh/c3QtaW4tZGlmZmVy/ZW50LXZhcmlhdGlv/bnMtd2l0aC1jaGVy/cnktdG9tYXRvZXMt/bXVzaHJvb21zLWhl/cmJzLWN1dC1sZW1v/bi1vbi5qcGc_dmVy/PTY',
            createdAt: '2025-10-30T00:24:36.092Z',
            updatedAt: '2025-10-30T00:24:36.092Z',
            offer: {
                title: 'Healthy Combo',
                discountPercent: '15%',
                priceAfterDiscount: 127.5,
            },
        },
        {
            _id: '6902b2178a36e18c15427bfe',
            name: 'Pasta',
            description: 'Grilled chicken pasta with creamy sauce',
            price: 100,
            category: 'meal',
            rate: 4.7,
            isAvailable: true,
            imagesUrl:
                'https://imgs.search.brave.com/THheMcBtsYFQCYKU4WpcVIXNCrTKW9yKo6g911lCZnk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9mdXNpbGxp/LXBhc3RhLXNwaXJh/bC1zcGlyYWxpLXRv/bWF0by0yNjBudy0y/NTYyMTE5ODI5Lmpw/Zw',
            createdAt: '2025-10-30T00:32:23.184Z',
            updatedAt: '2025-10-30T00:32:23.184Z',
            offer: null,
        },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "meal",
    imagesUrl: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      alert("Please fill required fields (name, price)");
      return;
    }
    const itemToAdd = {
      _id: Date.now().toString(),
      ...newItem,
      price: parseFloat(newItem.price),
      rate: 0,
      isAvailable: true,
    };
    setItems([...items, itemToAdd]);
    setNewItem({ name: "", description: "", price: "", category: "meal", imagesUrl: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Menu Items</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          + Add Item
        </button>
      </div>
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
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td>
                  <img
                    src={item.imagesUrl}
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
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />

              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              ></textarea>

              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />

              <select
                className="select select-bordered w-full"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
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
                value={newItem.imagesUrl}
                onChange={(e) => setNewItem({ ...newItem, imagesUrl: e.target.value })}
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
