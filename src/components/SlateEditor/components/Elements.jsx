import React, { useEffect, useRef, useState } from 'react'

import { Transforms } from 'slate'
import {
    useSlateStatic,
    useSelected,
    useFocused,
    ReactEditor,
} from 'slate-react'
import Button from './Button'
import Icon from "@views/Icons/Icon"
import InlineChromiumBugfix from '../utils/CustomEditor'
import { css } from '@emotion/css'
import ResizableTable from '../Table/Resizable/ResizableTable'
import ResizableRow from '../Table/Resizable/ResizableRow'
import ResizableCell from '../Table/Resizable/ResizableCell'
import HtmlCode from '../CodeToText/HtmlCode'
import styled from 'styled-components'

const Link = ({ attributes, children, element }) => {
    const selected = useSelected()
    return (
        <a
            {...attributes}
            href={element.url}
            title={element.url}
            target="_blank"
            rel="noopener noreferrer"
            className={
                selected
                    ? css`
                text-decoration: underline;
                &:hover{
                  text-decoration: underline;
                }
              `
                    : ''
            }
        >
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
        </a>
    )
}

const EditableButton = ({ attributes, children }) => {
    return (
        /*
          Note that this is not a true button, but a span with button-like CSS.
          True buttons are display:inline-block, but Chrome and Safari
          have a bad bug with display:inline-block inside contenteditable:
          - https://bugs.webkit.org/show_bug.cgi?id=105898
          - https://bugs.chromium.org/p/chromium/issues/detail?id=1088403
          Worse, one cannot override the display property: https://github.com/w3c/csswg-drafts/issues/3226
          The only current workaround is to emulate the appearance of a display:inline button using CSS.
        */
        <span
            {...attributes}
            onClick={ev => ev.preventDefault()}
            // Margin is necessary to clearly show the cursor adjacent to the button
            className={css`
          margin: 0 0.1em;
          background-color: #efefef;
          padding: 2px 6px;
          border: 1px solid #767676;
          border-radius: 2px;
          font-size: 0.9em;
        `}
        >
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
        </span>
    )
}

const Badge = ({ attributes, children }) => {
    const selected = useSelected()

    return (
        <span
            {...attributes}
            contentEditable={false}
            className={css`
        background-color: green;
        color: white;
        padding: 2px 6px;
        border-radius: 2px;
        font-size: 0.9em;
        ${selected && 'box-shadow: 0 0 0 3px #ddd;'}
      `}
            data-playwright-selected={selected}
        >
            <InlineChromiumBugfix />
            {children}
            <InlineChromiumBugfix />
        </span>
    )
}

const ContentEditableDiv = styled.div`
  position: relative;
`

const ImageHref = styled.a``

const ImageCanvas = styled.img`
    display   : block;
    max-height: 20em;
    ${(props) =>
        props.$selected && props.$focused
            ? `box-shadow: '0 0 0 3px #B4D5FF'`
            : `box-shadow: 'none'`
    };
`

const ImageButtonContainer = styled.div`
display: 'inline';
position: absolute;
top: 0.5em;
left: 0.5em;
width: fit-content;
height: fit-content;
display: flex;
align-items: center;
gap: 1rem;
`

const ImageButton = styled(Button)`
width: 30px;
height: 30px;
background-color: white;
display: flex;
justify-content: center;
align-items: center;
`

const ImageElement = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)
    const [compressedDataUrl, setCompressedDataUrl] = useState('');

    useEffect(() => {
        const img = new Image()
        img.src = element.url
        img.onload = function () {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.width = img.width / 2
            canvas.height = img.height / 2
            context.drawImage(img, 0, 0, canvas.width, canvas.height)
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8)
            setCompressedDataUrl(compressedDataUrl)
        }
    }, [element])
    const selected = useSelected()
    const focused = useFocused()
    const trashCanButton = <ImageButton
        active
        onClick={() => Transforms.removeNodes(editor, { at: path })}
    >
        <Icon icon={'trashCan'} />
    </ImageButton>
    const altTextButton = <ImageButton
        active
        onClick={() => {
            const alt = prompt(`請輸入替代文字： ${element.alt ? `\n目前替代文字: ${element.alt}` : ''} `)
            if (!alt) return
            const imageAlt = {
                type: 'image',
                alt,
                children: { text: '' }
            }
            Transforms.setNodes(editor, imageAlt)
        }}
    >
        <Icon icon={'edit'} />
    </ImageButton>
    const removeAltTextButton = <ImageButton
        active
        onClick={() => {
            const alt = null
            const imageAlt = {
                type: 'image',
                alt,
                children: { text: '' }
            }
            Transforms.setNodes(editor, imageAlt)
        }}
    >
        <Icon icon={'editOff'} />
    </ImageButton>
    const hrefButton = <ImageButton
        active
        onClick={() => {
            const href = prompt(`請輸入超連結： ${element.href ? `\n目前超連結: ${element.href}` : ''} `)
            if (!href) return
            const imageHref = {
                type: 'image',
                href,
                children: { text: '' }
            }
            Transforms.setNodes(editor, imageHref)
        }}
    >
        <Icon icon={'link'} />
    </ImageButton>
    const removeHrefButton = <ImageButton
        active
        onClick={() => {
            const href = null
            const imageHref = {
                type: 'image',
                href,
                children: { text: '' }
            }
            Transforms.setNodes(editor, imageHref)
        }}
    >
        <Icon icon={'linkOff'} />
    </ImageButton>
    return (
        <div {...attributes}>
            {children}
            <ContentEditableDiv contentEditable={false}>
                <ImageButtonContainer>
                    {trashCanButton}
                    {altTextButton}
                    {element.alt && removeAltTextButton}
                    {hrefButton}
                    {element.href && removeHrefButton}
                </ImageButtonContainer>
                <ImageHref href={element.href}
                    title={element.href || element.alt}
                    rel="noreferrer noopener"
                    target="_blank"
                >
                    <ImageCanvas
                        src={compressedDataUrl}
                        alt={element.alt}
                        $selected={selected}
                        $focused={focused}
                    />
                </ImageHref>
            </ContentEditableDiv>
        </div>
    )
}
export const Element = (props) => {
    const { element, children, attributes } = props

    const style = { textAlign: element.align }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes} {...element.attr}>
                    {children}
                </blockquote>
            )
        case 'h1':
            return (
                <h1 style={style} {...attributes} {...element.attr}>
                    {children}
                </h1>
            )
        case 'h2':
            return (
                <h2 style={style} {...attributes} {...element.attr}>
                    {children}
                </h2>
            )
        case 'h3':
            return (
                <h3 style={style} {...attributes} {...element.attr}>
                    {children}
                </h3>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes} {...element.attr}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'image':
            return <ImageElement
                element={element}
                attributes={attributes}
                children={children}
            />
        case 'link':
            return <Link
                element={element}
                attributes={attributes}
                children={children} />
        case 'button':
            return <EditableButton
                attributes={attributes}
                children={children} />
        case 'badge':
            return <Badge
                attributes={attributes}
                children={children} />
        case 'table':
            return <ResizableTable
                element={element}
                attributes={attributes}
                children={children} />
        case 'table-row':
            return (
                <ResizableRow {...attributes}>
                    {children}
                </ResizableRow>
            )
        case 'table-cell':
            return (
                <ResizableCell {...attributes} {...element.attr}>
                    {children}
                </ResizableCell>
            )
        case 'htmlCode':
            return <HtmlCode {...props} />
        default:
            return (
                <p style={style} {...attributes} {...element.attr}>
                    {children}
                </p>
            )
    }
}

export const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
    if (leaf.code) {
        children = <code>{children}</code>
    }
    if (leaf.italic) {
        children = <em>{children}</em>
    }
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    if (leaf.backgroundColor) {
        children = <span style={{ backgroundColor: leaf.backgroundColor }}>{children}</span>
    }
    if (leaf.color) {
        children = <span style={{ color: leaf.color }}>{children}</span>
    }
    if (leaf.hide) {
        children = <span data-attr="display-none" style={{ opacity: 0.3 }}>{children}</span>
    }
    return <span {...attributes}>{children}</span>
}