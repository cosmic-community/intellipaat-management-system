export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    email: string;
    password_hash?: string;
    role: UserRole;
    full_name: string;
    phone?: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export type UserRole = 'admin' | 'teacher' | 'student';

export interface Student extends CosmicObject {
  type: 'students';
  metadata: {
    student_id: string;
    email: string;
    class: string;
    section: string;
    enrollment_date: string;
    date_of_birth?: string;
    parent_name?: string;
    parent_phone?: string;
    parent_email?: string;
    address?: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Teacher extends CosmicObject {
  type: 'teachers';
  metadata: {
    employee_id: string;
    email: string;
    subjects: string[];
    qualifications?: string;
    phone?: string;
    date_of_joining?: string;
    profile_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface AttendanceRecord extends CosmicObject {
  type: 'attendance-records';
  metadata: {
    student?: Student;
    teacher?: Teacher;
    date: string;
    status: AttendanceStatus;
    marked_by?: User;
    notes?: string;
  };
}

export type AttendanceStatus = 'present' | 'absent';

export interface Resource extends CosmicObject {
  type: 'resources';
  metadata: {
    description?: string;
    category: ResourceCategory;
    file?: {
      url: string;
      imgix_url: string;
    };
    uploaded_by?: User;
    upload_date: string;
    target_role: TargetRole;
    subject?: string;
  };
}

export type ResourceCategory = 'notes' | 'assignment' | 'study-material' | 'syllabus' | 'other';
export type TargetRole = 'all' | 'teacher' | 'student';

export interface Announcement extends CosmicObject {
  type: 'announcements';
  metadata: {
    content: string;
    target_role: TargetRole;
    posted_by?: User;
    posted_date: string;
    priority?: AnnouncementPriority;
  };
}

export type AnnouncementPriority = 'normal' | 'high' | 'urgent';

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalResources: number;
  totalAnnouncements: number;
  todayAttendance: {
    present: number;
    absent: number;
    percentage: number;
  };
}

export interface CalendarDay {
  date: Date;
  status?: AttendanceStatus;
  isToday: boolean;
  isCurrentMonth: boolean;
}