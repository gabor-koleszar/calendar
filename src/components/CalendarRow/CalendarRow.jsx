import './CalendarRow.css';
import React from "react";
import CalendarCell from "../CalendarCell/CalendarCell";

export default function CalendarRow({rowArr, showNote, noted, y, m}) {
    return (
        <div className="table-row">
            {rowArr.map((cell, index) => <CalendarCell key={'c_'+index} cellData={cell} showNote={showNote} noted={noted} y={y} m={m} />)}
        </div>
    );
}