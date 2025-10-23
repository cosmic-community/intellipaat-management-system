import Link from 'next/link'
import { GraduationCap, Users, BookOpen, Bell } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="w-16 h-16 text-blue-800" />
            <h1 className="text-5xl font-bold text-blue-900">
              Intellipaat School of Technology
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            School Management System
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            A comprehensive platform for managing students, teachers, attendance, resources, and announcements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link href="/admin/dashboard" className="card hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-800" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Admin</h3>
              <p className="text-gray-600 mb-4">
                Full system access to manage students, teachers, and all resources
              </p>
              <span className="text-blue-800 font-semibold">Enter Admin Portal →</span>
            </div>
          </Link>

          <Link href="/teacher/dashboard" className="card hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-green-800" />
              </div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Teacher</h3>
              <p className="text-gray-600 mb-4">
                Mark attendance, upload resources, and manage student progress
              </p>
              <span className="text-green-800 font-semibold">Enter Teacher Portal →</span>
            </div>
          </Link>

          <Link href="/student/dashboard" className="card hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-purple-800" />
              </div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">Student</h3>
              <p className="text-gray-600 mb-4">
                View attendance, access resources, and stay updated with announcements
              </p>
              <span className="text-purple-800 font-semibold">Enter Student Portal →</span>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <div className="card max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Features</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">📅 Attendance Tracking</h4>
                <p className="text-gray-600">Visual calendar with color-coded attendance indicators</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">📚 Resource Management</h4>
                <p className="text-gray-600">Upload and share study materials with students</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">📢 Announcements</h4>
                <p className="text-gray-600">Role-based communication system</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">📊 Analytics</h4>
                <p className="text-gray-600">Track attendance percentages and performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}