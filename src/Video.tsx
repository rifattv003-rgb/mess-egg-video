import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {T0} from './utils';
import {SC, TOTAL} from './timeline';
import {Captions} from './UI';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';
import {Scene7} from './scenes/Scene7';

const SCENES = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7];

const FadeIn: React.FC<{children: any}> = ({children}) => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{opacity: Math.min(1, 0.15 + f / 6)}}>{children}</AbsoluteFill>;
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    <Audio src={staticFile('voice.mp3')} volume={1} />
    {SCENES.map((Scene, i) => {
      const from = Math.round(SC[i] * 30);
      const end = i === SCENES.length - 1 ? TOTAL : Math.round(SC[i + 1] * 30);
      return (
        <Sequence key={i} from={from} durationInFrames={end - from}>
          <T0.Provider value={from / 30}>
            <FadeIn>
              <Scene />
            </FadeIn>
          </T0.Provider>
        </Sequence>
      );
    })}
    <Captions />
  </AbsoluteFill>
);
