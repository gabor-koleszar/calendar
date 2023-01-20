import './CalendarRow.css';
import React from "react";
import CalendarCell from "../CalendarCell/CalendarCell";

export default function CalendarRow({rowArr, showNote}) {
    return (
        <div className="table-row">
            {rowArr.map((cell, index) => <CalendarCell key={'c_'+index} cellData={cell} showNote={showNote} />)}
        </div>
    );
}