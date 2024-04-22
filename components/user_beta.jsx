"use client";
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressTracker() {
  const supabase = createClient();

  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    async function fetchUserStats() {
      const today = new Date().toISOString().split('T')[0];

      console.log(today);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('created_at', today)
        .eq('user_id', user.id);

      if (error) console.error('Error fetching user stats:', error);
      else setUserStats(data);
    }
    
    fetchUserStats();
  }, []);

  

  const calculateProgress = () => {
    if (!userStats) return {};
    
    const CaloriesGoal = 2250;
    const ProteinGoal = 500;
    const CarbsGoal = 280;
    const FatsGoal = 60;

    const consumedCalories = userStats.reduce((total, stat) => total + stat.calorie, 0);
    const consumedProtein = userStats.reduce((total, stat) => total + stat.protein, 0);
    const consumedCarbs = userStats.reduce((total, stat) => total + stat.carb, 0);
    const consumedFat = userStats.reduce((total, stat) => total + stat.fat, 0);

    const progress = {
      calorie: Math.round(((consumedCalories / CaloriesGoal) * 100) * 10) / 10,
      protein: Math.round(((consumedProtein / ProteinGoal) * 100) * 10) / 10,
      carb: Math.round(((consumedCarbs / CarbsGoal) * 100) * 10) / 10,
      fat: Math.round(((consumedFat/ FatsGoal) * 100) * 10) / 10,
      consumedCalories,
      consumedProtein,
      consumedCarbs,
      consumedFat
    };

    return progress;
  };

  const progressData = calculateProgress();

  return (
    <div className="flex flex-row space-x-4 text-4xl">
      <div classname="flex-col">
        <div className="text-[#87ff00] text-center mb-4">
          Калории
        </div>
        <div>
          <CircularProgressbar 
            value={progressData.calorie || 0} 
            text={`${progressData.calorie || 0}%`}  
            styles={buildStyles({
              pathColor: `#87ff00`,
              textSize: '17px',
              textColor: '#87ff00',
              trailColor: '#2A2A2A',
              })}/>
        </div>
        <div className="text-[#87ff00] text-2xl text-center mb-4">
          {progressData.consumedCalories}/2250ккал
        </div>
      </div>
      
      <div classname="flex-col">
        <div className="text-[#0092ff] text-center mb-4">
          Белки
        </div>
        <div>
          <CircularProgressbar 
            value={progressData.protein || 0} 
            text={`${progressData.protein || 0}%`}  
            styles={buildStyles({
              pathColor: `#0092ff`,
              textSize: '17px',
              textColor: '#0092ff',
              trailColor: '#2A2A2A',
              })}/>
        </div>
        <div className="text-[#0092ff] text-2xl text-center mb-4">
          {progressData.consumedProtein}/500г
        </div>
      </div>
      
      <div classname="flex-col">
        <div className="text-[#ff0096] text-center mb-4">
          Углеводы
        </div>
        <div>
          <CircularProgressbar 
            value={progressData.carb || 0} 
            text={`${progressData.carb || 0}%`}  
            styles={buildStyles({
              pathColor: `#ff0096`,
              textSize: '17px',
              textColor: '#ff0096',
              trailColor: '#2A2A2A',
              })}/>
        </div>
        <div className="text-[#ff0096] text-2xl text-center mb-4">
          {progressData.consumedCarbs}/280г
        </div>
      </div>
      
      <div classname="flex-col">
        <div className="text-[#FFC000] text-center mb-4">
          Жиры
        </div>
        <div>
          <CircularProgressbar 
            value={progressData.fat || 0} 
            text={`${progressData.fat || 0}%`}  
            styles={buildStyles({
              pathColor: `#FFC000`,
              textSize: '17px',
              textColor: '#FFC000',
              trailColor: '#2A2A2A',
              })}/>
        </div>
        <div className="text-[#FFC000] text-2xl text-center mb-4">
          {progressData.consumedFat}/60г
        </div>
      </div>
      
    </div>
  );
}
