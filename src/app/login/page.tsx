import SubmitButton from "@/src/components/SubmitButton";
import PasswordInput from "@/src/components/PasswordInput";
import {createClient} from "@/src/utils/supabase/server";
import {redirect} from "next/navigation";
import logo from "../logo.png"
import Image from "next/image";
const Login = ({searchParams,}: { searchParams: { message: string }; }) => {
  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Erreur d'authentification");
    }

    return redirect("/protected");
  }
  return (
    <main className="flex min-h-screen bg-charcoal">
      <div className=" flex bg-charcoal flex-1 justify-center items-center">
        <Image src={logo} alt="Logo JEECE" width="500"/>
      </div>
      <div className="flex flex-col flex-1 bg-oxford-blue m-12 justify-center items-center">
        <div className="w-1/2 flex flex-col justify-evenly items-center gap-24">
          <h1 className="text-white text-3xl mx-auto">Gestionnaire de licences JEECE</h1>
          <div className="flex flex-col gap-4 w-full">
            <form className="flex flex-col gap-8">
              <input required name="email" placeholder="Adresse email" className="input-border-b"/>
              <PasswordInput required name="password" placeholder="Mot de passe" className="input-border-b w-full"/>
              <SubmitButton pendingText="Connexion..." formAction={signIn}
                            className="btn-green">Connexion</SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 text-red-700 text-center font-bold">
                  {searchParams.message}
                </p>
              )}
            </form>
            <p className="text-white mx-auto">
              Vous n'avez pas de compte ? <a className="text-medium-sea-green-700" href="/register">Créer un compte</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
