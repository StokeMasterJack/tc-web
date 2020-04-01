import Button, {ButtonProps} from '@material-ui/core/Button';
import * as React from 'react';
import {spaRedir} from '../util/ssutil';

export function TcButton(props: ButtonProps) {

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!!props.href) {
      e.preventDefault();
      spaRedir(props.href);
    } else if (!!props.onClick) {
      e.preventDefault();
      props.onClick(e);
    }
  };

  return <Button color={'primary'} variant={'outlined'} onClick={onClick} {...props}>{props.children}</Button>;
}