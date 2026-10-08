// ===== AZIMUG STORE - Main JavaScript =====
// Interactive Glassmorphism Website

document.addEventListener('DOMContentLoaded', () => {
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 2000);
    });

    // ===== PARTICLES BACKGROUND =====
    initParticles();

    // ===== NAVBAR =====
    initNavbar();

    // ===== ANIMATE ON SCROLL (Custom AOS) =====
    initScrollAnimations();

    // ===== COUNTER ANIMATION =====
    initCounterAnimation();

    // ===== PRODUCT FILTER =====
    initProductFilter();

    // ===== PRODUCT MODAL =====
    initProductModal();

    // ===== BACK TO TOP =====
    initBackToTop();

    // ===== CARD TILT EFFECT =====
    initCardTiltEffect();

    // ===== SMOOTH SCROLL =====
    initSmoothScroll();

    // ===== CARD MOUSE GLOW =====
    initCardGlow();
});

// ===== PARTICLES SYSTEM =====
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;

            if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            const fadeRatio = this.life / this.maxLife;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 107, 0, ${this.opacity * fadeRatio})`;
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 107, 0, ${0.05 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        animationId = requestAnimationFrame(animate);
    }
    animate();
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== SCROLL ANIMATIONS (Custom AOS) =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
}

// ===== PRODUCT FILTER =====
function initProductFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter || 
                    (filter === 'special' && category === 'special')) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===== PRODUCT MODAL =====
function initProductModal() {
    const modal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const detailBtns = document.querySelectorAll('.btn-detail');

    // Product data
    const productData = {
        'tumbler-sport': {
            name: 'Tumbler Sport',
            category: 'Coating • Spesial',
            image: 'FOTO IKLAN PRODUK/TUMBLER SPORT.jpg',
            description: 'Tumbler Sport ini berbahan utama dari alumunium yang diberi lapisan coating pada bagian sisi luar. Material yang digunakan ini pastinya berkualitas ringan dan tahan lama. Dengan bentuk yang kekinian, Tumbler ini diminati oleh kalangan muda. Tumbler ini juga bisa dijadikan sebagai merchandise acara-acara besar.',
            price: 'Rp 35.000/pcs',
            details: 'Dipadu dengan tutup yang rapat dan tentunya anti bocor serta dilengkapi juga dengan pengait carabiner agar mudah digantung. Desain yang ramping ini juga memudahkan untuk dibawa kemana-mana.',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Tumbler%20Sport%20(Rp%2035.000)'
        },
        'mug-dnan': {
            name: 'Mug Standar D-nan',
            category: 'Coating',
            image: 'FOTO IKLAN PRODUK/MUG STANDART D-NAN.jpg',
            description: 'Mug Standart D-nan terbuat dari keramik berkualitas yang kuat dan tahan lama. Dengan warna putih yang elegan dan lapisan coating yang halus, mug ini cocok untuk digunakan sehari-hari. Lapisan coating yang halus dan tahan terhadap goresan. Dan mudah dibersihkan dan dirawat.',
            price: 'Rp 15.000/pcs',
            details: 'Mug D-nan Coating Import\n• Dibawah 1 doos: Rp 10.000/mug\n• 1–10 doos: Rp 8.800/mug\n• 11–20 doos: Rp 8.600/mug\n• 21–49 doos: Rp 8.300/mug\n• 1 doos isi 48 pcs (4 lusin)',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Standar%20D-nan%20(Rp%2015.000)'
        },
        'mug-tea': {
            name: 'Mug Tea',
            category: 'Coating',
            image: 'FOTO IKLAN PRODUK/MUG TEA.jpg',
            description: 'Mug Tea ini memiliki bentuk yang simpel elegant. Mug Tea ini berbahan utama keramik yang berkualitas dan dilengkapi juga dengan lapisan coating pada bagian luar. Mug ini juga baru hits dan banyak dicari customer karena memiliki bentuk yang banyak disukai oleh kalangan muda.',
            price: 'Rp 16.000/pcs',
            details: 'Mug coating tea, ecer @12.000/mug isi 48 pcs\n1 doos up @11.500/mug\nKategori: Coating',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Tea%20(Rp%2016.000)'
        },
        'mug-bunglon': {
            name: 'Mug Bunglon (Hitam)',
            category: 'Coating • Spesial',
            image: 'FOTO IKLAN PRODUK/MUG BUNGLON.jpg',
            description: 'Mug Bunglon atau sering disebut juga Mug Magic ini terbuat dari keramik yang berkualitas dan dilengkapi dengan lapisan coating pada bagian luar mug. Mug ini memiliki keunikan yaitu pada bagian hitam mug bisa berubah warna sesuai dengan desain yang anda buat ketika mug diisi dengan air panas.',
            price: 'Rp 35.000/pcs',
            details: 'Mug Coating Bunglon Hitam\n• 1 doos isi 24 pcs\n• Ecer: 27.000/mug\n• 1 doos: 26.000/mug\nTampak luar hitam dan dalam mug putih.',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Bunglon%20(Rp%2035.000)'
        },
        'mug-warna-import': {
            name: 'Mug Standart Warna Import (D-nan)',
            category: 'Coating',
            image: 'FOTO IKLAN PRODUK/MUG COATING STANDART WARNA IMPORT.jpg',
            description: 'Mug Standar Warna Dalam ini berbahan utama dari keramik berkualitas tinggi yang dipadukan dengan lapisan coating yang tahan lama. Dengan desain yang sederhana namun elegan, mug ini cocok digunakan sebagai kebutuhan sehari-hari. Satu produsen dengan D-Nan sehingga kualitas tidak diragukan lagi.',
            price: 'Rp 18.000/pcs',
            details: 'Mug coating standart warna Dnan, ecer @12.600 isi 48 pcs\nSering dijadikan sebagai merchandise suatu acara ataupun sebagai hadiah yang menarik.',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Standart%20Warna%20Import%20(Rp%2018.000)'
        },
        'mug-warna-dalam': {
            name: 'Mug Standart Warna Dalam',
            category: 'Coating',
            image: 'FOTO IKLAN PRODUK/MUG STANDART WARNA DALAM.jpg',
            description: 'Mug Standar Warna Dalam kami terbuat dari keramik berkualitas dipadukan dengan lapisan coating yang tahan lama. Dengan desain yang sederhana namun elegan, mug ini cocok digunakan sebagai mug minuman favorit Anda. Cocok untuk penggunaan sehari-hari, hadiah untuk teman atau keluarga, souvenir atau merchandise.',
            price: 'Rp 18.000/pcs',
            details: 'Mug coating warna dalam gagang warna\n• Ecer: Rp 12.600/mug\n• 1 Doos up: Rp 12.100/mug',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Standart%20Warna%20Dalam%20(Rp%2018.000)'
        },
        'mug-liberty': {
            name: 'Mug Liberty',
            category: 'Coating',
            image: 'FOTO IKLAN PRODUK/MUG LIBERTY.jpg',
            description: 'Mug Liberty ini terbuat dari keramik berkualitas dengan finishing pemberian lapisan coating yang menambah keawetan mug. Mug Liberty ini juga memiliki bentuk yang unik dengan tangkai yang menyerupai tanduk. Pada bagian bibir mug juga berbeda dengan mug-mug yang lainnya.',
            price: 'Rp 25.000/pcs',
            details: 'Mug liberty, ecer @20.500/mug isi 36 pcs\n1 doos up @20.000/mug\nKategori: Coating',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Liberty%20(Rp%2025.000)'
        },
        'mug-jengki': {
            name: 'Mug / Cangkir Jengki',
            category: 'Coating',
            image: 'FOTO IKLAN PRODUK/MUG JENGKI.jpg',
            description: 'Mug Jengki Coating ini terbuat dari keramik berkualitas yang pastinya tahan lama, memastikan ketahanan dan kekuatan produk. Dengan harga yang terjangkau, Anda dapat memiliki mug yang stylish dan memiliki banyak fungsi untuk keseharian.',
            price: 'Rp 16.000/pcs',
            details: 'Cangkir Jengki, ecer @12.000/mug isi 72 pcs\n1 doos up @11.500/mug\nKategori: Coating',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Jengki%20(Rp%2016.000)'
        },
        'mug-love': {
            name: 'Mug Love',
            category: 'Coating',
            image: 'FOTO IKLAN PRODUK/MUG LOVE.jpg',
            description: 'Mug Love ini memiliki bentuk yang unik yaitu berbentuk love yang lucu. Mug ini juga berbahan utama dari keramik yang diberi lapisan coating pada bagian luar mug. Mug ini juga memiliki warna putih berseri dan dapat diberikan sablon fullcolour.',
            price: 'Rp 16.000/pcs',
            details: 'Mug love, ecer @12.000/mug isi 48 pcs\n1 doos up @11.500/mug\nKategori: Coating',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Love%20(Rp%2016.000)'
        },
        'mug-non-coating': {
            name: 'Mug Non Coating Hitam',
            category: 'Non Coating',
            image: 'FOTO IKLAN PRODUK/MUG NON COATING HITAM.jpg',
            description: 'Mug Hitam Standar Non Coating ini berbahan utama dari keramik berkualitas yang dipadukan dengan warna hitam sehingga berkesan gagah dan elegant. Mug ini juga menjadi salah satu mug best seller. Dikhususkan untuk produksi sablon pada mug. Cocok juga dijadikan sebagai barang merchandise.',
            price: 'Rp 16.000/pcs',
            details: 'Mug hitam standart (non coating) Dnan\n• Ecer: 12.000/mug\n• 1 doos: 11.500/mug\n• 3 doos up: 11.300/mug\n\nNB: Untuk Mug ini tidak ada garansi retur',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Non%20Coating%20Hitam%20(Rp%2016.000)'
        },
        'mug-corel-putih': {
            name: 'Mug Corel Putih',
            category: 'Non Coating',
            image: 'FOTO IKLAN PRODUK/Gemini_Generated_Image_8cgwsf8cgwsf8cgw.jpg',
            description: 'Mug Corel Putih adalah mug keramik berkualitas dengan desain simpel dan elegan. Tanpa lapisan coating, mug ini cocok untuk kebutuhan sehari-hari, souvenir, maupun merchandise.',
            price: 'Rp 16.000/pcs',
            details: 'Mug Corel Putih\n• Ecer: Rp 11.500/mug\nKategori: Non Coating',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Corel%20Putih%20(Rp%2016.000)'
        },
        'mug-corel-warna': {
            name: 'Mug Corel Warna',
            category: 'Non Coating',
            image: 'FOTO IKLAN PRODUK/MUG COREL WARNA.jpg',
            description: 'Mug Corel Warna adalah mug berbahan utama dari keramik yang berkualitas terbaik. Mug Corel Warna ini juga tidak dilengkapi dengan lapisan coating pada bagian luar mug. Mug Corel Warna juga memiliki banyak varian warna yang menarik.',
            price: 'Rp 18.000/pcs',
            details: 'Mug corel warna ecer 13.500, @13.300/mug isi 48 pcs\nKategori: Non Coating\nSering dicari karena memiliki beberapa warna yang menarik.',
            whatsapp: 'https://wa.me/6285945015823?text=Halo%20Azimug%20Store%2C%20saya%20ingin%20memesan%20Mug%20Corel%20Warna%20(Rp%2018.000)'
        }
    };

    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-product');
            const product = productData[productId];
            if (!product) return;

            document.getElementById('modal-img').src = product.image;
            document.getElementById('modal-img').alt = product.name;
            document.getElementById('modal-category').textContent = product.category;
            document.getElementById('modal-title').textContent = product.name;
            document.getElementById('modal-description').textContent = product.description;
            document.getElementById('modal-price').textContent = product.price;
            document.getElementById('modal-details').textContent = product.details;
            document.getElementById('modal-order-btn').href = product.whatsapp;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== CARD TILT EFFECT =====
function initCardTiltEffect() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CARD MOUSE GLOW EFFECT =====
function initCardGlow() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}
