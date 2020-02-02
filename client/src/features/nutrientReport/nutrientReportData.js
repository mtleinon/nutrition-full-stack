import nutrientHeading from './nutrientHeading';
import { convertKCalToKJ } from './helperFunctions';
import { I_ENERGY, I_CARB, I_FET, I_PROTEIN } from '../finelliData/constants';

const getRecommendation = header => {
  if (header.dri) {
    if (header.dri.rda) {
      if (header.dri.rda.males) {
        return header.dri.rda.males;
      }
      return header.dri.rda;
    }
    if (header.dri.ai)
      return header.dri.ai;
  }
  return -1;
}

export default function nutrientReportData(nutrientData) {

  const headingsAdded = nutrientData
    .map((dataRow, i, ) => i === I_ENERGY ? convertKCalToKJ(dataRow) : dataRow)
    .map((dataRow, i, data) => {
      const recommendation = getRecommendation(nutrientHeading[i]);
      let recommendationPercentage = 0;
      if (i === I_FET) {
        recommendationPercentage = 9 * dataRow / data[I_ENERGY] * 100;
      } else if (i === I_CARB) {
        recommendationPercentage = 4 * dataRow / data[I_ENERGY] * 100;
      } else if (i === I_PROTEIN) {
        recommendationPercentage = 4 * dataRow / data[I_ENERGY] * 100;
      } else if (recommendation > 0) {
        recommendationPercentage = dataRow / recommendation * 100;
      }
      return ({
        value: dataRow,
        heading: nutrientHeading[i].name.fiShort,
        unit: nutrientHeading[i].unit,
        recommendation,
        recommendationPercentage,
      })
    });


  const titlesAdded = [
    {
      title: { title: 'Pää ravintoaineet', amount: 'määrä', relative: '% ener' },
      data: headingsAdded.slice(2, 6),
    },
    {
      title: { title: 'Yksityiskohdat', amount: 'määrä', relative: '' },
      data: headingsAdded.slice(6, 33)
    },
    {
      title: { title: 'Hivenaineet', amount: 'määrä', relative: '% rel' },
      data: headingsAdded.slice(33, 45)
    },
    {
      title: { title: 'Vitamiinit', amount: 'määrä', relative: '% suos' },
      data: headingsAdded.slice(45, 57)
    },
  ];
  return titlesAdded;
}
