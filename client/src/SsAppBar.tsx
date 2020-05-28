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
  // const text = wLt370 ? 'SS' : <span style={{color:'black'}}>Sm<span style={{color:'#f50057',fontWeight:'normal'}}>@</span>rtSoft</span>;
  // const text = wLt370 ? 'SS' : <div style={{borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'white',margin:0,padding:0,height:32,width:131}}><img src={logo} alt="logo" style={{width:117,height:24,margin:0,padding:0}} /></div>;

  const textSmall = <div
    style={{color:'black',fontSize:'1rem',fontWeight:'bold',borderRadius:5,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'white',margin:0,padding:0,height:26,width:82}}><span style={{transform:'translateY(-1px)',}}>smartsoft</span></div>;
  const textLarge = <div
    style={{color:'black',fontSize:'1rem',fontWeight:'bold',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'white',margin:0,paddingLeft:3,paddingRight:3,paddingTop:0,paddingBottom:0}}><span style={{transform:'translateY(-1px)',}}>sm<span style={{color:'#f50057',fontWeight:'bold'}}>@</span>rtsoft</span></div>;



  const textLarge2 = <Typography key="ss"
                                 variant={'h6'}
                                 title="Smart Soft - Developer Training"
                                 style={{paddingLeft: 0, marginLeft: 0}}>SmartSoft</Typography>;

  const textSmall2 = <Typography key="ss"
                                 variant={'body1'}
                                 title="Smart Soft - Developer Training"
                                 style={{paddingLeft: 0, marginLeft: 0}}>SmartSoft</Typography>;

  const text = wLt370 ?textSmall2:textLarge2;

  const tooltip = 'Kotlin Training - Flutter Training - React Training';

  // const theme: Theme = useSsTheme();
  // const rr = theme.palette.common.white;

  return <Link variant={'h6'} href='/' color="inherit" onClick={onClick} title={tooltip} aria-label={tooltip}
               component={'a'}>
    {text}
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
                       variant={wLt370?'body1':'h6'}
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

          <Right/>
        </Row>
        <Row justifyContent='flex-end' alignItems='center'>
          {titleEffective()}
        </Row>
      </Row>
    </Toolbar>
  </AppBar>;
}

