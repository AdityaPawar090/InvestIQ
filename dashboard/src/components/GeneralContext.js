import React, { useState, useCallback } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import StockInfoModal from "./StockInfoModal";
import Toast from "./Toast";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
  openInfoModal: (uid, mode) => {},
  closeInfoModal: () => {},
  showToast: (message, type) => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedSellUID, setSelectedSellUID] = useState("");

  const [infoModal, setInfoModal] = useState(null); // { name, mode }

  const [toasts, setToasts] = useState([]);

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedSellUID(uid);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedSellUID("");
  };

  const openInfoModal = (uid, mode) => setInfoModal({ name: uid, mode });
  const closeInfoModal = () => setInfoModal(null);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        openInfoModal,
        closeInfoModal,
        showToast,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedSellUID} />}
      {infoModal && (
        <StockInfoModal name={infoModal.name} mode={infoModal.mode} onClose={closeInfoModal} />
      )}
      <Toast toasts={toasts} removeToast={removeToast} />
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
