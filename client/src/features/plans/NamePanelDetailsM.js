import { withStyles } from '@material-ui/core/styles';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const NamePanelDetails = withStyles({
  root: {
    // background: 'green',
    padding: '5px 5px',
    display: 'block'
  },
})(ExpansionPanelDetails);

export default NamePanelDetails;