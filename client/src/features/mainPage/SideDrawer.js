import React from 'react';
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
  }
}));

const Item = ({ name, value }) => {
  return (
    <ListItem style={{ display: 'flex' }}>
      <Typography variant='body1' style={{ flex: 1 }}>
        {name}
      </Typography>
      <Typography variant='body1' style={{ flex: 1 }}>
        {value}
      </Typography>
    </ListItem>
  );
};

export default function SideDrawer() {
  const classes = useStyles();
  const user = useSelector(state => state.user.user);

  return (
    <div className={classes.drawerContent}>
      {user.email && (
        <Paper elevation={2} className={classes.root} >
          <Typography variant='h6'>
            User info:
      </Typography>
          <List>
            <Item name='Email' value={user.email} />
            <Item name='Name' value={user.name} />
            <Item name='Height' value={user.height + 'cm'} />
            <Item name='Weight' value={user.weight + 'kg'} />
          </List>
        </Paper>
      )}
    </div>
  )
}
