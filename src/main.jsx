import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';


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



createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
