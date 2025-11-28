import { useState } from "react";
import toast from "react-hot-toast";
import OfferModal from "./OfferModal";
import OffersTable from "./OfferTable";
import { addOffer, toggleActivateOffer, updateOffer } from "../../../../services/offersServices";
import { useOffer } from '../../../../hooks/useOffer';
import { useMenu } from "../../../../hooks/useMenu";

export default function AdminOffers() {
  const { offers, setOffers, loading } = useOffer();
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, mode: "add" });
  const [currentOffer, setCurrentOffer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /** ✅ Handle Add / Update Offer */
  const { menuItems = [] } = useMenu();

  const handleSaveOffer = async (offerData, mode) => {
    try {
      if (!menuItems.length) {
        toast.error("Menu items not loaded yet, please wait a second.");
        return;
      }

      if (!offerData.title || !offerData.discountPercent || !offerData.menuItems?.length)
        return toast.error("Please fill required fields (title, discount, items)");

      if (mode === "add") {
        const savedOffer = await addOffer({ ...offerData, isActive: true });
        console.log("Sent offer:", offerData);

        const populatedOffer = {
          ...savedOffer,
          menuItems: menuItems.filter((m) =>
            (offerData.menuItems || []).includes(m._id)
          ),
        };
        setOffers([...offers, populatedOffer]);
        toast.success("Offer added successfully!");
      } else if (mode === "edit" && currentOffer?._id) {
        const updated = await updateOffer(currentOffer._id, offerData);
        const populatedOffer = {
          ...updated,
          menuItems: menuItems.filter((m) =>
            (offerData.menuItems || []).includes(m._id)
          ),
        };
        setOffers((prev) =>
          prev.map((o) => (o._id === updated._id ? populatedOffer : o))
        );
        toast.success("Offer updated successfully!");
      }

      setModalState({ isOpen: false, mode: "add" });
      setCurrentOffer(null);
    } catch (error) {
      console.error(error);
      toast.error("Operation failed!");
    }
  };



  /** ✅ Activate / Deactivate Offer */
  const handleActivate = (offer) => {
    const actionText = offer.isActive ? "Deactivate" : "Activate";


    setButtonsDisabled(true);

    toast.custom(
      (t) => (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border dark:border-gray-700 flex flex-col gap-3 max-w-sm">
          <p className="font-medium">
            Are you sure you want to {actionText.toLowerCase()} this offer?
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sm btn-success text-white"
              onClick={async () => {
                try {
                  toast.dismiss(t.id);

                  const updatedOffer = await toggleActivateOffer(
                    offer._id,
                    offer.isActive
                  );

                  setOffers((prev) =>
                    prev.map((o) =>
                      o._id === updatedOffer._id ? updatedOffer : o
                    )
                  );

                  toast.success(`Offer ${actionText.toLowerCase()}d successfully!`);
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to update offer.");
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
        <h2 className="text-2xl font-semibold">Offers</h2>
        <button
          onClick={() => setModalState({ isOpen: true, mode: "add" })}
          className="btn btn-primary"
        >
          + Add Offer
        </button>
      </div>

      <OffersTable
        offers={offers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        loading={loading}
        buttonsDisabled={buttonsDisabled}
        handleActivate={handleActivate}
        onEdit={(offer) => {
          setCurrentOffer(offer);
          setModalState({ isOpen: true, mode: "edit" });
        }}
        currentPage={currentPage}
        totalItems={offers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {modalState.isOpen && (
        <OfferModal
          mode={modalState.mode}
          offer={modalState.mode === "edit" ? currentOffer : null}
          onClose={() => setModalState({ isOpen: false, mode: "add" })}
          onSave={handleSaveOffer}
        />
      )}

    </div>
  );
}
