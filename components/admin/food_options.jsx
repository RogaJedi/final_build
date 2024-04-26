"use client";
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";

export default function FoodADM() {
  const supabase = createClient();

  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFood, setSelectedFood] = useState('');
  const [selectedFoodData, setSelectedFoodData] = useState(null);

  useEffect(() => {
    async function fetchFoodOptions() {
      const { data, error } = await supabase.from('food_options').select('*');
      if (error) console.error('Error fetching food options:', error);
      else setFoodOptions(data);
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

  const handleDelete = async () => {
    const { error } = await supabase
      .from('food_options')
      .delete()
      .eq('name', selectedFoodData.name)

    if (error) console.error('Error deleting food choice:', error) ;
    else window.location.reload();
  };

  return (
    <div className="space-x-3 flex flex-row justify-center">


      <select value={selectedFood} onChange={handleSelectionChange} className="appearance-auto rounded-md px-4 py-3 bg-inherit border mb-6">
        <option value="" className="bg-black ">Выберите блюдо</option>
        {foodOptions.map((option, index) => (
          <option key={index} value={option.name} className="bg-black">{option.name}</option>
        ))}
      </select>
      <button onClick={handleDelete} disabled={!selectedFood} className="bg-red-600 rounded-md px-4 py-3 text-foreground mb-2">Удалить</button>


    </div>
  );
}
