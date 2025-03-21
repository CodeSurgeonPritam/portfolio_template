// components/Blog.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // In a real application, you would fetch these from your backend
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the basics of React and how to create your first component.",
      date: "June 15, 2023",
      category: "Web Development",
      tags: ["React", "JavaScript", "Frontend"],
      image: "/path-to-blog1-image.jpg"
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      excerpt: "Understanding the differences between CSS Grid and Flexbox for layouts.",
      date: "July 22, 2023",
      category: "CSS",
      tags: ["CSS", "Layout", "Design"],
      image: "/path-to-blog2-image.jpg"
    },
    {
      id: 3,
      title: "Introduction to Node.js",
      excerpt: "A beginner's guide to Node.js and server-side JavaScript.",
      date: "August 10, 2023",
      category: "Backend",
      tags: ["Node.js", "JavaScript", "Backend"],
      image: "/path-to-blog3-image.jpg"
    }
  ]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.h2 
          className="text-4xl font-bold text-center mb-4 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Latest Blog Posts
        </motion.h2>
        
        <motion.p 
          className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Check out my latest articles on web development, design, and technology.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {blogPosts.map(post => (
            <motion.div 
              key={post.id} 
              className="glass-card rounded-lg overflow-hidden"
              variants={item}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                
                <div className="mb-4 flex flex-wrap">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-800 bg-opacity-50 text-blue-300 text-xs px-2 py-1 rounded-full mr-2 mb-2 border border-blue-400 border-opacity-30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <motion.a 
                  href={`/blog/${post.id}`} 
                  className="inline-block text-blue-400 font-medium hover:text-blue-300 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Read More →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a 
            href="/blog" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 glow-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Posts
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Blog;
