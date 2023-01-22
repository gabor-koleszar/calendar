import React, { useEffect, useRef, useState } from "react";
import CalendarTable from "../CalendarTable/CalendarTable";
import './Calendar.css';
import NotePopup from "../NotePopup/NotePopup";

export default function Calendar() {

    const date = new Date();

    const generateYears = () => {
        let yearList = [];
        for (let i = 1970; i <= 2100; i++) {
            yearList.push(i);
        }
        return yearList;
    }

    const setMonthName = (monthNum) => {
        
        let monthName = "";
        switch (parseInt(monthNum)) {
            case 0:
                monthName = "január";
                break;
            case 1:
                monthName = "február";
                break;
            case 2:
                monthName = "március";
                break;
            case 3:
                monthName = "április";
                break;
            case 4:
                monthName = "május";
                break;
            case 5:
                monthName = "június";
                break;
            case 6:
                monthName = "július";
                break;
            case 7:
                monthName = "augusztus";
                break;
            case 8:
                monthName = "szeptember";
                break;
            case 9:
                monthName = "október";
                break;
            case 10:
                monthName = "november";
                break;
            case 11:
                monthName = "december";
                break;
            default:
                monthName = "Empty"

        }
        
        return monthName;
    }

    const getSelectedDate = () => {
        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month);
        return d;
    }

    const [ year, setYear ] = useState(date.getFullYear());
    const [ month, setMonth ] = useState(date.getMonth());
    const [ yearList, setYearList ] = useState(generateYears());
    const [ selectedDate, setSelectedDate ] = useState(getSelectedDate());
    const [ notePopup, setNotePopup ] = useState("");
    const [ cellNum, setCellNum ] = useState(null);
    const [ isPopup, setIsPopup ] = useState(false);

    useEffect(() => {
        setSelectedDate(getSelectedDate());     
    }, [year, month]);

    const changeYear = (event) => {
        setYear(event.target.value);
    }

    const changeMonth = (event) => {
        setMonth(event.target.value);
    }

    const showNote = (cellData) => {
        setIsPopup(true);
        setCellNum(cellData);
    }

    const hideNote = () => {
        setIsPopup(false);
        setCellNum(null);
    }

    return (
        <div>
            <h2>{year} {setMonthName(month)}</h2>

            <select name="year-list" value={year} onChange={changeYear} className="calendar-select">
                {yearList.map((year, index) => <option key={index + 11} value={year}>{year}</option>)}
            </select>

            <select name="month-list" value={month} onChange={changeMonth} className="calendar-select">
                <option key="0" value="0">január</option>
                <option key="1" value="1">február</option>
                <option key="2" value="2">március</option>
                <option key="3" value="3">április</option>
                <option key="4" value="4">május</option>
                <option key="5" value="5">június</option>
                <option key="6" value="6">július</option>
                <option key="7" value="7">augusztus</option>
                <option key="8" value="8">szeptember</option>
                <option key="9" value="9">október</option>
                <option key="10" value="10">november</option>
                <option key="11" value="11">december</option>
            </select>
            <CalendarTable selectedDate={selectedDate} showNote={showNote} />
            <NotePopup cellNum={cellNum} year={year} month={setMonthName(month)} togglePopup={isPopup} setTogglePopup={setIsPopup} />
            {/* {notePopup} */}
        </div>
    );
}