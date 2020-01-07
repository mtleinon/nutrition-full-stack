import React from 'react';
import styles from './NutrientRow.module.css';

export default React.memo(function ({ calorie, fet, protein, carb, style }) {

  return (
    <div className={styles.container} style={style}>
      <div className={styles.items}>
        ener. {calorie}kcal
      </div>
      <div className={styles.items}>
        fet {fet}g
      </div>
      <div className={styles.items}>
        prot {protein}g
      </div>
      <div className={styles.items}>
        carb {carb}g
      </div>
    </div>

  )
});