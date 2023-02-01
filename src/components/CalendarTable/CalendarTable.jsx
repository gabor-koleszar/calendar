import './CalendarTable.css';
import React, { useEffect, useState } from "react";
import CalendarRow from "../CalendarRow/CalendarRow";

export default function CalendarTable({selectedDate, showNote, noted, y, m}) { // use setSelectedDay showNote instead

    const [ calendArr, setCalendArr ] = useState([]); // change to daysArr

    const lastDayOfMonth = (year, month) => {
        const lastDay = new Date(year, month + 1, 0);
        return lastDay.getDate();
    }

    const getFirstDay = (firstDayOfMonth) => {
        let dayIndex = null;
        if (firstDayOfMonth === 0) {
            dayIndex = 6;
        } else {
            dayIndex = firstDayOfMonth - 1;
        }
        return dayIndex;
    }

    const generateCalendar = () => {
        selectedDate.setDate(1);
        const firstDayOfMonth = getFirstDay(selectedDate.getDay());
        const daysOfMonth = lastDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth());
        let countDays = 0;
        const monthArr = [];
        let monthArrIndex = 0;
        let isFirstRow = true;

        while (daysOfMonth > countDays) {
            const row = [];
            for (let i = 0; i < 7; i++) {
                if (isFirstRow && i < firstDayOfMonth) {
                    row[i] = null;
                } else if (isFirstRow && i === firstDayOfMonth) {
                    countDays++;
                    row[i] = countDays;
                    isFirstRow = false;
                } else if (countDays >= daysOfMonth) {
                    row[i] = null;
                } else {
                    countDays++;
                    row[i] = countDays;
                }
            }
        
            monthArr[monthArrIndex] = row;
            monthArrIndex++;
            
        }
        setCalendArr(monthArr);
    }

    useEffect(() => {
        generateCalendar();
    }, [selectedDate]);

    return (
        <>
            <div className="calendar-table">
                <div className="calendar-header">
                    <div className="header-cell">Hétfő</div>
                    <div className="header-cell">Kedd</div>
                    <div className="header-cell">Szerda</div>
                    <div className="header-cell">Csütörtök</div>
                    <div className="header-cell">Péntek</div>
                    <div className="header-cell">Szombat</div>
                    <div className="header-cell sunday">Vasárnap</div>
                </div>
                <div className="calendar-body">
                    {calendArr.map((row, index) => <CalendarRow key={'tr_'+index} rowArr={row} showNote={showNote} noted={noted} y={y} m={m} />)}
                </div>
            </div>
        </>
    );
}