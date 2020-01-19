import React from 'react';
import NutrientReportM from './NutrientReportM';
import { useSelector } from 'react-redux';
import { dataToShow } from './helperFunctions';

const PlanAndMealReport = React.forwardRef(({ mealId, planId, name, hideModal }, ref) => {
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
    <NutrientReportM
      ref={ref}
      reportTitle={name}
      nutrientData={nutrientData}
      hideModal={hideModal}
    />
  );
});

export default PlanAndMealReport;