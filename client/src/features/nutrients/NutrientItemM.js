import React from 'react';
// import './nutrient.css';
// import CardSmall from '../../components/CardSmall';
// import HeaderRow from '../../components/HeaderRow';
// import CenterVertically from '../../components/CenterVertically';
// import DeleteIcon from '../../components/DeleteIcon';
// import NutrientRow from '../nutrientReport/NutrientRow';
// import EditableValue from '../../components/EditableValue';
// import WrapText from '../../components/WrapText';
import Divider from '@material-ui/core/Divider';
// import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
// import ListItem from '@material-ui/core/ListItem';
import NutrientM from './NutrientM';

// const NutrientItemM = withStyles({
//   root: {
//     background: green[100],
//     paddingTop: 0,
//     paddingBottom: 0,

//     '&:hover': {
//       backgroundColor: green[200],
//     },
//   },
// })(ListItem);

export default React.memo(function NutrientItemM(props) {
  // const nutrient = props.nutrient;
  // const mainRef = useRef(null);

  // useEffect(() => {
  //   mainRef.current.focus();
  // }, [mainRef]);

  // const editNutrientHandler = (amount) => {
  //   props.editNutrientHandler(
  //     nutrient.nutrientId, amount, nutrient.mealId, nutrient.finelliId);
  // };


  return (
    <>
      <NutrientM {...props} />
      <Divider />
    </>
  );
});