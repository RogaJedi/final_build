"use client";
import { redirect } from "next/navigation";

export default async function GoalsButton() {
  const toGoals = async () => {
    return redirect("/goals");
  };

  return (
    <div className="flex items-center gap-4">
      <form action={toGoals}>  
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
            Ваши цели
        </button>
      </form>
    </div>
  );
}
