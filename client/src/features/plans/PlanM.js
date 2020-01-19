import React from 'react';
// import Meals from '../meals/Meals';
// import NutrientRow from '../nutrientReport/NutrientRow';
// import DeleteIcon from '../../components/DeleteIcon';
// import OpenIcon from '../../components/OpenIcon';
// import CloseIcon from '../../components/CloseIcon';
// import Card from '../../components/Card';
// import './plan.css';
// import Container from '../../components/Container';
// import EditableValue from '../../components/EditableValue';
// import CenterVertically from '../../components/CenterVertically';
// import HeaderRow from '../../components/HeaderRow';
// import Modal from '../../components/Modal';
// import InfoIcon from '../../components/InfoIcon';
// import PlanAndMealReport from '../nutrientReport/PlanAndMealReport';


import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import NamePanelSummaryM from './NamePanelSummaryM';
import NamePanelDetailsM from './NamePanelDetailsM';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NameHeaderM from './NameHeaderM';
import MealsM from '../meals/MealsM';

// import MealsNutrients from './MealsNutrients';
import Button from '@material-ui/core/Button';
// import ReportModal from './ReportModal';

// const useStyles = makeStyles({
//   fullWidth: {
//     width: '100%',
//   },
// });


const NamePanel = withStyles({
  root: {
    width: '100%'
  },
})(ExpansionPanel);

export default React.memo(function PlanM({ plan, editPlanHandler, removeHandler }) {
  // const classes = useStyles();

  // const [modalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // }
  // const closeModal = () => {
  //   setModalOpen(false);
  // }

  return (
    <>
      <NamePanel>
        <NamePanelSummaryM expandIcon={<ExpandMoreIcon />}
          aria-controls="planPanel1"
          id="planPanel1"
          focused="false"
        >
          <NameHeaderM
            label="Plan name"
            id={plan.planId}
            initialName={plan.name}
            editHandler={editPlanHandler}
            removeHandler={removeHandler}
          // openModal={openModal}
          />
        </NamePanelSummaryM>
        <NamePanelDetailsM>
          <MealsM planId={plan.planId} />
        </NamePanelDetailsM >
        <div style={{ margin: '4px' }}>
          <Button variant="contained" color="primary" fullWidth>
            Add meal
          </Button>
        </div>
      </NamePanel >
      {/* <ReportModal
        open={modalOpen}
        onClose={closeModal}
      /> */}
    </>
  );
});