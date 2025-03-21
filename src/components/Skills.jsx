// components/Skills.jsx
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const canvasRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);
  
  // Magical constellation background effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const stars = [];
    const maxStars = 150;
    let mouseX = width / 2;
    let mouseY = height / 2;
    
    // Create stars with different colors
    const starColors = ['#8a2be2', '#4169e1', '#00bfff', '#1e90ff', '#ffffff'];
    
    for (let i = 0; i < maxStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseSize: 0,
        pulseDirection: 1
      });
    }
    
    // Track mouse movement
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      
      // Draw stars and connections
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        
        // Pulsating effect
        s.pulseSize += s.pulseSpeed * s.pulseDirection;
        if (s.pulseSize > 1 || s.pulseSize < 0) {
          s.pulseDirection *= -1;
        }
        
        const radius = s.radius * (1 + s.pulseSize * 0.5);
        
        // Draw star with gradient
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, radius * 3);
        gradient.addColorStop(0, s.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius * 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // Solid center
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw connections with gradient
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const distance = Math.sqrt(Math.pow(s.x - s2.x, 2) + Math.pow(s.y - s2.y, 2));
          
          if (distance < 150) {
            const opacity = 1 - distance / 150;
            const gradient = ctx.createLinearGradient(s.x, s.y, s2.x, s2.y);
            gradient.addColorStop(0, s.color);
            gradient.addColorStop(1, s2.color);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = opacity * 0.8;
            ctx.lineWidth = 1;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      // Interactive mouse effect - stars are attracted to mouse
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const dx = mouseX - s.x;
        const dy = mouseY - s.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = 0.2 * (1 - distance / 200);
          s.vx += dx * force / 100;
          s.vy += dy * force / 100;
        }
        
        // Apply velocity with damping
        s.x += s.vx / 50;
        s.y += s.vy / 50;
        s.vx *= 0.99;
        s.vy *= 0.99;
        
        // Boundary check with bounce
        if (s.x < 0) { s.x = 0; s.vx = -s.vx * 0.5; }
        if (s.x > width) { s.x = width; s.vx = -s.vx * 0.5; }
        if (s.y < 0) { s.y = 0; s.vy = -s.vy * 0.5; }
        if (s.y > height) { s.y = height; s.vy = -s.vy * 0.5; }
      }
      
      requestAnimationFrame(draw);
    }
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    draw();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const skillCategories = [
    {
      category: "Frontend",
      icon: "✨",
      color: "from-blue-500 to-purple-600",
      skills: [
        { name: "HTML5", level: 90, icon: "🌐" },
        { name: "CSS3", level: 85, icon: "🎨" },
        { name: "JavaScript", level: 90, icon: "⚡" },
        { name: "React.js", level: 85, icon: "⚛️" },
        { name: "Next.js", level: 80, icon: "🔄" },
        { name: "Tailwind CSS", level: 85, icon: "💨" }
      ]
    },
    {
      category: "Backend",
      icon: "🔮",
      color: "from-green-500 to-teal-600",
      skills: [
        { name: "Node.js", level: 80, icon: "🟢" },
        { name: "Express.js", level: 80, icon: "🚂" },
        { name: "MongoDB", level: 75, icon: "🍃" },
        { name: "MySQL", level: 70, icon: "🐬" },
        { name: "RESTful APIs", level: 85, icon: "🔌" }
      ]
    },
    {
      category: "Tools & Others",
      icon: "🧰",
      color: "from-red-500 to-orange-600",
      skills: [
        { name: "Git & GitHub", level: 85, icon: "🐙" },
        { name: "VS Code", level: 90, icon: "📝" },
        { name: "Figma", level: 70, icon: "🎭" },
        { name: "Responsive Design", level: 90, icon: "📱" },
        { name: "Testing (Jest)", level: 75, icon: "🧪" }
      ]
    }
  ];

  // Floating runes/symbols that appear when skills are in view
  const runeSymbols = ['✧', '✦', '❈', '✵', '✴', '✷', '✸', '✹', '✺', '❉', '❋'];

  return (
    <section id="skills" className="py-20 relative overflow-hidden min-h-screen flex items-center">
      {/* Magical constellation background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40"></canvas>
      
      {/* Floating magical runes */}
      {isInView && runeSymbols.map((symbol, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl text-blue-300 pointer-events-none"
          initial={{ 
            opacity: 0,
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
            y: [0, -100],
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity,
            delay: index * 0.5
          }}
        >
          {symbol}
        </motion.div>
      ))}
      
      {/* Magical portal effect */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-0 opacity-10 pointer-events-none"
        initial={{ scale: 0 }}
        animate={isInView ? { 
          scale: [0, 1.2, 1],
          rotate: [0, 90],
          borderWidth: [0, 20, 10],
          borderColor: ['rgba(138, 43, 226, 0)', 'rgba(138, 43, 226, 0.5)', 'rgba(138, 43, 226, 0.2)']
        } : { scale: 0 }}
        transition={{ duration: 2 }}
      />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Magical title with sparkle effect */}
        <div className="relative mb-4 text-center">
          <motion.h2 
            className="text-5xl font-bold gradient-text inline-block"
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            My Skills
          </motion.h2>
          
          {/* Sparkles around title */}
          {isInView && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300 text-xl"
              style={{ 
                top: `${-20 + Math.random() * 60}px`, 
                left: `${(i/8) * 100}%` 
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                repeatDelay: 1
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
        
        <motion.p 
          className="text-center text-gray-300 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Behold the arcane technologies and mystical tools I wield to conjure digital experiences.
        </motion.p>
        
        {/* Skill categories with magical effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8, 
                    delay: index * 0.2 
                  }
                }
              }}
            >
              {/* Magical aura around the card */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-2xl opacity-0`}
                animate={isInView ? { 
                  opacity: [0, 0.3, 0.1],
                  scale: [0.8, 1.05, 1]
                } : { opacity: 0 }}
                transition={{ duration: 2, delay: index * 0.3 }}
              />
              
              {/* Skill category card */}
              <motion.div 
                className="glass-card rounded-2xl p-8 backdrop-blur-lg relative z-10 border border-white border-opacity-20"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 0 30px rgba(138, 43, 226, 0.4)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Category header with icon */}
                <div className="flex items-center justify-center mb-8">
                  <motion.span 
                    className="text-4xl mr-3"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                </div>
                
                {/* Skills with magical progress bars */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(`${index}-${skillIndex}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.5 + (skillIndex * 0.1) }}
                    >
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="mr-2">{skill.icon}</span>
                          <span className="font-medium text-gray-200">{skill.name}</span>
                        </div>
                        <motion.span 
                          className="text-blue-300 font-bold"
                          animate={hoveredSkill === `${index}-${skillIndex}` ? { 
                            scale: [1, 1.2, 1],
                            color: ['#93c5fd', '#ffffff', '#93c5fd']
                          } : {}}
                          transition={{ duration: 1 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      
                      {/* Magical progress bar container */}
                      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative">
                        {/* Glowing effect behind progress bar */}
                        <motion.div 
                          className="absolute inset-0 bg-blue-500 opacity-30 rounded-full filter blur-md"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: 0.5 + (skillIndex * 0.2) }}
                        />
                        
                        {/* Actual progress bar with gradient */}
                        <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + (skillIndex * 0.2) }}
                        >
                          {/* Animated particles inside progress bar */}
                          {hoveredSkill === `${index}-${skillIndex}` && Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white rounded-full"
                              animate={{
                                x: [0, skill.level * 3],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1,
                                delay: i * 0.2,
                                repeat: Infinity
                              }}
                            />
                          ))}
                        </motion.div>
                      </div>
                      
                      {/* Magic sparkles that appear when hovered */}
                      {hoveredSkill === `${index}-${skillIndex}` && Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-yellow-300 text-xs"
                          style={{ 
                            top: `${Math.random() * 30}px`, 
                            left: `${skill.level - 10 + (i * 10)}%` 
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            y: [0, -20],
                            scale: [0, 1, 0],
                            rotate: [0, 180]
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </motion.div>
                  ))}
                </div>
                
                {/* Magical rune at the bottom of each card */}
                <motion.div 
                  className="absolute bottom-4 right-4 text-2xl opacity-30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {runeSymbols[index % runeSymbols.length]}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Magical circle at the bottom */}
        <motion.div 
          className="w-full flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div 
            className="relative w-20 h-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-2 border-purple-500 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-blue-500 rounded-full" style={{ transform: 'rotate(45deg)' }}></div>
            <div className="absolute inset-0 border-2 border-pink-500 rounded-full" style={{ transform: 'rotate(90deg)' }}></div>
            <div className="absolute inset-2 flex items-center justify-center">
              <span className="text-2xl">✦</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;
