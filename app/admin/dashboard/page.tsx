import { getStudents, getTeachers, getResources, getAnnouncements, getAttendanceRecords } from '@/lib/cosmic'
import { getAttendanceStats, getCurrentDate } from '@/lib/utils'
import StatsCard from '@/components/StatsCard'
import { Users, UserCheck, BookOpen, Bell } from 'lucide-react'
import type { Student, Teacher, Resource, Announcement, AttendanceRecord } from '@/types'

export default async function AdminDashboard() {
  const students = await getStudents() as Student[];
  const teachers = await getTeachers() as Teacher[];
  const resources = await getResources() as Resource[];
  const announcements = await getAnnouncements() as Announcement[];
  
  const today = getCurrentDate();
  const todayAttendance = await getAttendanceRecords({ date: today }) as AttendanceRecord[];
  const stats = getAttendanceStats(todayAttendance);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the school management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value={students.length}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Total Teachers"
          value={teachers.length}
          icon={UserCheck}
          color="green"
        />
        <StatsCard
          title="Resources"
          value={resources.length}
          icon={BookOpen}
          color="purple"
        />
        <StatsCard
          title="Announcements"
          value={announcements.length}
          icon={Bell}
          color="red"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Attendance</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Present:</span>
              <span className="text-2xl font-bold text-green-600">{stats.present}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Absent:</span>
              <span className="text-2xl font-bold text-red-600">{stats.absent}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Percentage:</span>
              <span className="text-2xl font-bold text-blue-600">{stats.percentage}%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Announcements</h2>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-blue-800 pl-4">
                <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {announcement.metadata?.content}
                </p>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-gray-500">No announcements yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}