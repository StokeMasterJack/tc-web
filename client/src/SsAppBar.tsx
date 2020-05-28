import Toolbar from '@material-ui/core/Toolbar';
import DrawerButton from './DrawerButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import * as React from 'react';
import {ReactNode} from 'react';
import {Row} from 'jsxstyle';
import {spaRedir} from './util/ssutil';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '@material-ui/core/Link';

function Right() {

  const onClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(111);
    spaRedir('/');
  };

  // const wLt400 = !useMediaQuery('(min-width:400px)');
  const wLt370 = !useMediaQuery('(min-width:370px)');
  const text = wLt370 ? 'SS' : 'smart-soft';
  const tooltip = 'Kotlin Training - Flutter Training - React Training - TypeScript Training';

  // const theme: Theme = useSsTheme();
  // const rr = theme.palette.common.white;

  return <Link variant={'h6'} href='/' color="inherit" onClick={onClick} title={tooltip} aria-label={tooltip}
               component={'a'}>
    {text}
    {/*sm<Typography variant={'h6'} style={{display: 'inline', color: rr}}>@</Typography>rt-soft*/}
  </Link>;


  // return <Typography
  //     key="ss"
  //     variant={isPhone() ? 'h6' : 'h6'}
  //     style={{
  //       paddingLeft: 0,
  //       marginLeft: 0
  //     }}>
  //
  //     <Link variant={'h6'} href='/' color="inherit" onClick={onClick} title={ariaLabel}>
  //       {text}
  //     </Link>
  //   </Typography>;
}

export default function ({left, title}: { left?: ReactNode, title?: ReactNode }) {

  // const wLt400 = !useMediaQuery('(min-width:400px)');
  const wLt370 = !useMediaQuery('(min-width:370px)');
  const leftEffective = () => !!left ? left : <DrawerButton/>;

  const titleEffective = () => {
    if (!!title && typeof title !== 'string') {
      return title;
    }
    const titleText = !!title ? title : 'smart-soft';
    return <Typography key="abc"
                       variant={'h6'}
                       title="Smart Soft - Developer Training"
                       style={{paddingLeft: 0, marginLeft: 0}}>{titleText}</Typography>;
  };

  // const actionsEffective = () => {
  //   if (!actions) {
  //     return [<HomeButton key='home'/>];
  //   } else if (Array.isArray(actions)) {
  //     return [...actions, <HomeButton key='home'/>];
  //   } else {
  //     return [actions, <HomeButton key='home'/>];
  //   }
  // };

  const tbPad = wLt370 ? 8 : 16;


  return <AppBar position="sticky">
    <Toolbar style={{paddingLeft: tbPad, paddingRight: tbPad, margin: 0, backgroundColor: ''}}>
      <Row justifyContent="space-between" alignItems='center' backgroundColor={''} width="100%" paddingLeft={0}>
        <Row alignItems='center' justifyContent='flex-start'>
          {leftEffective()}
          {titleEffective()}
        </Row>
        <Row justifyContent='flex-end' alignItems='center'>
          <Right/>
        </Row>
      </Row>
    </Toolbar>
  </AppBar>;
}

