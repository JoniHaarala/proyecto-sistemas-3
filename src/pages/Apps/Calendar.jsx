import React from 'react';
import '../../App.css'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { scheduleData } from '../../data/configData';
import moment from 'moment';
import Header from '../../components/Head';

class Calendar extends React.Component {
    constructor() {
        super(...arguments);
        this.data = scheduleData;
    }
    render() {
        return (
            <div className='flex flex-col m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-700 dark:text-gray-50 rounded-3xl'>
                <Header category="Apps" title="Calendario"/>
                <ScheduleComponent height='550px' selectedDate={new Date(moment().format('YYYY'), moment().format('MM'), moment().format('DD'))} eventSettings={{
                    dataSource: this.data,
                    fields: {
                        id: 'Id',
                        subject: { name: 'Subject' },
                        isAllDay: { name: 'IsAllDay' },
                        startTime: { name: 'StartTime' },
                        endTime: { name: 'EndTime' }
                    }
                }}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
            </div>
        )
    }
}

export default Calendar;
