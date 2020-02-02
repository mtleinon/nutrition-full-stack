import React from 'react';
import nutrientHeading from './nutrientHeading';
import styles from './NutrientReport.module.css';
import HeaderRow from '../../components/HeaderRow';
import CancelIcon from '../../components/CancelIcon';
import { decimals, convertKCalToKJ } from './helperFunctions';
import { I_ENERGY } from '../finelliData/constants';

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

  headingsAdded[I_ENERGY].value = convertKCalToKJ(headingsAdded[I_ENERGY].value);
  const headingsAdded = nutrientData
    .map((dataRow, i) => ({
      value: dataRow,
      heading: nutrientHeading[i].name.fiShort,
      unit: nutrientHeading[i].unit,
      recommendation: getRecommendation(nutrientHeading[i])
    }));


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

export default function NutrientReport({ reportTitle, nutrientData, hideModal }) {

  if (nutrientData.length === 0) {
    return <Header
      reportTitle={'No micronutrient data for ' + reportTitle}
      hideModal={hideModal}
    />;
  }

  const data = dataWithHeadingAndTitles(nutrientData);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header
        reportTitle={'Micronutrient data for ' + reportTitle}
        hideModal={hideModal}
      />
      <div className={styles.container}>
        {data.map((section, i) => {
          return (
            <>
              <TitleRow
                key={'h' + i.toString()}
                title={section.title}
              />
              {section.data.map((row, j) =>
                <DataRow
                  key={'d' + ((i + 1) * 100 + j).toString()}
                  row={row}
                />)
              }
            </>
          )
        })}
      </div>
    </div>
  );
};