import React, { useEffect, useMemo, useState } from 'react'
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import './index.scss'
import { useLocation } from 'react-router-dom';

export default function CodeEditBox(props: { defaultVaule: string, onChange?: any }) {
    const { defaultVaule, onChange } = props
    const location = useLocation().pathname
    const fileType = useMemo(() => {
        const locationArr = decodeURI(location).split('/')
        const fileNameArr = locationArr[locationArr.length - 1].split('.')
        return fileNameArr[fileNameArr.length - 1]
    }, [location])
    const getMode = () => {
        let res: string;
        switch (fileType) {
            case 'py':
                res = 'python';
                break;
            case 'js':
                res = 'javascript';
                break;
            case 'ts':
                res = 'typescript';
                break;
            case 'md':
                res = 'markdown';
                break;
            case 'java':
                res = 'java';
                break;
            case 'json':
                res = 'json';
                break;
            default:
                return undefined
        }
        loadMode(res);
        console.log(res);
        return res;
    }

    const loadMode = (res: string) => {
        import(`ace-builds/src-noconflict/mode-${res}`);
    }
    return (
        //是否为可编辑状态？
        onChange !== undefined ?
            <AceEditor
                mode={getMode()}
                defaultValue={defaultVaule}
                onChange={(value) => { onChange(value) }}
                theme="textmate"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                className="codeEditorBox"
                fontSize={14}
                width="100%"
                height='0'
                focus={true}
                enableLiveAutocompletion={true}
                debounceChangePeriod={500}
                highlightActiveLine={true}
                readOnly={false}
                maxLines={Infinity}
            /> :
            <AceEditor
                mode={getMode()}
                defaultValue={defaultVaule}
                theme="textmate"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                className="codeDisplayBox"
                fontSize={14}
                width="100%"
                height='0'
                focus={true}
                highlightActiveLine={false}
                readOnly={true}
                maxLines={Infinity}
            />
    )
}
