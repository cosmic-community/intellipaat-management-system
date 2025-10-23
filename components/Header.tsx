import Link from 'next/link'
import { GraduationCap, LogOut } from 'lucide-react'

interface HeaderProps {
  title: string;
  role: 'admin' | 'teacher' | 'student';
}

export default function Header({ title, role }: HeaderProps) {
  const roleColors = {
    admin: 'bg-blue-800',
    teacher: 'bg-green-800',
    student: 'bg-purple-800',
  };

  return (
    <header className={`${roleColors[role]} text-white shadow-lg`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <GraduationCap className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Intellipaat School of Technology</h1>
              <p className="text-sm opacity-90">{title}</p>
            </div>
          </Link>
          
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </header>
  )
}