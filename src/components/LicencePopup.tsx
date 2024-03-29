"use client"
import Button from "@/src/components/Button";
import {useState} from "react";
import {createClient} from "../utils/supabase/client";

const LicencePopup = ({onClose}) => {

  const [logiciel, setLogiciel] = useState<string>();
  const [dateAchat, setDateAchat] = useState<Date>(new Date());
  const [dateExpiration, setDateExpiration] = useState<Date>();
  const [prix, setPrix] = useState<number>();

  const addLicence = async () => {
    const supabase = createClient();
    try {
      const {error} = await supabase.from("Licence").insert([{
        logiciel: logiciel,
        date_achat: dateAchat,
        date_expiration: dateExpiration,
        prix: prix,
        responsable: 2
      }]);

      onClose();
    } catch (error) {
      alert("testttt")
    }
  }

  return (
    <div className="bg-white bg-opacity-60 w-full h-full fixed top-0 flex justify-center items-center"
         onClick={onClose}>
      <div className="bg-charcoal h-2/3 w-1/2" onClick={(event) => {
        event.stopPropagation()
      }}>
        <div className="flex justify-end items-center mb-6 p-6">
          <button type="button" onClick={onClose}>
            <svg viewBox="0 0 40 40" stroke="white" height={40}>
              <path d="M 10,10 L 30,30 M 30,10 L 10,30"/>
            </svg>
          </button>
        </div>
        <div className="px-24">
          <span className="text-3xl text-white">Nouvelle licence</span>
          <div className="flex flex-col justify-between mt-6">
            <input required value={logiciel} onChange={(e) => {setLogiciel(e.target.value)}} name="logiciel" className="py-2.5 px-5 pl-0 bg-charcoal border-b outline-none text-white mb-4"
                   placeholder="Logiciel"/>
            <input value={dateAchat.toISOString().split('T')[0]} onChange={(e) => {setDateAchat(new Date(e.target.value))}} name="date_achat" className="py-2.5 px-5 pl-0 bg-charcoal border-b outline-none text-white mb-4"
                   type="date"
                   placeholder="Date d'achat"/>
            <input value={dateExpiration?.toISOString().split('T')[0]} onChange={(e) => {setDateExpiration(new Date(e.target.value))}} name="date_expiration" className="py-2.5 px-5 pl-0 bg-charcoal border-b outline-none text-white mb-4"
                   type="date"
                   placeholder="Date d'expiration"/>
            <input value={prix} onChange={(e) => {setPrix(Number(e.target.value))}} name="prix" className="py-2.5 px-5 pl-0 bg-charcoal border-b outline-none text-white mb-4"
                   placeholder="Prix"/>
            <Button type="submit" onClick={addLicence}>Ajouter</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LicencePopup;
