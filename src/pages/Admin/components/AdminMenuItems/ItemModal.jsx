import { useState, useEffect } from "react";

export default function ItemModal({ mode, item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "meal",
    imageUrl: "",
  });

  useEffect(() => {
    if (mode === "edit" && item) setFormData(item);
  }, [item, mode]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box w-11/12 max-w-lg">
        <h3 className="font-bold text-lg mb-4">
          {mode === "edit" ? "Edit Item" : "Add New Item"}
        </h3>

        <div className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Item Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
          />

          <select
            name="category"
            className="select select-bordered w-full"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="meal">meal</option>
            <option value="drink">drink</option>
            <option value="dessert">dessert</option>
            <option value="appetizer">appetizer</option>
          </select>

          <input
            name="imageUrl"
            placeholder="Image URL"
            className="input input-bordered w-full"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="modal-action">
          <button
            onClick={() => onSave(formData, mode)}
            className={`btn ${
              mode === "edit"
                ? "btn-warning text-white"
                : "btn-success text-white"
            }`}
          >
            {mode === "edit" ? "Update" : "Save"}
          </button>
          <button onClick={onClose} className="btn">
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
