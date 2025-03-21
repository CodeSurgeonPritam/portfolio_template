// App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Footer from './components/Footer';

function App() {
 
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div id="particles-js" className="fixed inset-0 z-0"></div>
      <div className="relative z-10">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Projects />
          <Skills />
          <Blog />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
