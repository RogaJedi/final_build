"use client";
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

export default function FoodSelector() {
  const supabase = createClient();

  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [selectedFoodData, setSelectedFoodData] = useState(null);

  useEffect(() => {
    async function fetchFoodOptions() {
      const { data, error } = await supabase.from('food_options').select('*');
      if (error) console.error('Error fetching food options:', error);
      else {
        console.log('Food fetched successfully:', data)
        setFoodOptions(data)
      }
    }
    fetchFoodOptions();
  }, []);

  const handleSelectionChange = (e) => {
    const selectedFoodName = e.target.value;
    setSelectedFood(selectedFoodName);

    // Find the selected food's data
    const foodData = foodOptions.find(food => food.name === selectedFoodName);
    setSelectedFoodData(foodData);
  };

  const handleSubmit = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase.from('user_stats').insert([
      {
        calorie: selectedFoodData.calorie,
        fat: selectedFoodData.fat,
        protein: selectedFoodData.protein,
        carb: selectedFoodData.carb,
        created_at: today,
      }
    ]);
    if (error) console.error('Error inserting food choice:', error) ;
    else console.log('Food choice inserted successfully:', data);
    window.location.reload();
  };

  return (
    <div className="space-x-3">
      <select value={selectedFood} onChange={handleSelectionChange} className="appearance-auto rounded-md px-4 py-3 bg-inherit border mb-6">
        <option value="" className="bg-black ">Выберите блюдо</option>
        {foodOptions.map((option, index) => (
          <option key={index} value={option.name} className="bg-black">{option.name}</option>
        ))}
      </select>
      <button onClick={handleSubmit} disabled={!selectedFood} className="bg-green-700 rounded-md px-4 py-2.5 text-foreground mb-2">Подтвердить</button>
    </div>
  );
}
