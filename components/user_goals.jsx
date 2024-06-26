"use client";
import { useState } from 'react';
import { createClient } from "@/utils/supabase/client";

export default function UpdateGoals() {
  const supabase = createClient();

  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    try {

      const { data, error } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.log(error);
      }
      if (data.length === 0) {
        const { data: newData, error: insertError } = await supabase
          .from('user_goals')
          .insert([
            {
              calorie: calories,
              protein: protein,
              carb: carbs,
              fat: fats
            },
          ]);
    
        if (insertError) {
          console.log(insertError);
        }
    
        console.log(newData);
      } else {
        const { data: updatedData, error: updateError } = await supabase
          .from('user_goals')
          .update({
            calorie: calories,
            protein: protein,
            carb: carbs,
            fat: fats
          })
          .eq('user_id', user.id);
    
        if (updateError) {
          console.log(updateError);
        }
    
        console.log('data updated', updatedData);
      }
      
      window.location.reload();
    } catch (error) {
      console.error('Error updating goals:', error.message);
    }
  };

  return (
    <div className="space-x-3">


      <form onSubmit={handleSubmit} className="animate-in text-lg flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-1"
          type="number"
          name="calorie"
          placeholder="Калории"
          value={calories} onChange={(e) => setCalories(e.target.value)}
          required
        />
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-1"
          type="number"
          name="protein"
          placeholder="Белки"
          value={protein} onChange={(e) => setProtein(e.target.value)}
          required
        />
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-1"
          type="number"
          name="carb"
          placeholder="Углеводы"
          value={carbs} onChange={(e) => setCarbs(e.target.value)}
          required
        />
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-1"
          type="number"
          name="fat"
          placeholder="Жиры"
          value={fats} onChange={(e) => setFats(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 rounded-md px-4 py-2.5 text-foreground mb-2">Подтвердить</button>
      </form>


    </div>
  );
}
