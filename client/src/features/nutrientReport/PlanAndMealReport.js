import React from 'react';
import NutrientReport from './NutrientReport';
import { useSelector } from 'react-redux';
import { I_FINELLI_ID } from '../finelliData/constants';

function calculateMealMicronutrientData(nutrientsData, summaryLength) {
  if (nutrientsData.length === 0) {
    return undefined;
  }
  let initialValue = Array(summaryLength ? summaryLength : nutrientsData[0].nutrientData.length).fill(0);

  return nutrientsData.reduce((acc, curr) => {
    return acc.map((value, i) => value + curr.amount * curr.nutrientData[i] * 0.01);
  }, initialValue);
}

function dataToShow(nutrients, summaryLength, finelliData) {

  let dataToShow = [];
  if (nutrients.length > 0) {
    const nutrientsData = nutrients.map(nutrient => (
      {
        amount: nutrient.amount,
        nutrientData: finelliData.find(
          nutrientData => nutrientData[I_FINELLI_ID] === nutrient.finelliId)
      })
    );
    dataToShow = calculateMealMicronutrientData(nutrientsData, summaryLength);
  }
  return dataToShow;
}

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