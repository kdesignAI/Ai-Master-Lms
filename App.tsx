
import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  Settings, 
  LogOut, 
  Play, 
  Pause,
  ChevronRight, 
  ChevronDown,
  Monitor, 
  CheckCircle,
  Menu,
  X,
  Plus,
  Trash2,
  DollarSign,
  Award,
  ShieldAlert,
  UserPlus,
  Search,
  RefreshCcw,
  Ban,
  Activity,
  Lock,
  EyeOff,
  MessageSquare,
  Send,
  Volume2,
  VolumeX,
  Maximize,
  Wifi,
  WifiOff,
  CreditCard,
  UserCheck,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Expand,
  Shrink,
  Youtube,
  Zap,
  Globe,
  Rocket,
  ShieldCheck,
  FileText,
  Clock,
  HelpCircle,
  Trophy,
  Share2,
  Edit3,
  Save,
  Image as ImageIcon,
  Upload,
  Calendar,
  User,
  ArrowLeft
} from 'lucide-react';
import { Course, ViewType, Lesson, Module, Student, ActivityLog, HomeCMS, Testimonial, BlogPost } from './types';
import { INITIAL_COURSES } from './constants';

const INITIAL_STUDENTS: Student[] = [
  { id: 's1', name: 'জহির khan', email: 'zahir@example.com', avatar: 'https://i.pravatar.cc/150?u=s1', enrolledCourseId: 'c1', progress: 45, lastLogin: '২ ঘণ্টা আগে', status: 'active' },
  { id: 's2', name: 'নাবিলা করিম', email: 'nabila@example.com', avatar: 'https://i.pravatar.cc/150?u=s2', enrolledCourseId: 'c2', progress: 12, lastLogin: '১ দিন আগে', status: 'pending' },
];

const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "মাস্টার প্রম্পট ইঞ্জিনিয়ারিং: ৫টি প্রো টিপস",
    excerpt: "কিভাবে সঠিক প্রম্পট লিখে এআই থেকে সেরা আউটপুট বের করবেন তা জানুন এই ব্লগে।",
    content: "প্রম্পট ইঞ্জিনিয়ারিং বর্তমান সময়ের অন্যতম গুরুত্বপূর্ণ একটি স্কিল। সঠিক প্রম্পট লেখার মাধ্যমে আপনি চ্যাটজিপিটি বা মিডজার্নির মতো টুলগুলো থেকে অসাধারণ ফলাফল পেতে পারেন। ১. কন্টেক্সট প্রদান করুন: মডেলকে আপনি কে এবং আপনার উদ্দেশ্য কী তা পরিষ্কার করে বলুন। ২. সুনির্দিষ্ট হন: অস্পষ্ট নির্দেশের বদলে সুনির্দিষ্ট ইনপুট দিন। ৩. উদাহরণ ব্যবহার করুন: কী ধরণের আউটপুট চান তার উদাহরণ দিন। ৪. স্টেপ বাই স্টেপ নির্দেশ দিন: জটিল কাজের জন্য ধাপগুলো ভাগ করে দিন। ৫. ইটারেট করুন: প্রথমবারেই সেরা ফলাফল না পেলে প্রম্পটটি রিফাইন করুন।",
    category: "Tutorial",
    author: "অ্যালেক্স রিভেরা",
    date: "২৫ অক্টোবর, ২০২৩",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "এআই এবং গ্রাফিক ডিজাইনের ভবিষ্যৎ",
    excerpt: "ডিজাইন জগত দ্রুত বদলে যাচ্ছে। এআই কি ডিজাইনারদের জায়গা দখল করবে না কি সহায়ক হবে?",
    content: "গ্রাফিক ডিজাইনের ক্ষেত্রে জেনারেটর এআই একটি বিপ্লব নিয়ে এসেছে। অনেকেই ভয় পাচ্ছেন যে এআই হয়তো মানুষের জায়গা দখল করবে। কিন্তু বাস্তবতা হলো, এআই একজন ডিজাইনারের ক্রিয়েটিভিটিকে আরও বাড়িয়ে দেয়। এটি আপনার সহকারী হিসেবে কাজ করবে, প্রতিদ্বন্দ্বী হিসেবে নয়। লেআউট ডিজাইন থেকে শুরু করে কালার প্যালেট নির্বাচন—সবখানেই এআই আপনাকে সময় বাঁচাতে সাহায্য করবে।",
    category: "AI News",
    author: "সারাহ জেনকিন্স",
    date: "২০ অক্টোবর, ২০২৩",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "চ্যাটজিপিটি দিয়ে কিভাবে আয় করবেন?",
    excerpt: "ফ্রিল্যান্সিং এবং অনলাইন ব্যবসায় চ্যাটজিপিটি ব্যবহারের কার্যকর কৌশলগুলো শিখুন।",
    content: "চ্যাটজিপিটি শুধুমাত্র একটি চ্যাটবট নয়, এটি ইনকাম করার একটি শক্তিশালী মাধ্যম। আপনি কনটেন্ট রাইটিং, স্ক্রিপ্ট রাইটিং, ইমেইল মার্কেটিং এমনকি কোডিংয়ের কাজেও এটি ব্যবহার করে ফ্রিল্যান্সিং করতে পারেন। নিজের সার্ভিসগুলোকে অপ্টিমাইজ করতে এবং ক্লায়েন্টের কাজ দ্রুত ডেলিভারি দিতে এআই-এর সাহায্য নিন।",
    category: "Career",
    author: "তানভীর হাসান",
    date: "১৫ অক্টোবর, ২০২৩",
    imageUrl: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?auto=format&fit=crop&q=80&w=800"
  }
];

const INITIAL_CMS_CONTENT: HomeCMS = {
  logo: "ai-master-logo.png",
  heroTitle: "ভবিষ্যৎ গড়ুন জেনারেটিভ এআই দিয়ে",
  heroSubtitle: "প্রম্পট ইঞ্জিনিয়ারিং থেকে ভিজ্যুয়াল ডিজাইন - আধুনিক বিশ্বের সেরা স্কিলগুলো শিখুন এবং নিজেকে অন্যদের চেয়ে এক ধাপ এগিয়ে রাখুন।",
  stats: [
    { value: "১০কে+", label: "সন্তুষ্ট ছাত্র", color: "from-purple-500/20 to-purple-900/40", iconColor: "text-purple-400" },
    { value: "৫০+", label: "মাস্টার মডিউল", color: "from-green-500/20 to-green-900/40", iconColor: "text-green-400" },
    { value: "৪.৯/৫", label: "রেটিং", color: "from-blue-500/20 to-blue-900/40", iconColor: "text-blue-400" },
    { value: "২৪/৭", label: "সাপোর্ট", color: "from-amber-500/20 to-amber-900/40", iconColor: "text-amber-400" }
  ],
  testimonials: [
    { id: 1, name: "তানভীর হাসান", role: "ইউএক্স ডিজাইনার", avatar: "https://i.pravatar.cc/150?u=1", quote: "জেনারেটিভ এআই কোর্সটি আমার কাজের ধরণ পুরোপুরি বদলে দিয়েছে। অ্যালেক্স সত্যিই একজন মাস্টার!", stars: 5 },
    { id: 2, name: "সাদিয়া ইসলাম", role: "সফটওয়্যার ইঞ্জিনিয়ার", avatar: "https://i.pravatar.cc/150?u=2", quote: "এত উন্নত ভিডিও প্লেয়ার এবং কন্টেন্ট কোয়ালিটি এর আগে কোথাও দেখিনি। এটি সত্যিই প্রিমিয়াম!", stars: 5 },
    { id: 3, name: "ইমরান খান", role: "ভিজ্যুয়াল আর্টিস্ট", avatar: "https://i.pravatar.cc/150?u=3", quote: "প্রম্পট ইঞ্জিনিয়ারিংয়ের রহস্যগুলো জানলে আপনি অবাক হয়ে যাবেন। চমৎকার একটি কোর্স!", stars: 5 },
    { id: 4, name: "রাকিবুল ইসলাম", role: "ফুল স্ট্যাক ডেভেলপার", avatar: "https://i.pravatar.cc/150?u=4", quote: "অ্যাডভান্সড এআই টুলস ব্যবহারের সঠিক গাইডলাইন এখানে পেয়েছি। ক্যারিয়ারে অনেক সাহায্য করছে।", stars: 5 },
    { id: 5, name: "ফারহানা আহমেদ", role: "ডিজিটাল মার্কেটার", avatar: "https://i.pravatar.cc/150?u=5", quote: "এআই কনটেন্ট ক্রিয়েশন কোর্সটি জাস্ট ওয়াও! আমি এখন খুব দ্রুত ক্লায়েন্টের কাজ করতে পারি।", stars: 5 },
    { id: 6, name: "জুনায়েদ আহমেদ", role: "গ্রাফিক ডিজাইনার", avatar: "https://i.pravatar.cc/150?u=6", quote: "মিডজার্নি আর স্টেবল ডিফিউশনের এত গভীর আলোচনা আর কোথাও দেখিনি। হাইলি রিকমেন্ডেড!", stars: 5 },
    { id: 7, name: "আনিকা তাবাসসুম", role: "ছাত্রী", avatar: "https://i.pravatar.cc/150?u=7", quote: "শেখার পরিবেশ এবং ইন্সট্রাক্টরের আন্তরিকতা সত্যিই মুগ্ধ করার মতো। ধন্যবাদ এআই মাস্টার।", stars: 5 },
    { id: 8, name: "মেহেদী হাসান", role: "ফ্রিল্যান্সার", avatar: "https://i.pravatar.cc/150?u=8", quote: "মার্কেটপ্লেসে এগিয়ে থাকতে এই স্কিলগুলো এখন অপরিহার্য। খুব সুন্দর ভাবে সব বোঝানো হয়েছে।", stars: 5 },
  ],
  socialLinks: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com"
  }
};

const PASSWORDS = {
  ADMIN: 'admin123',
  SUPER_ADMIN: 'super123',
  COURSE: 'course123'
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('ai_master_blogs');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(['c1']); 
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('ai_master_completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  const [cmsContent, setCmsContent] = useState<HomeCMS>(() => {
    const saved = localStorage.getItem('ai_master_cms');
    return saved ? JSON.parse(saved) : INITIAL_CMS_CONTENT;
  });
  
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [authStatus, setAuthStatus] = useState({
    admin: false,
    superAdmin: false,
    course: false
  });

  useEffect(() => {
    localStorage.setItem('ai_master_cms', JSON.stringify(cmsContent));
  }, [cmsContent]);

  useEffect(() => {
    localStorage.setItem('ai_master_blogs', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('ai_master_completed_lessons', JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const selectedBlog = blogPosts.find(b => b.id === selectedBlogId);

  const navigateTo = (view: ViewType, id?: string | number) => {
    setCurrentView(view);
    if (view === 'course-player' && typeof id === 'string') {
      setSelectedCourseId(id);
      const course = courses.find(c => c.id === id);
      if (course && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
        setActiveLesson(course.modules[0].lessons[0]);
      }
    }
    if (view === 'blog-detail' && typeof id === 'number') {
      setSelectedBlogId(id);
    }
    if (view === 'edit-course' && typeof id === 'string') {
      setEditingCourseId(id);
    } else if (view !== 'edit-course') {
      setEditingCourseId(null);
    }
    if (view === 'edit-blog' && typeof id === 'number') {
      setEditingBlogId(id);
    } else if (view !== 'edit-blog') {
      setEditingBlogId(null);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enrollCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds([...enrolledCourseIds, courseId]);
      alert("অভিনন্দন! আপনি কোর্সটিতে এনরোল হয়েছেন।");
      navigateTo('my-dashboard');
    } else {
      alert("আপনি ইতিমধ্যেই এই কোর্সে এনরোল আছেন।");
    }
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessonIds(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId]
    );
  };

  const renderProtectedView = (view: ViewType, type: 'admin' | 'superAdmin' | 'course', component: React.ReactNode) => {
    if (authStatus[type]) return component;
    return (
      <PasswordGate 
        type={type} 
        onSuccess={() => setAuthStatus({ ...authStatus, [type]: true })} 
        onCancel={() => navigateTo('home')}
      />
    );
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 flex flex-col antialiased">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
          <img src={cmsContent.logo} alt="Logo" className="h-[32px] md:h-[42px] w-auto object-contain transition-transform group-hover:scale-110" />
          <span className="text-lg md:text-xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent uppercase">এআই মাস্টার</span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <button onClick={() => navigateTo('home')} className={`hover:text-white transition-all ${currentView === 'home' ? 'text-white' : ''}`}>হোম</button>
          <button onClick={() => navigateTo('all-courses')} className={`hover:text-white transition-all ${currentView === 'all-courses' ? 'text-white' : ''}`}>কোর্সসমূহ</button>
          <button onClick={() => navigateTo('blog-archive')} className={`hover:text-white transition-all ${currentView === 'blog-archive' ? 'text-white' : ''}`}>ব্লগ</button>
          <button onClick={() => navigateTo('my-dashboard')} className={`hover:text-white transition-all ${currentView === 'my-dashboard' ? 'text-white' : ''}`}>আমার ড্যাশবোর্ড</button>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigateTo('admin-dashboard')} className="px-5 py-2 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all font-black text-gray-300">অ্যাডমিন</button>
            <button onClick={() => navigateTo('super-admin')} className="px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 transition-all font-black text-purple-400">সুপার অ্যাডমিন</button>
          </div>
        </nav>

        <button className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-28 px-8 flex flex-col gap-8 text-2xl font-black animate-in slide-in-from-top duration-500">
          <button onClick={() => navigateTo('home')} className="text-left text-white border-b border-white/5 pb-4">হোম</button>
          <button onClick={() => navigateTo('all-courses')} className="text-left text-white border-b border-white/5 pb-4">কোর্স লাইব্রেরি</button>
          <button onClick={() => navigateTo('blog-archive')} className="text-left text-white border-b border-white/5 pb-4">ব্লগ</button>
          <button onClick={() => navigateTo('my-dashboard')} className="text-left text-white border-b border-white/5 pb-4">আমার স্পেস</button>
          <div className="flex gap-4 mt-8">
            <button onClick={() => navigateTo('admin-dashboard')} className="flex-1 py-4 rounded-2xl bg-white/5 text-gray-400 text-sm font-bold">অ্যাডমিন</button>
            <button onClick={() => navigateTo('super-admin')} className="flex-1 py-4 rounded-2xl bg-purple-500/10 text-purple-400 text-sm font-bold">সিস্টেম</button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {currentView === 'home' && <HomeView cmsContent={cmsContent} courses={courses} blogPosts={blogPosts} onExplore={() => navigateTo('all-courses')} onEnroll={enrollCourse} navigateTo={navigateTo} />}
        {currentView === 'all-courses' && <AllCoursesView courses={courses} onEnroll={enrollCourse} onLearn={(id) => navigateTo('course-player', id)} enrolledIds={enrolledCourseIds} />}
        {currentView === 'blog-archive' && <BlogArchiveView blogPosts={blogPosts} onPostClick={(id) => navigateTo('blog-detail', id)} />}
        {currentView === 'blog-detail' && selectedBlog && <BlogDetailView post={selectedBlog} onBack={() => navigateTo('blog-archive')} />}
        {currentView === 'my-dashboard' && <MyDashboardView courses={courses} enrolledIds={enrolledCourseIds} onLearn={(id) => navigateTo('course-player', id)} completedLessonIds={completedLessonIds} navigateTo={navigateTo} />}
        
        {currentView === 'course-player' && selectedCourse && renderProtectedView('course-player', 'course', (
          <CoursePlayerView 
            course={selectedCourse} 
            activeLesson={activeLesson} 
            setActiveLesson={setActiveLesson} 
            completedLessonIds={completedLessonIds}
            onToggleCompletion={toggleLessonCompletion}
            isOnline={isOnline}
          />
        ))}
        {currentView === 'admin-dashboard' && renderProtectedView('admin-dashboard', 'admin', (
          <AdminDashboardView 
            courses={courses} 
            blogPosts={blogPosts} 
            cmsContent={cmsContent} 
            setCmsContent={setCmsContent} 
            onAddCourseClick={() => navigateTo('add-course')} 
            onEditCourseClick={(id) => navigateTo('edit-course', id)}
            onAddBlogClick={() => navigateTo('add-blog')} 
            onEditBlogClick={(id) => navigateTo('edit-blog', id)}
          />
        ))}
        {(currentView === 'add-course' || currentView === 'edit-course') && renderProtectedView('add-course', 'admin', (
          <AddCourseView 
            initialCourse={courses.find(c => c.id === editingCourseId)}
            onPublish={(c) => { 
              if (editingCourseId) {
                setCourses(courses.map(course => course.id === editingCourseId ? { ...c, id: editingCourseId } : course));
                alert("কোর্স আপডেট করা হয়েছে!");
              } else {
                setCourses([c, ...courses]);
                alert("নতুন কোর্স পাবলিশ করা হয়েছে!");
              }
              setEditingCourseId(null);
              navigateTo('admin-dashboard'); 
            }} 
            onCancel={() => { setEditingCourseId(null); navigateTo('admin-dashboard'); }} 
          />
        ))}
        {(currentView === 'add-blog' || currentView === 'edit-blog') && renderProtectedView('add-blog', 'admin', (
          <AddBlogView 
            initialPost={blogPosts.find(b => b.id === editingBlogId)}
            onPublish={(b) => { 
              if (editingBlogId) {
                setBlogPosts(blogPosts.map(post => post.id === editingBlogId ? { ...b, id: editingBlogId } : post));
                alert("ব্লগ আপডেট করা হয়েছে!");
              } else {
                setBlogPosts([b, ...blogPosts]);
                alert("নতুন ব্লগ পাবলিশ করা হয়েছে!");
              }
              setEditingBlogId(null);
              navigateTo('admin-dashboard'); 
            }} 
            onCancel={() => { setEditingBlogId(null); navigateTo('admin-dashboard'); }} 
          />
        ))}
        {currentView === 'super-admin' && renderProtectedView('super-admin', 'superAdmin', (
          <SuperAdminDashboardView students={students} courses={courses} onStatusChange={(id, s) => setStudents(students.map(st => st.id === id ? {...st, status: s} : st))} onManualEnroll={(d) => setStudents([...students, { ...d, id: `s-${Date.now()}`, avatar: 'https://i.pravatar.cc/150', progress: 0, lastLogin: 'এখনই', status: 'active', enrolledCourseId: d.courseId }])} />
        ))}
      </main>

      <Footer navigateTo={navigateTo} cmsContent={cmsContent} />
    </div>
  );
};

const PasswordGate: React.FC<{ type: 'admin' | 'superAdmin' | 'course', onSuccess: () => void, onCancel: () => void }> = ({ type, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = type === 'admin' ? PASSWORDS.ADMIN : type === 'superAdmin' ? PASSWORDS.SUPER_ADMIN : PASSWORDS.COURSE;
    if (password === target) onSuccess();
    else { setError(true); setPassword(''); setTimeout(() => setError(false), 2000); }
  };
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-20"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/30 blur-[120px] rounded-full animate-pulse"></div></div>
      <div className="relative z-10 w-full max-w-md animate-in zoom-in duration-300">
        <div className="bg-[#0c0c0c] border border-white/10 rounded-[40px] p-10 md:p-12 shadow-2xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-accent"></div>
          <div className="mx-auto w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10"><Lock className={error ? "text-red-500 animate-bounce" : "text-purple-400"} size={32} /></div>
          <div className="space-y-3"><h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">{type === 'admin' ? 'অ্যাডমিন এক্সেস' : type === 'superAdmin' ? 'সুপার অ্যাডমিন' : 'কোর্স এক্সেস'}</h2><p className="text-gray-500 text-sm font-medium">সঠিক পাসওয়ার্ডটি প্রদান করুন।</p></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input autoFocus type="password" placeholder="পাসওয়ার্ড..." value={password} onChange={e => setPassword(e.target.value)} className={`w-full bg-black border rounded-2xl px-8 py-5 text-white font-black text-center outline-none transition-all ${error ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/10 focus:border-purple-500 focus:ring-1 ring-purple-500/50'}`} />
            <button type="submit" className="w-full py-5 rounded-[24px] bg-gradient-accent text-white font-black text-lg hover:scale-[1.02] transition-all">ভেরিফাই</button>
            <button type="button" onClick={onCancel} className="w-full py-2 text-gray-500 text-xs font-black uppercase tracking-widest">বাতিল</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const HomeView: React.FC<{ cmsContent: HomeCMS, courses: Course[], blogPosts: BlogPost[], onExplore: () => void, onEnroll: (id: string) => void, navigateTo: (v: ViewType, id?: string | number) => void }> = ({ cmsContent, courses, blogPosts, onExplore, onEnroll, navigateTo }) => {
  const words = cmsContent.heroTitle.split(' ');
  const line1 = words.slice(0, 2).join(' ');
  const line2 = words.slice(2).join(' ');

  // Split testimonials for marquee
  const half = Math.ceil(cmsContent.testimonials.length / 2);
  const row1 = cmsContent.testimonials.slice(0, half);
  const row2 = cmsContent.testimonials.slice(half);

  return (
    <div className="animate-in fade-in duration-1000">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/5 px-6">
        <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 scale-110 blur-[2px] animate-pulse-slow" /><div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div></div>
        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"><Zap className="text-purple-400" size={14} /><span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-300">বাংলাদেশের সেরা এআই লার্নিং প্ল্যাটফর্ম</span></div>
          <h1 className="text-3xl md:text-6xl font-black mb-10 leading-[1.4] tracking-tight text-white px-2 drop-shadow-2xl">
            {line1}
            <br className="hidden md:block" />
            <span className="text-gradient-accent"> {line2}</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed font-medium">{cmsContent.heroSubtitle}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button onClick={onExplore} className="w-full md:w-auto px-10 py-4 rounded-2xl bg-gradient-accent font-black text-base hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3">কোর্সগুলো দেখুন <ChevronRight size={18} /></button>
            <button onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })} className="w-full md:w-auto px-10 py-4 rounded-2xl bg-white/5 border border-white/10 font-black text-base hover:bg-white/10 transition-all">কিভাবে শিখবেন?</button>
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-[#050505] border-b border-white/5 px-6">
        <div className="max-w-7xl mx-auto"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{cmsContent.stats.map((s, i) => <HomeStatCard key={i} {...s} />)}</div></div>
      </section>

      <section className="px-6 md:px-12 py-24 bg-[#050505] border-b border-white/5">
        <div className="max-w-7xl mx-auto"><h2 className="text-3xl font-black mb-12 text-gradient-accent uppercase text-center md:text-left">জনপ্রিয় কোর্সসমূহ</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{courses.slice(0, 3).map(course => <CourseCard key={course.id} course={course} onEnroll={() => onEnroll(course.id)} />)}</div></div>
      </section>

      {/* Blog Section for Home Page */}
      <section className="px-6 md:px-12 py-24 bg-[#080808] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase text-white">সর্বশেষ <span className="text-gradient-accent">পরামর্শ ও টিউটোরিয়াল</span></h2>
            <p className="text-gray-500 font-medium">এআই এবং ডিজাইনের জগতে এগিয়ে থাকতে আমাদের ব্লগে চোখ রাখুন।</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map(post => <BlogCard key={post.id} post={post} onClick={() => navigateTo('blog-detail', post.id)} />)}
          </div>
          <div className="mt-16 text-center">
            <button onClick={() => navigateTo('blog-archive')} className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 font-black text-base hover:bg-white/10 transition-all">সবগুলো আর্টিকেল দেখুন</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Motion */}
      <section className="py-32 bg-black overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 uppercase text-white">ছাত্রদের <span className="text-gradient-accent">মতামত</span></h2>
          <p className="text-gray-500 font-medium">হাজারো শিক্ষার্থী আমাদের কোর্সের মাধ্যমে তাদের ক্যারিয়ার বদলে ফেলেছেন।</p>
        </div>
        
        <div className="space-y-12">
          {/* First Row Marquee - Centered by CSS and clones */}
          <div className="flex overflow-hidden relative justify-center">
            <div className="marquee-wrapper animate-marquee gap-8">
              {[...row1, ...row1, ...row1, ...row1, ...row1].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0">
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row Marquee Reverse - Centered by CSS and clones */}
          <div className="flex overflow-hidden relative justify-center">
            <div className="marquee-wrapper animate-marquee-reverse gap-8">
              {[...row2, ...row2, ...row2, ...row2, ...row2].map((t, i) => (
                <div key={i} className="w-[350px] shrink-0">
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient Fades for Marquee */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
      </section>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost, onClick: () => void }> = ({ post, onClick }) => (
  <article onClick={onClick} className="group bg-[#0c0c0c] border border-white/10 rounded-[40px] overflow-hidden hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full shadow-2xl relative cursor-pointer">
    <div className="relative aspect-[16/10] overflow-hidden">
      <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={post.title} />
      <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-gradient-accent text-white text-[9px] font-black uppercase tracking-widest shadow-xl">
        {post.category}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
    </div>
    <div className="p-10 flex flex-col flex-1">
      <h3 className="text-xl font-black mb-4 group-hover:text-gradient-accent transition-colors line-clamp-2 leading-[1.4] text-white tracking-tight cursor-pointer">
        {post.title}
      </h3>
      <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
        {post.excerpt}
      </p>
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <User size={12} className="text-purple-500" /> {post.author}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-green-500" /> {post.date}
        </div>
      </div>
    </div>
  </article>
);

const BlogArchiveView: React.FC<{ blogPosts: BlogPost[], onPostClick: (id: number) => void }> = ({ blogPosts, onPostClick }) => (
  <div className="px-6 md:px-12 py-24 max-w-7xl mx-auto animate-in fade-in duration-700">
    <div className="mb-20 text-center md:text-left">
      <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-[1.4] text-gradient-accent uppercase">আমাদের ব্লগ</h1>
      <p className="text-gray-500 text-base md:text-lg max-w-xl font-medium">এআই মাস্টারদের থেকে শিখুন সেরা টিপস এবং সর্বশেষ প্রযুক্তির খবর।</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {blogPosts.map(post => <BlogCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />)}
    </div>
  </div>
);

const BlogDetailView: React.FC<{ post: BlogPost, onBack: () => void }> = ({ post, onBack }) => (
  <div className="animate-in fade-in slide-in-from-bottom duration-700 pb-24">
    <div className="relative h-[400px] md:h-[600px] overflow-hidden">
       <img src={post.imageUrl} className="w-full h-full object-cover" alt={post.title} />
       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
       <div className="absolute bottom-12 left-0 w-full px-6 md:px-24">
         <div className="max-w-4xl mx-auto space-y-6">
           <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase text-purple-400 tracking-widest hover:text-white transition-colors">
             <ArrowLeft size={16} /> ফিরে যান
           </button>
           <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-accent text-white text-[10px] font-black uppercase tracking-widest">
             {post.category}
           </span>
           <h1 className="text-3xl md:text-6xl font-black text-white leading-[1.2]">{post.title}</h1>
           <div className="flex items-center gap-8 text-[11px] font-black text-gray-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><User size={14} className="text-purple-400"/> {post.author}</span>
             <span className="flex items-center gap-2"><Calendar size={14} className="text-green-400"/> {post.date}</span>
           </div>
         </div>
       </div>
    </div>
    <div className="max-w-4xl mx-auto px-6 py-20">
       <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-medium leading-[1.8] space-y-10">
          <p className="text-xl text-white font-bold italic border-l-4 border-purple-500 pl-8 mb-16">{post.excerpt}</p>
          <div className="whitespace-pre-wrap">{post.content}</div>
       </div>
    </div>
  </div>
);

const HomeStatCard: React.FC<{ value: string, label: string, color: string, iconColor: string }> = ({ value, label, color, iconColor }) => (
  <div className="motion-border-container rounded-[42px] group transition-all duration-500 hover:-translate-y-3">
    <div className="motion-border-gradient animate-spin-slower"></div>
    <div className={`relative z-10 bg-gradient-to-br ${color} p-10 rounded-[40px] shadow-2xl text-center backdrop-blur-md`}>
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500 rounded-[40px]"></div>
      <div className="relative z-20">
        <p className={`text-4xl md:text-5xl font-black mb-3 ${iconColor} drop-shadow-xl group-hover:scale-110 transition-transform duration-500`}>{value}</p>
        <div className="h-0.5 w-12 bg-white/20 mx-auto mb-4 group-hover:w-20 transition-all duration-500"></div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-300 group-hover:text-white transition-colors">{label}</p>
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial: t }) => (
  <div className="bg-[#0c0c0c] border border-white/10 p-8 md:p-10 rounded-[40px] flex flex-col h-full hover:border-purple-500/20 transition-all shadow-2xl relative group hover:bg-[#111] duration-500">
    <div className="flex gap-1 text-yellow-500 mb-6">{[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
    <p className="text-gray-300 font-medium leading-relaxed italic mb-10 flex-1 text-sm md:text-base">"{t.quote}"</p>
    <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
      <img src={t.avatar} className="h-12 w-12 rounded-2xl object-cover border border-white/10 shadow-lg" alt={t.name} />
      <div>
        <h4 className="font-black text-white text-sm">{t.name}</h4>
        <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{t.role}</p>
      </div>
    </div>
  </div>
);

const AllCoursesView: React.FC<{ courses: Course[], onEnroll: (id: string) => void, onLearn: (id: string) => void, enrolledIds: string[] }> = ({ courses, onEnroll, onLearn, enrolledIds }) => (
  <div className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
    <div className="mb-20 text-center md:text-left"><h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-[1.4] text-gradient-accent uppercase">কোর্স লাইব্রেরি</h1><p className="text-gray-500 text-base md:text-lg max-w-xl font-medium">আপনার পছন্দের স্কিলটি খুঁজে নিন এবং আজই শেখা শুরু করুন।</p></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{courses.map(course => <CourseCard key={course.id} course={course} onEnroll={() => onEnroll(course.id)} isEnrolled={enrolledIds.includes(course.id)} onLearn={() => onLearn(course.id)} />)}</div>
  </div>
);

const MyDashboardView: React.FC<{ courses: Course[], enrolledIds: string[], onLearn: (id: string) => void, completedLessonIds: string[], navigateTo: (v: ViewType, id?: string | number) => void }> = ({ courses, enrolledIds, onLearn, completedLessonIds, navigateTo }) => {
  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id));
  return (
    <div className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <div className="mb-20 text-center md:text-left"><h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-[1.4] text-gradient-accent uppercase">আমার ড্যাশবোর্ড</h1><p className="text-gray-500 text-sm md:text-base uppercase font-black tracking-widest">আপনার প্রোগ্রেস চেক করুন</p></div>
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{enrolledCourses.map(course => {
            const total = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const done = course.modules.reduce((acc, m) => acc + m.lessons.filter(l => completedLessonIds.includes(l.id)).length, 0);
            const progress = total > 0 ? Math.round((done / total) * 100) : 0;
            return (
              <div key={course.id} className="group bg-[#0c0c0c] border border-white/10 rounded-[40px] overflow-hidden hover:border-purple-500/30 transition-all flex flex-col h-full shadow-2xl">
                <div className="relative aspect-video overflow-hidden"><img src={course.thumbnail} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => onLearn(course.id)} className="h-16 w-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"><Play size={24} fill="currentColor" /></button></div></div>
                <div className="p-10 flex flex-col flex-1"><h3 className="text-xl font-black mb-6 line-clamp-2 text-white">{course.title}</h3><div className="space-y-4 mb-10 mt-auto"><div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-500"><span>প্রোগ্রেস</span><span className="text-purple-400 font-black">{progress}% সম্পন্ন</span></div><div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5"><div className="bg-gradient-accent h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div></div></div><button onClick={() => onLearn(course.id)} className="w-full py-5 rounded-[24px] bg-white text-black font-black text-base flex items-center justify-center gap-3 hover:bg-gray-200 transition-all shadow-xl">শেখা চালিয়ে যান</button></div>
              </div>
            );
          })}</div>
      ) : (<div className="text-center py-32 bg-[#0c0c0c] border border-white/5 rounded-[40px] shadow-2xl px-10"><BookOpen size={48} className="mx-auto mb-8 text-gray-800" /><p className="text-lg font-bold text-gray-500 mb-10">এনরোল করা হয়নি।</p><button onClick={() => navigateTo('all-courses')} className="px-10 py-4 rounded-2xl bg-gradient-accent text-white font-black text-base hover:scale-105 transition-all">কোর্স লাইব্রেরি দেখুন</button></div>)}
    </div>
  );
};

const CoursePlayerView: React.FC<{ course: Course, activeLesson: Lesson | null, setActiveLesson: (l: Lesson) => void, completedLessonIds: string[], onToggleCompletion: (id: string) => void, isOnline: boolean }> = ({ course, activeLesson, setActiveLesson, completedLessonIds, onToggleCompletion, isOnline }) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([course.modules[0]?.id || '']);
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="bg-black min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col">
        <div className="aspect-video bg-black shadow-2xl">{activeLesson ? <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${activeLesson.videoId}?autoplay=1`} title={activeLesson.title} allow="autoplay; encrypted-media; fullscreen" /> : <div className="w-full h-full flex flex-col items-center justify-center text-gray-500"><Play size={48} className="mb-4 opacity-20" /><p className="font-bold">লেসন সিলেক্ট করুন</p></div>}</div>
        <div className="bg-[#0c0c0c] border-b border-white/5 flex items-center px-6 overflow-x-auto">
          {['overview', 'announcements'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-6 text-sm font-bold border-b-2 transition-all ${activeTab === tab ? 'border-purple-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>{tab === 'overview' ? 'ওভারভিউ' : 'ঘোষণা'}</button>)}
        </div>
        <div className="p-8 md:p-10 text-gray-300 bg-[#080808]">
          {activeTab === 'overview' ? (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-white mb-4">এই লেসন সম্পর্কে</h2>
              <p className="leading-relaxed font-medium text-gray-400 text-sm whitespace-pre-wrap">
                {course.overview || "এই মডিউলে আমরা শিখব কিভাবে আধুনিক এআই টুলস ব্যবহার করে প্রোডাক্টিভিটি বাড়ানো যায়।"}
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-white mb-4">গুরুত্বপূর্ণ ঘোষণা</h2>
              <p className="leading-relaxed font-medium text-gray-400 text-sm whitespace-pre-wrap">
                {course.announcements || "এখন পর্যন্ত কোন ঘোষণা নেই।"}
              </p>
            </div>
          )}
        </div>
      </div>
      <aside className="w-full lg:w-[400px] border-l border-white/5 bg-[#080808] flex flex-col"><div className="p-5 border-b border-white/5 bg-[#0c0c0c] font-black text-white text-sm">কোর্সের বিষয়বস্তু</div><div className="flex-1 overflow-y-auto">{course.modules.map(module => <div key={module.id} className="border-b border-white/5"><button onClick={() => setExpandedModules(prev => prev.includes(module.id) ? prev.filter(id => id !== module.id) : [...prev, module.id])} className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-all text-left"><div><span className="text-[9px] font-black uppercase text-gray-500 mb-1">সেকশন</span><p className="font-bold text-gray-200 text-sm">{module.name}</p></div>{expandedModules.includes(module.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</button>{expandedModules.includes(module.id) && <div className="bg-black/50">{module.lessons.map(lesson => <div key={lesson.id} onClick={() => setActiveLesson(lesson)} className={`flex items-start gap-4 p-5 cursor-pointer border-l-[3px] transition-all ${activeLesson?.id === lesson.id ? 'border-purple-500 bg-purple-500/5' : 'border-transparent hover:bg-white/5'}`}><input type="checkbox" checked={completedLessonIds.includes(lesson.id)} onChange={(e) => { e.stopPropagation(); onToggleCompletion(lesson.id); }} className="mt-1 accent-purple-500 h-3.5 w-3.5" /><div className="flex-1"><p className={`text-xs font-bold leading-[1.6] ${activeLesson?.id === lesson.id ? 'text-white' : 'text-gray-400'}`}>{lesson.title}</p></div></div>)}</div>}</div>)}</div></aside>
    </div>
  );
};

const AdminDashboardView: React.FC<{ 
  courses: Course[], 
  blogPosts: BlogPost[],
  cmsContent: HomeCMS, 
  setCmsContent: (c: HomeCMS) => void, 
  onAddCourseClick: () => void,
  onEditCourseClick: (id: string) => void,
  onAddBlogClick: () => void,
  onEditBlogClick: (id: number) => void
}> = ({ courses, blogPosts, cmsContent, setCmsContent, onAddCourseClick, onEditCourseClick, onAddBlogClick, onEditBlogClick }) => {
  const [adminTab, setAdminTab] = useState<'courses' | 'blogs' | 'cms'>('courses');
  const [tempCms, setTempCms] = useState(cmsContent);
  const saveCms = () => { setCmsContent(tempCms); alert("হোমপেজ আপডেট হয়েছে!"); };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setTempCms({ ...tempCms, logo: base64 });
    }
  };

  const updateTestimonial = (id: number, field: keyof Testimonial, value: string | number) => {
    setTempCms({
      ...tempCms,
      testimonials: tempCms.testimonials.map(t => t.id === id ? { ...t, [field]: value } : t)
    });
  };

  const handleTestimonialAvatarUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      updateTestimonial(id, 'avatar', base64);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      <aside className="w-full md:w-72 border-r border-white/5 bg-[#080808] p-8 flex flex-col gap-5">
        <div className="mb-10 flex items-center gap-3"><div className="h-12 w-12 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-xl"><LayoutDashboard className="text-white" size={28} /></div><h2 className="text-lg md:text-xl font-black tracking-tighter uppercase">অ্যাডমিন</h2></div>
        <button onClick={() => setAdminTab('courses')} className={`flex items-center gap-4 px-6 py-4 rounded-[24px] font-black text-sm transition-all ${adminTab === 'courses' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}><Monitor size={20} /> কোর্সগুলো</button>
        <button onClick={() => setAdminTab('blogs')} className={`flex items-center gap-4 px-6 py-4 rounded-[24px] font-black text-sm transition-all ${adminTab === 'blogs' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}><FileText size={20} /> ব্লগসমূহ</button>
        <button onClick={() => setAdminTab('cms')} className={`flex items-center gap-4 px-6 py-4 rounded-[24px] font-black text-sm transition-all ${adminTab === 'cms' ? 'bg-white/10 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}><Edit3 size={20} /> হোম সিএমএস</button>
        <button className="mt-auto flex items-center gap-4 px-6 py-4 rounded-[24px] text-red-500 hover:bg-red-500/10 transition-all font-black text-sm"><LogOut size={20} /> লগআউট</button>
      </aside>
      <div className="flex-1 p-8 md:p-12 bg-black overflow-y-auto">
        {adminTab === 'courses' && (
          <div className="space-y-12 animate-in fade-in">
            <div className="flex justify-between items-center"><h2 className="text-2xl font-black text-white uppercase tracking-tighter">কোর্স ম্যানেজমেন্ট</h2><button onClick={onAddCourseClick} className="px-8 py-3 rounded-2xl bg-gradient-accent text-white font-black hover:scale-105 transition-all"><Plus size={18} /> নতুন কোর্স</button></div>
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[40px] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 font-black text-[10px] uppercase text-gray-500 tracking-widest"><tr><th className="px-10 py-6">শিরোনাম</th><th className="px-10 py-6 text-right">অ্যাকশন</th></tr></thead>
                <tbody className="divide-y divide-white/5">
                  {courses.map(course => (
                    <tr key={course.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-10 py-10 font-black text-gray-300">{course.title}</td>
                      <td className="px-10 py-10 text-right">
                        <button 
                          onClick={() => onEditCourseClick(course.id)} 
                          className="px-6 py-2 border border-white/10 rounded-xl text-xs font-black hover:bg-white/10 hover:border-purple-500/50 transition-all text-gray-400 hover:text-white"
                        >
                          এডিট
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminTab === 'blogs' && (
          <div className="space-y-12 animate-in fade-in">
            <div className="flex justify-between items-center"><h2 className="text-2xl font-black text-white uppercase tracking-tighter">ব্লগ ম্যানেজমেন্ট</h2><button onClick={onAddBlogClick} className="px-8 py-3 rounded-2xl bg-gradient-accent text-white font-black hover:scale-105 transition-all"><Plus size={18} /> নতুন ব্লগ পোস্ট</button></div>
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[40px] overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 font-black text-[10px] uppercase text-gray-500 tracking-widest">
                  <tr><th className="px-10 py-6">শিরোনাম</th><th className="px-10 py-6">ক্যাটেগরি</th><th className="px-10 py-6 text-right">অ্যাকশন</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {blogPosts.map(post => (
                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-10 py-8 font-black text-gray-300">{post.title}</td>
                      <td className="px-10 py-8 font-bold text-gray-500 text-xs">{post.category}</td>
                      <td className="px-10 py-8 text-right">
                        <button 
                          onClick={() => onEditBlogClick(post.id)}
                          className="px-6 py-2 border border-white/10 rounded-xl text-xs font-black hover:bg-white/10 hover:border-purple-500/50 transition-all text-gray-400 hover:text-white"
                        >
                          এডিট
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {adminTab === 'cms' && (
          <div className="space-y-12 animate-in fade-in max-w-4xl pb-24">
            <div className="flex justify-between items-center"><h2 className="text-2xl font-black text-white uppercase tracking-tighter">হোমপেজ সিএমএস</h2><button onClick={saveCms} className="px-8 py-3 rounded-2xl bg-gradient-accent text-white font-black hover:scale-105 transition-all flex items-center gap-2"><Save size={18} /> সেভ করুন</button></div>
            
            <div className="bg-[#0c0c0c] border border-white/10 rounded-[40px] p-10 space-y-10 shadow-2xl">
               {/* Site Identity (Logo) */}
               <div className="space-y-8 pb-10 border-b border-white/5">
                 <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest">সাইট আইডেন্টিটি</h3>
                 <div className="flex flex-col md:flex-row items-center gap-10 bg-black/40 p-10 rounded-[32px] border border-white/5">
                    <div className="relative group">
                      <div className="h-24 w-48 bg-black border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                        <img src={tempCms.logo} alt="Current Logo" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl border border-purple-500/50">
                        <Upload className="text-purple-400" size={24} />
                      </div>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h4 className="font-black text-white text-lg">সাইট লোগো</h4>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed">পিএনজি বা জেপিজি ফাইল ব্যবহার করুন। উচ্চ মানের ট্রান্সপারেন্ট লোগো ব্যবহার করা বাঞ্ছনীয়।</p>
                      <button className="text-xs font-black text-purple-400 uppercase tracking-widest pt-2 flex items-center gap-2 hover:text-white transition-colors relative">
                        <ImageIcon size={14} /> লোগো আপলোড করুন
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </button>
                    </div>
                 </div>
               </div>

               {/* Hero Section */}
               <div className="space-y-8 pb-10 border-b border-white/5">
                 <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest">হিরো সেকশন</h3>
                 <div className="space-y-4"><label className="text-xs font-black text-gray-500 uppercase">হিরো টাইটেল</label><input value={tempCms.heroTitle} onChange={e => setTempCms({...tempCms, heroTitle: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-black text-white outline-none focus:ring-1 ring-purple-500 transition-all" /></div>
                 <div className="space-y-4"><label className="text-xs font-black text-gray-500 uppercase">হিরো সাবটাইটেল</label><textarea value={tempCms.heroSubtitle} onChange={e => setTempCms({...tempCms, heroSubtitle: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-bold text-gray-400 outline-none h-32" /></div>
               </div>

               {/* Stats Section */}
               <div className="space-y-8 pb-10 border-b border-white/5">
                 <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest">পরিসংখ্যান (Stats)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{tempCms.stats.map((s, i) => (
                   <div key={i} className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/5"><label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{s.label} এর মান</label><input value={s.value} onChange={e => { const newStats = [...tempCms.stats]; newStats[i].value = e.target.value; setTempCms({...tempCms, stats: newStats}); }} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 font-black text-white outline-none" /></div>
                 ))}</div>
               </div>

               {/* Social Media Links */}
               <div className="space-y-8 pb-10 border-b border-white/5">
                 <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest">সোশ্যাল মিডিয়া লিংক</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ফেসবুক লিংক</label>
                      <input value={tempCms.socialLinks.facebook} onChange={e => setTempCms({...tempCms, socialLinks: {...tempCms.socialLinks, facebook: e.target.value}})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 font-black text-white outline-none" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ইউটিউব লিংক</label>
                      <input value={tempCms.socialLinks.youtube} onChange={e => setTempCms({...tempCms, socialLinks: {...tempCms.socialLinks, youtube: e.target.value}})} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 font-black text-white outline-none" />
                    </div>
                 </div>
               </div>

               {/* Testimonials Section */}
               <div className="space-y-8">
                 <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest">ছাত্রদের মতামত (Testimonials)</h3>
                 <div className="space-y-8">
                   {tempCms.testimonials.map((t) => (
                     <div key={t.id} className="p-8 bg-white/5 border border-white/5 rounded-[32px] space-y-6">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                          <div className="relative group shrink-0">
                            <div className="h-20 w-20 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                              <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl border border-purple-500/50">
                              <Upload className="text-purple-400" size={16} />
                            </div>
                            <input type="file" accept="image/*" onChange={(e) => handleTestimonialAvatarUpload(t.id, e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 w-full">
                            <div className="space-y-2"><label className="text-[9px] font-black uppercase text-gray-600">নাম</label><input value={t.name} onChange={e => updateTestimonial(t.id, 'name', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:ring-1 ring-purple-500" /></div>
                            <div className="space-y-2"><label className="text-[9px] font-black uppercase text-gray-600">রোল / পদবী</label><input value={t.role} onChange={e => updateTestimonial(t.id, 'role', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:ring-1 ring-purple-500" /></div>
                          </div>
                        </div>
                        <div className="space-y-2"><label className="text-[9px] font-black uppercase text-gray-600">মতামত (Quote)</label><textarea value={t.quote} onChange={e => updateTestimonial(t.id, 'quote', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 font-medium h-24 outline-none focus:ring-1 ring-purple-500" /></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2"><label className="text-[9px] font-black uppercase text-gray-600">স্টার রেটিং (১-৫)</label><input type="number" min="1" max="5" value={t.stars} onChange={e => updateTestimonial(t.id, 'stars', parseInt(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-bold outline-none focus:ring-1 ring-purple-500" /></div>
                           <div className="space-y-2 flex items-end">
                             <label className="flex-1">
                               <span className="text-[9px] font-black uppercase text-gray-600 block mb-2 px-1">ছবি পরিবর্তন (Upload)</span>
                               <div className="relative w-full">
                                  <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-gray-500 flex items-center gap-2">
                                    <Upload size={14} /> নতুন ছবি সিলেক্ট করুন
                                  </div>
                                  <input type="file" accept="image/*" onChange={(e) => handleTestimonialAvatarUpload(t.id, e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                               </div>
                             </label>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ course: Course, onEnroll: () => void, isEnrolled?: boolean, onLearn?: () => void }> = ({ course, onEnroll, isEnrolled, onLearn }) => (
  <article className="group bg-[#0c0c0c] border border-white/10 rounded-[40px] overflow-hidden hover:border-purple-500/40 hover:-translate-y-2 transition-all duration-700 flex flex-col h-full shadow-2xl relative">
    <div className="relative aspect-video overflow-hidden"><img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div></div>
    <div className="p-10 flex flex-col flex-1"><h3 className="text-xl md:text-2xl font-black mb-6 group-hover:text-purple-400 transition-colors line-clamp-2 leading-[1.4] text-white tracking-tight">{course.title}</h3><div className="mt-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"><div className="flex items-center gap-3 text-[9px] font-black text-gray-500 uppercase tracking-widest"><Users size={16} className="text-purple-500"/> {course.instructor}</div><button onClick={isEnrolled ? onLearn : onEnroll} className={`w-full md:w-auto px-8 py-3 rounded-2xl font-black text-xs transition-all shadow-2xl ${isEnrolled ? 'bg-white text-black hover:bg-gray-200' : 'bg-gradient-accent text-white hover:scale-105'}`}>{isEnrolled ? 'শিখুন' : 'এনরোল'}</button></div></div>
  </article>
);

const AddCourseView: React.FC<{ initialCourse?: Course, onPublish: (c: Course) => void, onCancel: () => void }> = ({ initialCourse, onPublish, onCancel }) => {
  const [title, setTitle] = useState(initialCourse?.title || '');
  const [price, setPrice] = useState(initialCourse?.price.toString() || '4500');
  const [instructor, setInstructor] = useState(initialCourse?.instructor || 'অ্যালেক্স রিভেরা');
  const [overview, setOverview] = useState(initialCourse?.overview || '');
  const [announcements, setAnnouncements] = useState(initialCourse?.announcements || '');
  const [modules, setModules] = useState<Module[]>(initialCourse?.modules || [{ id: 'm-1', name: 'মডিউল ১', lessons: [{ id: 'l-1', title: 'লেসন ১', videoId: '' }] }]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(initialCourse?.modules[0]?.id || 'm-1');

  const addModule = () => {
    const newId = `m-${Date.now()}`;
    setModules([...modules, { id: newId, name: `মডিউল ${modules.length + 1}`, lessons: [] }]);
    setActiveModuleId(newId);
  };

  const removeModule = (mId: string) => {
    setModules(modules.filter(m => m.id !== mId));
    if (activeModuleId === mId) setActiveModuleId(null);
  };

  const updateModuleTitle = (mId: string, name: string) => {
    setModules(modules.map(m => m.id === mId ? { ...m, name } : m));
  };

  const addLesson = (mId: string) => {
    setModules(modules.map(m => m.id === mId ? {
      ...m,
      lessons: [...m.lessons, { id: `l-${Date.now()}`, title: `লেসন ${m.lessons.length + 1}`, videoId: '' }]
    } : m));
  };

  const updateLessonData = (mId: string, lId: string, field: keyof Lesson, value: string) => {
    setModules(modules.map(m => m.id === mId ? {
      ...m,
      lessons: m.lessons.map(l => l.id === lId ? { ...l, [field]: value } : l)
    } : m));
  };

  const removeLesson = (mId: string, lId: string) => {
    setModules(modules.map(m => m.id === mId ? {
      ...m,
      lessons: m.lessons.filter(l => l.id !== lId)
    } : m));
  };

  const handlePublish = () => {
    if (!title) return alert("শিরোনাম দিন");
    onPublish({
      id: initialCourse?.id || `c-${Date.now()}`,
      title,
      instructor,
      price: parseInt(price),
      overview,
      announcements,
      thumbnail: initialCourse?.thumbnail || 'https://picsum.photos/800/450',
      modules
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-in fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-12 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.4] text-gradient-accent uppercase">
          {initialCourse ? 'কোর্স এডিট' : 'নতুন কোর্স'}
        </h1>
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={onCancel} className="flex-1 md:flex-none px-10 py-4 rounded-2xl bg-white/5 border border-white/10 font-black text-base hover:bg-white/10 transition-all">বাতিল</button>
          <button onClick={handlePublish} className="flex-1 md:flex-none px-12 py-4 rounded-2xl bg-gradient-accent font-black shadow-2xl text-white hover:scale-105 transition-all text-base">
            {initialCourse ? 'আপডেট করুন' : 'পাবলিশ করুন'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <section className="bg-[#0c0c0c] border border-white/10 rounded-[40px] p-10 md:p-12 space-y-10 shadow-2xl h-fit sticky top-28">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2">কোর্স টাইটেল</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="যেমন: মাস্টার এআই ডিজাইন" className="w-full bg-black border border-white/10 rounded-[24px] px-8 py-5 outline-none focus:ring-1 ring-purple-500 text-white font-black text-lg transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-4">
                 <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2">মূল্য (৳)</label>
                 <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-black border border-white/10 rounded-[24px] px-8 py-5 font-black text-base outline-none focus:ring-1 ring-purple-500" />
               </div>
               <div className="space-y-4">
                 <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2">মেন্টর</label>
                 <input value={instructor} onChange={e => setInstructor(e.target.value)} className="w-full bg-black border border-white/10 rounded-[24px] px-8 py-5 font-black text-base outline-none focus:ring-1 ring-purple-500" />
               </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2">ওভারভিউ (Overview)</label>
              <textarea value={overview} onChange={e => setOverview(e.target.value)} placeholder="এই লেসন সম্পর্কে বিস্তারিত..." className="w-full bg-black border border-white/10 rounded-[24px] px-8 py-5 outline-none focus:ring-1 ring-purple-500 text-white font-medium text-sm h-32 transition-all" />
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-2">ঘোষণা (Announcements)</label>
              <textarea value={announcements} onChange={e => setAnnouncements(e.target.value)} placeholder="শিক্ষার্থীদের জন্য জরুরি ঘোষণা..." className="w-full bg-black border border-white/10 rounded-[24px] px-8 py-5 outline-none focus:ring-1 ring-purple-500 text-white font-medium text-sm h-32 transition-all" />
            </div>
        </section>

        <section className="space-y-10">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase">কারিকুলাম বিল্ডার</h2>
            <button onClick={addModule} className="px-5 py-2 rounded-2xl bg-purple-500/10 text-purple-400 font-black uppercase text-[9px] border border-purple-500/20 hover:bg-purple-500/20 transition-all">
              + নতুন মডিউল
            </button>
          </div>

          <div className="space-y-6 pb-24">
            {modules.map((m, mIdx) => (
              <div key={m.id} className={`bg-[#0c0c0c] border rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 ${activeModuleId === m.id ? 'border-purple-500/50 ring-1 ring-purple-500/20' : 'border-white/10 hover:border-white/20'}`}>
                <div 
                  onClick={() => setActiveModuleId(activeModuleId === m.id ? null : m.id)}
                  className="p-8 cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${activeModuleId === m.id ? 'bg-purple-500 text-white shadow-xl' : 'bg-white/5 text-gray-500'}`}>
                       {activeModuleId === m.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-purple-400 tracking-widest mb-1">মডিউল {mIdx + 1}</span>
                      <span className={`text-xl font-black tracking-tight ${activeModuleId === m.id ? 'text-white' : 'text-gray-400'}`}>
                        {m.name || 'শিরোনামহীন মডিউল'}
                      </span>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeModule(m.id); }} className="p-3 text-gray-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={20} /></button>
                </div>

                {activeModuleId === m.id && (
                  <div className="p-8 pt-0 space-y-8 animate-in slide-in-from-top duration-500">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest px-1">মডিউল শিরোনাম</label>
                      <input value={m.name} onClick={(e) => e.stopPropagation()} onChange={e => updateModuleTitle(m.id, e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-black text-white outline-none focus:ring-1 ring-purple-500 transition-all" />
                    </div>
                    <div className="space-y-5">
                      <div className="flex items-center justify-between px-1"><h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest">লেসনসমূহ</h4><button onClick={() => addLesson(m.id)} className="text-[9px] font-black uppercase text-purple-400">+ লেসন যোগ করুন</button></div>
                      <div className="grid gap-5">
                        {m.lessons.map((l, lIdx) => (
                          <div key={l.id} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-4 relative group/lesson">
                            <button onClick={() => removeLesson(m.id, l.id)} className="absolute top-4 right-4 text-gray-800 hover:text-red-500 transition-all opacity-0 group-hover/lesson:opacity-100"><X size={16} /></button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2"><label className="text-[9px] font-black uppercase text-gray-600 px-1">লেসন {lIdx + 1}</label><input value={l.title} onChange={e => updateLessonData(m.id, l.id, 'title', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3.5 font-bold text-white text-sm outline-none focus:ring-1 ring-purple-500" /></div>
                              <div className="space-y-2"><label className="text-[9px] font-black uppercase text-gray-600 px-1">ভিডিও আইডি</label><input value={l.videoId} onChange={e => updateLessonData(m.id, l.id, 'videoId', e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3.5 font-bold text-gray-500 text-sm outline-none focus:ring-1 ring-purple-500" /></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button onClick={addModule} className="w-full py-8 border-2 border-dashed border-white/10 rounded-[40px] text-gray-700 font-black uppercase text-[10px] tracking-widest hover:border-purple-500/40 hover:text-purple-400 transition-all flex flex-col items-center gap-3 bg-white/[0.01]"><div className="h-10 w-10 rounded-full border border-current flex items-center justify-center"><Plus size={20} /></div>নতুন মডিউল যোগ করুন</button>
          </div>
        </section>
      </div>
    </div>
  );
};

const AddBlogView: React.FC<{ initialPost?: BlogPost, onPublish: (b: BlogPost) => void, onCancel: () => void }> = ({ initialPost, onPublish, onCancel }) => {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [category, setCategory] = useState(initialPost?.category || 'Tutorial');
  const [author, setAuthor] = useState(initialPost?.author || 'অ্যালেক্স রিভেরা');
  const [imageUrl, setImageUrl] = useState(initialPost?.imageUrl || 'https://picsum.photos/800/500');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setImageUrl(base64);
    }
  };

  const handlePublish = () => {
    if (!title || !content) return alert("শিরোনাম এবং কন্টেন্ট দিন");
    onPublish({
      id: initialPost?.id || Date.now(),
      title,
      excerpt,
      content,
      category,
      author,
      date: initialPost?.date || new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
      imageUrl
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 animate-in fade-in">
       <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
         <h1 className="text-3xl font-black text-gradient-accent uppercase">
           {initialPost ? 'ব্লগ এডিট' : 'নতুন ব্লগ পোস্ট'}
         </h1>
         <div className="flex gap-4">
           <button onClick={onCancel} className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 font-bold">বাতিল</button>
           <button onClick={handlePublish} className="px-10 py-3 rounded-xl bg-gradient-accent font-black">
             {initialPost ? 'আপডেট করুন' : 'পাবলিশ করুন'}
           </button>
         </div>
       </div>

       <div className="bg-[#0c0c0c] border border-white/10 rounded-[40px] p-10 space-y-10 shadow-2xl">
          <div className="space-y-4">
            <label className="text-xs font-black text-gray-500 uppercase">থাম্বনেইল ইমেজ</label>
            <div className="relative group w-full h-48 rounded-3xl overflow-hidden border border-white/10 bg-black">
               <img src={imageUrl} className="w-full h-full object-cover opacity-50" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                 <Upload size={32} className="text-purple-400" />
               </div>
               <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-gray-500 uppercase">শিরোনাম</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-black text-white outline-none focus:ring-1 ring-purple-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-500 uppercase">ক্যাটেগরি</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-bold text-white outline-none">
                <option value="Tutorial">Tutorial</option>
                <option value="AI News">AI News</option>
                <option value="Career">Career</option>
                <option value="Design">Design</option>
                <option value="Tech">Tech</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-gray-500 uppercase">লেখক</label>
              <input value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-bold text-white outline-none" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-gray-500 uppercase">সংক্ষিপ্ত বিবরণ (Excerpt)</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-medium text-gray-400 h-24 outline-none" />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-gray-500 uppercase">মূল কন্টেন্ট</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-medium text-gray-300 h-64 outline-none focus:ring-1 ring-purple-500" />
          </div>
       </div>
    </div>
  );
};

const SuperAdminDashboardView: React.FC<{ students: Student[], courses: Course[], onStatusChange: (id: string, s: Student['status']) => void, onManualEnroll: (d: any) => void }> = ({ students, courses, onStatusChange, onManualEnroll }) => (
  <div className="p-8 md:p-16 max-w-7xl mx-auto animate-in fade-in space-y-12">
    <div className="flex justify-between items-end"><h1 className="text-3xl font-black text-gradient-accent uppercase">সিস্টেম কন্ট্রোল</h1></div>
    <div className="bg-[#0c0c0c] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"><table className="w-full text-left"><thead className="bg-white/5 text-[10px] uppercase font-black tracking-widest text-gray-500"><tr className="px-10"><th className="p-10">ছাত্র</th><th className="p-10">কোর্স</th><th className="p-10 text-right">অ্যাকশন</th></tr></thead><tbody className="divide-y divide-white/5">{students.map(s => (<tr key={s.id} className="hover:bg-white/[0.02] transition-colors"><td className="p-10 flex items-center gap-4"><img src={s.avatar} className="h-10 w-10 rounded-full" /><div><p className="font-black text-gray-200 text-sm">{s.name}</p><p className="text-[10px] text-gray-500">{s.email}</p></div></td><td className="p-10 text-xs font-black text-gray-400">{courses.find(c => c.id === s.enrolledCourseId)?.title}</td><td className="p-10 text-right"><button onClick={() => onStatusChange(s.id, 'banned')} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><Ban size={18} /></button></td></tr>))}</tbody></table></div>
  </div>
);

const Footer: React.FC<{ navigateTo: (v: ViewType, id?: string | number) => void, cmsContent: HomeCMS }> = ({ navigateTo, cmsContent }) => (
  <footer className="border-t border-white/5 bg-[#050505] py-20 px-8 mt-auto overflow-hidden relative">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
        <div className="flex flex-col h-full space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <img src={cmsContent.logo} className="h-10 w-auto object-contain" alt="Logo" />
            <span className="font-black text-2xl tracking-tighter text-white uppercase">এআই মাস্টার</span>
          </div>
          <p className="text-gray-400 leading-relaxed text-base font-medium">আধুনিক বিশ্বের সেরা স্কিলগুলো শেখার জন্য বাংলাদেশের ১ নম্বর প্ল্যাটফর্ম।</p>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">© ২০২৬ এআই মাস্টার। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
        <div className="text-center md:text-left"><h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-8">এক্সপ্লোর</h4><ul className="space-y-4 text-sm text-gray-400 font-bold"><li><button onClick={() => navigateTo('home')} className="hover:text-purple-400 transition-all">শুরু করুন</button></li><li><button onClick={() => navigateTo('all-courses')} className="hover:text-purple-400 transition-all">কোর্স লাইব্রেরি</button></li><li><button onClick={() => navigateTo('blog-archive')} className="hover:text-purple-400 transition-all">ব্লগ ও আর্টিকেল</button></li><li><button onClick={() => navigateTo('admin-dashboard')} className="hover:text-purple-400 transition-all">ইন্সট্রাক্টর প্যানেল</button></li></ul></div>
        <div className="text-center md:text-left"><h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-8">পলিসি</h4><ul className="space-y-4 text-sm text-gray-400 font-bold"><li><button className="hover:text-purple-400">প্রাইভেসি পলিসি</button></li><li><button className="hover:text-purple-400">ব্যবহারবিধি</button></li><li><button className="hover:text-purple-400">রিফান্ড পলিসি</button></li></ul></div>
        <div className="space-y-12 text-center md:text-left"><div className="space-y-4 flex flex-col items-center md:items-start"><h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-6">সাপোর্ট ও স্ট্যাটাস</h4><div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10"><span className="text-[10px] font-black uppercase tracking-widest text-gray-400">সিস্টেম স্ট্যাটাস</span><div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div></div></div><div className="flex justify-center md:justify-start gap-5"><SocialIcon link={cmsContent.socialLinks.facebook} icon={<Facebook size={20} />} /><SocialIcon link={cmsContent.socialLinks.youtube} icon={<Youtube size={20} />} /></div></div>
      </div>
      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
           <span className="flex items-center gap-2 hover:text-white transition-all"><ShieldCheck size={14} className="text-purple-500"/> সিকিউর লার্নিং প্ল্যাটফর্ম</span>
           <span className="flex items-center gap-2 hover:text-white transition-all"><Monitor size={14} className="text-purple-500"/> হাই-কোয়ালিটি ভিডিও কন্টেন্ট</span>
        </div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest text-center">এআই মাস্টার একাডেমি ল্যাবস v৪.৫ দ্বারা নির্মিত</p>
      </div>
    </div>
  </footer>
);

const SocialIcon: React.FC<{ icon: React.ReactNode, link: string }> = ({ icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-2xl bg-[#0c0c0c] border border-white/5 flex items-center justify-center hover:bg-purple-500/10 transition-all text-gray-500 hover:text-purple-400 shadow-2xl">{icon}</a>
);

export default App;
