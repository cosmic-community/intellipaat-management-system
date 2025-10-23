'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Teacher Portal" role="teacher" />
      <div className="flex">
        <Sidebar role="teacher" />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}