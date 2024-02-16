import React, {useState} from 'react';

import Button from '@components/Button/Button';
import Dropdown from '@components/Dropdown';

import styles from './TimeDropdown.module.scss';

interface TimeDropdownProps {
  notificationTime: Schemas.NotificationTime;
  updateTime: (hour: string, minute: string, period: string) => void;
}

const TimeDropdown = (props: TimeDropdownProps) => {
  const {notificationTime, updateTime} = props;

  const [hour, setHour] = useState(notificationTime.hour ?? '');
  const [minute, setMinute] = useState(notificationTime.minute ?? '');
  const [period, setPeriod] = useState(notificationTime.period ?? '');

  const timeOptions = (timeType: string) => {
    const contents = [];
    let time = 0;
    let index;
    if (timeType === 'hours') {
      index = 1;
      time = 12;
    } else {
      index = 0;
      time = 59;
    }

    for (let i = index; i <= time; i++) {
      const timeVal = i < 10 ? '0' + i.toString() : i.toString();

      contents.push({id: timeVal, name: timeVal});
    }

    return contents;
  };

  return (
    <div>
      <p className={styles.remindMe}>Remind Me</p>
      <div className={styles.container}>
        <Dropdown
          width={'extraSmall'}
          options={timeOptions('hours')}
          onChange={(e) => setHour((e.target as HTMLSelectElement).value)}
          font={'small'}
          value={hour}
        />
        <Dropdown
          width={'extraSmall'}
          options={timeOptions('minutes')}
          onChange={(e) => setMinute((e.target as HTMLSelectElement).value)}
          font={'small'}
          value={minute}
        />
        <Dropdown
          width={'extraSmall'}
          options={[
            {id: 'PM', name: 'PM'},
            {id: 'AM', name: 'AM'},
          ]}
          onChange={(e) => setPeriod((e.target as HTMLSelectElement).value)}
          font={'small'}
          value={period}
        />
        <Button
          onClick={() => {
            updateTime(hour, minute, period);
          }}
          className={styles.setButton}>
          Set
        </Button>
      </div>
    </div>
  );
};

export default TimeDropdown;
