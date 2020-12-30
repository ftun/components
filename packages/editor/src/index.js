import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BtnToolBar } from './toolBar';
import './style.css';

const styleTextBox = {
    width: '100%',
    height: 200,
    border:' 1px #000000 solid',
    // padding: 12,
    // overflow: 'scroll',
};

const Editor = props => {
    const refIframe = useRef(null);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (refIframe.current) {
            refIframe.current.contentDocument.body.contentEditable = true;
            refIframe.current.contentDocument.body.onkeyup = () => {
                setValue(refIframe.current.contentWindow.document.body.innerHTML);
            };

            refIframe.current.paste = e => {
                console.log('paste', e);
            }
        }
    }, []);

    const setModeContent = (e) => {
        console.log('value', value);
        // console.log(oDoc.current);
    };

    const setFormatDocument = (sCmd, sValue) => {
        refIframe.current.contentWindow.document.execCommand(sCmd, false, sValue); refIframe.current.contentWindow.document.body.focus();
        setValue(refIframe.current.contentWindow.document.body.innerHTML);
        // console.log(refIframe.current.contentWindow.document.body.innerHTML);
    }

    // const getOnChange = () => console.log(refIframe.current.contentWindow.document.body.innerHTML);

    // <img title="Hyperlink" onClick="var sLnk=prompt('Write the URL here','http:\/\/');if(sLnk&&sLnk!=''&&sLnk!='http://'){setFormatDocument('createlink',sLnk)}" src={BtnToolBar.Hyperlink} />

    return <div className="row">
        <form className="col s12 m12">
            <div className="row">
                <div className="col s12 m12">
                </div>
            </div>
            <div className="row">
                <div className="col s12 m12">
                    <img title="Undo" onClick={() => setFormatDocument('undo')} src={BtnToolBar.Undo} />
                    <img title="Redo" onClick={() => setFormatDocument('redo')} src={BtnToolBar.Redo} />
                    <img title="Remove formatting" onClick={() => setFormatDocument('removeFormat')} src={BtnToolBar.RemoveFormatting} />
                    <img title="Bold" onClick={() => setFormatDocument('bold')} src={BtnToolBar.Bold} />
                    <img title="Italic" onClick={() => setFormatDocument('italic')} src={BtnToolBar.Italic} />
                    <img title="Underline" onClick={() => setFormatDocument('underline')} src={BtnToolBar.Underline} />
                    <img title="Left align" onClick={() => setFormatDocument('justifyleft')} src={BtnToolBar.LeftAlign} />
                    <img title="Center align" onClick={() => setFormatDocument('justifycenter')} src={BtnToolBar.CenterAlign} />
                    <img title="Right align" onClick={() => setFormatDocument('justifyright')} src={BtnToolBar.RightAlign} />
                    <img title="Numbered list" onClick={() => setFormatDocument('insertorderedlist')} src={BtnToolBar.NumberedList} />
                    <img title="Dotted list" onClick={() => setFormatDocument('insertunorderedlist')} src={BtnToolBar.DottedList} />
                    <img title="Quote" onClick={() => setFormatDocument('formatblock','blockquote')} src={BtnToolBar.Quote} />
                    <img title="Delete indentation" onClick={() => setFormatDocument('outdent')} src={BtnToolBar.DeleteIndentation} />
                    <img title="Add indentation" onClick={() => setFormatDocument('indent')} src={BtnToolBar.AddIndentation} />
                    <img title="Cut" onClick={() => setFormatDocument('cut')} src={BtnToolBar.Cut} />
                    <img title="Copy" onClick={() => setFormatDocument('copy')} src={BtnToolBar.Copy} />
                    <img title="Paste" onClick={() => setFormatDocument('paste')} src={BtnToolBar.Paste} />
                </div>
            </div>
            <div className="row">
                <iframe ref={refIframe} style={styleTextBox} contentEditable="true" suppressContentEditableWarning={true}>{value}</iframe>
            </div>
            <div className="row">
                <p>
                    <input type="checkbox" name="switchBox" id="switchBox" onChange={setModeContent} />
                    <label htmlFor="switchBox">Show HTML</label>
                </p>
            </div>
        </form>
    </div>;
};

// const iframeStyles = `
// body {
//   margin: 0;
//   font-family: 'Helvetica Neue', Helvetica, sans-serif;
// }
// [contenteditable="true"] {
//   width: 100%;
//   height: 100vh;
//   padding: 10px;
//   box-sizing: border-box;
//   font-size: 1.3rem;
//   line-height: 1.35;
// }`;

const Iframe = props => {
    const [ref, setRef] = useState(null);
    const refIframe = useRef(null);

    useEffect(() => {
        if (refIframe.current) {
            setRef(refIframe.current);
            refIframe.current.contentDocument.body.contentEditable = true;
            // refIframe.current.contentWindow.document.body.contentEditable='true';
            // refIframe.current.contentDocument.head.innerHTML = `<style>${iframeStyles}</style>`;
        }
    }, []);

    // onload = e => {
    //   the_frame.onload = e => {the_frame.contentDocument.body.contentEditable = true;}
    //   the_frame.src = URL.createObjectURL(new Blob([`<html><body>An other doc</body></html>`], {type: 'text/html'}));
    // };

    return <iframe ref={refIframe} />
    // return (<React.Fragment>
    //         <iframe ref={refContainer} />
    //         {ref && ref.contentDocument && createPortal(props.children, ref.contentDocument.body)}
    //     </React.Fragment>
    // );
};


export default Editor;
