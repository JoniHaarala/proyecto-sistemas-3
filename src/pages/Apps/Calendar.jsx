import React from 'react';
import '../../App.css'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { scheduleData } from '../../data/configData';
import moment from 'moment';
export class Calendar extends React.Component {
    constructor() {
        super(...arguments);
        this.data = scheduleData;
    }
    render() {
        return <ScheduleComponent height='550px' selectedDate={new Date(moment().format('YYYY'),moment().format('MM'),moment().format('DD'))} eventSettings={{ dataSource: this.data,
            fields: {
                id: 'Id',
                subject: { name: 'Subject' },
                isAllDay: { name: 'IsAllDay' },
                startTime: { name: 'StartTime' },
                endTime: { name: 'EndTime' }
            }
        }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent>;
    }
}
