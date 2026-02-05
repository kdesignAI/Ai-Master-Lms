
export interface Lesson {
  id: string;
  title: string;
  videoId: string;
}

export interface Module {
  id: string;
  name: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  thumbnail: string;
  modules: Module[];
  overview?: string;
  announcements?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourseId: string;
  progress: number;
  lastLogin: string;
  status: 'active' | 'pending' | 'banned';
}

export interface ActivityLog {
  id: string;
  message: string;
  timestamp: string;
  type: 'info' | 'security' | 'alert';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  stars: number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface HomeCMS {
  logo: string;
  heroTitle: string;
  heroSubtitle: string;
  stats: {
    value: string;
    label: string;
    color: string;
    iconColor: string;
  }[];
  testimonials: Testimonial[];
  socialLinks: {
    facebook: string;
    youtube: string;
  };
}

export type ViewType = 'home' | 'all-courses' | 'my-dashboard' | 'course-player' | 'admin-dashboard' | 'add-course' | 'edit-course' | 'super-admin' | 'blog-archive' | 'blog-detail' | 'add-blog' | 'edit-blog';
