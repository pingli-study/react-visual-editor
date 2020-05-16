import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import DesignPanel from './modules/designPanel';
import SettingsPanel from './modules/settingsPanel';
import  styles from './index.less';
import AllComponents from './modules/componentsPreview';
import ToolBar from './modules/toolBar';
import { Resizable } from 're-resizable';
import 'antd/dist/antd.css';
import 'animate.css/animate.min.css';
import { initDB } from './service';
// import {LegoProvider} from "@/store";
import {LegoProvider} from 'brickd-core'
import {BrickDesign} from 'brickd'
import config from "@/configs";
const COMMON_ENABLE = {
    top: false,
    right: false,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
};
const LEFT_ENABLE = {
    ...COMMON_ENABLE,
    right: true,
};

const RIGHT_ENABLE = {
    ...COMMON_ENABLE,
    left: true
};

const tableIndexs = [
    { name: 'name', keyLocation: 'name', options: { unique: true } },
    { name: 'img', keyLocation: 'img', options: { unique: false } },
    { name: 'config', keyLocation: 'config', options: { unique: false } },
];

export default function App() {
    useEffect(() => {
        initDB('test', 'templates', { autoIncrement: true },
            tableIndexs);
    }, []);

    return (
        <div className={styles['wrapper']}>
            <ToolBar/>
            <div className={styles['content']}>
                <Resizable
                    enable={LEFT_ENABLE}
                    defaultSize={{ width: '260px', height: '100%' }}
                    className={styles['left-preview']}
                >
                    <AllComponents/>
                </Resizable>

                <div className={styles['canvas-container']}>
                    <BrickDesign/>
                </div>
                <Resizable
                    enable={RIGHT_ENABLE}
                    defaultSize={{ width: '300px', height: '100%' }}
                    className={styles['props-shadow']}
                >
                    <SettingsPanel/>
                </Resizable>
            </div>
        </div>
    );
}


ReactDOM.render(
    <LegoProvider config={config}>
        <App />
    </LegoProvider>,
    document.getElementById('root')
);
