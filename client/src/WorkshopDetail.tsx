import * as React from 'react';
import {useEffect, useState} from 'react';
import NodeVu from './NodeVu';
import * as service from './service';
import {ONode, Outline} from './types';
import PageHead from './tctsx/PageHead';
import SsAppBar from './SsAppBar';
import {Urls} from './util/globals';
import {TcButton} from './tctsx/TcButton';
import {resetTitleAndMeta} from './tctsx/seo';
import Loading from './tctsx/Loading';

const buildRootNode = (nodes: ONode[]): ONode => {
  const rootNode: ONode = {
    id: 0,
    parent_id: -1,
    content: 'Root',
    tasks: [], notes: [], tags: []
  };
  rootNode.tasks = [];
  nodes.forEach((n: ONode) => {
    if (n.parent_id === 0) {
      rootNode.tasks.push(n.id);
    }
  });
  return rootNode;
};

const buildMap = (outline: Outline): Map<number, ONode> => {
  const nodes: ONode[] = outline.nodes;
  const m = new Map<number, ONode>();
  nodes.forEach(n => m.set(n.id, n));
  const rootNode = buildRootNode(nodes);
  m.set(0, rootNode);
  return m;
};


const Buttons = ({workshopKey}: { workshopKey: string }) => {
  return <div style={{
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  }}>
    <TcButton style={{flex: 1, marginRight: '.5rem'}} href={Urls.schedule(workshopKey)}>Dates</TcButton>
    <TcButton style={{flex: 1, marginLeft: '.5rem'}} href={Urls.testimonials}>Testimonials</TcButton>
  </div>;
};


export default function WorkshopDetail({workshopKey}: { workshopKey: string }) {

  const [outline, setOutline] = useState<Outline>();

  useEffect(() => {
    let _ignore: boolean = false;

    if (!_ignore) {
      resetTitleAndMeta(workshopKey);
      const o: Outline = service.loadOutlineSync(workshopKey);
      setOutline(o);
    }

    return () => {
      _ignore = true;
    };

  }, [workshopKey]);


  if (!outline) return <Loading/>;

  const map = buildMap(outline);

  return <>
    <SsAppBar title={outline.title}/>

    <PageHead title={outline.title} subtitle={outline.subtitle}/>


    {/*<div style={{marginBottom: '1rem', maxWidth: '50rem', paddingLeft: '1rem', paddingRight: '1rem'}}>*/}
    <div style={{display: 'flex', flexDirection: 'column', padding: '1rem', maxWidth: '50rem'}}>
      <Buttons workshopKey={workshopKey}/>
      <NodeVu id={0} map={map} depth={0} maxDepth={4} type="Root"/>

      <Buttons workshopKey={workshopKey}/>
    </div>


  </>;

}

