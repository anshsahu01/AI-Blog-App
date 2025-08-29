import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/appContext.jsx';

export const blogs = [
  {
    _id: "1",
    title: "The Rise of AI in Daily Life",
    description: "Explore how artificial intelligence is being used in everyday applications and what the future holds.",
    category: "Technology",
    "image":'blog_pic_1.png'
  },
  {
    _id: "2",
    title: "How to Build a Lean Startup",
    description: "Learn the principles of lean startup methodology and how to apply them to build successful ventures.",
    category: "Startup",
     "image":'blog_pic_2.png'
  },
  {
    _id: "3",
    title: "Minimalist Lifestyle Tips",
    description: "A guide to simplifying your life, reducing stress, and embracing minimalism for better well-being.",
    category: "Lifestyle",
     "image":'blog_pic_3.png'
  },
  {
    _id: "4",
    title: "Understanding Stock Market Basics",
    description: "This post introduces the basics of the stock market, how it works, and key terms every beginner should know.",
    category: "Finance",
     "image":'blog_pic_4.png'
  },
  {
    _id: "5",
    title: "Top 5 Tech Trends in 2025",
    description: "A look at the most influential technology trends expected to shape the world in 2025.",
    category: "Technology",
     "image":'blog_pic_5.png'
  },
  {
    _id: "6",
    title: "Bootstrapping vs. Venture Capital",
    description: "Discusses the pros and cons of bootstrapping your business vs. raising funds from VCs.",
    category: "Startup",
     "image":'blog_pic_6.png'
  },
  {
    _id: "7",
    title: "Work-Life Balance Hacks",
    description: "Tips and strategies to maintain a healthy work-life balance in a fast-paced digital world.",
    category: "Lifestyle",
     "image":'blog_pic_7.png'
  },
  {
    _id: "8",
    title: "Saving vs. Investing",
    description: "Understand the difference between saving and investing, and how to build long-term financial health.",
    category: "All",
     "image":'blog_pic_8.png'
  }
];


export const footer_data = [
  {
    title:"Quick Links",
    links : ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
  },
  {
    title : "Need Help?",
    links : ["Delivery Information", "Return & Refund Policy", "Payment"],
  },
  {
    title : "Follow Us",
    links : ["Instagram","X","Facebook"]
  }
]

// commentsData.js

export const comments = [
  {
    _id: "cmt1",
    blog: { title: "Understanding React Hooks" },
    name: "John Doe",
    content: "This article helped me understand hooks better!",
    createdAt: "2025-08-05T14:32:00Z",
    isApproved: true
  },
  {
    _id: "cmt2",
    blog: { title: "JavaScript ES2025 Features" },
    name: "Jane Smith",
    content: "I can't wait to try these new features in my projects.",
    createdAt: "2025-08-07T09:15:00Z",
    isApproved: false
  },
  {
    _id: "cmt3",
    blog: { title: "Mastering CSS Grid Layout" },
    name: "Mike Johnson",
    content: "The grid examples were really helpful!",
    createdAt: "2025-08-06T11:45:00Z",
    isApproved: true
  },
  {
    _id: "cmt4",
    blog: { title: "Node.js Performance Optimization" },
    name: "Sarah Lee",
    content: "I applied these tips and my app is running faster.",
    createdAt: "2025-08-08T18:20:00Z",
    isApproved: false
  },
  {
    _id: "cmt5",
    blog: { title: "Understanding Async/Await in JS" },
    name: "Alex Brown",
    content: "Finally async/await makes sense to me now!",
    createdAt: "2025-08-09T12:50:00Z",
    isApproved: true
  }
];


createRoot(document.getElementById('root')).render(
  
<BrowserRouter>
<AppProvider>
      <App />
      </AppProvider>
    </BrowserRouter>
 ,
)
