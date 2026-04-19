// Portfolio JavaScript functionality

// Global variables
let isMobileMenuOpen = false;
let isContactModalOpen = false;
let currentSection = 'home';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupScrollEffects();
    setupSmoothScrolling();
    setupScrollSpy();
    loadHomeSection();
    initializeTypingAnimation(); // Start animation on load
});

// Load home section with all content
function loadHomeSection() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = getAllSectionsHTML();
    animateOnScroll();
    setupScrollSpy(); // Only enable scroll spy on home page
}

// Get all sections HTML
function getAllSectionsHTML() {
    return getHomeSectionHTML() + 
           getAboutSectionHTML() + 
           getSkillsSectionHTML() + 
           getProjectsSectionHTML();
}

// Navigation functions
function showSection(sectionName) {
    const mainContent = document.getElementById('main-content');
    
    switch(sectionName) {
        case 'home':
            mainContent.innerHTML = getAllSectionsHTML();
            animateOnScroll();
            setupScrollSpy(); // Enable scroll spy only on home
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to very top
            // Restart typing animation without delay
            setTimeout(() => {
                initializeTypingAnimation();
            }, 100);
            break;
        case 'about':
            mainContent.innerHTML = getAboutSectionHTML();
            animateOnScroll();
            break;
        case 'skills':
            mainContent.innerHTML = getSkillsSectionHTML();
            animateOnScroll();
            break;
        case 'projects':
            mainContent.innerHTML = getProjectsSectionHTML();
            animateOnScroll();
            break;
    }
    
    closeMobileMenu();
    // Scroll to top for individual sections
    if (sectionName !== 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Scroll spy functionality (only for home page)
function setupScrollSpy() {
    // Remove existing scroll listener if any
    window.removeEventListener('scroll', updateActiveNav);
    
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return; // No sections, no scroll spy
    
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href').substring(1);
            
            if (linkHref === currentSection) {
                link.classList.remove('text-blue-600');
                link.classList.add('text-blue-800', 'font-bold');
            } else {
                link.classList.remove('text-blue-800', 'font-bold');
                link.classList.add('text-blue-600');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    setTimeout(updateActiveNav, 100);
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        `;
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        `;
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    isMobileMenuOpen = false;
    mobileMenu.classList.add('hidden');
    menuIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    `;
}

// Contact modal functions
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    const sheet = document.getElementById('contact-sheet');
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        sheet.classList.add('open');
    }, 10);
    
    isContactModalOpen = true;
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    const sheet = document.getElementById('contact-sheet');
    
    sheet.classList.remove('open');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
    
    isContactModalOpen = false;
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('contact-modal');
    const sheet = document.getElementById('contact-sheet');
    
    if (isContactModalOpen && event.target === modal) {
        closeContactModal();
    }
});

// Scroll effects
function setupScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            showSection(targetId);
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// HTML Templates for different sections
function getHomeSectionHTML() {
    return `
        <!-- HERO SECTION -->
        <section class="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between -mt-10 bg-blue-50 px-10 md:px-16 py-12 gap-10 md:gap-0">
            
            <!-- LEFT: Text Section -->
            <div class="md:w-1/2 text-center md:text-left md:ml-10 lg:ml-20 animate-on-scroll">
                <h1 class="text-3xl sm:text-4xl md:text-5xl text-stone-800 mb-4" style="font-family: Inter; font-weight: 900;">
                    Hi, I'm Daniel Rivera
                </h1>

                <p class="text-xl sm:text-2xl md:text-3xl text-stone-800 mb-6" style="font-family: Inter; font-weight: 500;">
                    Aspiring
                    <span class="ml-2 block sm:inline">
                        <span id="typing-text" class="text-xl sm:text-2xl md:text-3xl text-blue-400 font-bold"></span>
                    </span>
                </p>
                
                <p class="mt-4 text-lg text-stone-700 italic" style="font-family: Inter; font-weight: 500;">
                    Your vision, my code.
                </p>

                <a onclick="showSection('projects')" class="mt-6 inline-block text-blue-500 tracking-wide hover:underline underline-offset-4 decoration-2 transition-all cursor-pointer" style="font-family: Inter; font-weight: 700;">
                    View my work →
                </a>
            </div>

            <!-- RIGHT: Image Section -->
            <div class="md:w-1/2 flex justify-center mt-10 md:mt-0 animate-on-scroll">
                <img src="assets/2x2.jpeg" alt="Daniel Rivera" class="w-80 h-auto object-cover border-4 border-blue-300 rounded-lg md:ml-8">
            </div>
        </section>

        <!-- HIGHLIGHTS -->
        <section class="bg-white py-16 px-6 md:px-12 lg:px-20 mt-10 mb-10">
            <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-blue-100 border-2 border-blue-300 p-6 rounded-xl shadow-md text-center animate-on-scroll hover-lift">
                    <div class="text-black mb-4 flex justify-center">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                        </svg>
                    </div>
                    <h3 class="text-base sm:text-lg" style="font-family: Inter; font-weight: 700;">Clean & Semantic Code</h3>
                    <p class="text-zinc-600 mt-2 text-xs sm:text-sm" style="font-family: Inter; font-weight: 500;">Writing well-structured, semantic HTML and components for maintainable codebases.</p>
                </div>
                
                <div class="bg-blue-100 border-2 border-blue-300 p-6 rounded-xl shadow-md text-center animate-on-scroll hover-lift">
                    <div class="text-black mb-4 flex justify-center">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                            <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <h3 class="text-base sm:text-lg" style="font-family: Inter; font-weight: 700;">Modern UI Styling</h3>
                    <p class="text-zinc-600 mt-2 text-xs sm:text-sm" style="font-family: Inter; font-weight: 500;">Crafting visually appealing interfaces using Tailwind CSS and responsive design principles.</p>
                </div>
                
                <div class="bg-blue-100 border-2 border-blue-300 p-6 rounded-xl shadow-md text-center animate-on-scroll hover-lift">
                    <div class="text-black mb-4 flex justify-center">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"></path>
                        </svg>
                    </div>
                    <h3 class="text-base sm:text-lg" style="font-family: Inter; font-weight: 700;">Interactive Components</h3>
                    <p class="text-zinc-600 mt-2 text-xs sm:text-sm" style="font-family: Inter; font-weight: 500;">Building dynamic, user-friendly components with JavaScript and modern frameworks.</p>
                </div>
            </div>
        </section>
    `;
}

function getAboutSectionHTML() {
    return `
        <section class="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-20">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl sm:text-5xl text-stone-800 mb-8 text-center" style="font-family: Inter; font-weight: 700;">About Me</h1>
                
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="animate-on-scroll">
                        <img src="assets/2x2.jpeg" alt="Daniel Rivera" class="w-full border-4 border-blue-300 rounded-lg">
                    </div>
                    
                    <div class="animate-on-scroll">
                        <p class="text-zinc-600 mb-6" style="font-family: Inter; font-weight: 400;">
                            I am an aspiring developer with a growing passion for both software development and cybersecurity. I enjoy building applications while also learning how to secure them against potential threats. My interest in technology started with curiosity and has evolved into a commitment to continuously improve my skills.
                        </p>
                        
                        <p class="text-zinc-600 mb-6" style="font-family: Inter; font-weight: 400;">
                            I am currently focused on developing my knowledge in programming, web development, and basic cybersecurity practices such as protecting data, understanding vulnerabilities, and writing more secure code. I enjoy exploring how systems work and how they can be improved and protected at the same time.
                        
                        <div class="space-y-4">
                            <div>
                                <h3 class="text-lg font-semibold text-stone-800 mb-2">Education</h3>
                                <p class="text-zinc-600" style="font-family: Inter; font-weight: 400;">
                                    Bachelor of Science in Information Technology<br>
                                </p>
                            </div>
                            
                            <div>
                                <h3 class="text-lg font-semibold text-stone-800 mb-2">Location</h3>
                                <p class="text-zinc-600" style="font-family: Inter; font-weight: 400;">Quezon City, Philippines</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function getSkillsSectionHTML() {
    return `
        <section class="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-20">
            <div class="max-w-6xl mx-auto text-center">
                <h1 class="text-4xl sm:text-5xl text-stone-800 mb-8 text-center" style="font-family: Inter; font-weight: 700;">Skills</h1>
                
                <div class="grid md:grid-cols-2 gap-12">
                    <!-- Tech Stack -->
                    <div class="animate-on-scroll">
                        <h2 class="text-2xl text-blue-500 mb-6 text-center" style="font-family: Inter; font-weight: 700;">Tech Stack</h2>
                        
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 justify-center items-center">
                            <div class="text-center animate-on-scroll hover-lift">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML" class="w-16 h-16 mx-auto">
                                <p class="text-zinc-600 mt-2 text-sm" style="font-family: Inter; font-weight: 500;">HTML</p>
                            </div>
                            <div class="text-center animate-on-scroll hover-lift">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS" class="w-16 h-16 mx-auto">
                                <p class="text-zinc-600 mt-2 text-sm" style="font-family: Inter; font-weight: 500;">CSS</p>
                            </div>
                            <div class="text-center animate-on-scroll hover-lift">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" class="w-16 h-16 mx-auto">
                                <p class="text-zinc-600 mt-2 text-sm" style="font-family: Inter; font-weight: 500;">JavaScript</p>
                            </div>
                            <div class="text-center animate-on-scroll hover-lift">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg" alt="Tailwind CSS" class="w-16 h-16 mx-auto">
                                <p class="text-zinc-600 mt-2 text-sm" style="font-family: Inter; font-weight: 500;">Tailwind CSS</p>
                            </div>
                            <div class="text-center animate-on-scroll hover-lift">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" class="w-16 h-16 mx-auto">
                                <p class="text-zinc-600 mt-2 text-sm" style="font-family: Inter; font-weight: 500;">C++</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Certifications -->
                    <div class="animate-on-scroll">
                        <h2 class="text-2xl text-blue-500 mb-6 text-center" style="font-family: Inter; font-weight: 700;">Certifications</h2>
                        
                        <div class="space-y-4">
                            <div class="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-400 hover-lift">
                                <h3 class="font-semibold text-stone-800 mb-2">CompTIA Security+</h3>
                                <p class="text-zinc-600" style="font-family: Inter; font-weight: 400;">Cybersecurity Fundamentals Certification</p>
                            </div>
                            
                            <div class="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-400 hover-lift">
                                <h3 class="font-semibold text-stone-800 mb-2">AWS Cloud Practitioner</h3>
                                <p class="text-zinc-600" style="font-family: Inter; font-weight: 400;">Amazon Web Services Certification</p>
                            </div>
                            
                            <div class="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-400 hover-lift">
                                <h3 class="font-semibold text-stone-800 mb-2">JavaScript Algorithms</h3>
                                <p class="text-zinc-600" style="font-family: Inter; font-weight: 400;">Data Structures & Algorithms Certification</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function getProjectsSectionHTML() {
    return `
        <section class="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-20">
            <div class="max-w-6xl mx-auto">
                <h1 class="text-4xl sm:text-5xl text-stone-800 mb-8 text-center" style="font-family: Inter; font-weight: 700;">Projects</h1>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="project-card bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 animate-on-scroll">
                        <div class="h-48 bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center">
                            <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                            </svg>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-stone-800 mb-2" style="font-family: Inter; font-weight: 700;">E-Learning Platform</h3>
                            <p class="text-zinc-600 mb-4" style="font-family: Inter; font-weight: 400;">
                                An interactive online learning platform with course management and progress tracking.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-xs">React</span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Tailwind CSS</span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Node.js</span>
                            </div>
                            <div class="flex gap-4">
                                <a href="#" class="text-blue-500 hover:text-blue-700 font-medium text-sm">View Project →</a>
                                <a href="#" class="text-stone-600 hover:text-stone-800 font-medium text-sm">GitHub →</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-card bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 animate-on-scroll">
                        <div class="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                            <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"></path>
                                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"></path>
                                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"></path>
                            </svg>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-stone-800 mb-2" style="font-family: Inter; font-weight: 700;">Task Management App</h3>
                            <p class="text-zinc-600 mb-4" style="font-family: Inter; font-weight: 400;">
                                A productivity app with drag-and-drop functionality and real-time collaboration.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">JavaScript</span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">CSS3</span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Firebase</span>
                            </div>
                            <div class="flex gap-4">
                                <a href="#" class="text-blue-500 hover:text-blue-700 font-medium text-sm">View Project →</a>
                                <a href="#" class="text-stone-600 hover:text-stone-800 font-medium text-sm">GitHub →</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-card bg-white rounded-lg shadow-lg overflow-hidden border border-stone-200 animate-on-scroll">
                        <div class="h-48 bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center">
                            <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold text-stone-800 mb-2" style="font-family: Inter; font-weight: 700;">Portfolio Website</h3>
                            <p class="text-zinc-600 mb-4" style="font-family: Inter; font-weight: 400;">
                                A responsive portfolio website with smooth animations and modern design.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">HTML5</span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">Tailwind CSS</span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">JavaScript</span>
                            </div>
                            <div class="flex gap-4">
                                <a href="#" class="text-blue-500 hover:text-blue-700 font-medium text-sm">View Project →</a>
                                <a href="#" class="text-stone-600 hover:text-stone-800 font-medium text-sm">GitHub →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Animate skill bars when skills section is shown
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Initialize typing animation for home section
function initializeTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const texts = ['Cybersecurity Specialist', 'Full stack Developer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeNextText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(typeNextText, 500);
                } else {
                    setTimeout(typeNextText, 50);
                }
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeNextText();
                    }, 2000);
                } else {
                    setTimeout(typeNextText, 100);
                }
            }
        }
        
        // Start continuous animation
        typeNextText();
    }
}
