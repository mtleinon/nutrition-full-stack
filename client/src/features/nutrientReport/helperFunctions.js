import { I_FINELLI_ID } from '../finelliData/constants';

export const decimals = value => {
  if (value === 0) {
    return 0;
  } else if (value < 1) {
    return 2;
  } else if (value < 10) {
    return 1;
  }
  return
}

export const convertKCalToKJ = value => value / 4.184;

export function calculateMealMicronutrientData(nutrientsData, summaryLength) {
  if (nutrientsData.length === 0) {
    return undefined;
  }
  let initialValue = Array(summaryLength ? summaryLength : nutrientsData[0].nutrientData.length).fill(0);

  return nutrientsData.reduce((acc, curr) => {
    return acc.map((value, i) => value + curr.amount * curr.nutrientData[i] * 0.01);
  }, initialValue);
}

export function dataToShow(nutrients, summaryLength, finelliData) {

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
