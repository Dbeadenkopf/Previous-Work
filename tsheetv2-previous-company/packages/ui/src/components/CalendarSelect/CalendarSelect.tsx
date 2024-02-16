import * as React from 'react';

import combineClasses from '@t1cg/combine-classes';

import styles from './CalendarSelect.module.scss';

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 7);

interface Props {
  onClick: (week: Date, dateString: string) => void;
  highlightWeek?: string;
  className?: string;
}

interface CalendarDay {
  date: string;
  value: number;
}

const months = [
  {short: 'Jan', long: 'January'},
  {short: 'Feb', long: 'February'},
  {short: 'Mar', long: 'March'},
  {short: 'Apr', long: 'April'},
  {short: 'May', long: 'May'},
  {short: 'Jun', long: 'June'},
  {short: 'Jul', long: 'July'},
  {short: 'Aug', long: 'August'},
  {short: 'Sep', long: 'September'},
  {short: 'Oct', long: 'October'},
  {short: 'Nov', long: 'November'},
  {short: 'Dec', long: 'December'},
];

function generateCalendar(curDate: Date): CalendarDay[][] {
  curDate.setDate(1);

  // Minus 1 since our weeks start on a monday, not sunday
  let firstDay = curDate.getDay() - 1;
  if (firstDay < 0) {
    firstDay = 6;
  }

  const numDaysInMonth = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate();

  const cal: CalendarDay[][] = [[], [], [], [], [], []];

  let curCol = firstDay;
  let curRow = 0;
  let curDay = 1;

  for (let i = 0; i < firstDay; i++) {
    const d = new Date(curDate.getFullYear(), curDate.getMonth(), -(firstDay - i) + 1);
    cal[0][i] = {
      date: d.toLocaleDateString(),
      value: d.getDate() * -1,
    };
  }

  while (curDay <= numDaysInMonth) {
    curDate.setDate(curDay);
    cal[curRow][curCol] = {date: curDate.toLocaleDateString(), value: curDay};
    curCol++;
    if (curCol > 6) {
      curCol = 0;
      curRow++;
    }
    curDay++;
  }

  if (curCol != 0) {
    let nextMonth = -1;
    curDate.setMonth(curDate.getMonth() + 1);
    let day = 1;
    while (curCol < 7) {
      curDate.setDate(day);
      cal[curRow][curCol] = {date: curDate.toLocaleDateString(), value: nextMonth};
      nextMonth--;
      curCol++;
      day++;
    }
  }

  return cal;
}

function weekContains(date: string, day: number[]): boolean {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const start = d.getTime();
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59);
  const end = d.getTime();

  const c = new Date(day[0], day[1], day[2]).getTime();

  return start <= c && end >= c;
}

const CalendarSelect = (props: Props) => {
  const [calendar, setCalendar] = React.useState<CalendarDay[][]>([]);
  const [today, setToday] = React.useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = React.useState([
    currentDate.getFullYear(),
    currentDate.getMonth(),
  ]);

  const [highlightWeek, setHighlightWeek] = React.useState<number[]>([]);

  const handleNext = () => {
    setSelectedMonth((v) => {
      const n = [...v];
      if (n[1] + 1 === 12) {
        n[0]++;
        n[1] = 0;
      } else {
        n[1]++;
      }

      return n;
    });
  };

  const handlePrev = () => {
    setSelectedMonth((v) => {
      const n = [...v];
      if (n[1] - 1 === -1) {
        n[0]--;
        n[1] = 11;
      } else {
        n[1]--;
      }

      return n;
    });
  };

  const handleRowClick = (d: CalendarDay) => () => {
    const date = new Date(d.date);
    date.setUTCHours(0, 0, 0, 0);
    props.onClick(date, d.date);
  };

  React.useEffect(() => {
    if (props.highlightWeek) {
      const hw = new Date(props.highlightWeek);
      setHighlightWeek([hw.getFullYear(), hw.getMonth(), hw.getDate()]);
    }
  }, [props.highlightWeek]);

  React.useEffect(() => {
    const curDate = new Date(selectedMonth[0], selectedMonth[1], new Date().getDate());
    setToday([new Date().getFullYear(), new Date().getMonth(), new Date().getDate()]);
    setCalendar(generateCalendar(curDate));
  }, [selectedMonth]);

  return (
    <div className={combineClasses(styles.container, props.className)}>
      <header className={styles.header}>
        <div onClick={handlePrev} className={styles.nextPrev}>
          &#8249;
        </div>
        <div className={styles.monthYear}>
          {months[selectedMonth[1]].long} {selectedMonth[0]}
        </div>
        <div onClick={handleNext} className={styles.nextPrev}>
          &#8250;
        </div>
      </header>
      <div className={styles.grid}>
        <span className={combineClasses(styles.row, styles.dayRow)}>
          <span className={styles.day}>Mon</span>
          <span className={styles.day}>Tue</span>
          <span className={styles.day}>Wed</span>
          <span className={styles.day}>Thu</span>
          <span className={styles.day}>Fri</span>
          <span className={styles.day}>Sat</span>
          <span className={styles.day}>Sun</span>
        </span>
        {calendar.map(
          (d) =>
            d.length > 0 && (
              <span
                key={d[0].date}
                className={combineClasses(styles.row, {
                  [styles.highlightRow]: weekContains(d[0].date, highlightWeek),
                })}
                onClick={handleRowClick(d[0])}>
                {d.map((dd) => (
                  <span
                    key={dd.date}
                    className={combineClasses(styles.day, {
                      [styles.anotherMonth]: dd.value < 1,
                      [styles.today]:
                        dd.value === today[2] &&
                        today[1] === selectedMonth[1] &&
                        today[0] === selectedMonth[0],
                    })}>
                    {Math.abs(dd.value)}
                  </span>
                ))}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default CalendarSelect;
