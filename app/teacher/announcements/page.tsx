import { getAnnouncements } from '@/lib/cosmic'
import { Plus, Bell } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Announcement } from '@/types'

export default async function TeacherAnnouncementsPage() {
  const announcements = await getAnnouncements('teacher') as Announcement[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
          <p className="text-gray-600">View and create announcements for students</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="card text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No announcements yet</p>
            <button className="btn-primary">Create Your First Announcement</button>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id} className="card border-l-4 border-green-800">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {announcement.title}
                </h3>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                  {announcement.metadata?.target_role || 'all'}
                </span>
              </div>
              <p className="text-gray-600 mb-4 whitespace-pre-wrap">
                {announcement.metadata?.content}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Posted: {formatDate(announcement.metadata?.posted_date || announcement.created_at)}</span>
                {announcement.metadata?.posted_by && (
                  <span>By: {announcement.metadata.posted_by.title}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}