import React from 'react';
import nutrientInfo from './nutrientInfo';
import styles from './Info.module.css';

const getRecommendation = header => {
  // console.log('getRecommendation - header:', header);

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
  return undefined;
}

export default function ({ data }) {
  return (
    <div className={styles.container}>
      {nutrientInfo.map((nutrient, i) =>
        <div key={i.toString()}>
          {nutrient.name.fi} - {Object.values(data)[i]}{nutrient.unit}
          : Recom: {getRecommendation(nutrient)}
        </div>)}
    </div>
  );
}