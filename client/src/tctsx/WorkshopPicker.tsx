import {WorkshopKey} from '../types';
import {useTheme} from '@material-ui/styles';
import {Theme} from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ({name, value, onChange, label, emptyItem}: { name?: string, value?: WorkshopKey, emptyItem?: { value: string, text: string }, onChange: (event: { name?: string, value?: WorkshopKey }) => void, label?: string }) {

  const theme = useTheme<Theme>();

  const _onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const s = event.target.value;
    onChange({name, value: s === '' ? undefined : s});
  };

  console.log('name: ', name);
  console.log('value: ', value);

  return <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'flex-end',
    height: '1.8rem'
  }}>
    {!!label && <Typography variant={'caption'} style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      textAlign: 'right',
      color: theme.palette.common.white
    }}>{label}:&nbsp;&nbsp;</Typography>}

    <select value={value === undefined ? '' : value} onChange={_onChange}
            style={{backgroundColor: theme.palette.background.default, width: '7rem'}}>
      {emptyItem && <option value={emptyItem.value}>{emptyItem.value}</option>}
      <option value='flutter'>Flutter</option>
      <option value='kotlin'>Kotlin</option>
      <option value='react'>React</option>
    </select>

  </div>;

}
