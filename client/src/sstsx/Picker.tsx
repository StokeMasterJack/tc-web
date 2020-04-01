import {Theme} from '@material-ui/core/styles/createMuiTheme';
import TextField from '@material-ui/core/TextField';

import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import {CSSProperties, ReactNode} from 'react';
import {StyleRules} from '@material-ui/styles/withStyles';
import {ensure} from '../util/ass';
import {FormControl} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import NotchedOutline from '@material-ui/core/OutlinedInput/NotchedOutline';

export interface Item {
  readonly value: string;
  readonly label: string;
}

export interface PickerProps {
  readonly items: (Item | string)[];
  readonly value: string;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
  readonly label?: ReactNode;
  readonly name?: string;
  readonly disabled?: boolean;
  readonly style?: CSSProperties;
}

interface EffectiveProps {
  readonly items: Item[];
  readonly name: string;
  readonly disabled: boolean;
  readonly value: string;
  readonly onChange: React.ChangeEventHandler<HTMLInputElement>;
  readonly label?: ReactNode;
  readonly style?: CSSProperties;
}


function mkEffectiveItems(p: PickerProps): Item[] {
  const a: (Item | string)[] = p.items;
  return a.map(mkEffectiveItem);
}

function mkEffectiveStyle(p: PickerProps): CSSProperties {
  const pStyle: CSSProperties | undefined = p.style;
  const defaultStyle: CSSProperties = {
    width: '13rem'
  };
  if (!pStyle) {
    return defaultStyle;
  }

  return {...defaultStyle, ...pStyle};
}

function mkEffectiveItem(item: (Item | string)): Item {
  if (typeof item === 'string') return {value: item, label: item} as Item;
  if (typeof item === 'object') return item as Item;
  throw Error();
}

function mkEffectiveName(p: PickerProps): string {
  if (p.name) return p.name;
  return String(Math.random());
}

function mkEffectiveDisabled(p: PickerProps): boolean {
  return typeof p.disabled === 'boolean' && p.disabled;
}

function mkEffectiveProps(p: PickerProps): EffectiveProps {
  return {
    items: mkEffectiveItems(p),
    name: mkEffectiveName(p),
    disabled: mkEffectiveDisabled(p),
    value: ensure(p.value),
    onChange: ensure(p.onChange),
    label: p.label,
    style: mkEffectiveStyle(p)
  };
}


function itemToOption(item: Item | string): React.ReactNode {
  if (typeof item === 'string') {
    return <option key={item} value={item}>
      {item}
    </option>;
  } else {
    return <option key={item.value} value={item.value}>
      {item.label}
    </option>;
  }
}

function itemsToOptions(items: (Item | string)[]): React.ReactNode {
  return <React.Fragment>
    {items.map(itemToOption)}
  </React.Fragment>;
}

type ClassKey =
  | 'textField'
  | 'input'
  | 'menu'
  | 'select'
  | 'notchedOutline'
  ;

type SR = StyleRules<any, ClassKey>;

function src(theme: Theme): SR {

  return {
    textField: {
      marginRight: 0,
      marginLeft: 0,
      color: 'white',
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 0,
      marginBottom: 0,
      borderColor: 'white'
    },
    input: {
      paddingLeft:3.5,
      paddingTop: 3.3,
      paddingBottom: 2.2,
      marginTop: 0,
      marginBottom: 0,
      color: 'black',
      borderColor: 'white'
    },
    menu: {
      width: 200,
      color: 'white'
    },
    select: {
      paddingRight: 32,
      // color: 'white',
      borderColor: 'white'
    },
    notchedOutline: {
      borderColor: 'white',
      color: 'black',
      backgroundColor:'white'
    }
  };

}

const useStyles = makeStyles(src);

export default function Picker(props: PickerProps) {
  const p: EffectiveProps = mkEffectiveProps(props);
  const classes = useStyles();



  return <TextField
    select
    name={p.name}
    className={classes.textField}
    label={p.label}
    value={p.value}
    onChange={p.onChange}
    SelectProps={{
      native: true,
      classes: {
        select: classes.select
      },
      MenuProps: {
        className: classes.menu
      },
    }}
    InputLabelProps={{shrink: true}}
    inputProps={{className: classes.input}}
    InputProps={{
      classes: {
        notchedOutline: classes.notchedOutline,
      }
    }}
    margin="normal"
    variant="outlined"
    disabled={p.disabled}
    style={p.style}
  >
    {itemsToOptions(p.items)}
  </TextField>;


}