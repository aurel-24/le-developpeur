import SubmitButton from "@/src/components/SubmitButton";
import PasswordInput from "@/src/components/PasswordInput";
import {createClient} from "@/src/utils/supabase/server";
import {redirect} from "next/navigation";
import {headers} from "next/headers";
import logo from "../logo.png"
import Image from "next/image";
const Register = ({searchParams,}: { searchParams: { message: string }; }) => {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const role = formData.get("role") as string;
    const supabase = createClient();

    const {error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          firstName: firstName,
          lastName: lastName,
          role: role
        }
      },
    });

    if (error) {
      return redirect("/register?message=Erreur lors de la création de compte");
    }

    return redirect("/register?message=Confirmez votre adresse mail pour continuer.");
  };

  return (
    <main className="flex min-h-screen bg-charcoal">
      <div className=" flex bg-charcoal flex-1 justify-center items-center">
        <Image src={logo} alt="Logo JEECE"/>
      </div>
      <div className="flex flex-col flex-1 bg-oxford-blue m-12 justify-center items-center">
        <div className="w-1/2 flex flex-col justify-evenly items-center gap-24">
          <h1 className="text-white text-3xl mx-auto">Gestionnaire de licences JEECE</h1>
          <div className="flex flex-col gap-4 w-full">
            <form className="flex flex-col gap-8">
              <input required name="email" placeholder="Adresse email" className="input-border-b"/>
              <PasswordInput required name="password" placeholder="Mot de passe" className="input-border-b w-full"/>
              <input required name="firstName" placeholder="Prénom" className="input-border-b"/>
              <input required name="lastName" placeholder="Nom" className="input-border-b"/>
              <div className="flex flex-col">
                <label htmlFor="role" className="text-placeholderGrey text-sm">Rôle</label>
                <select required name="role" className="input-border-b">
                  <option>Postulant</option>
                  <option>DSI</option>
                  <option>RTC</option>
                  <option>RDI</option>
                  <option>CDM Tech</option>
                </select>
              </div>
              <SubmitButton pendingText="Inscription..." formAction={signUp}
                            className="btn-green">Inscription</SubmitButton>
              {searchParams?.message && (
                <p className="text-red-700 text-center font-bold">
                  {searchParams.message}
                </p>
              )}
            </form>
            <p className="text-white mx-auto">
              Vous avez déjà un compte ? <a className="text-medium-sea-green-700" href="/login">Se connecter</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
