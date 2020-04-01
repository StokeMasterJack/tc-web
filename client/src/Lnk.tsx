import React from 'react';
import * as ss from './util/ssutil';
import Link from '@material-ui/core/Link';

type Props = {
  to: string,
  children?: any,
  title?: string
}

export default function Lnk(props: Props) {

  const onClick = (event: any) => {
    event.preventDefault();
    ss.spaRedir(props.to);
  };


  // return <a
  //   href={props.to}
  //   title={props.title}
  //   onClick={onClick}
  //
  //  >{props.children}</a>;

  return <Link component={'a'} href='/' onClick={onClick} title={props.title}>
    {props.children}
  </Link>;

}