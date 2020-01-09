import React from 'react';
import NutrientReport from '../nutrientReport/NutrientReport';
import { useSelector } from 'react-redux';
import { I_FINELLI_ID } from '../finelliData/constants';

function calculateMealMicronutrientData(mealNutrientsData, summaryLength) {
  let mealMicronutrientData;
  if (mealNutrientsData.length > 0) {
    mealMicronutrientData = mealNutrientsData.reduce((acc, curr) => {
      return acc.map((value, i) => value + curr.amount * curr.nutrientData[i] * 0.01);
    }
      , Array(summaryLength ? summaryLength : mealNutrientsData[0].nutrientData.length).fill(0));
  }
  return mealMicronutrientData;
}

function mealDataToShow(mealNutrients, summaryLength, finelliData) {

  let dataToShow = [];
  // const mealNutrients = nutrients.filter(nutrient => nutrient.mealId == mealId);
  if (mealNutrients.length > 0) {
    const mealNutrientsData = mealNutrients.map(nutrient => (
      {
        amount: nutrient.amount,
        nutrientData: finelliData.find(
          nutrientData => nutrientData[I_FINELLI_ID] === nutrient.finelliId)
      })
    );
    dataToShow = calculateMealMicronutrientData(mealNutrientsData, summaryLength);
    // dataToShow[NAME_I] = mealName;
  }
  return dataToShow;
}

export default function MealNutrientReport({ mealId, mealName, hideModal }) {
  const mealNutrients = useSelector(
    state => state.nutrients.nutrients.filter(
      nutrient => nutrient.mealId === mealId)
  );
  const finelliData = useSelector(state => state.finelliData.finelliData);

  const nutrientData = mealDataToShow(mealNutrients, 0, finelliData);
  return (
    <NutrientReport
      reportTitle={mealName}
      nutrientData={nutrientData}
      hideModal={hideModal}
    />
  )
}