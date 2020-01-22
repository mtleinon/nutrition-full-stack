import React from 'react';
import nutrientHeading from './nutrientHeading';
import styles from './NutrientReport.module.css';
import HeaderRow from '../../components/HeaderRow';
import CancelIcon from '../../components/CancelIcon';
import { decimals, convertKCalToKJ } from './helperFunctions';
import { I_ENERGY } from '../finelliData/constants';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';


const getRecommendation = header => {
  if (header.dri) {
    if (header.dri.rda) {
      if (header.dri.rda.males) {
        return header.dri.rda.males;
      }
      return header.dri.rda;
    }
    if (header.dri.ai)
      return header.dri.ai;
  }
  return -1;
}

const useStyles = makeStyles(theme => ({
  modalContainer: {
    top: '5vh',
    margin: 'auto',
    marginBottom: 'auto',
    width: '90%',
    maxWidth: '420px',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    // overflow: 'auto',
    height: '90vh',
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: '85vh',
    // maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));


const TitleRow = ({ title }) => {
  return <div className={styles.titleRow}>
    <div className={styles.name}>{title.title}</div>
    <div className={styles.valueTitle}>{title.amount}</div>
    <div className={styles.recommendation}>{title.relative}</div>
  </div>
}

const DataRow = ({ row }) => {
  return <div className={styles.dataRow}>
    <div className={styles.name}>{row.heading}</div>
    <div className={styles.value} >
      {row.value.toFixed(decimals(row.value))}
    </div>
    <div className={styles.unit}>{row.unit}</div>
    <div className={styles.recommendation} >
      {row.recommendation === -1 ? '' : row.recommendation}
    </div>
  </div>
}

function dataWithHeadingAndTitles(nutrientData) {

  const headingsAdded = nutrientData.map((dataRow, i) => ({
    value: dataRow,
    heading: nutrientHeading[i].name.fiShort,
    unit: nutrientHeading[i].unit,
    recommendation: getRecommendation(nutrientHeading[i])
  }));

  headingsAdded[I_ENERGY].value = convertKCalToKJ(headingsAdded[I_ENERGY].value);

  const titlesAdded = [
    {
      title: { title: 'Pää ravintoaineet', amount: 'määrä', relative: '% ener' },
      data: headingsAdded.slice(2, 6),
    },
    {
      title: { title: 'Yksityiskohdat', amount: 'määrä', relative: '' },
      data: headingsAdded.slice(6, 33)
    },
    {
      title: { title: 'Hivenaineet', amount: 'määrä', relative: '% rel' },
      data: headingsAdded.slice(33, 45)
    },
    {
      title: { title: 'Vitamiinit', amount: 'määrä', relative: '% suos' },
      data: headingsAdded.slice(45, 56)
    },
  ];
  return titlesAdded;
}

function Header({ reportTitle, hideModal }) {
  return (
    <HeaderRow>
      <div className={styles.reportTitle} >
        {reportTitle}
      </div>
      <CancelIcon onClick={hideModal} />
    </HeaderRow>
  );
}

export default function NutrientReportM({ reportTitle, nutrientData, hideModal, ref }) {
  const classes = useStyles();

  if (nutrientData.length === 0) {
    return (
      <div ref={ref} className={classes.modalContainer} >
        <Header className={classes.modalContainer}
          reportTitle={'No micronutrient data for ' + reportTitle}
          hideModal={hideModal}
        />
      </div>);
  }

  const data = dataWithHeadingAndTitles(nutrientData);

  return (
    <div ref={ref} className={classes.modalContainer} >
      <Header
        reportTitle={'Micronutrient data for ' + reportTitle}
        hideModal={hideModal}
      />
      <List className={classes.root} subheader={<li />}>
        {data.map((section, i) => (
          <li key={`section-${i}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader><TitleRow title={section.title} /></ListSubheader>
              {section.data.map((item, j) => (
                <ListItem key={`item-${j}`}>
                  <DataRow row={item} />
                  {/* <ListItemText primary={`Item ${item}`} /> */}
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </div>
  );
}

// export default function NutrientReport({ reportTitle, nutrientData, hideModal }) {

//   if (nutrientData.length === 0) {
//     return <Header
//       reportTitle={'No micronutrient data for ' + reportTitle}
//       hideModal={hideModal}
//     />;
//   }

//   const data = dataWithHeadingAndTitles(nutrientData);

//   return (
//     <div style={{ backgroundColor: 'white' }}>
//       <Header
//         reportTitle={'Micronutrient data for ' + reportTitle}
//         hideModal={hideModal}
//       />
//       <div className={styles.container}>
//         {data.map((section, i) => {
//           return (
//             <>
//               <TitleRow
//                 key={'h' + i.toString()}
//                 title={section.title}
//               />
//               {section.data.map((row, j) =>
//                 <DataRow
//                   key={'d' + ((i + 1) * 100 + j).toString()}
//                   row={row}
//                 />)
//               }
//             </>
//           )
//         })}
//       </div>
//     </div>
//   );
// };