"use client"

import {useState} from "react";
import LicencePopup from "@/src/components/LicencePopup";

const PopupContainer = () => {

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopupVisibility = () => {
    setPopupVisibility(!isPopupVisible);
  }

  return (
    <div>
      <button
        onClick={togglePopupVisibility}
        className="btn-green">
        Ajouter une licence
      </button>
      {isPopupVisible ? <LicencePopup onClose={togglePopupVisibility}/> : null}
    </div>
  );
}

export default PopupContainer;
