'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Student Portal" role="student" />
      <div className="flex">
        <Sidebar role="student" />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}