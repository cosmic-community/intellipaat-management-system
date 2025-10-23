import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Student operations
export async function getStudents() {
  try {
    const response = await cosmic.objects
      .find({ type: 'students' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch students');
  }
}

export async function getStudentById(id: string) {
  try {
    const response = await cosmic.objects
      .findOne({ id })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Teacher operations
export async function getTeachers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'teachers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch teachers');
  }
}

// Attendance operations
export async function getAttendanceRecords(filters?: {
  studentId?: string;
  teacherId?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
}) {
  try {
    const query: Record<string, any> = { type: 'attendance-records' };
    
    if (filters?.studentId) {
      query['metadata.student'] = filters.studentId;
    }
    if (filters?.teacherId) {
      query['metadata.teacher'] = filters.teacherId;
    }
    if (filters?.date) {
      query['metadata.date'] = filters.date;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch attendance records');
  }
}

export async function markAttendance(data: {
  studentId?: string;
  teacherId?: string;
  date: string;
  status: 'present' | 'absent';
  markedById: string;
  notes?: string;
}) {
  try {
    const title = data.studentId 
      ? `Attendance - Student - ${data.date}`
      : `Attendance - Teacher - ${data.date}`;
    
    const metadata: Record<string, any> = {
      date: data.date,
      status: data.status,
      marked_by: data.markedById,
    };
    
    if (data.studentId) {
      metadata.student = data.studentId;
    }
    if (data.teacherId) {
      metadata.teacher = data.teacherId;
    }
    if (data.notes) {
      metadata.notes = data.notes;
    }
    
    const response = await cosmic.objects.insertOne({
      title,
      type: 'attendance-records',
      metadata,
    });
    
    return response.object;
  } catch (error) {
    throw new Error('Failed to mark attendance');
  }
}

// Resource operations
export async function getResources(role?: string) {
  try {
    const query: Record<string, any> = { type: 'resources' };
    
    if (role && role !== 'admin') {
      query['metadata.target_role'] = role;
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch resources');
  }
}

// Announcement operations
export async function getAnnouncements(role?: string) {
  try {
    const response = await cosmic.objects
      .find({ type: 'announcements' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    let announcements = response.objects;
    
    // Filter announcements based on role
    if (role && role !== 'admin') {
      announcements = announcements.filter((announcement: any) => {
        const targetRole = announcement.metadata?.target_role;
        return targetRole === 'all' || targetRole === role;
      });
    }
    
    return announcements;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch announcements');
  }
}