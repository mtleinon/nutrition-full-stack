import React, { useState } from 'react';
import './meal.css';
import NutrientsM from '../nutrients/NutrientsM';

import PlanAndMealReportM from '../nutrientReport/PlanAndMealReportM';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import NamePanelSummaryM from '../plans/NamePanelSummaryM';
import NamePanelDetailsM from '../plans/NamePanelDetailsM';
import NameHeaderM from '../plans/NameHeaderM';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const NamePanel = withStyles({
  root: {
    width: '100%'
  },
})(ExpansionPanel);

export default React.memo(function MealM({ meal, editMealHandler, removeHandler }) {
  const [showMealInfo, setShowMealInfo] = useState(false);

  return (
    <NamePanel>
      <NamePanelSummaryM expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <NameHeaderM
          label="Meal name"
          mealId={meal.mealId}
          initialName={meal.name}
          editHandler={editMealHandler}
          removeHandler={removeHandler}
          openModal={() => setShowMealInfo(true)}
        />
      </NamePanelSummaryM>
      <NamePanelDetailsM>
        <NamePanel>
          <NutrientsM mealId={meal.mealId} />
        </NamePanel>
      </NamePanelDetailsM>
      {showMealInfo &&
        <PlanAndMealReportM
          open={showMealInfo}
          mealId={meal.mealId}
          name={meal.name}
          hideModal={() => setShowMealInfo(false)}
        />
      }
    </NamePanel>
  );
});