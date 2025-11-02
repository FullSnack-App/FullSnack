import React, { useState } from "react";

export default function AdminOffers() {
  const [menuItems] = useState([
    { _id: "1", name: "Beef Burger" },
    { _id: "2", name: "Fries" },
    { _id: "3", name: "El-Mzfltaaa" },
    { _id: "4", name: "Orange Juice" },
    { _id: "5", name: "Grilled Chicken" },
    { _id: "6", name: "Pasta" },
  ]);

  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    items: [],
    price: "",
  });

  const handleItemSelect = (id) => {
    setNewOffer((prev) => {
      if (prev.items.includes(id)) {
        return { ...prev, items: prev.items.filter((i) => i !== id) };
      } else {
        return { ...prev, items: [...prev.items, id] };
      }
    });
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (!newOffer.title || !newOffer.price || newOffer.items.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    const offerToAdd = {
      ...newOffer,
      id: Date.now().toString(),
      price: parseFloat(newOffer.price),
      itemNames: menuItems
        .filter((i) => newOffer.items.includes(i._id))
        .map((i) => i.name),
    };

    setOffers([...offers, offerToAdd]);
    setNewOffer({ title: "", description: "", items: [], price: "" });
  };

  const handleDeleteOffer = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      setOffers(offers.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Offers Management</h2>
      <form
        onSubmit={handleAddOffer}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Offer Title *</label>
            <input
              type="text"
              placeholder="Enter offer title"
              className="input input-bordered w-full"
              value={newOffer.title}
              onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price *</label>
            <input
              type="number"
              placeholder="Offer price"
              className="input input-bordered w-full"
              value={newOffer.price}
              onChange={(e) => setNewOffer({ ...newOffer, price: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            placeholder="Write offer description"
            className="textarea textarea-bordered w-full"
            value={newOffer.description}
            onChange={(e) =>
              setNewOffer({ ...newOffer, description: e.target.value })
            }
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-2">Select Items *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {menuItems.map((item) => (
              <label
                key={item._id}
                className={`cursor-pointer flex items-center gap-2 border p-2 rounded-md ${
                  newOffer.items.includes(item._id)
                    ? "bg-orange-100 border-orange-400"
                    : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={newOffer.items.includes(item._id)}
                  onChange={() => handleItemSelect(item._id)}
                  className="checkbox checkbox-sm"
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            + Add Offer
          </button>
        </div>
      </form>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th>Title</th>
              <th>Description</th>
              <th>Items</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-gray-50">
                <td>{offer.title}</td>
                <td>{offer.description || "-"}</td>
                <td>{offer.itemNames.join(", ")}</td>
                <td>{offer.price} EGP</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteOffer(offer.id)}
                    className="btn btn-error btn-sm text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {offers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 italic">
                  No offers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
