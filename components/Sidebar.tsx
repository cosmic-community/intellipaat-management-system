import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, UserCheck, FileText, Bell, BookOpen, Calendar } from 'lucide-react'

interface SidebarProps {
  role: 'admin' | 'teacher' | 'student';
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/admin/students', icon: Users, label: 'Students' },
          { href: '/admin/teachers', icon: UserCheck, label: 'Teachers' },
          { href: '/admin/attendance', icon: Calendar, label: 'Attendance' },
          { href: '/admin/resources', icon: BookOpen, label: 'Resources' },
          { href: '/admin/announcements', icon: Bell, label: 'Announcements' },
        ];
      case 'teacher':
        return [
          { href: '/teacher/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/teacher/attendance', icon: Calendar, label: 'Mark Attendance' },
          { href: '/teacher/resources', icon: BookOpen, label: 'Resources' },
          { href: '/teacher/announcements', icon: Bell, label: 'Announcements' },
        ];
      case 'student':
        return [
          { href: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/student/attendance', icon: Calendar, label: 'My Attendance' },
          { href: '/student/resources', icon: BookOpen, label: 'Resources' },
          { href: '/student/announcements', icon: Bell, label: 'Announcements' },
        ];
    }
  };

  const navItems = getNavItems();
  
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-800 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  )
}