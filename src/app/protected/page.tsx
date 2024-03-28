import AuthButton from "@/src/components/AuthButton";
import {createClient} from "@/src/utils/supabase/server";
import {redirect} from "next/navigation";

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

  return (
    <main className="flex min-h-screen bg-charcoal">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="w-full flex flex-col">
          <nav className="w-full flex justify-center bg-medium-sea-green-700 text-white h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              <AuthButton/>
            </div>
          </nav>
          <table className="text-left text-white bg-oxford-blue m-24">
            <thead className="uppercase">
            <tr className="bg-medium-sea-green-700">
              <th className="p-6">Logiciel</th>
              <th>Type de licence</th>
              <th>Date d'achat</th>
              <th>Date d'expiration</th>
              <th>Prix</th>
            </tr>
            </thead>
            <tbody>
            {
              licences.map((licence, index) => (
                  <tr key={index} className="border-b border-gray-300 content-center">
                    <td className="p-4">{licence.logiciel}</td>
                    <td>{licence.type}</td>
                    <td>{licence.date_achat}</td>
                    <td>{licence.date_expiration}</td>
                    <td>{licence.prix}</td>
                  </tr>
                )
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
