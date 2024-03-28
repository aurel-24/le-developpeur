import SubmitButton from "@/src/components/SubmitButton";
import PasswordInput from "@/src/components/PasswordInput";
import Input from "@/src/components/Input";
import {createClient} from "@/src/utils/supabase/server";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import logo from "./logo.png"
import Image from "next/image";


type searchParams = {
  message: string
}

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

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const {error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Erreur d'authentification inscription");
    }

    return redirect("/login?message=Confirmez votre adresse mail pour continuer.");
  };

  return (
    <main className="flex min-h-screen bg-charcoal">
      <div className=" flex bg-charcoal flex-1 justify-center items-center">
        <Image src={logo} alt="Logo JEECE" width="500"/>
      </div>
      <div className="flex flex-col justify-center flex-1 bg-oxford-blue m-12">
        <div>
          <h1 className="w-1/2 mx-auto text-white text-3xl mb-12">Gestionnaire de licences JEECE</h1>
          <form>
            <div className="flex flex-col mb-24">
              <Input name="email" placeholder="Adresse mail"/>
              <PasswordInput name="password" type="password" placeholder="Mot de passe"/>
            </div>
            <div className="flex flex-col">
              <SubmitButton pendingText="Connexion..." formAction={signIn}>Connexion</SubmitButton>
              <SubmitButton pendingText="Inscription..." formAction={signUp}>Inscription</SubmitButton>
            </div>
            {searchParams?.message && (
              <p className="mt-4 p-4 text-red-700 text-center font-bold">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
