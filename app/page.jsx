import { redirect } from "next/navigation";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user !== null){
    if (user.email == "admin@user.com") {
      return redirect("/admin")
    }
  
    if (user.email != "admin@user.com") {
      return redirect("/profile")
    }
  }

  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full flex justify-center items-center p-3 text-base">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 text-6xl max-w-4xl px-3">
        Начни свой путь к здоровой жизни уже сегодня!  
      </div>
    </div>
  );
}
