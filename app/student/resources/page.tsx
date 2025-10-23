import { getResources } from '@/lib/cosmic'
import { Download, FileText, Search } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Resource } from '@/types'

export default async function StudentResourcesPage() {
  const resources = await getResources('student') as Resource[];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Resources</h1>
        <p className="text-gray-600">Access study materials and notes</p>
      </div>

      <div className="mb-6 card">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="flex-1 outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.length === 0 ? (
          <div className="col-span-full card text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No resources available yet</p>
          </div>
        ) : (
          resources.map((resource) => (
            <div key={resource.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <FileText className="w-10 h-10 text-purple-800" />
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
                  {resource.metadata?.category || 'N/A'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              {resource.metadata?.subject && (
                <p className="text-sm text-gray-600 mb-2">
                  Subject: {resource.metadata.subject}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {resource.metadata?.description || 'No description'}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{formatDate(resource.metadata?.upload_date || resource.created_at)}</span>
                {resource.metadata?.file && (
                  <a
                    href={resource.metadata.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-800 hover:text-purple-900 font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}