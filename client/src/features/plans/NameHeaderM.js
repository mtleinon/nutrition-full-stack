import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import InputFieldM from './InputFieldM';

import NutrientRow from '../nutrientReport/NutrientRow';

// const useStyles = makeStyles(theme => ({
//   fullWidth: {
//     width: '100%',
//   },
//   // heading: {
//   //   fontSize: theme.typography.pxToRem(15),
//   //   fontWeight: theme.typography.fontWeightRegular,
//   // },
// }));

const IconButton2 = withStyles({
  root: {
    // marginTop: '-12px',
  },
})(IconButton);

export default function NameHeaderM({ label, mealId, planId, initialName, isLoading, lastlyUpdatedId, editHandler, removeHandler, openModal }) {
  // const classes = useStyles();
  // const [name, setName] = useState(initialName);

  // const onChangeName = (e) => {
  //   e.preventDefault();
  //   setName(e.target.value);
  //   console.debug('onChangeName =', e.target.value);
  // }

  const onRemove = (e) => {
    console.debug('removeHandler =');
    removeHandler(id)
    e.stopPropagation();
  }

  const onOpenReport = (e) => {
    e.stopPropagation();
    openModal();
  }
  const id = planId || mealId;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <InputFieldM
          label={label}
          id={id}
          isLoading={isLoading}
          lastlyUpdated={lastlyUpdatedId === id}
          initialValue={initialName}
          editHandler={editHandler}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <IconButton2 onClick={onOpenReport} aria-label="openReport" color="primary">
            <AssignmentIcon />
          </IconButton2>
          <IconButton2 onClick={onRemove} aria-label="delete" color="primary">
            <DeleteIcon />
          </IconButton2>
        </div>
      </div>
      <NutrientRow mealId={mealId} planId={planId} />
    </div>
  );
}