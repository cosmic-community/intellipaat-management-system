'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameMonth, isToday } from 'date-fns'
import type { AttendanceRecord } from '@/types'

interface AttendanceCalendarProps {
  attendanceRecords: AttendanceRecord[];
  studentId?: string;
  teacherId?: string;
}

export default function AttendanceCalendar({ attendanceRecords, studentId, teacherId }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const firstDayOfMonth = getDay(monthStart);
  const emptyDays = Array(firstDayOfMonth).fill(null);
  
  const getAttendanceStatus = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = attendanceRecords.find((r) => {
      if (!r.metadata?.date) return false;
      if (studentId && r.metadata?.student?.id !== studentId) return false;
      if (teacherId && r.metadata?.teacher?.id !== teacherId) return false;
      return r.metadata.date === dateStr;
    });
    return record?.metadata?.status;
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square"></div>
        ))}
        
        {days.map((day) => {
          const status = getAttendanceStatus(day);
          const isCurrentDay = isToday(day);
          const isCurrentMonthDay = isSameMonth(day, currentDate);
          
          let dayClasses = 'calendar-day';
          
          if (!isCurrentMonthDay) {
            dayClasses += ' opacity-30';
          }
          
          if (status === 'present') {
            dayClasses += ' calendar-day-present';
          } else if (status === 'absent') {
            dayClasses += ' calendar-day-absent';
          } else {
            dayClasses += ' calendar-day-default';
          }
          
          if (isCurrentDay) {
            dayClasses += ' calendar-day-today';
          }
          
          return (
            <div key={day.toISOString()} className={dayClasses}>
              <span className="text-sm font-medium">{format(day, 'd')}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 rounded"></div>
          <span className="text-sm text-gray-600">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 rounded"></div>
          <span className="text-sm text-gray-600">Absent</span>
        </div>
      </div>
    </div>
  )
}