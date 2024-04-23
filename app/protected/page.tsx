import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FoodSelector from "@/components/user_select"
import ProgressTracker from "@/components/user_beta"


export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  if (user.email == "admin@user.com") {
    return redirect("/admin")
  }

  return (
    <>
      <div className="app-container">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">


          <div className="w-full">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                Lorem ipsum
                <AuthButton />
              </div>
            </nav>
          </div>


          <div className="animate-in sm:text-3xl lg:text-6xl flex-1 flex flex-row gap-20 opacity-0 max-w-4xl px-3">
            В день в среднем рекомендуестся съедать:
            2250 Калорий<br />
            500г Протеина<br />
            280г Углеводов<br />
            60г Жиров
          </div>


          <div className="animate-in text-6xl flex-1 flex flex-row gap-20 opacity-0 max-w-4xl px-3">
            Ваш прогресс на сегодня:
          </div>


          <div className="animate-in text-2xl flex-1 flex flex-row gap-20 opacity-0 max-w-4xl px-3">
            <ProgressTracker/>
          </div>


          <div className="animate-in flex-1 flex flex-row gap-20 opacity-0 max-w-2xl px-3">
            <FoodSelector />
          </div>


        </div>
      </div>
    </>
  );
}