// components/Projects.jsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "A fully functional e-commerce platform with payment integration, user authentication, and product management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/path-to-project1-image.jpg",
      liveLink: "https://project1.example.com",
      githubLink: "https://github.com/yourusername/project1",
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A productivity application that helps users organize tasks, set deadlines, and track progress.",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      image: "/path-to-project2-image.jpg",
      liveLink: "https://project2.example.com",
      githubLink: "https://github.com/yourusername/project2",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A weather application that provides real-time weather data and forecasts for locations worldwide.",
      technologies: ["JavaScript", "OpenWeather API", "CSS3"],
      image: "/path-to-project3-image.jpg",
      liveLink: "https://project3.example.com",
      githubLink: "https://github.com/yourusername/project3",
      color: "from-green-600 to-teal-600"
    }
  ];

  // Animated title characters
  const titleChars = "My Projects".split("");

  return (
    <section id="projects" className="py-20 relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="h-full w-px bg-white mx-auto"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-6 gap-4 opacity-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="w-full h-px bg-white my-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Animated title with character-by-character animation */}
        <div className="flex justify-center mb-4 overflow-hidden">
          {titleChars.map((char, index) => (
            <motion.span
              key={index}
              className={`text-5xl font-bold ${char === " " ? "mr-4" : ""} gradient-text`}
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        
        <motion.p 
          className="text-center text-gray-300 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Check out some of my recent work. Each project represents a unique challenge and solution.
        </motion.p>
        
        {/* Projects displayed in a staggered horizontal layout */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="flex flex-col md:flex-row items-center gap-8"
              initial={{ 
                x: index % 2 === 0 ? 300 : -300, 
                opacity: 0 
              }}
              animate={isInView ? { 
                x: 0, 
                opacity: 1 
              } : { 
                x: index % 2 === 0 ? 300 : -300, 
                opacity: 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 50
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project image with effects - alternating left/right */}
              <motion.div 
                className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative group overflow-hidden rounded-xl">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  
                  {/* Project image */}
                  <img 
                    src={project.image || `https://source.unsplash.com/random/800x600?${project.title.toLowerCase().replace(/ /g, '-')}`} 
                    alt={project.title} 
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Floating tech icons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <motion.div
                        key={i}
                        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm p-3 rounded-full mx-2"
                        animate={hoveredProject === project.id ? {
                          y: [0, -20 + i * 10, 0],
                          rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                          scale: [1, 1.2, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <span className="text-xl">{tech.slice(0, 1)}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Project title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
              </motion.div>
              
              {/* Project details */}
              <motion.div 
                className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-4 text-white hidden md:block">{project.title}</h3>
                
                {/* Glass card for project description */}
                <div className="glass-card p-6 rounded-xl mb-6">
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  
                  <div className={`mb-6 flex flex-wrap ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex} 
                        className="bg-gray-800 bg-opacity-50 text-blue-300 text-sm px-3 py-1 rounded-full mr-2 mb-2 border border-blue-400 border-opacity-30"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                <div className={`flex space-x-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  <motion.a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 glow-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </motion.a>
                  <motion.a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-800 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
       
      </div>
      
      {/* Animated corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <motion.div 
          className="absolute top-8 left-8 w-16 h-px bg-blue-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: 64 } : { width: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div 
          className="absolute top-8 left-8 w-px h-16 bg-blue-500"
          initial={{ height: 0 }}
          animate={isInView ? { height: 64 } : { height: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
        <motion.div 
          className="absolute bottom-8 right-8 w-16 h-px bg-blue-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: 64 } : { width: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-8 right-8 w-px h-16 bg-blue-500"
          initial={{ height: 0 }}
          animate={isInView ? { height: 64 } : { height: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </section>
  );
}

export default Projects;
