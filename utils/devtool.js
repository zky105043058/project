import React from 'react';
import {createDevTools} from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

const devTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-z' changePositionKey='ctrl-q' defaultIsVisible={false}>
        <LogMonitor />
    </DockMonitor>
);
export default devTools;