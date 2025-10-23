// app/admin/teachers/[id]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'
import { Mail, Phone, Calendar, BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import type { Teacher } from '@/types'

async function getTeacherById(id: string) {
  try {
    const response = await cosmic.objects
      .findOne({ id })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error: any) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function TeacherDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teacher = await getTeacherById(id) as Teacher | null;

  if (!teacher) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">Teacher not found</p>
        <Link href="/admin/teachers" className="btn-primary mt-4">
          Back to Teachers
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/teachers" className="text-blue-800 hover:text-blue-900 mb-4 inline-block">
          ← Back to Teachers
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Details</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{teacher.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Employee ID</p>
                    <p className="font-medium">{teacher.metadata?.employee_id || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{teacher.metadata?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{teacher.metadata?.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-4">Professional Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Qualifications</p>
                  <p className="font-medium">{teacher.metadata?.qualifications || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date of Joining</p>
                  <p className="font-medium">
                    {teacher.metadata?.date_of_joining ? formatDate(teacher.metadata.date_of_joining) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Subjects Teaching</h3>
            <div className="flex flex-wrap gap-2">
              {teacher.metadata?.subjects && teacher.metadata.subjects.length > 0 ? (
                teacher.metadata.subjects.map((subject, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {subject}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No subjects assigned</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-primary">Edit Details</button>
              <button className="w-full btn-secondary">View Schedule</button>
              <button className="w-full btn-secondary">Assign Subjects</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}