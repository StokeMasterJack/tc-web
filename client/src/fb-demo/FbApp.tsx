import React, {FC} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/database';

export const FbApp: FC = () => {

  const onClick = () => {
    const database = firebase.database();
    database.ref('users/123').set({fn: 'Dave', ln: 'Ford'});
  };

  return <div>
    <button onClick={onClick}>Save User</button>
  </div>;
};