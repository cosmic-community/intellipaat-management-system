import { getResources } from '@/lib/cosmic'
import { Plus, Download, FileText, Trash2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Resource } from '@/types'

export default async function AdminResourcesPage() {
  const resources = await getResources() as Resource[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
          <p className="text-gray-600">Manage all study materials and resources</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Upload Resource
        </button>
      </div>

      <div className="card mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{resources.length}</p>
            <p className="text-sm text-gray-600">Total Resources</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {resources.filter(r => r.metadata?.category === 'notes').length}
            </p>
            <p className="text-sm text-gray-600">Notes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {resources.filter(r => r.metadata?.category === 'assignment').length}
            </p>
            <p className="text-sm text-gray-600">Assignments</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {resources.filter(r => r.metadata?.category === 'syllabus').length}
            </p>
            <p className="text-sm text-gray-600">Syllabus</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.length === 0 ? (
          <div className="col-span-full card text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No resources uploaded yet</p>
            <button className="btn-primary">Upload Your First Resource</button>
          </div>
        ) : (
          resources.map((resource) => (
            <div key={resource.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <FileText className="w-10 h-10 text-blue-800" />
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {resource.metadata?.category || 'N/A'}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                    {resource.metadata?.target_role || 'all'}
                  </span>
                </div>
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
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{formatDate(resource.metadata?.upload_date || resource.created_at)}</span>
              </div>
              <div className="flex gap-2">
                {resource.metadata?.file && (
                  <a
                    href={resource.metadata.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                )}
                <button className="px-3 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}