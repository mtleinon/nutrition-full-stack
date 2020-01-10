import React from 'react';
import NutrientReport from './NutrientReport';
import { useSelector } from 'react-redux';
import { dataToShow } from './helperFunctions';

export default function PlanAndMealReport({ mealId, planId, name, hideModal }) {
  const finelliData = useSelector(state => state.finelliData.finelliData);

  const allNutrients = useSelector(state => state.nutrients.nutrients);
  const allMeals = useSelector(state => state.meals.meals);

  let nutrients;
  if (mealId) {
    nutrients = allNutrients.filter(
      nutrient => nutrient.mealId === mealId)
  } else if (planId) {
    const planMeals = allMeals.filter(meal => meal.planId === planId);
    nutrients = allNutrients.filter(
      nutrient => planMeals.some(meal => meal.mealId === nutrient.mealId))
  }

  const nutrientData = dataToShow(nutrients, 0, finelliData);
  return (
    <NutrientReport
      reportTitle={name}
      nutrientData={nutrientData}
      hideModal={hideModal}
    />
  );
}