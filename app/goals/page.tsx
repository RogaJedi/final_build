import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfileButton from "@/components/ProfileButton"
import UpdateGoals from "@/components/user_goals"


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
              <div className="w-full max-w-4xl flex justify-center p-3 text-sm">
                <ProfileButton/>
              </div>
            </nav>
          </div>

          <div className="animate-in text-6xl flex-1 flex flex-row gap-20 opacity-0 max-w-4xl px-3">
            Ваши цели:
          </div>

          <div className="animate-in text-6xl flex-1 flex flex-row gap-20 opacity-0 max-w-4xl px-3">
            Настройте цели для вашей диеты
            <UpdateGoals/>
          </div>





        </div>
      </div>
    </>
  );
}