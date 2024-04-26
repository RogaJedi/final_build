"use client";
import { useState } from 'react';
import { createClient } from "@/utils/supabase/client";

export default function InsertADM() {
  const supabase = createClient();

  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('food_options').insert([
        { name: name,
          calorie: calories,
          protein: protein,
          carb: carbs,
          fat: fats}
      ]);
      if (error) {
        throw error;
      }
      // Reset form fields after successful submission
      setName('');
      setCalories('');
      setProtein('');
      setCarbs('');
      setFats('');
      console.log('New food option added:', data);
      window.location.reload();
    } catch (error) {
      console.error('Error adding new food option:', error.message);
    }
  };

  return (
    <div className="space-x-3">


      <form onSubmit={handleSubmit} className="animate-in text-lg flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-1"
          name="name"
          placeholder="Наименование блюда"
          value={name} onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className="bg-blue-500 rounded-md px-4 py-2.5 text-foreground mb-2">Добавить</button>
      </form>


    </div>
  );
}
