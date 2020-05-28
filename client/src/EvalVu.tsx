import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

import * as firebase from 'firebase/app';
import 'firebase/database';
import {Envelope} from './Envelope';
import {TcButton} from './tctsx/TcButton';
import WorkshopPicker from './tctsx/WorkshopPicker';

const style = {
  width: '40rem',
  margin: '1rem'
};

const inputStyle = {
  width: '100%',
  margin: '1rem'
};

interface Eval {
  name: string;
  workshop: string;
  love: string;
  hate: string;
}

function initEval(): Eval {
  return {
    name: '',
    workshop: 'React',
    love: '',
    hate: ''
  };
}

// function SSelect({name, value, onChange}: { name: string, value: WorkshopKey, onChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) => void }) {
//   return <FormControl variant="outlined">
//     <InputLabel>
//       Workshop name
//     </InputLabel>
//     <Select
//       autoWidth={true}
//       value={value}
//       onChange={onChange}
//       // style={{width: '18rem'}}
//       variant={'outlined'}
//       input={<OutlinedInput labelWidth={120} name={name} inputProps={{size: 600}}/>}
//     >
//       <MenuItem value='Kotlin'>Kotlin</MenuItem>
//       <MenuItem value='Flutter'>Flutter</MenuItem>
//       <MenuItem value='React'>React</MenuItem>
//       <MenuItem value='TypeScript'>TypeScript</MenuItem>
//     </Select>
//   </FormControl>;
// }

export default function () {

  const [ev, setEval] = useState<Eval>(initEval);
  // const [isNew, setIsNew] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);

  const update = (u: Partial<Eval>) => {
    setEval({...ev, ...u});
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    // setIsNew(false);
    const database = firebase.database();
    const evalsRef = database.ref('evals');
    const newEvalRef = evalsRef.push();
    newEvalRef
      .set({...ev, date: moment().format('YYYY-MM-DD')})
      .then(() => setDone(true));
  };

  const ch = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    update({[name]: value});
  };

  const onWorkshopChange = (event: any) => {
    console.log('event: ', event);
    const name = event.name;
    const value = event.value;
    update({[name]: value});
  };

  if (done) {
    return (
      <Envelope title='Thank You' subtitle='Eval submitted'>
        <br/>
      </Envelope>
    );
  }

  return (
    <Envelope title='Post Class Evaluation'>
      <form autoComplete="off" style={style}>

        <TextField
          autoFocus={true}
          name="name"
          style={inputStyle}

          label="Your name (optional)"
          value={ev.name}
          onChange={ch}
          variant={'outlined'}
        />


        <WorkshopPicker name='workshop' value={ev.workshop} onChange={onWorkshopChange}/>

        <TextField
          name="love"
          style={inputStyle}
          label="What did you like most about workshop? (optional)"
          value={ev.love}
          onChange={ch}
          rows={5}
          multiline={true}
          rowsMax={10}
          variant={'outlined'}
        />

        <TextField
          name="hate"
          style={inputStyle}
          label="What did you like least about workshop? (optional)"
          value={ev.hate}
          onChange={ch}
          rows={5}
          multiline={true}
          rowsMax={10}
          variant={'outlined'}
        />
        <div style={{display: 'flex', justifyContent: 'center', padding: '1rem'}}>
          <TcButton
            onClick={onSubmit}
          >Submit</TcButton>
        </div>
      </form>
    </Envelope>
  );
}
