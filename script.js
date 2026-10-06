// State
let userData = {
    idade: '',
    pele: '',
    objetivo: '',
    foco: '',
    tempo: '',
    rotina: ''
};

const totalSteps = 11;
let currentStep = 0;

const warmedImageCache = new Map();
let vslStudioLoadPromise = null;
let vslWarmupStarted = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (currentStep > 0) {
        updateProgress();
        setTimeout(() => {
            document.getElementById('appHeader').classList.add('visible');
        }, 100);
    } else {
        startInitSequence();
    }
});

function warmImage(src) {
    const url = new URL(src, document.baseURI).href;
    if (warmedImageCache.has(url)) return warmedImageCache.get(url);

    const image = new Image();
    image.decoding = 'async';
    image.fetchPriority = 'low';
    image.src = url;
    if (typeof image.decode === 'function') image.decode().catch(() => {});
    warmedImageCache.set(url, image);
    return image;
}

function warmUpcomingQuizImages() {
    const warm = () => {
        const run = () => {
            warmImage('assets/leticia_52.jpg');
            warmImage('assets/after_final.png');
            warmImage('assets/before_final.png');
        };
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(run, { timeout: 1500 });
        } else {
            window.setTimeout(run, 300);
        }
    };

    if (document.readyState === 'complete') {
        warm();
    } else {
        window.addEventListener('load', warm, { once: true });
    }
}

function warmCarouselImages() {
    [
        'assets/ba1.1.webp',
        'assets/ba2.2.webp',
        'assets/ba3.3.webp',
        'assets/ba4.4.webp'
    ].forEach(warmImage);
}

// Init sequence for Step 0
let testimonialInterval;
let carouselInterval;

function startInitSequence() {
    const appHeader = document.getElementById('appHeader');
    if (appHeader) appHeader.classList.add('hidden');

    initTestimonials();
    warmUpcomingQuizImages();
}

const testimonials = [
    { name: "Claudete", age: 52, text: "Seguí el plan durante tres semanas y mi hermana me preguntó si me había hecho bótox. ¡Nunca me había sentido tan bien! ¡Me encantó! 😍❤️" },
    { name: "Mariana", age: 45, text: "Los masajes son relajantes y el efecto en la firmeza de mi piel es impresionante. ¡Lo recomiendo mucho!" },
    { name: "Luciana", age: 58, text: "Por fin encontré algo natural que funciona. Las arrugas alrededor de mis ojos se notan menos." }
];

let currentTestimonialIndex = 0;

function initTestimonials() {
    const slider = document.getElementById('initTestimonialSlider');
    if (!slider) return;
    
    function renderTestimonial(index) {
        const t = testimonials[index];
        slider.innerHTML = `
            <div class="init-testimonial-card fade-in">
                <div class="init-testimonial-header">
                    <strong>${t.name}, ${t.age} años</strong>
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                </div>
                <p class="init-testimonial-text">"${t.text}"</p>
            </div>
        `;
    }

    renderTestimonial(0);
    
    testimonialInterval = setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        renderTestimonial(currentTestimonialIndex);
    }, 2500);
}

// Step Navigation
function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep--;
        updateProgress();
        
        const prevElem = document.getElementById(`step${currentStep}`);
        prevElem.classList.add('active');
        
        updateStepUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateStepUI() {
    const appHeader = document.getElementById('appHeader');
    const headerImg = document.getElementById('headerImg');
    const backBtn = document.getElementById('backBtn');

    if (currentStep === 0) {
        if(appHeader) appHeader.classList.add('hidden');
        if(backBtn) backBtn.classList.add('hidden');
        return;
    }

    if(appHeader) {
        appHeader.classList.remove('hidden');
        if (!appHeader.classList.contains('visible')) {
            setTimeout(() => appHeader.classList.add('visible'), 50);
        }
    }

    if (headerImg) headerImg.style.display = 'block';

    if (backBtn) {
        if (currentStep === 1 || currentStep >= 10) backBtn.classList.add('hidden');
        else backBtn.classList.remove('hidden');
    }

    if (currentStep === 5 || currentStep === 9) {
        if (headerImg) headerImg.style.display = 'none';
    } else if (currentStep === 10 || currentStep === 11) {
        if(appHeader) appHeader.classList.add('hidden');
    }
}

function nextStep(stepNum, key, value) {
    if (key && value) {
        userData[key] = value;
    }
    
    // Hide current
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Update step tracker
    currentStep = stepNum;
    
    // Progress calculation
    updateProgress();

    // Show next
    const nextElem = document.getElementById(`step${currentStep}`);
    nextElem.classList.add('active');
    
    updateStepUI();
    
    if (currentStep === 8) {
        warmCarouselImages();
    } else if (currentStep === 9) {
        startLoadingSequence();
    } else if (currentStep === 10) {
        warmVslPlayer();
    } else if (currentStep === 11) {
        loadVslPlayer();
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
    const progressEl = document.getElementById('progressBar');
    const stepNumEl = document.getElementById('currentStepNum');
    
    let progressPct = ((currentStep - 1) / (totalSteps - 2)) * 100;
    if (progressPct > 100) progressPct = 100;
    
    progressEl.style.width = `${progressPct}%`;
    if (currentStep <= 10) {
        stepNumEl.innerText = currentStep;
    }
}

// Loading Sequence for Step 9
function startLoadingSequence() {
    warmCarouselImages();
    warmVslPlayer();
    warmImage('assets/foto_9.webp');

    // Reset/Ensure carousel container, loading tasks, and spinner are visible
    const carouselCard = document.getElementById('baCarouselCard');
    if (carouselCard) carouselCard.style.display = 'flex';
    const loadingTasks = document.querySelector('.loading-tasks');
    if (loadingTasks) loadingTasks.style.display = 'block';
    const spinner = document.querySelector('.spinner-container');
    if (spinner) spinner.style.display = 'block';

    // Start carousel rotation
    startCarousel();

    const tasks = [
        { id: 'task1', duration: 5000 },
        { id: 'task2', duration: 5000 },
        { id: 'task3', duration: 5000 }
    ];
    
    let delay = 0;
    
    tasks.forEach((task, index) => {
        setTimeout(() => {
            const el = document.getElementById(task.id);
            if (el) el.classList.add('active');
            
            // Animate percentage
            animatePercentage(el, task.duration);
            
            // If it's the last task, automatically go to step 10 after it finishes
            if (index === tasks.length - 1) {
                setTimeout(() => {
                    // Ocultar barras de carregamento
                    const loadingTasks = document.querySelector('.loading-tasks');
                    if (loadingTasks) loadingTasks.style.display = 'none';

                    // Ocultar spinner
                    const spinner = document.querySelector('.spinner-container');
                    if (spinner) spinner.style.display = 'none';

                    // Ocultar carrossel e limpar o timer
                    const carouselCard = document.getElementById('baCarouselCard');
                    if (carouselCard) carouselCard.style.display = 'none';
                    if (carouselInterval) clearInterval(carouselInterval);

                    // Mostrar a nova foto 9
                    const step9Img = document.getElementById('step9Image');
                    if (step9Img) {
                        step9Img.classList.remove('hidden');
                        step9Img.style.animation = 'fadeInSlide 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                    }

                    // Na etapa 9, após carregar, remover a imagem do cabeçalho mantendo a barrinha
                    const headerImg = document.getElementById('headerImg');
                    if (headerImg) headerImg.style.display = 'none';

                    // Em vez de pular automaticamente, revelamos o botão Continuar
                    const btn = document.getElementById('btnContinueStep10');
                    if (btn) btn.classList.remove('hidden');
                    
                    // Mostramos também o resultado do diagnóstico de forma animada
                    const diag = document.getElementById('step9Diagnosis');
                    if (diag) {
                        diag.classList.remove('hidden');
                        diag.style.animation = 'fadeInSlide 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                    }

                    const loadingTitle = document.querySelector('#step9 .loading-view > .step-title');
                    if (loadingTitle) loadingTitle.textContent = 'Tu análisis está listo.';

                    // Esconde depoimentos genéricos
                    const testimonials = document.getElementById('step9Testimonials');
                    if (testimonials) testimonials.classList.add('hidden');

                    // Mostra o chat simulado
                    const chat = document.getElementById('step9Chat');
                    if (chat) {
                        chat.classList.remove('hidden');
                        chat.style.animation = 'fadeInSlide 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                    }
                }, task.duration + 500);
            }
        }, delay);
        delay += task.duration + 200; // start next slightly after this finishes
    });
}

function startCarousel() {
    const images = document.querySelectorAll('.ba-carousel-img');
    const indicators = document.querySelectorAll('.ba-carousel-indicators .indicator');
    if (images.length === 0) return;

    images.forEach((img, idx) => img.classList.toggle('active', idx === 0));
    indicators.forEach((indicator, idx) => indicator.classList.toggle('active', idx === 0));

    let currentIndex = 0;
    let advancePending = false;
    if (carouselInterval) clearInterval(carouselInterval);

    carouselInterval = setInterval(async () => {
        if (advancePending) return;
        advancePending = true;
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImage = images[nextIndex];

        try {
            if (typeof nextImage.decode === 'function') {
                await nextImage.decode();
            } else if (!nextImage.complete) {
                return;
            }
            if (!nextImage.naturalWidth) return;

            images[currentIndex].classList.remove('active');
            if (indicators[currentIndex]) indicators[currentIndex].classList.remove('active');
            currentIndex = nextIndex;
            nextImage.classList.add('active');
            if (indicators[currentIndex]) indicators[currentIndex].classList.add('active');
        } catch (_) {
            // Keep the current slide visible if the next image is still unavailable.
        } finally {
            advancePending = false;
        }
    }, 2000);
}

function animatePercentage(taskEl, duration) {
    const pctEl = taskEl.querySelector('.task-pct');
    const barEl = taskEl.querySelector('.task-bar-fill');
    let start = 0;
    const end = 100;
    const interval = 20; 
    const steps = duration / interval;
    const increment = end / steps;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
            start = end;
            clearInterval(timer);
            pctEl.innerHTML = '100% <span style="color:#51cf66; margin-left:5px;">✓</span>';
            if (barEl) barEl.style.width = '100%';
        } else {
            pctEl.innerText = Math.floor(start) + '%';
            if (barEl) barEl.style.width = start + '%';
        }
    }, interval);
}


// Warm configuration during analysis; scripts already load when the quiz opens.
function warmVslPlayer() {
    if (vslWarmupStarted) return;
    vslWarmupStarted = true;

    fetch('https://vsl-studio3d.vercel.app/api/config/botox-koreano-9-90-dol', { mode: 'cors' })
        .then(response => {
            if (!response.ok) throw new Error(`config ${response.status}`);
            return response.json();
        })
        .catch(() => {});
}

function ensureVslStudioLoaded() {
    if (window.VslStudio?.mount) return Promise.resolve(window.VslStudio);
    if (vslStudioLoadPromise) return vslStudioLoadPromise;

    vslStudioLoadPromise = new Promise((resolve, reject) => {
        const script = document.getElementById('vsl-studio-embed');
        const loaded = () => {
            if (window.VslStudio?.mount) {
                resolve(window.VslStudio);
            } else {
                vslStudioLoadPromise = null;
                reject(new Error('El reproductor no estuvo disponible.'));
            }
        };
        const failed = () => {
            vslStudioLoadPromise = null;
            reject(new Error('No se pudo cargar el reproductor.'));
        };
        if (!script || script.dataset.failed === 'true') {
            failed();
        } else if (script.dataset.loaded === 'true') {
            loaded();
        } else {
            script.addEventListener('load', loaded, { once: true });
            script.addEventListener('error', failed, { once: true });
        }
    });

    return vslStudioLoadPromise;
}

// Mount only after the video step is visible so hidden autoplay cannot count down.
function loadVslPlayer() {
    const container = document.getElementById('vslVideoContainer');
    if (!container || currentStep !== 11) return;
    let mount = document.getElementById('vslBotoxCoreano');
    if (!mount) {
        mount = document.createElement('div');
        mount.id = 'vslBotoxCoreano';
        mount.dataset.vsl = 'botox-koreano-9-90-dol';
        container.appendChild(mount);
    }
    if (mount.dataset.vslLoaded === 'true') return;

    mount.dataset.vslLoaded = 'true';

    ensureVslStudioLoaded()
        .then(vslStudio => {
            if (currentStep !== 11 || container.getBoundingClientRect().width === 0) {
                mount.dataset.vslLoaded = 'false';
                return;
            }
            vslStudio.mount(mount);
        })
        .catch(error => {
            mount.dataset.vslLoaded = 'false';
            console.error('[vsl]', error);
        });
}

// Before & After Slider Logic
function updateBaSlider(el) {
    const val = el.value;
    const clippedImg = document.getElementById('imgBeforeClipped');
    const handle = document.getElementById('baSliderHandle');
    
    if (clippedImg) {
        clippedImg.style.clipPath = `inset(0 ${100 - val}% 0 0)`;
    }
    if (handle) {
        handle.style.left = val + '%';
    }
}
