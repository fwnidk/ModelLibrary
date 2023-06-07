import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'
// @ts-ignore
import md from './hahaha.md'
import MarkdownNavbar from 'markdown-navbar';
import { Col, Row } from 'antd'
import 'markdown-navbar/dist/navbar.css';
import './index.scss'
import { axiosInstance } from '../../../app/axiosInterceptor'

//详情页面的模型/数据集简介，主要内容为readme.md的渲染
export default function ModelCard() {

    const [markdown, setMarkdown] = useState("")
    useEffect(() => {
        const getData = async () => {
            axiosInstance.get(md).then(res => res.data).then(text => setMarkdown(text));
        };
        getData().catch(console.error);
    }, [])

    return (
        <Row gutter={15}>
            <Col span={17}>
                <ReactMarkdown
                    className='markdown'
                    children={markdown}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={darcula as any}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }} />
            </Col>
            <Col span={7}>
                <MarkdownNavbar source={markdown} className="markdownNavbar" />
            </Col>
        </Row>
    )
}
