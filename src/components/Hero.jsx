// components/Hero.jsx
import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  
  // Start animations after component mounts
  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");
  }, [controls]);
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Magical particles effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    // Create magical particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: getRandomColor(),
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    
    function getRandomColor() {
      const colors = [
        'rgba(147, 51, 234, 0.7)', // Purple
        'rgba(59, 130, 246, 0.7)',  // Blue
        'rgba(236, 72, 153, 0.7)',  // Pink
        'rgba(16, 185, 129, 0.7)',  // Emerald
        'rgba(245, 158, 11, 0.7)'   // Amber
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX + (mousePosition.x * 2);
        particle.y += particle.speedY + (mousePosition.y * 2);
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(drawParticles);
    }
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePosition]);
  
  // Magical symbols that float around
  const magicalSymbols = [
    { symbol: '✨', top: '15%', left: '10%', delay: 0 },
    { symbol: '⚡', top: '25%', right: '15%', delay: 1.2 },
    { symbol: '🔮', bottom: '30%', left: '20%', delay: 0.5 },
    { symbol: '💫', top: '60%', right: '10%', delay: 2 },
    { symbol: '✨', bottom: '15%', left: '40%', delay: 1.5 },
    { symbol: '⭐', top: '40%', left: '75%', delay: 0.8 }
  ];
  
  // Magical runes that appear and disappear
  const magicalRunes = ['⚝', '⚘', '⚜', '⚛', '⚕', '⚚'];
  
  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Magical particle background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      
      {/* Animated magical portal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div 
          className="w-[800px] h-[800px] rounded-full border-4 border-purple-500 opacity-10"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            rotate: [0, 180],
          }}
          transition={{ duration: 2 }}
        />
        <motion.div 
          className="absolute w-[700px] h-[700px] rounded-full border-4 border-blue-500 opacity-10"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.1, 0.9],
            rotate: [0, -180],
          }}
          transition={{ duration: 2, delay: 0.3 }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full border-4 border-pink-500 opacity-10"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1, 0.8],
            rotate: [0, 90],
          }}
          transition={{ duration: 2, delay: 0.6 }}
        />
      </div>
      
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{ 
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{ 
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{ 
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>
      
      {/* Floating magical symbols */}
      {magicalSymbols.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl z-10 pointer-events-none"
          style={{
            ...item,
            position: 'absolute'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8],
            scale: [0, 1, 0.8],
            y: [0, -20, 0],
            rotate: [0, item.symbol === '⚡' ? 20 : -20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
      
      {/* Random appearing magical runes */}
      {isLoaded && magicalRunes.map((rune, index) => (
        <motion.div
          key={index}
          className="absolute text-xl text-purple-300 z-10 pointer-events-none"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0],
            y: [0, -30]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            delay: index * 2,
            repeatDelay: 10
          }}
        >
          {rune}
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
        {/* Left side - Personal information with magical text effects */}
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0 px-4"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, type: "spring" }}
          style={{
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`
          }}
        >
          {/* Magical greeting with glowing effect */}
          <div className="relative mb-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm <span className="relative">
                <span className="gradient-text">Your Name</span>
                <motion.span 
                  className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur-lg rounded-lg"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.9, 1.05, 0.9]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>
            
            {/* Magical sparkles around name */}
            {isLoaded && Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300 text-sm"
                style={{ 
                  top: `${Math.random() * 60}%`, 
                  left: `${50 + Math.random() * 30}%` 
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  repeatDelay: 3
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
          
          {/* Magical title with animated underline */}
          <div className="relative mb-6">
            <motion.h2 
              className="text-2xl md:text-3xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Web Developer & Designer
            </motion.h2>
            <motion.div 
              className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-2"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1 }}
            />
          </div>
          
          {/* Description with magical highlight effect */}
          <motion.p 
            className="text-lg text-gray-300 mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            I create <span className="relative">
              <span className="text-white font-medium">beautiful, responsive</span>
              <motion.span 
                className="absolute -inset-1 bg-blue-500 opacity-20 rounded-md -z-10"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span> websites with modern technologies.
            Passionate about crafting <span className="relative">
              <span className="text-white font-medium">user-friendly experiences</span>
              <motion.span 
                className="absolute -inset-1 bg-purple-500 opacity-20 rounded-md -z-10"
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </span> and solving complex problems.
          </motion.p>
          
          {/* Magical buttons with glow effects */}
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.a 
              href="#contact" 
              className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Magical glow effect */}
              <motion.span 
                className="absolute inset-0 bg-white opacity-30"
                initial={{ scale: 0, x: "-100%" }}
                whileHover={{ scale: 1.5, x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Button text with sparkle */}
              <span className="relative z-10 flex items-center">
                Contact Me
                <motion.span 
                  className="ml-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
              </span>
            </motion.a>
            
            <motion.a 
              href="#projects" 
              className="relative px-6 py-3 border border-blue-600 text-blue-400 rounded-md overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Magical hover effect */}
              <motion.span 
                className="absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
              
              {/* Button text with arrow animation */}
              <span className="relative z-10 flex items-center">
                View Projects
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Right side - Magical profile image */}
        <motion.div 
          className="md:w-1/2 flex justify-center"
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 1, type: "spring", delay: 0.3 }}
          style={{
            transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`
          }}
        >
          <div className="relative">
            {/* Magical energy aura */}
            <motion.div 
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 360],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Magical orb container */}
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white border-opacity-30 shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                boxShadow: [
                  "0 0 20px rgba(79, 70, 229, 0.5)",
                  "0 0 30px rgba(79, 70, 229, 0.7)",
                  "0 0 20px rgba(79, 70, 229, 0.5)"
                ]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Magical gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500"
                animate={{ 
                  background: [
                    "linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899)",
                    "linear-gradient(to bottom right, #8b5cf6, #ec4899, #3b82f6)",
                    "linear-gradient(to bottom right, #ec4899, #3b82f6, #8b5cf6)",
                    "linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899)"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Profile image */}
              <img 
                src="/path-to-your-photo.jpg" 
                alt="Your Name" 
                className="w-full h-full object-cover relative z-10 mix-blend-overlay"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              
              {/* Magical overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-50 z-20"
                animate={{ opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Magical orbiting circles */}
            <div className="absolute top-0 left-0 w-full h-full">
              <motion.div 
                className="absolute inset-0 border-4 border-blue-400 rounded-full opacity-20"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-0 border-4 border-purple-400 rounded-full opacity-20"
                animate={{ 
                  rotate: [360, 0],
                  scale: [1.1, 1, 1.1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Orbiting magical symbols */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 flex items-center justify-center"
                  style={{
                    top: "calc(50% - 16px)",
                    left: "calc(50% - 16px)",
                  }}
                  animate={{
                    x: Math.cos(i * (Math.PI / 3)) * 150,
                    y: Math.sin(i * (Math.PI / 3)) * 150,
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                >
                  <span className="text-xl text-white opacity-70">
                    {["⚝", "✧", "✦", "⚛", "✺", "❈"][i]}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Magical scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          className="w-8 h-14 border-2 border-white border-opacity-30 rounded-full flex justify-center p-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <motion.p 
          className="text-sm text-gray-400 mt-2 ml-[-30px] text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </section>
  );
}

export default Hero;
