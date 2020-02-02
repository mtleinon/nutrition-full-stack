import { withStyles } from '@material-ui/core/styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { blue  } from '@material-ui/core/colors';

const NamePanelSummary = withStyles(theme => ({
  root: {
    backgroundColor: blue[100],
    padding: '0 12px 0 12px',
    borderRadius: '3px 3px 3px 3px',
    '&:hover': {
      backgroundColor: blue[200],
    },

    '&$focused': {
      backgroundColor: blue[200],
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
