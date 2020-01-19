import { withStyles } from '@material-ui/core/styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { green } from '@material-ui/core/colors';

const NamePanelSummary = withStyles(theme => ({
  root: {
    backgroundColor: green[100],
    padding: '0 12px 0 12px',
    borderRadius: '3px 3px 3px 3px',
    '&:hover': {
      backgroundColor: green[200],
    },

    '&$focused': {
      backgroundColor: green[200],
      // borderRadius: '5px 5px 0 0'
    },
  },
  focused: {},

  content: {
    width: '100%',
    justifyContent: 'space-between',
    margin: 0,
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {
  }
}))(ExpansionPanelSummary);

export default NamePanelSummary;
