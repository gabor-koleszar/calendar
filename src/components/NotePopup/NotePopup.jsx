import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function NotePopup({cellNum, year, month, togglePopup, setTogglePopup, listNotedDays}) {

    const [ note, setNote ] = useState("");

    const changeNote = (event) => {
        setNote(event.target.value);
    }

    const setMonthNum = (theMonth) => {
        
        let monthNum = "";
        switch (theMonth) {
            case "január":
                monthNum = 0;
                break;
            case "február":
                monthNum = 1;
                break;
            case "március":
                monthNum = 2;
                break;
            case "április":
                monthNum = 3;
                break;
            case "május":
                monthNum = 4;
                break;
            case "június":
                monthNum = 5;
                break;
            case "július":
                monthNum = 6;
                break;
            case "augusztus":
                monthNum = 7;
                break;
            case "szeptember":
                monthNum = 8;
                break;
            case "október":
                monthNum = 9;
                break;
            case "november":
                monthNum = 10;
                break;
            case "december":
                monthNum = 11;
                break;
            default:
                monthNum = "Empty"

        }
        
        return monthNum;
    }

    const saveNote = () => {

        const url = "http://localhost/api/calendar/save_note.php";
        const data = {
            year: year,
            month: setMonthNum(month) + 1,
            day: cellNum,
            note: note
        };

        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, config)
        .then(response => response.json())
        .then((data) => {
            setTogglePopup(false);
            setNote("");
            listNotedDays();
        });
    }

    const deleteNote = () => {
        const url = "http://localhost/api/calendar/delete_note.php";
        const data = {
            year: year,
            month: setMonthNum(month) + 1,
            day: cellNum
        };

        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, config)
        .then(response => response.json())
        .then((data) => {
            setTogglePopup(false);
            setNote("");
            listNotedDays();
        });
    }

    const getNote = () => {
        const url = "http://localhost/api/calendar/select_note.php";
        const data = {
            year: year,
            month: setMonthNum(month) + 1,
            day: cellNum
        };

        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(url, config)
        .then(response => response.json())
        .then((data) => {
            setNote(data.result);
        });
    }

    const closeNote = () => {
        setTogglePopup(false);
        setNote("");
    }

    useEffect(() => {
        if (togglePopup) {
            getNote();
        } else if (!togglePopup) {

        }
    }, [togglePopup]);

    return togglePopup ? (
        <div className="note-popup">
            <div className="note-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="close-popup js-close-popup" onClick={closeNote}>
                    <path onClick={() => setTogglePopup(false)} d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill="#ff0000"/>
                </svg>
                <div className="note-body">
                    <h2 className="note-heading">
                        {year} {month} {cellNum}
                    </h2>
                    <form className="note-form">
                        <textarea name="the-note" className="the-note" value={note} onChange={changeNote} ></textarea>
                        <button type="button" className="note-btn save-note-btn" onClick={saveNote} >Mentés</button>
                        <button type="button" className="note-btn delete-note-btn" onClick={deleteNote} >Törlés</button>
                    </form>
                </div>
            </div>
        </div>
    ) : "";
}