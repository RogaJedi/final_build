import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FoodADM from "@/components/admin/food_options";
import AuthButton from "@/components/AuthButton";
import InsertADM from "@/components/admin/food_insert";


export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email != "admin@user.com") {
    return redirect("/login");
  }

  return (
    <>
      <div className="app-container">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">


          <div className="w-full">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-4xl flex justify-center p-3 text-sm">
                <AuthButton />
              </div>
            </nav>
          </div>


          <div className="animate-in text-xl flex-1 flex flex-col justify-center items-center border-b border-b-foreground/10 gap-10 opacity-0 px-3">
            Удаление блюда
            <FoodADM/>
          </div>


          <div className="animate-in text-2xl flex-1 flex flex-col border-b border-b-foreground/10 gap-10 opacity-0 max-w-4xl px-3">
            Добавление нового блюда
            <InsertADM/>
          </div>

          
        </div>
      </div>
    </>
  );
}