"use client";
import { redirect } from "next/navigation";

export default async function ProfileButton() {
  const toProfile = async () => {
    return redirect("/protected");
  };

  return (
    <div className="flex items-center gap-4">
      <form action={toProfile}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Ваш профиль
        </button>
      </form>
    </div>
  );
}
