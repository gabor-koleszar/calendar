import './CalendarCell.css';
import React from "react";
import { useEffect } from 'react';
import NoteIcon from '../NoteIcon/NoteIcon';
import { useState } from 'react';


export default function CalendarCell({cellData, showNote, noted, y, m}) {

    const [ notedCell, setNotedCell ] = useState(false);

    const isNoted = () => {
        if (cellData !== null) {
            const month = parseInt(m) + 1;
            const dateStr = `${y}-${month}-${cellData}`;
            
            const cellDate = new Date(dateStr).toDateString();

            for (let d of noted) {
                if (new Date(d).toDateString() === cellDate) {
                    return true;
                }
            }
        }
    }

    useEffect(() => {
        setNotedCell(isNoted());
    });

    if (cellData !== null) {
        return (
            <div className="cell" onClick={() => {showNote(cellData)}}>
                {cellData}
                {notedCell ? <NoteIcon /> : ""}
            </div>
        );
    } else {
        return (
            <div className="cell cell-empty"></div>
        );
    }
}