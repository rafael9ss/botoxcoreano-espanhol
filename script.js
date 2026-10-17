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
function initializeQuiz() {
    if (currentStep > 0) {
        updateProgress();
        setTimeout(() => {
            document.getElementById('appHeader').classList.add('visible');
        }, 100);
    } else {
        startInitSequence();
    }
}

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
let carouselInterval;
function startInitSequence() {
    const appHeader = document.getElementById('appHeader');
    if (appHeader) appHeader.classList.add('hidden');
}

// Step Navigation
function prevStep() {
    if (currentStep > 1) {
        cancelPersonalSummary();
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
    if (stepNum === currentStep) return;
    cancelPersonalSummary();
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
    
    if (currentStep === 1) {
        warmUpcomingQuizImages();
        warmVslPlayer();
    } else if (currentStep === 8) {
        warmCarouselImages();
    } else if (currentStep === 9) {
        startPersonalSummary();
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

let personalSummaryTimer;

function cancelPersonalSummary() {
    clearTimeout(personalSummaryTimer);
    const summary = document.getElementById('personalSummary');
    if (summary) summary.hidden = true;
    const loading = document.querySelector('#step9 .loading-view');
    if (loading) loading.hidden = false;
}

function startPersonalSummary() {
    const summary = document.getElementById('personalSummary');
    const loading = document.querySelector('#step9 .loading-view');
    const ages = { '20-29': '20–29 años', '30-39': '30–39 años', '40-49': '40–49 años', '50+': '50 años o más' };
    const focus = { 'Todo el rostro': 'Todo tu rostro', 'Frente': 'La frente', 'Ojos': 'La zona de los ojos', 'Mejillas': 'Las mejillas', 'Cuello': 'El cuello' };
    const times = { 'Menos de 5 min': 'Menos de 5 minutos al día', '5 a 15 min': 'De 5 a 15 minutos al día', 'Más de 15 min': 'Más de 15 minutos al día' };
    document.getElementById('personalAge').textContent = ages[userData.idade] || 'No indicada';
    document.getElementById('personalFocus').textContent = focus[userData.foco] || 'No indicada';
    document.getElementById('personalTime').textContent = times[userData.tempo] || 'No indicado';
    loading.hidden = true;
    summary.hidden = false;
    document.getElementById('appHeader').classList.add('hidden');
    document.getElementById('backBtn').classList.add('hidden');
    warmCarouselImages();
    warmVslPlayer();
    warmImage('assets/foto_9.webp');
    document.getElementById('personalSummaryTitle').focus({ preventScroll: true });
    personalSummaryTimer = setTimeout(() => {
        if (currentStep !== 9) return;
        summary.hidden = true;
        loading.hidden = false;
        updateStepUI();
        startLoadingSequence();
        window.scrollTo({ top: 0, behavior: 'auto' });
        const title = document.querySelector('#step9 .loading-view > .step-title');
        title.setAttribute('tabindex', '-1');
        title.focus({ preventScroll: true });
    }, 5400);
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
    const sequenceStartedAt = performance.now();
    
    tasks.forEach((task, index) => {
        const scheduledStart = sequenceStartedAt + delay;
        setTimeout(() => {
            const el = document.getElementById(task.id);
            if (el) el.classList.add('active');
            
            // Animate percentage
            animatePercentage(el, task.duration, scheduledStart);
            
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
                }, Math.max(0, scheduledStart + task.duration + 500 - performance.now()));
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

function animatePercentage(taskEl, duration, startedAt = performance.now()) {
    if (!taskEl) return;
    const pctEl = taskEl.querySelector('.task-pct');
    const barEl = taskEl.querySelector('.task-bar-fill');
    let lastPercent = -1;

    function update(now) {
        // Elapsed time keeps progress accurate when mobile browsers skip frames.
        const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
        const percent = Math.floor(progress * 100);
        if (pctEl && percent !== lastPercent) {
            pctEl.textContent = percent + '%';
            lastPercent = percent;
        }
        if (barEl) barEl.style.transform = `scaleX(${progress})`;
        if (progress < 1) {
            requestAnimationFrame(update);
        } else if (pctEl) {
            pctEl.innerHTML = '100% <span style="color:#51cf66; margin-left:5px;">✓</span>';
        }
    }

    requestAnimationFrame(update);
}


// Warm configuration during analysis; scripts already load when the quiz opens.
function warmVslPlayer() {
    if (vslWarmupStarted) return;
    vslWarmupStarted = true;
    ensureVslStudioLoaded().catch(() => {});
    ensureYouTubeApiLoaded().catch(() => {});

    fetch('https://vsl-studio3d.vercel.app/api/config/botox-koreano-12-90', { mode: 'cors' })
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
        let script = document.getElementById('vsl-studio-embed');
        if (!script) {
            script = document.createElement('script');
            script.id = 'vsl-studio-embed';
            script.src = 'https://vsl-studio3d.vercel.app/e.js';
            script.async = true;
            script.onload = () => { script.dataset.loaded = 'true'; };
            script.onerror = () => { script.dataset.failed = 'true'; };
            document.head.appendChild(script);
        }
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

let youtubeApiLoadPromise = null;

function ensureYouTubeApiLoaded() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (youtubeApiLoadPromise) return youtubeApiLoadPromise;

    youtubeApiLoadPromise = new Promise((resolve, reject) => {
        let script = document.getElementById('vsl-youtube-iframe-api');
        if (!script) {
            script = document.createElement('script');
            script.id = 'vsl-youtube-iframe-api';
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            script.onerror = () => { script.dataset.failed = 'true'; };
            document.head.appendChild(script);
        }
        const previousReady = window.onYouTubeIframeAPIReady;
        const cleanup = () => {
            clearTimeout(timeout);
            script?.removeEventListener('error', failed);
        };
        const failed = () => {
            cleanup();
            youtubeApiLoadPromise = null;
            reject(new Error('No se pudo cargar el video.'));
        };
        const timeout = window.setTimeout(failed, 15000);
        window.onYouTubeIframeAPIReady = () => {
            try {
                if (typeof previousReady === 'function') previousReady.call(window);
            } finally {
                if (window.YT?.Player) {
                    cleanup();
                    resolve(window.YT);
                } else {
                    failed();
                }
            }
        };
        if (!script || script.dataset.failed === 'true') failed();
        else script.addEventListener('error', failed, { once: true });
    });
    return youtubeApiLoadPromise;
}

// Mount only after the video step is visible so hidden autoplay cannot count down.
function loadVslPlayer() {
    const container = document.getElementById('vslVideoContainer');
    if (!container || currentStep !== 11) return;
    let mount = document.getElementById('vslBotoxCoreano');
    if (!mount) {
        mount = document.createElement('div');
        mount.id = 'vslBotoxCoreano';
        container.appendChild(mount);
    }
    if (mount.dataset.vslLoaded === 'true') return;

    mount.dataset.vslLoaded = 'true';

    Promise.all([ensureVslStudioLoaded(), ensureYouTubeApiLoaded()])
        .then(([vslStudio]) => {
            if (currentStep !== 11 || container.getBoundingClientRect().width === 0) {
                mount.dataset.vslLoaded = 'false';
                return;
            }
            mount.dataset.vsl = 'botox-koreano-12-90';
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

// This script is at the end of body; do not wait for third-party deferred trackers.
initializeQuiz();
