import Typography from '@material-ui/core/Typography';
import {isPhone} from '../device';
import * as React from 'react';
import {ReactNode} from 'react';


export default function ({title, subtitle, logo}: { title?: ReactNode, subtitle?: ReactNode, logo?: boolean }) {

  function Title() {
    const variant = isPhone() ? 'h5' : 'h4';
    const marginBottom = !!subtitle ? (isPhone() ? '0rem' : '.3rem') : (isPhone() ? '0rem' : '0rem');
    return <Typography
      variant={variant}
      color={'secondary'}
      style={{
        marginBottom
        // backgroundColor:'pink'
      }}>{title}</Typography>;
  }

  function Subtitle() {
    const variant = isPhone() ? 'h6' : 'h5';
    const marginTop = isPhone() ? '0rem' : '.2rem';
    const marginBottom = isPhone() ? '.3rem' : '1rem';
    return <Typography
      variant={variant}
      color={'textSecondary'}
      style={{
        marginTop,
        marginBottom
        // backgroundColor:'cyan'
      }}>{subtitle}</Typography>;
  }

  const marginTop = isPhone() ? '1.9rem' : '3.3rem';

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    // backgroundColor:'yellow',
    textAlign: 'center',
    marginTop
  }}>

    <div style={{marginBottom: '.5rem'}}/>
    {!!title && <Title/>}
    {!!subtitle && <Subtitle/>}
  </div>;

}

