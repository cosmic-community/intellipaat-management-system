import { getAnnouncements } from '@/lib/cosmic'
import { Plus, Bell, Trash2, Edit } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Announcement } from '@/types'

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements() as Announcement[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
          <p className="text-gray-600">Manage school-wide communications</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Announcement
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-blue-50">
          <h3 className="text-gray-600 text-sm mb-2">Total</h3>
          <p className="text-3xl font-bold text-blue-600">{announcements.length}</p>
        </div>
        <div className="card bg-green-50">
          <h3 className="text-gray-600 text-sm mb-2">For Teachers</h3>
          <p className="text-3xl font-bold text-green-600">
            {announcements.filter(a => a.metadata?.target_role === 'teacher').length}
          </p>
        </div>
        <div className="card bg-purple-50">
          <h3 className="text-gray-600 text-sm mb-2">For Students</h3>
          <p className="text-3xl font-bold text-purple-600">
            {announcements.filter(a => a.metadata?.target_role === 'student').length}
          </p>
        </div>
        <div className="card bg-orange-50">
          <h3 className="text-gray-600 text-sm mb-2">For All</h3>
          <p className="text-3xl font-bold text-orange-600">
            {announcements.filter(a => a.metadata?.target_role === 'all').length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="card text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No announcements yet</p>
            <button className="btn-primary">Create Your First Announcement</button>
          </div>
        ) : (
          announcements.map((announcement) => {
            const priority = announcement.metadata?.priority || 'normal';
            const borderColor = 
              priority === 'urgent' ? 'border-red-800' :
              priority === 'high' ? 'border-orange-600' :
              'border-blue-800';

            return (
              <div key={announcement.id} className={`card border-l-4 ${borderColor}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {announcement.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {announcement.metadata?.target_role || 'all'}
                      </span>
                      {priority !== 'normal' && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {priority}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">
                      {announcement.metadata?.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Posted: {formatDate(announcement.metadata?.posted_date || announcement.created_at)}</span>
                      {announcement.metadata?.posted_by && (
                        <span>By: {announcement.metadata.posted_by.title}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}