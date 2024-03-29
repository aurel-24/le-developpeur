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
    <main className="flex flex-col min-h-screen bg-white">
      <nav className="w-full flex justify-end bg-medium-sea-green-700 text-white p-5">
        <LogoutButton/>
      </nav>
      <div className="flex flex-col items-center">
        <div className="w-3/4 flex flex-col my-16">
          <table className="text-left text-white bg-oxford-blue mb-8">
            <thead className="uppercase">
            <tr className="bg-medium-sea-green-700">
              <th className="py-6 px-4">Logiciel</th>
              <th className="py-6 px-4">Prix</th>
              <th className="py-6 px-4">Date d'achat</th>
              <th className="py-6 px-4">Date d'expiration</th>
              <th className="py-6 px-4">Durée de validité restante</th>
              <th className="py-6 px-4">Responsable</th>
            </tr>
            </thead>
            <tbody>
            {
              licences.map((licence, index) => (
                  <tr key={index} className="even:bg-charcoal border-b border-gray-400 content-center">
                    <td className="p-4">{licence.logiciel}</td>
                    <td className="p-4">{licence.prix} €</td>
                    <td className="p-4">{licence.date_achat}</td>
                    <td className="p-4">{licence.date_expiration}</td>
                    <td
                      className="p-4">{getTimeLeft(new Date(licence.date_achat), new Date(licence.date_expiration))} jours
                    </td>
                    <td className="p-4">Abderrahmane</td>
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
