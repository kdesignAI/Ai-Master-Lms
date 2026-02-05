
import { Course } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Mastering Generative AI for Designers',
    instructor: 'Alex Rivera',
    price: 4500,
    thumbnail: 'https://picsum.photos/seed/ai1/800/450',
    modules: [
      {
        id: 'm1',
        name: 'Introduction to Generative Art',
        lessons: [
          { id: 'l1', title: 'What is Generative AI?', videoId: 'h8X-L95-OqU' },
          { id: 'l2', title: 'The Future of Creative Tools', videoId: 'O5xeyoRL95U' }
        ]
      },
      {
        id: 'm2',
        name: 'Prompt Engineering Secrets',
        lessons: [
          { id: 'l3', title: 'Anatomy of a Perfect Prompt', videoId: 'X0vD838Q0_E' },
          { id: 'l4', title: 'Advanced Lighting & Textures', videoId: 'f-6S9QYl8kQ' }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Modern UI/UX with AI Tools',
    instructor: 'Sarah Jenkins',
    price: 3800,
    thumbnail: 'https://picsum.photos/seed/design1/800/450',
    modules: [
      {
        id: 'm3',
        name: 'Design Systems in 2024',
        lessons: [
          { id: 'l5', title: 'Building Components with AI', videoId: 'jz5vQs9WzFs' },
          { id: 'l6', title: 'Automating Design Workflows', videoId: 'U_gYv3ZBy90' }
        ]
      }
    ]
  }
];
