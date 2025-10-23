import { getAnnouncements } from '@/lib/cosmic'
import { Bell, AlertCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Announcement } from '@/types'

export default async function StudentAnnouncementsPage() {
  const announcements = await getAnnouncements('student') as Announcement[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
        <p className="text-gray-600">Stay updated with school notifications</p>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="card text-center py-12">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No announcements at this time</p>
          </div>
        ) : (
          announcements.map((announcement) => {
            const priority = announcement.metadata?.priority || 'normal';
            const borderColor = 
              priority === 'urgent' ? 'border-red-800' :
              priority === 'high' ? 'border-orange-600' :
              'border-purple-800';
            
            const bgColor = 
              priority === 'urgent' ? 'bg-red-50' :
              priority === 'high' ? 'bg-orange-50' :
              'bg-purple-50';

            return (
              <div key={announcement.id} className={`card border-l-4 ${borderColor} ${bgColor}`}>
                <div className="flex items-start gap-4">
                  {priority === 'urgent' && (
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {announcement.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {priority}
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
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}