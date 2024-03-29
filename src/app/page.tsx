import {redirect} from "next/navigation";

const Index = async () => {

  return (
    redirect("/protected")
  );
}

export default Index;
