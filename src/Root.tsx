import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {FPS, TOTAL} from './timeline';

export const Root: React.FC = () => (
  <Composition id="MessEgg" component={Video} durationInFrames={TOTAL} fps={FPS} width={1920} height={1080} />
);
