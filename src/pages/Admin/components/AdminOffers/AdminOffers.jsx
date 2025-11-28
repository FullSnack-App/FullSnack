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
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Offers</h2>
                <button
                    onClick={() => setModalState({ isOpen: true, mode: 'add' })}
                    className="btn btn-primary"
                >
                    + Add Offer
                </button>
            </div>

            <OffersTable
                offers={offers}
                loading={loading}
                buttonsDisabled={buttonsDisabled}
                handleActivate={handleActivate}
                onEdit={(offer) => {
                    setCurrentOffer(offer);
                    setModalState({ isOpen: true, mode: 'edit' });
                }}
            />

            {modalState.isOpen && (
                <OfferModal
                    mode={modalState.mode}
                    offer={modalState.mode === 'edit' ? currentOffer : null}
                    onClose={() => setModalState({ isOpen: false, mode: 'add' })}
                    onSave={handleSaveOffer}
                />
            )}
        </div>
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
