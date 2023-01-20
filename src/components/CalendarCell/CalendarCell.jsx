import './CalendarCell.css';
import React from "react";

export default function CalendarCell({cellData, showNote}) {

    if (cellData !== null) {
        return (
            <div className="cell" onClick={() => {showNote(cellData)}}>
                {cellData}
            </div>
        );
    } else {
        return (
            <div className="cell cell-empty"></div>
        );
    }
}