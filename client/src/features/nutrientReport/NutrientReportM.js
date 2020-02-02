import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

import LongDialog from './LongDialog';

import styles from './NutrientReport.module.css';
import { decimals } from './helperFunctions';

import nutrientReportData from './nutrientReportData';

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
      {row.recommendationPercentage > 0 ? row.recommendationPercentage.toFixed(0) + '%' : ''}
    </div>
  </div>
}

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: 'calc( 100% - 8px)'
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  dialogContent: {
    height: 'calc(90vh - 70px)'
  }
}));

export default function NutrientReportM({ open, reportTitle, nutrientData, hideModal }) {
  const classes = useStyles();
  const data = nutrientReportData(nutrientData);

  return (
    <LongDialog
      hideModal={hideModal}
      open={open}
      dialogTitle={'Nutrient content of ' + reportTitle}
      aria-labelledby="customized-dialog-title"
    >
      <List className={classes.list} subheader={<li />}>

        {data.map((section, i) => (
          <li key={`section-${i}`} className={classes.listSection}>

            <ul className={classes.ul}>
              <ListSubheader><TitleRow title={section.title} /></ListSubheader>

              {section.data.map((item, j) => (
                <ListItem key={`item-${j}`}>
                  <DataRow row={item} />
                </ListItem>
              ))}

            </ul>
          </li>
        ))}

      </List>
    </LongDialog>
  );
}