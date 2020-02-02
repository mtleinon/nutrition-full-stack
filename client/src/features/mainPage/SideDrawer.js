import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  drawerContent: {
    width: 300,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  root: {
    margin: theme.spacing(1)
  },
  paper: {
    backgroundColor: theme.palette.primary.main
  },
  userInfoItem: {
    display: 'flex'
  },
  userInfoText: {
    flex: 1
  }
}));

const UserInfoItem = ({ name, value }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.userInfoItem}>
      <Typography variant='body1' className={classes.userInfoText}>
        {name}
      </Typography>
      <Typography variant='body1' className={classes.userInfoText}>
        {value}
      </Typography>
    </ListItem>
  );
};

export default function SideDrawer({ drawerOpen, handleCloseSideDrawer }) {
  const classes = useStyles();
  const user = useSelector(state => state.user.user);

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      open={drawerOpen} onClose={handleCloseSideDrawer}
    >
      <div className={classes.drawerContent}>

        {user.email && (
          <Paper elevation={2} className={classes.root} >
            <Typography variant='h6'>User info:</Typography>
            <List>
              <UserInfoItem name='Email' value={user.email} />
              <UserInfoItem name='Name' value={user.name} />
              <UserInfoItem name='Height' value={user.height + 'cm'} />
              <UserInfoItem name='Weight' value={user.weight + 'kg'} />
            </List>
          </Paper>
        )}

      </div>
    </Drawer>
  )
}
