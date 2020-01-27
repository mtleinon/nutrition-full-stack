import React, { useState } from 'react';
// import Nutrients from '../nutrients/Nutrients';
// import Card from '../../components/Card';
// import Container from '../../components/Container';
// import NutrientRow from '../nutrientReport/NutrientRow';
// import DeleteIcon from '../../components/DeleteIcon';
// import OpenIcon from '../../components/OpenIcon';
// import CloseIcon from '../../components/CloseIcon';
// import InfoIcon from '../../components/InfoIcon';
// import EditableValue from '../../components/EditableValue';
// import CenterVertically from '../../components/CenterVertically';
// import Modal from '../../components/Modal';
// import { Ring } from 'react-awesome-spinners'

import './meal.css';
import NutrientsM from '../nutrients/NutrientsM';

// import HeaderRow from '../../components/HeaderRow';
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
  // const [showNutrients, setShowNutrients] = useState(false);
  const [showMealInfo, setShowMealInfo] = useState(false);
  // const isLoading = useSelector(state => state.meals.isLoading);

  // const toggleShowNutrients = () => {
  //   // setShowNutrients(state => !state);
  // };
  // if (isLoading) {
  //   return <Ring />
  // }
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
      <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
        open={showMealInfo}
        onClose={() => setShowMealInfo(false)}
      >
        <PlanAndMealReportM
          mealId={meal.mealId}
          name={meal.name}
          hideModal={() => setShowMealInfo(false)}
        />
      </Modal>
    </NamePanel>
  );
});