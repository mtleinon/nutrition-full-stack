import React, { useState } from 'react';
import './meal.css';
import NutrientsM from '../nutrients/NutrientsM';
import SelectFinelliNutrientM from '../finelliData/SelectFinelliNutrientM';

import PlanAndMealReportM from '../nutrientReport/PlanAndMealReportM';
import Button from '@material-ui/core/Button';
import ButtonContainer from '../../componentsM/ButtonContainer';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import NamePanelSummaryM from '../plans/NamePanelSummaryM';
import NamePanelDetailsM from '../plans/NamePanelDetailsM';
import NameHeaderM from '../plans/NameHeaderM';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch } from 'react-redux';
import {
  addNutrientToDb
} from '../nutrients/nutrientsSlice';

const NamePanel = withStyles({
  root: {
    width: '100%'
  },
})(ExpansionPanel);

export default React.memo(function MealM({ meal, editMealHandler, removeHandler }) {
  const [showMealInfo, setShowMealInfo] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const dispatch = useDispatch();

  const addNutrientToMealHandler = (finelliId) => {
    dispatch(addNutrientToDb(0, meal.mealId, finelliId));
    setAddMode(false);
    // console.debug('ad mealId, finelliId =', meal.mealId, finelliId);
  }

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
        <ButtonContainer>
          <Button
            color='primary'
            variant='outlined'

            style={{ marginBottom: '4px' }}
            onClick={() => setAddMode(true)}
          >
            ADD NEW NUTRIENT
        </Button>
        </ButtonContainer>

      </NamePanelDetailsM>
      {showMealInfo &&
        <PlanAndMealReportM
          open={showMealInfo}
          mealId={meal.mealId}
          name={meal.name}
          hideModal={() => setShowMealInfo(false)}
        />
      }
      <SelectFinelliNutrientM open={addMode} onClose={() => setAddMode(false)}
        selectDataHandler={addNutrientToMealHandler} />

    </NamePanel>
  );
});