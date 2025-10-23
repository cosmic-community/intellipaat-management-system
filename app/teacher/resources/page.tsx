import Link from 'next/link'
import { getResources } from '@/lib/cosmic'
import { Plus, Download, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Resource } from '@/types'

export default async function TeacherResourcesPage() {
  const resources = await getResources('teacher') as Resource[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
          <p className="text-gray-600">Upload and manage study materials</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Upload Resource
        </button>
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
                <FileText className="w-10 h-10 text-green-800" />
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                  {resource.metadata?.category || 'N/A'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
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
                    className="flex items-center gap-1 text-green-800 hover:text-green-900"
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