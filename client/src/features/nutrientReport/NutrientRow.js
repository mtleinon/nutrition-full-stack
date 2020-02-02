import React from 'react';
// import NutrientReport from './NutrientReport';
import styles from './NutrientRow.module.css';

import { useSelector } from 'react-redux';
import { dataToShow } from './helperFunctions';
import { I_ENERGY, I_PROTEIN, I_FET, I_CARB } from '../finelliData/constants';
import { convertKCalToKJ } from './helperFunctions';

// export default React.memo(function ({ calorie, fet, protein, carb, sideMargins }) {
export default function NutrientRow({ mealId, planId, nutrientId, sideMargins }) {
  const finelliData = useSelector(state => state.finelliData.finelliData);

  const allNutrients = useSelector(state => state.nutrients.nutrients);
  const allMeals = useSelector(state => state.meals.meals);
  const showDetails = useSelector(state => state.mainPage.showDetails);

  if ((!showDetails.nutrient && nutrientId) || (!showDetails.meal && mealId) || (!showDetails.plan && planId)) {
    return null;
  }
  let nutrients;
  if (nutrientId) {
    nutrients = allNutrients.filter(
      nutrient => nutrient.nutrientId === nutrientId);
  } else if (mealId) {
    nutrients = allNutrients.filter(
      nutrient => nutrient.mealId === mealId)
  } else if (planId) {
    const planMeals = allMeals.filter(meal => meal.planId === planId);
    nutrients = allNutrients.filter(
      nutrient => planMeals.some(meal => meal.mealId === nutrient.mealId))
  }
  let nutrientData;
  if (nutrients.length === 0 || finelliData.length === 0 ||
    allNutrients === 0 || allMeals === 0) {
    return (
      <div className={styles.container}
        style={{ marginLeft: sideMargins, marginRight: sideMargins }}>{'-'}
      </div>
    )
  }

  nutrientData = dataToShow(nutrients, 6, finelliData);
  return (
    <div className={styles.container}
      style={{ marginLeft: sideMargins, marginRight: sideMargins }}>

      <div className={styles.items}>
        {convertKCalToKJ(nutrientData[I_ENERGY]).toFixed(0)}kcal
      </div>
      <div className={styles.items}>
        carb {nutrientData[I_FET].toFixed(0)}g
      </div>
      <div className={styles.items}>
        fet {nutrientData[I_PROTEIN].toFixed(0)}g
      </div>
      <div className={styles.items}>
        prot {nutrientData[I_CARB].toFixed(0)}g
      </div>
    </div>

  )
}