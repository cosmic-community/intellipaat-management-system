import { getAttendanceRecords, getStudents } from '@/lib/cosmic'
import { getCurrentDate, formatDate } from '@/lib/utils'
import { Calendar, Download } from 'lucide-react'
import type { AttendanceRecord, Student } from '@/types'

export default async function AdminAttendancePage() {
  const attendanceRecords = await getAttendanceRecords() as AttendanceRecord[];
  const students = await getStudents() as Student[];
  const today = getCurrentDate();

  // Group attendance by date
  const attendanceByDate: Record<string, AttendanceRecord[]> = {};
  attendanceRecords.forEach((record) => {
    const date = record.metadata?.date;
    if (date) {
      if (!attendanceByDate[date]) {
        attendanceByDate[date] = [];
      }
      attendanceByDate[date].push(record);
    }
  });

  const sortedDates = Object.keys(attendanceByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Management</h1>
          <p className="text-gray-600">View and manage student attendance records</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-blue-50">
          <h3 className="text-gray-600 text-sm mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">{students.length}</p>
        </div>
        <div className="card bg-green-50">
          <h3 className="text-gray-600 text-sm mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-green-600">
            {attendanceByDate[today]?.filter(r => r.metadata?.status === 'present').length || 0}
          </p>
        </div>
        <div className="card bg-red-50">
          <h3 className="text-gray-600 text-sm mb-2">Absent Today</h3>
          <p className="text-3xl font-bold text-red-600">
            {attendanceByDate[today]?.filter(r => r.metadata?.status === 'absent').length || 0}
          </p>
        </div>
        <div className="card bg-purple-50">
          <h3 className="text-gray-600 text-sm mb-2">Today's Rate</h3>
          <p className="text-3xl font-bold text-purple-600">
            {attendanceByDate[today] ? 
              Math.round((attendanceByDate[today].filter(r => r.metadata?.status === 'present').length / 
              attendanceByDate[today].length) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Attendance Records</h2>
        {sortedDates.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No attendance records found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.slice(0, 10).map((date) => {
              const records = attendanceByDate[date];
              if (!records) return null;

              const present = records.filter(r => r.metadata?.status === 'present').length;
              const absent = records.filter(r => r.metadata?.status === 'absent').length;
              const percentage = Math.round((present / records.length) * 100);

              return (
                <div key={date} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {formatDate(date)}
                    </h3>
                    <div className="flex gap-4 text-sm">
                      <span className="text-green-600">Present: {present}</span>
                      <span className="text-red-600">Absent: {absent}</span>
                      <span className="text-blue-600">Rate: {percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}