// app/admin/students/[id]/page.tsx
import { getStudentById } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'
import { Mail, Phone, Calendar, MapPin, User } from 'lucide-react'
import Link from 'next/link'
import type { Student } from '@/types'

export default async function StudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await getStudentById(id) as Student | null;

  if (!student) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500">Student not found</p>
        <Link href="/admin/students" className="btn-primary mt-4">
          Back to Students
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/students" className="text-blue-800 hover:text-blue-900 mb-4 inline-block">
          ← Back to Students
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Details</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{student.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-medium">{student.metadata?.student_id || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{student.metadata?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium">
                      {student.metadata?.date_of_birth ? formatDate(student.metadata.date_of_birth) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-4">Academic Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-medium">{student.metadata?.class || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Section</p>
                  <p className="font-medium">{student.metadata?.section || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Enrollment Date</p>
                  <p className="font-medium">
                    {student.metadata?.enrollment_date ? formatDate(student.metadata.enrollment_date) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Parent/Guardian Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Parent Name</p>
                  <p className="font-medium">{student.metadata?.parent_name || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Parent Phone</p>
                  <p className="font-medium">{student.metadata?.parent_phone || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Parent Email</p>
                  <p className="font-medium">{student.metadata?.parent_email || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{student.metadata?.address || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn-primary">Edit Details</button>
              <button className="w-full btn-secondary">View Attendance</button>
              <button className="w-full btn-secondary">View Progress</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}