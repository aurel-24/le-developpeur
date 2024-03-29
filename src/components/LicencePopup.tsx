"use client"

import React from "react";
import {createClient} from "@/src/utils/supabase/client";

const LicencePopup = ({onClose}: { onClose: any }) => {

  const addLicence = async (formData: FormData) => {

    const supabase = createClient();
    try {
      const {error} = await supabase.from("Licence").insert([{
        logiciel: formData.get("logiciel"),
        date_achat: new Date((formData.get("date_achat") as string).split("T")[0]),
        date_expiration: new Date((formData.get("date_expiration") as string).split("T")[0]),
        prix: Number(formData.get("prix")),
        responsable: 2
      }]);

      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white bg-opacity-75 w-full min-h-screen fixed top-0 left-0 flex justify-center items-center"
         onClick={onClose}>
      <div className="bg-charcoal w-1/3" onClick={(event) => {
        event.stopPropagation()
      }}>
        <div className="flex justify-end items-center p-6">
          <button type="button" onClick={onClose}>
            <svg viewBox="0 0 40 40" stroke="white" height={40}>
              <path d="M 10,10 L 30,30 M 30,10 L 10,30"/>
            </svg>
          </button>
        </div>
        <div className="p-16 pt-0">
          <span className="text-3xl text-white">Nouvelle licence</span>
          <form className="flex flex-col justify-between mt-12 text-white">
            <label htmlFor="logiciel" className="text-sm text-placeholderGrey">Nom du logiciel</label>
            <input required name="logiciel"
                   className="input-border-b mb-6"
                   placeholder="SolidWorks"/>
            <label htmlFor="prix" className="text-sm text-placeholderGrey">Coût</label>
            <input required name="prix" className="input-border-b mb-6"
                   placeholder="3500"/>
            <label htmlFor="date_achat" className="text-sm text-placeholderGrey">Date d'achat</label>
            <input required name="date_achat"
                   className="input-border-b mb-6"
                   type="date"
                   placeholder="Date d'achat"/>
            <label htmlFor="date_expiration" className="text-sm text-placeholderGrey">Date d'expiration</label>
            <input required name="date_expiration"
                   className="input-border-b mb-6"
                   type="date"
                   placeholder="Date d'expiration"/>
            <label htmlFor="responsable" className="text-sm text-placeholderGrey">Responsable</label>
            <select className="py-2.5 bg-transparent text-white mb-12 border-b" name="responsable">
              <option>Abderrahmane</option>
              <option>Aurélien</option>
            </select>
            <button className="btn-green" formMethod="post" type="submit" formAction={addLicence}>Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LicencePopup;
