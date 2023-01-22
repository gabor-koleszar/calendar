import React from "react";

export default function NotePopup({cellNum, year, month, togglePopup, setTogglePopup}) {

    return togglePopup ? (
        <div className="note-popup">
            <div className="note-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="close-popup js-close-popup" onClick={() => setTogglePopup(false)}>
                    <path onClick={() => setTogglePopup(false)} d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill="#ff0000"/>
                </svg>
                <div className="note-body">
                    <h2 className="note-heading">
                        {year} {month} {cellNum}
                    </h2>
                    <form className="note-form">
                        <textarea name="the-note" className="the-note"></textarea>
                        <button type="button" className="save-note-btn">Mentés</button>
                    </form>
                </div>
            </div>
        </div>
    ) : "";
}