import React, { useCallback, useEffect } from 'react'
import "diff2html/bundles/css/diff2html.min.css";
import { createTwoFilesPatch } from "diff";
import { parse } from "diff2html";
import { Diff2HtmlUI } from "diff2html/lib/ui/js/diff2html-ui";
import './index.css'

export default function DiffComponent(props: { diffDataList: Array<any> }) {
    const { diffDataList } = props;
    useEffect(() => {
        console.log('inDiffComponent', diffDataList);
        createDiffData(diffDataList);
    })

    const createDiffData = useCallback((fileList: Array<any>) => {
        let diffJsonList: any = [];
        fileList.forEach(item => {
            let { oldFileName, newFileName, prevData, newData, isJson } = item;
            let oldString = prevData || "";
            let newString = newData || "";
            // 特定需求处理
            if (isJson) {
                // 格式化json
                oldString = JSON.stringify(prevData, null, 2);
                newString = JSON.stringify(newData, null, 2);
            }
            // 对比差异
            const diffStr = createTwoFilesPatch(oldFileName || "", newFileName || "", oldString, newString);
            // 差异json化
            const diffJson = parse(diffStr);
            diffJsonList.push(diffJson[0]);
        })
        console.log(diffJsonList);
        const targetElement = document.getElementById('diff-ui-mult');
        const configuration = {
            // drawFileList: false,
            matching: "lines",
            highlight: true,
            outputFormat: 'side-by-side',//side-by-side | line-by-line
            diffMaxChanges: 20,
            diffMaxLineLength: 20,
            rawTemplates: {
                'generic-file-path': `<span class="d2h-file-name-wrapper">{{>fileIcon}}<span class="d2h-file-name">{{fileDiffName}}</span>{{>fileTag}}</span>`,
                'file-summary-wrapper': `<div class="d2h-file-list-wrapper">
                    <div class="filesTableHeader">
                        <span class='diffTitle' >文件更改 ({{filesNumber}})</span>
                    </div>
                <ol class="d2h-file-list">
                {{{files}}}
                </ol>
            </div>`
            }
        };
        const diff2htmlUi = new Diff2HtmlUI(targetElement as HTMLElement, diffJsonList, configuration as any);
        diff2htmlUi.draw();       //绘制页面
        diff2htmlUi.highlightCode();  // 高亮数据
    }, [])
    return (
        <div id={'diff-ui-mult'} />
    )
}

