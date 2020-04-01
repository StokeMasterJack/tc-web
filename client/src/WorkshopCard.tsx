import * as React from 'react';
import * as service from './service';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {CWorkshop, Outline} from './types';
import {TcButton} from './tctsx/TcButton';
import {Urls} from './util/globals';

function extractFirstIntroParagraph(outline: Outline) {
  for (const node of outline.nodes) {
    if (node.content === 'Intro') {
      return node.notes[0].comment;
    }
  }
  throw Error();
}

const WorkshopCard = (props: { workshop: CWorkshop }) => {
  const w: CWorkshop = props.workshop;


  const outline: Outline = service.loadOutlineSync(w.key);

  const introPara = extractFirstIntroParagraph(outline);


  return (
    <Card style={{margin: '1rem', marginBottom: '1rem', maxWidth: '50rem'}}>
      <CardHeader title={w.title + ' Training'} subheader={w.subtitle}/>
      <CardContent style={{marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0}}>
        {introPara}
      </CardContent>
      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
        padding: '1rem'
      }}
      >

        <TcButton style={{flex: 1, marginRight: '.5rem'}}  href={w.url}>Details</TcButton>
        <TcButton style={{flex: 1, marginLeft: '.5rem'}}  href={Urls.schedule(w.key)}>Dates</TcButton>
      </div>
    </Card>
  );
};

export default WorkshopCard;
