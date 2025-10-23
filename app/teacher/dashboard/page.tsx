import { getAttendanceRecords, getResources, getAnnouncements } from '@/lib/cosmic'
import { getAttendanceStats, getCurrentDate } from '@/lib/utils'
import StatsCard from '@/components/StatsCard'
import AttendanceCalendar from '@/components/AttendanceCalendar'
import { BookOpen, Bell, CheckCircle } from 'lucide-react'
import type { AttendanceRecord, Resource, Announcement } from '@/types'

export default async function TeacherDashboard() {
  // For demo purposes, using a mock teacher ID
  const teacherId = 'teacher-1';
  
  const attendanceRecords = await getAttendanceRecords({ teacherId }) as AttendanceRecord[];
  const resources = await getResources('teacher') as Resource[];
  const announcements = await getAnnouncements('teacher') as Announcement[];
  
  const today = getCurrentDate();
  const todayAttendance = await getAttendanceRecords({ date: today }) as AttendanceRecord[];
  const stats = getAttendanceStats(todayAttendance);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Manage student attendance and resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Resources Uploaded"
          value={resources.length}
          icon={BookOpen}
          color="green"
        />
        <StatsCard
          title="Today's Attendance"
          value={`${stats.percentage}%`}
          icon={CheckCircle}
          color="blue"
        />
        <StatsCard
          title="Active Announcements"
          value={announcements.length}
          icon={Bell}
          color="purple"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AttendanceCalendar 
          attendanceRecords={attendanceRecords} 
          teacherId={teacherId}
        />

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Announcements</h2>
          <div className="space-y-3">
            {announcements.slice(0, 5).map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-green-800 pl-4">
                <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {announcement.metadata?.content}
                </p>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-gray-500">No announcements</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}