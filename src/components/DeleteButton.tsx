import {ComponentProps} from "react";
import {createClient} from "@/src/utils/supabase/client";

const DeleteButton = ({...props}: ComponentProps<"button">) => {

  const deleteRow = async (row: number) => {
    const supabase = createClient();
    try {
      const {error} = await supabase.from("Licence").delete().eq("id", row);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={() => deleteRow(1)}>

    </button>
  )
}

export default DeleteButton;
