import {WorkshopKey} from '../types';
import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default function ({name, value, onChange}: { name?: string, value?: WorkshopKey, emptyItem?: { value: string, text: string }, onChange: (event: { name?: string, value?: WorkshopKey }) => void, label?: string }) {

  const _onChange = (event: any) => {
    const s = event.target.value;
    onChange({name, value: s === '' ? undefined : s});
  };

  return <FormControl variant="outlined" style={{
    width: '100%',
    margin: '1rem'
  }}>
    <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
    <Select
      native={true}
      value={value === undefined ? '' : value}
      onChange={_onChange}
      label="Workshop"
      inputProps={{
        name: 'age',
        id: 'outlined-age-native-simple'
      }}


    >
      <option aria-label="None" value=""/>
      <option value='flutter'>Flutter</option>
      <option value='kotlin'>Kotlin</option>
      <option value='react'>React</option>
    </Select>
  </FormControl>;

}


