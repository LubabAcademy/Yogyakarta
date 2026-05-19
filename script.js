document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. NAVBAR STICKY & ACTIVE LINK ---
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        // Sticky Navbar Effect
        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

        // Active Link on Scroll
        let currentSection = "";
        const sections = document.querySelectorAll("section");
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    });

    // --- 2. RESPONSIVE HAMBURGER MENU ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- 3. SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Trigger animation when element is 15% visible from bottom
            if (elementTop < windowHeight * 0.85) {
                el.classList.add("revealed");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run once on load

    // --- 4. COUNTER ANIMATION (STATS) ---
    const counters = document.querySelectorAll(".counter");
    let speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute("data-target");
                const data = +counter.innerText;
                const time = target / speed;

                if (data < target) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = target + (counter.getAttribute("data-target") === "98" ? "%" : "+");
                }
            };
            animate();
        });
    };

    // Trigger counter when About section is reached
    const aboutSection = document.getElementById("tentang");
    let counterTriggered = false;

    window.addEventListener("scroll", () => {
        if(!aboutSection) return;
        const topPos = aboutSection.getBoundingClientRect().top;
        if(topPos < window.innerHeight && !counterTriggered) {
            startCounters();
            counterTriggered = true;
        }
    });

    // --- 5. TESTIMONI SLIDER / CAROUSEL ---
    const slides = document.querySelectorAll(".testi-slide");
    const dotsContainer = document.getElementById("sliderDots");
    let currentSlide = 0;

    // Create dynamic dots based on number of slides
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if(index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    const goToSlide = (index) => {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        
        currentSlide = index;
        
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
        
        const slider = document.getElementById("testiSlider");
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    // Auto Slide every 5 seconds
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        goToSlide(nextSlide);
    }, 5000);

    // --- 6. CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById("contactForm");
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Terima kasih! Pesan Anda telah terkirim. Tim Lubab Academy akan segera menghubungi Anda.");
            contactForm.reset();
        });
    }
});
