import { useState } from "react";
import { useMenu } from "../../../../hooks/useMenu";
import {
  addMenuItem,
  toggleActivateItem,
  updateMenuItem,
} from "../../../../services/menuItemServices";
import toast from "react-hot-toast";
import MenuTable from "./MenuTable";
import ItemModal from "./ItemModal";

export default function AdminMenuItem() {
  const { menuItems, loading, setMenuItems } = useMenu();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, mode: "add" });
  const [currentItem, setCurrentItem] = useState(null);

  /** 🔹 handle add or update logic */
  const handleSaveItem = async (itemData, mode) => {
    try {
      if (!itemData.name || !itemData.price)
        return toast.error("Please fill required fields (name, price)");

      if (mode === "add") {
        const savedItem = await addMenuItem({ ...itemData, isAvailable: true });
        setMenuItems([...menuItems, savedItem]);
        toast.success("Item added successfully!");
      } else if (mode === "edit" && currentItem?._id) {
        const updatedItem = await updateMenuItem(currentItem._id, itemData);
        setMenuItems((prev) =>
          prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
        );
        toast.success("Item updated successfully!");
      }

      setModalState({ isOpen: false, mode: "add" });
      setCurrentItem(null);
    } catch (error) {
      console.error(error);
      toast.error("Operation failed!");
    }
  };

  /** 🔹 Activate / Deactivate item */
  const handleActivate = (id, isAvailable) => {
    const actionText = isAvailable ? "Deactivate" : "Activate";

    setButtonsDisabled(true);

    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col gap-3 max-w-sm">
          <p className="font-medium">
            Are you sure you want to {actionText.toLowerCase()} this item?
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sm btn-success text-white"
              onClick={async () => {
                try {
                  toast.dismiss(t.id);
                  await toggleActivateItem(id, menuItems, setMenuItems);
                  toast.success(`Item ${actionText.toLowerCase()}d successfully!`);
                } catch (error) {
                  console.error(error);
                  toast.error("Failed to update item.");
                } finally {
                  setButtonsDisabled(false);
                }
              }}
            >
              Yes
            </button>

            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                toast.dismiss(t.id);
                setButtonsDisabled(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Menu Items</h2>
        <button
          onClick={() => setModalState({ isOpen: true, mode: "add" })}
          className="btn btn-primary"
        >
          + Add Item
        </button>
      </div>

      <MenuTable
        loading={loading}
        menuItems={menuItems}
        buttonsDisabled={buttonsDisabled}
        handleActivate={handleActivate}
        onEdit={(item) => {
          setCurrentItem(item);
          setModalState({ isOpen: true, mode: "edit" });
        }}
      />

      {modalState.isOpen && (
        <ItemModal
          mode={modalState.mode}
          item={modalState.mode === "edit" ? currentItem : null}
          onClose={() => setModalState({ isOpen: false, mode: "add" })}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
}
