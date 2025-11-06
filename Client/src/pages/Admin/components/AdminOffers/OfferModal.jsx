import { useState, useEffect } from "react";
import { useMenu } from "./../../../../hooks/useMenu";

export default function OfferModal({ mode, offer, onClose, onSave }) {
  const { menuItems } = useMenu();
  const [formData, setFormData] = useState({
  title: "",
  description: "",
  discountPercent: "",
  menuItems: [],
  imageUrl: "",
});


useEffect(() => {
  if (offer) {
    setFormData({
      title: offer.title || "",
      description: offer.description || "",
      discountPercent: offer.discountPercent || "",
      menuItems:
        offer.menuItems?.map((item) =>
          typeof item === "object" ? item._id : item
        ) || [],
      imageUrl: offer.imageUrl || "",
    });
  }
}, [offer]);


  const handleSelectItem = (id) => {
    setFormData((prev) => {
      const alreadySelected = prev.menuItems.includes(id);
      return {
        ...prev,
        menuItems: alreadySelected
          ? prev.menuItems.filter((i) => i !== id)
          : [...prev.menuItems, id],
      };
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center overflow-y-auto z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mt-10 mb-10">
        <h3 className="text-xl font-semibold mb-4">
          {mode === "add" ? "Add Offer" : "Edit Offer"}
        </h3>

        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          {/* Discount */}
          <input
            type="number"
            placeholder="Discount Percent"
            className="input input-bordered w-full"
            value={formData.discountPercent}
            onChange={(e) =>
              setFormData({ ...formData, discountPercent: e.target.value })
            }
          />
          {/* Image URL */}
          <input
            type="text"
            placeholder="Image URL (https://...)"
            className="input input-bordered w-full"
            value={formData.imageUrl || ""}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          />


          {/* Menu Items */}
          <div>
            <label className="block font-medium mb-1">Select Menu Items *</label>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-lg p-2">
              {menuItems.length === 0 ? (
                <p className="text-gray-500 text-sm text-center col-span-2">
                  No menu items found
                </p>
              ) : (
                menuItems.map((item) => (
                  <label
                    key={item._id}
                    className={`flex items-center gap-2 border p-2 rounded-md cursor-pointer ${formData.menuItems.includes(item._id)
                        ? "bg-orange-100 border-orange-400"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.menuItems.includes(item._id)}
                      onChange={() => handleSelectItem(item._id)}
                      className="checkbox checkbox-sm"
                    />
                    {item.name}
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onSave(formData, mode)}
          >
            {mode === "add" ? "Add Offer" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
