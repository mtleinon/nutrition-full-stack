import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import NamePanelSummaryM from './NamePanelSummaryM';
import NamePanelDetailsM from './NamePanelDetailsM';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NameHeaderM from './NameHeaderM';
import MealsM from '../meals/MealsM';
import Modal from '@material-ui/core/Modal';
import PlanAndMealReportM from '../nutrientReport/PlanAndMealReportM';

const NamePanel = withStyles({
  root: {
    width: '100%',
    borderRadius: '4px'
  },
})(ExpansionPanel);

export default React.memo(function PlanM({ plan, isLoading, lastlyUpdatedId, editPlanHandler, removeHandler }) {
  const [showPlanInfo, setShowPlanInfo] = useState(false);
  // const classes = useStyles();


  return (
    <>
      <NamePanel >
        <NamePanelSummaryM expandIcon={<ExpandMoreIcon />}
          aria-controls="planPanel1"
          id="planPanel1"
          focused="false"
        >
          <NameHeaderM
            label="Plan name"
            planId={plan.planId}
            isLoading={isLoading}
            lastlyUpdatedId={lastlyUpdatedId}
            initialName={plan.name}
            editHandler={editPlanHandler}
            removeHandler={removeHandler}
            openModal={() => setShowPlanInfo(true)}
          />
        </NamePanelSummaryM>
        <NamePanelDetailsM style={{
          backgroundColor: '#fff',
          borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px'
        }}>
          <MealsM planId={plan.planId} />
        </NamePanelDetailsM >
      </NamePanel >
      {showPlanInfo &&
        <PlanAndMealReportM
          open={showPlanInfo}
          planId={plan.planId}
          name={plan.name}
          hideModal={() => setShowPlanInfo(false)}
        />
      }
    </>
  );
});