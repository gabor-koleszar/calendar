const date = new Date();
date.setDate(1);

const weekDay = date.getDay()
console.log(weekDay);
let dayIndex = null;
if (weekDay === 0) {
    dayIndex = 6;
} else {
    dayIndex = weekDay - 1;
}
console.log(dayIndex);