import React, { useEffect, useState } from "react";
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
    const [ yearList, setYearList ] = useState(generateYears()); // move to SelectCalendar
    const [ selectedDate, setSelectedDate ] = useState(getSelectedDate());
    const [ cellNum, setCellNum ] = useState(null); // change to selectedDay
    const [ isPopup, setIsPopup ] = useState(false);
    const [ notedDays, setNotedDays ] = useState([]);

    const listNotedDays = () => {
        const url = "http://46.101.153.235/api/calendar/noted_day_list.php";
        // const url = "http://localhost/api/calendar/noted_day_list.php";
        const jsonData = {
            year: year,
            month: month
        };
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        }

        fetch(url, config)
        .then(response => response.json())
        .then((data) => {
            setNotedDays(data.result);
        });
    }

    useEffect(() => {
        setSelectedDate(getSelectedDate());
        listNotedDays();
    }, [year, month]);

    const changeYear = (event) => {
        setYear(event.target.value);
    }

    const changeMonth = (event) => {
        setMonth(event.target.value);
    }

    const showNote = (cellData) => { // move to useEffect affect to cellNum (later selectedDay)
        setIsPopup(true);
        setCellNum(cellData);
    }

    const monthPlus = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    const monthMinus = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
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
            <div className="arrows-container">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" className="arrow backw-arrow" onClick={monthMinus}><path d="m32.75 44-20-20 20-20 2.8 2.85L18.4 24l17.15 17.15Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" className="arrow forw-arrow" onClick={monthPlus}><path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"/></svg>
            </div>
            
            <CalendarTable selectedDate={selectedDate} showNote={showNote} noted={notedDays} y={year} m={month} />
            <NotePopup cellNum={cellNum} year={year} month={setMonthName(month)} togglePopup={isPopup} setTogglePopup={setIsPopup} listNotedDays={listNotedDays} />
        </div>
    );
}