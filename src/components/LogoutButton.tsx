import {createClient} from "../utils/supabase/server";
import {redirect} from "next/navigation";

const LogoutButton = async () => {
  const supabase = createClient();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return (
    <form action={signOut}>
      <button className="py-2 px-4 border hover:ring-2 hover:ring-white">
        Se déconnecter
      </button>
    </form>
  );
}

export default LogoutButton;
