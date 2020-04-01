import Drawer from '@material-ui/core/Drawer';
import {Row} from 'jsxstyle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {MdCancel} from 'react-icons/md';
import * as React from 'react';
import {useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import * as ss from './util/ssutil';
import {Theme} from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MenuIcon from '@material-ui/icons/Menu';
import {isPhone} from './device';

export default function () {
  const theme: Theme = createMuiTheme();
  const [open, setOpen] = useState(false);

  const onHamburgerClick = () => {
    setOpen(true);
  };
  const onCloseDrawerClick = () => {
    setOpen(false);
  };

  const onTitleClick = () => {
    setOpen(false);
    ss.spaRedir('/');
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  const redir = (route: string) => {
    ss.spaRedir(route);
    setOpen(false);
  };

  const menu = (route: string, label: string) => <MenuItem onClick={() => redir(route)}>{label}</MenuItem>;


  return <React.Fragment>
    <IconButton onClick={onHamburgerClick} edge="start" color="inherit" aria-label="Menu">
      <MenuIcon fontSize={isPhone()?'small':'default'}/>
    </IconButton>
    <Drawer open={open} onClose={onDrawerClose}>
      <Row justifyContent="space-between" background={theme.palette.primary.main} height="4rem" alignItems="center">
        <Typography variant="h6" onClick={onTitleClick} style={{
          paddingLeft: '.5rem',
          cursor: 'pointer',
          color: theme.palette.getContrastText(theme.palette.primary.main)
        }}>
          Smart Soft
        </Typography>
        <IconButton onClick={onCloseDrawerClick}>
          <MdCancel/>
        </IconButton>
      </Row>
      {menu('/', 'Home')}
      {menu('/kotlin-training', 'Kotlin Training')}
      {menu('/react-training', 'React Training')}
      {menu('/flutter-training', 'Flutter Training')}
      {menu('workshops', 'All Workshops')}
      {menu('/contact', 'Contact Us')}
      {menu('/testimonials', 'Testimonials')}
      {menu('/eval', 'Post Class Evaluation')}
      {menu('/schedule', 'Schedule')}
      {menu('/schedule', 'Signup')}
      {menu('/privateWorkshops', 'Private Workshops')}
    </Drawer>
  </React.Fragment>;
}
