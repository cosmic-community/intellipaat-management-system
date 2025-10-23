import { getAttendanceRecords } from '@/lib/cosmic'
import { getAttendanceStats } from '@/lib/utils'
import AttendanceCalendar from '@/components/AttendanceCalendar'
import type { AttendanceRecord } from '@/types'

export default async function StudentAttendancePage() {
  // For demo purposes, using a mock student ID
  const studentId = 'student-1';
  
  const attendanceRecords = await getAttendanceRecords({ studentId }) as AttendanceRecord[];
  const stats = getAttendanceStats(attendanceRecords);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Attendance</h1>
        <p className="text-gray-600">Track your monthly attendance record</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-green-50">
          <h3 className="text-gray-600 text-sm mb-2">Present Days</h3>
          <p className="text-4xl font-bold text-green-600">{stats.present}</p>
        </div>
        <div className="card bg-red-50">
          <h3 className="text-gray-600 text-sm mb-2">Absent Days</h3>
          <p className="text-4xl font-bold text-red-600">{stats.absent}</p>
        </div>
        <div className="card bg-blue-50">
          <h3 className="text-gray-600 text-sm mb-2">Attendance Rate</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.percentage}%</p>
        </div>
      </div>

      <AttendanceCalendar 
        attendanceRecords={attendanceRecords} 
        studentId={studentId}
      />

      <div className="mt-6 card bg-purple-50">
        <h3 className="font-semibold text-purple-900 mb-2">Attendance Policy</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Minimum 75% attendance is required for semester promotion</li>
          <li>• Medical leave requires proper documentation</li>
          <li>• Contact the administration office for attendance queries</li>
        </ul>
      </div>
    </div>
  )
}