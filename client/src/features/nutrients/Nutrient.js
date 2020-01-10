import React from 'react';
import './nutrient.css';
import CardSmall from '../../components/CardSmall';
import HeaderRow from '../../components/HeaderRow';
import CenterVertically from '../../components/CenterVertically';
import DeleteIcon from '../../components/DeleteIcon';
import NutrientRow from '../nutrientReport/NutrientRow';
import EditableValue from '../../components/EditableValue';
import WrapText from '../../components/WrapText';

export default React.memo(function Nutrient(props) {
  const nutrient = props.nutrient;
  // const mainRef = useRef(null);

  // useEffect(() => {
  //   mainRef.current.focus();
  // }, [mainRef]);

  const editNutrientHandler = (amount) => {
    props.editNutrientHandler(
      nutrient.nutrientId, amount, nutrient.mealId, nutrient.finelliId);
  };


  return (
    <CardSmall>
      <HeaderRow>
        <WrapText>
          {props.name}
        </WrapText>
        <CenterVertically>
          {/* <input placeholder="xxx" ref={mainRef} /> */}
          <EditableValue
            type="number"
            okHandler={editNutrientHandler}
            value={nutrient.amount}
          />
          <CenterVertically style={{ marginLeft: '3px', marginRight: '10px', marginBottom: '3px' }}>
            g
          </CenterVertically>
          <CenterVertically>
            <DeleteIcon onClick={() => props.removeHandler(nutrient.nutrientId)} />
          </CenterVertically>
        </CenterVertically>
      </HeaderRow>
      <NutrientRow nutrientId={props.nutrient.nutrientId} sideMargins={'5px'} />
    </CardSmall>
  );
});