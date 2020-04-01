import * as React from 'react';
import {Block} from 'jsxstyle';
import * as showdown from 'showdown';
import {ONode, ONote} from './types';
import {ensure} from './util/ssutil';
import {Typography} from '@material-ui/core';

const converter = new showdown.Converter();

/**
 * converts "<p>foo</p>" to "foo"
 * @param text
 */
function trimOuterP(text: string): string {
  if (text.startsWith('<p>') && text.endsWith('</p>')) {
    const i1 = 3;
    const i2 = text.length - 4;
    return text.substring(i1, i2);
  } else {
    return text;
  }
}

type M = Map<number, ONode>;

const computeType = (n: ONode, depth: number, fallbackType: string): string => {
  if (n.content === 'Root') return 'Root';
  if (n.content === 'Intro') return 'Intro';
  if (n.content === 'Topics') return 'Topics';
  if (n.content === 'Meta') return 'Meta';
  return fallbackType; //use parent's type
};

export default function NodeVu({depth, id, map, type, maxDepth}: { depth: number, id: number, map: M, type: string, maxDepth: number }) {

  function renderRoot(n: ONode, map: M) {
    return (
      <Block>
        {renderChildNodes(n, map)}
      </Block>
    );
  }

  function renderIntroRoot(n: ONode, map: M) {
    return (
      <Block>
        {renderNotes(n)}
        {renderChildNodes(n, map)}
      </Block>
    );
  }

  function renderMetaRoot(n: ONode, map: M) {
    return (
      <Block>
        {renderChildNodes(n, map)}
      </Block>
    );
  }

  function renderIntroNode(n: ONode, map: M) {
    return (
      <Block>
        <Typography variant={'h5'}
                    style={{marginBottom: 0, paddingBottom: 0, marginTop: '.5rem'}}>{n.content}</Typography>
        {renderNotes(n)}
        {renderChildNodes(n, map)}
      </Block>
    );
  }

  function renderMetaNode(n: ONode) {
    const tags = n.tags;
    console.assert(tags);
    if (tags.hasOwnProperty('title')) {
      return <h1 className="workshop-title">{n.content}</h1>;
    } else if (tags.hasOwnProperty('days')) {
      return <div className="workshop-subtitle">{n.content}-day hands-on workshop</div>;
    } else {
      throw new Error('IllegalState');
    }
  }

  function renderTopicRoot(n: ONode, map: M) {
    return (
      <Block>
        <Typography variant={'h5'} style={{marginBottom: 0, paddingBottom: 0, marginTop: '.5rem'}}>What You'll
          Learn</Typography>
        {renderNotes(n)}
        {renderChildNodes(n, map)}
      </Block>
    );
  }

  function renderTopicNodeL1(n: ONode, map: M) {
    return (
      <Block>
        <Typography variant={'h6'} style={{marginBottom: 0, paddingBottom: 0, marginTop: '.5rem'}}>{n.content}</Typography>
        {/*<h2 className='workshop-h2'>{n.content}</h2>*/}
        {renderNotes(n)}
        {renderChildNodes(n, map)}
      </Block>
    );
  }

  function markdown(markdownText: string) {
    const html = converter.makeHtml(markdownText.trim());
    const htmlTrimmed = trimOuterP(html);
    const o = {__html: htmlTrimmed};
    return <Typography dangerouslySetInnerHTML={o}/>;
  }

  function renderTopicNodeL2(n: ONode, map: M) {
    if (depth > maxDepth) return null;
    const marginLeft = String(depth - 1) + 'rem';
    return (
      <div className="workshop-li" style={{marginLeft, display: 'list-item'}}>
        {markdown(n.content)}
        {renderChildNodes(n, map, true)}
      </div>
    );
  }

  function renderTopicNodeL3(n: ONode) {
    if (depth > maxDepth) return null;
    const marginLeft = String(depth - 1) + 'rem';
    return (
      <div className="workshop-li" style={{marginLeft, display: 'list-item'}}>
        {markdown(n.content)}
      </div>
    );
  }

  const renderNotes = (n: ONode) => n.notes ? n.notes.map((note: ONote) => <Typography
    key={note.id}
    style={{marginTop: '0rem'}}
    dangerouslySetInnerHTML={{__html: converter.makeHtml(note.comment)}}/>) : null;

  function renderChildNodes(n: ONode, map: M, skipMarginTop = false) {
    if (n.tasks.length === 0) return null;
    const ttt: string = computeType(n, depth, type);
    const marginTop = skipMarginTop ? '' : '1rem';
    return (
      <Block marginTop={marginTop}>
        {n.tasks.map(id => (
          <NodeVu key={id} id={id} map={map} depth={depth + 1} maxDepth={maxDepth} type={ttt}/>
        ))}
      </Block>
    );
  }


  const n: ONode = ensure(map.get(id));

  const tt = computeType(n, depth, type);   //Root | Intro | Topics

  if (tt === 'Root') {
    return renderRoot(n, map);
  } else if (tt === 'Meta') {
    if (depth === 1) {
      return renderMetaRoot(n, map);
    } else if (depth === 2) {
      return renderMetaNode(n);
    } else {
      throw new Error('IllegalState');
    }
  } else if (tt === 'Intro') {
    if (depth === 1) {
      return renderIntroRoot(n, map);
    } else if (depth === 2) {
      return renderIntroNode(n, map);
    } else {
      throw new Error('IllegalState');
    }
  } else if (tt === 'Topics') {
    if (depth === 1) {
      return renderTopicRoot(n, map);
    } else if (depth === 2) {
      return renderTopicNodeL1(n, map);
    } else if (depth === 3) {
      return renderTopicNodeL2(n, map);
    } else if (depth === 4) {
      return renderTopicNodeL3(n);
    } else {
      throw new Error('IllegalState');
    }
  } else {
    throw new Error('IllegalState');
  }


}