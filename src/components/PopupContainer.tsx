"use client"

import {useState} from "react";
import LicencePopup from "@/src/components/LicencePopup";

const PopupContainer = () => {

  const [isPopupVisible, setPopupVisibility] = useState(false);

  return (
    <div>
      <button
        onClick={() => {setPopupVisibility(true)}}
        className="bg-medium-sea-green-700 py-2.5 px-5 text-white hover:ring-2 hover:ring-white">
        Ajouter une licence
      </button>
      {isPopupVisible ? <LicencePopup onClose={() => {setPopupVisibility(false)}}/> : null}
    </div>
  );
}

export default PopupContainer;
