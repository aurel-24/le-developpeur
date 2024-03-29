import {createClient} from "@/src/utils/supabase/server";
import {redirect} from "next/navigation";
import LogoutButton from "@/src/components/LogoutButton";
import PopupContainer from "@/src/components/PopupContainer";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const {
    data: licences,
  } = await supabase.from("Licence").select();

  if (!licences) {
    return 0;
  }

  const getTimeLeft = (dateAchat: Date, dateExpiration: Date) => {
    return (dateExpiration.getTime() - dateAchat.getTime()) / (1000 * 60 * 60 * 24);
  }

  return (
    <main className="flex min-h-screen bg-charcoal">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="w-full flex flex-col">
          <nav className="w-full flex justify-end bg-medium-sea-green-700 text-white p-5">
            <LogoutButton/>
          </nav>
          <table className="text-left text-white bg-oxford-blue m-24">
            <thead className="uppercase">
            <tr className="bg-medium-sea-green-700">
              <th className="p-6">Logiciel</th>
              <th>Prix</th>
              <th>Date d'achat</th>
              <th>Date d'expiration</th>
              <th>Durée de validité restante</th>
              <th>Responsable</th>
            </tr>
            </thead>
            <tbody>
            {
              licences.map((licence, index) => (
                  <tr key={index} className="border-b border-gray-300 content-center">
                    <td className="p-4">{licence.logiciel}</td>
                    <td>{licence.prix} €</td>
                    <td>{licence.date_achat}</td>
                    <td>{licence.date_expiration}</td>
                    <td>{getTimeLeft(new Date(licence.date_achat), new Date(licence.date_expiration))} jours</td>
                    <td>Abderrahmane</td>
                  </tr>
                )
              )
            }
            </tbody>
          </table>
          <PopupContainer/>
        </div>
      </div>
    </main>
  );
}
