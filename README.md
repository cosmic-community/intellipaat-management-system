# 🎓 Intellipaat School of Technology - School Management System

![School Management System](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=300&fit=crop&auto=format)

A comprehensive school management system built with Next.js 15 and Cosmic CMS, featuring role-based access for administrators, teachers, and students with attendance tracking, resource management, and announcements.

## ✨ Features

- **🔐 Role-Based Authentication**: Three user roles (Admin, Teacher, Student) with appropriate access levels
- **👥 Student Management**: Add, edit, view, and manage student records
- **👨‍🏫 Teacher Management**: Complete teacher profile management with subject assignments
- **📅 Calendar Dashboard**: Visual attendance tracking with color-coded indicators
- **📊 Attendance System**: Mark daily attendance with monthly tracking and analytics
- **📚 Resource Management**: Upload and share study materials, notes, and resources
- **📢 Announcements**: Create and view announcements for specific roles or all users
- **📈 Analytics**: View attendance percentages and system statistics
- **🔍 Search & Filter**: Quick access to records with advanced filtering options
- **📱 Responsive Design**: Optimized for all devices

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68fa35d092c9229c30fe0f4c&clone_repository=68fa381092c9229c30fe0f5f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from a comprehensive school management structure designed specifically for this use case

### Code Generation Prompt

> so i want to build a app for our college intellipaat school of technology the main motive of the app is for school management system means we have enter as a admin,teacher,student admin has the full access to add the students and teachers with having their attendence and having the annoucements, resources and for teachers they have the access for students attendence and providing resources like study materials and all and students have the access for seeing their attendence for months and have the access for seeing the materails and announcements provided by the admin and teachers and in the teacher and student there should be a calendar in the dashboard it show when the student/teacher will present in the class then it will green marked and if absent it shows red marks

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Package Manager**: Bun
- **Authentication**: Role-based access control
- **Date Handling**: date-fns
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Git

## 🚀 Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Students

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: students } = await cosmic.objects
  .find({
    type: 'students'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Creating Attendance Record

```typescript
await cosmic.objects.insertOne({
  title: `Attendance - ${studentName} - ${date}`,
  type: 'attendance-records',
  metadata: {
    student: studentId,
    date: '2024-01-15',
    status: 'present',
    marked_by: teacherId
  }
})
```

### Fetching Announcements by Role

```typescript
const { objects: announcements } = await cosmic.objects
  .find({
    type: 'announcements',
    'metadata.target_role': 'student'
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

### Object Types

1. **Users** - Authentication and role management
   - Role (select-dropdown): admin, teacher, student
   - Email, Password Hash
   - Profile Information

2. **Students** - Student records
   - Student ID, Name, Email
   - Enrollment Date, Class, Section
   - Parent Contact Information

3. **Teachers** - Teacher profiles
   - Employee ID, Name, Email
   - Subjects, Qualifications
   - Contact Information

4. **Attendance Records** - Daily attendance tracking
   - Student (object relationship)
   - Date, Status (select-dropdown): present, absent
   - Marked By (object relationship to teacher)

5. **Resources** - Study materials
   - Title, Description, Category
   - File Upload (file metafield)
   - Uploaded By (object relationship)
   - Target Role (select-dropdown)

6. **Announcements** - School communications
   - Title, Content
   - Target Role (select-dropdown): all, admin, teacher, student
   - Posted Date, Posted By (object relationship)

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Add environment variables in Netlify dashboard
4. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
5. Deploy

## 📖 Usage Guide

### Admin Access
- Full system control
- Add/edit/delete students and teachers
- Mark attendance for all students
- Create announcements for all roles
- Upload resources for all users
- View system-wide analytics

### Teacher Access
- View assigned students
- Mark student attendance
- Upload study materials and resources
- Create announcements for students
- View personal attendance calendar
- Access all uploaded resources

### Student Access
- View personal attendance history
- Check monthly attendance calendar
- Access study materials and resources
- Read announcements
- View personal profile

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Implement proper authentication before production deployment
- Validate user roles on both client and server side
- Use Cosmic's write key only in server-side operations

## 📝 License

MIT License - feel free to use this project for your educational institution.

<!-- README_END -->