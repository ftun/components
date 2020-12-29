import React, { useState, useEffect, useRef } from 'react';

import { BtnToolBar } from './toolBar';
import './style.css';

const styleTextBox = {
    // width: 540,
    height: 200,
    border:' 1px #000000 solid',
    padding: 12,
    overflow: 'scroll',
};

const Editor = props => {
    const oDoc = useRef(null);

    const setModeContent = (e) => {
        console.log(oDoc.current);
    };

    const setFormatDocument = (sCmd, sValue) => {
        document.execCommand(sCmd, false, sValue); oDoc.current.focus();
      // if (validateMode()) { document.execCommand(sCmd, false, sValue); oDoc.focus(); }
    }
    // useEffect() => {
    //
    // });

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
                <div ref={oDoc} style={styleTextBox} contentEditable="true" suppressContentEditableWarning={true} className="col s12 m12">
                    <p>Lorem ipsum</p>
                </div>
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


export default Editor;
