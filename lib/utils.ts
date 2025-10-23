import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth } from 'date-fns'
import type { CalendarDay, AttendanceRecord, AttendanceStatus } from '@/types'

export function generateCalendarDays(year: number, month: number, attendanceRecords: AttendanceRecord[]): CalendarDay[] {
  const firstDay = startOfMonth(new Date(year, month));
  const lastDay = endOfMonth(new Date(year, month));
  
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });
  
  return days.map((date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const record = attendanceRecords.find((r) => r.metadata?.date === dateStr);
    
    return {
      date,
      status: record?.metadata?.status,
      isToday: isToday(date),
      isCurrentMonth: isSameMonth(date, new Date(year, month)),
    };
  });
}

export function calculateAttendancePercentage(attendanceRecords: AttendanceRecord[]): number {
  if (attendanceRecords.length === 0) return 0;
  
  const presentCount = attendanceRecords.filter(
    (record) => record.metadata?.status === 'present'
  ).length;
  
  return Math.round((presentCount / attendanceRecords.length) * 100);
}

export function getAttendanceStats(attendanceRecords: AttendanceRecord[]) {
  const present = attendanceRecords.filter((r) => r.metadata?.status === 'present').length;
  const absent = attendanceRecords.filter((r) => r.metadata?.status === 'absent').length;
  const total = attendanceRecords.length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
  
  return { present, absent, total, percentage };
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM dd, yyyy');
}

export function getCurrentDate(): string {
  return format(new Date(), 'yyyy-MM-dd');
}