import React from 'react';
import Divider from '@material-ui/core/Divider';
import NutrientM from './NutrientM';

export default React.memo(function NutrientItemM(props) {
  return (
    <>
      <NutrientM {...props} />
      <Divider />
    </>
  );
});