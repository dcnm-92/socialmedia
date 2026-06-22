// --- 1. CLEAN RE-DIRECTIONS DESIGNED TO BYPASS DEVICE FIREWALLS & SECURE BLOCKERS ---
        const socialLinks = {
            instagram: "https://www.instagram.com/dhamuchettiar/",
            youtube: "https://www.youtube.com/@DCNM-",
            facebook: "https://www.facebook.com/people/Dhamu-Chettiar-Nagai-Maaligai-DCNM/61551798070420/",
            pinterest: "https://in.pinterest.com/dhamuchettiarnagaimaaligai/",
            whatsapp: "https://whatsapp.com/channel/0029Vau3aGc8KMqqiJJDY60n", 
            x: "https://x.com/Dcnm_1992",
            website: "https://www.dcnmjewels.in/", 
            android: "https://play.google.com/store/apps/details?id=com.dhamu.wincrm&pcampaignid=web_share",
            ios: "https://apps.apple.com/us/app/dhamu-jewels/id1620156464"
        };

        const reviewLinks = {
            gobi: "https://g.page/r/Ce0TtEyV_RWmEAE/review",
            anthiyur: "https://g.page/r/Ce-CcnAFXcaIEAE/review",
            sathy: "https://g.page/r/CVbjLBKv9W0eEAE/review",
            avinashi: "https://g.page/r/CebHIZiISWnUEAE/review",
            thalavadi: "https://g.page/r/CWRocvP5_AF9EAE/review",
            jmm: "https://g.page/r/CXAzoFGOYEIeEAE/review"
        };

        const cmsContent = {
            welcomeTag: "THE LUXURY ECOSYSTEM HUB",
            welcomeTitle: "DCNM DIGITAL WORLD",
            welcomeSubtitle: "Step inside a masterfully engineered dynamic architecture built for seamless social interaction, branch performance reviews, and customer expression.",
            socialTitle: "EXPLORE OUR SOCIAL MEDIA",
            reviewTitle: "GOOGLE REVIEWS & FEEDBACK",
            thankMessage: "Your presence in our ecosystem drives our relentless pursuit of futuristic luxury, perfect operational performance, and worldwide connectivity. Let us reshape the boundaries together."
        };

        // --- 2. THE THREE.JS 3D ROUND WORLD LOGIC ---
        function initThreeJSGlobe() {
            const container = document.getElementById('globe-container');
            if(!container) return;

            const width = container.clientWidth;
            const height = container.clientHeight;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.z = 220;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
            container.appendChild(renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
            scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xD4AF37, 2, 500);
            pointLight.position.set(100, 100, 100);
            scene.add(pointLight);

            const globeGroup = new THREE.Group();
            scene.add(globeGroup);

            const particleCount = 1800;
            const particlesGeo = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const r = 80;

            for (let i = 0; i < particleCount; i++) {
                const phi = Math.acos(-1 + (2 * i) / particleCount);
                const theta = Math.sqrt(particleCount * Math.PI) * phi;

                const x = r * Math.sin(phi) * Math.cos(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(phi);

                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
            }

            particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const particlesMat = new THREE.PointsMaterial({
                color: 0x800020, 
                size: 1.8,
                transparent: true,
                opacity: 0.85,
                blending: THREE.NormalBlending
            });

            const pointCloud = new THREE.Points(particlesGeo, particlesMat);
            globeGroup.add(pointCloud);

            const wireSphereGeo = new THREE.SphereGeometry(78, 24, 24);
            const wireSphereMat = new THREE.MeshBasicMaterial({
                color: 0xD4AF37, 
                wireframe: true,
                transparent: true,
                opacity: 0.15
            });
            const wireSphere = new THREE.Mesh(wireSphereGeo, wireSphereMat);
            globeGroup.add(wireSphere);

            const ringsCount = 2;
            for(let j = 0; j < ringsCount; j++) {
                const ringGeo = new THREE.RingGeometry(84, 84.4, 64);
                const ringMat = new THREE.MeshBasicMaterial({
                    color: 0xD4AF37,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.2
                });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.random() * Math.PI;
                ring.rotation.y = Math.random() * Math.PI;
                globeGroup.add(ring);
            }

            let isDragging = false;
            let previousMousePosition = { x: 0, y: 0 };

            const handleStart = (e) => {
                isDragging = true;
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                previousMousePosition = { x: clientX, y: clientY };
            };

            const handleMove = (e) => {
                if (!isDragging) return;
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                const deltaMove = {
                    x: clientX - previousMousePosition.x,
                    y: clientY - previousMousePosition.y
                };

                globeGroup.rotation.y += deltaMove.x * 0.005;
                globeGroup.rotation.x += deltaMove.y * 0.005;

                previousMousePosition = { x: clientX, y: clientY };
            };

            const handleEnd = () => { isDragging = false; };

            container.addEventListener('mousedown', handleStart);
            container.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleEnd);

            container.addEventListener('touchstart', handleStart, { passive: true });
            container.addEventListener('touchmove', handleMove, { passive: true });
            window.addEventListener('touchend', handleEnd);

            function animate() {
                requestAnimationFrame(animate);
                if (!isDragging) {
                    globeGroup.rotation.y += 0.0012;
                    globeGroup.rotation.x += 0.0002;
                }
                renderer.render(scene, camera);
            }

            window.addEventListener('resize', () => {
                const w = container.clientWidth;
                const h = container.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            });

            animate();
        }

        // --- 3. DYNAMIC RENDERING MODULES ---
        function renderSocialCards() {
            const container = document.getElementById('social-grid');
            if(!container) return;

            const platforms = [
                { key: 'instagram', name: 'Instagram', desc: 'Visual storytelling, updates, and interactions.', icon: 'fa-brands fa-instagram text-pink-700', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
                { key: 'youtube', name: 'YouTube', desc: 'Premium digital broadcasts and masterclass showcases.', icon: 'fa-brands fa-youtube text-red-700', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
                { key: 'facebook', name: 'Facebook', desc: 'Community interaction and localized developments.', icon: 'fa-brands fa-facebook text-blue-800', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
                { key: 'pinterest', name: 'Pinterest', desc: 'Inspirational board designs and visual discoveries.', icon: 'fa-brands fa-pinterest text-red-700', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
                { key: 'whatsapp', name: 'WhatsApp Channel', desc: 'Realtime ecosystem updates directly on your mobile.', icon: 'fa-brands fa-whatsapp text-green-700', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
                { key: 'x', name: 'X Platform', desc: 'Instant messaging & analytical declarations.', icon: 'fa-brands fa-x-twitter text-heritage-charcoal', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
                { key: 'website', name: 'Official Website', desc: 'Your comprehensive digital corporate portal.', icon: 'fa-solid fa-globe text-heritage-gold', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
                { key: 'android', name: 'Android App', desc: 'Optimized performance engine for your mobile.', icon: 'fa-brands fa-android text-green-600', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
                { key: 'ios', name: 'iOS App', desc: 'The apex fluid visual experience for iOS devices.', icon: 'fa-brands fa-apple text-stone-700', colorClass: 'border-heritage-maroon/10 hover:border-heritage-maroon/60' },
            ];

            container.innerHTML = platforms.map(p => `
                <a href="${socialLinks[p.key]}" target="_blank" rel="noopener noreferrer" class="glass-panel rounded-2xl p-8 flex flex-col justify-between group h-64 border ${p.colorClass}">
                    <div class="space-y-4">
                        <div class="w-14 h-14 rounded-xl bg-heritage-ivory flex items-center justify-center border border-heritage-maroon/10 transition-transform group-hover:scale-110 duration-300">
                            <i class="${p.icon} text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold font-serif text-heritage-maroon tracking-wide flex items-center gap-2 group-hover:text-heritage-gold transition-colors">
                            ${p.name}
                            <i class="fa-solid fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                        </h3>
                        <p class="text-heritage-bronze text-xs font-light leading-relaxed font-sans">${p.desc}</p>
                    </div>
                    
                    <div class="pt-4 border-t border-heritage-maroon/5 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-heritage-bronze group-hover:text-heritage-maroon transition-colors font-optima">
                        <span>Join Redirection</span>
                        <span class="text-heritage-gold transition-colors">dcnm.link</span>
                    </div>
                </a>
            `).join('');
        }

        function renderReviewCards() {
            const container = document.getElementById('reviews-grid');
            if(!container) return;

            const branches = [
                { key: 'gobi', name: 'Gobi Branch' },
                { key: 'anthiyur', name: 'Anthiyur Branch' },
                { key: 'sathy', name: 'Sathy Branch' },
                { key: 'avinashi', name: 'Avinashi Branch' },
                { key: 'thalavadi', name: 'Talavadi Branch' },
                { key: 'jmm', name: 'JMM Branch' }
            ];

            container.innerHTML = branches.map(b => `
                <div class="glass-panel-gold rounded-2xl p-8 flex flex-col justify-between h-72">
                    <div>
                        <div class="flex items-center justify-between mb-4 font-optima">
                            <span class="text-xs uppercase tracking-widest text-heritage-maroon font-bold">Branch Hub</span>
                            <div class="w-8 h-8 rounded-full bg-heritage-maroon/5 border border-heritage-maroon/10 flex items-center justify-center text-heritage-maroon">
                                <i class="fa-brands fa-google"></i>
                            </div>
                        </div>
                        
                        <h4 class="text-xl font-bold font-serif text-heritage-charcoal tracking-wide">${b.name}</h4>
                        <div class="flex items-center space-x-1 text-heritage-gold my-3 text-xs font-sans">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <span class="text-heritage-bronze ml-2 font-semibold">5.0 (Review Matrix)</span>
                        </div>
                        
                        <p class="text-heritage-bronze text-xs font-light leading-relaxed font-sans">Submit your feedback directly to Google and rate your experience at our ${b.name} office.</p>
                    </div>

                    <a href="${reviewLinks[b.key]}" target="_blank" rel="noopener noreferrer" class="w-full py-3 bg-heritage-maroon hover:bg-heritage-crimson text-white rounded-lg font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 font-optima shadow-sm">
                        Write Review <i class="fa-solid fa-pen-nib"></i>
                    </a>
                </div>
            `).join('');
        }

        function applyCMSContent() {
            const tag = document.getElementById('hero-welcome');
            const subtitle = document.getElementById('hero-subtitle');

            if(tag) tag.textContent = cmsContent.welcomeTag;
            if(subtitle) subtitle.textContent = cmsContent.welcomeSubtitle;
        }

        // --- 4. ADVANCED NATIVE SCROLL DEPLOY REVEAL MATRIX ---
        function initScrollAnimations() {
            const revealElements = document.querySelectorAll('.reveal-element');
            
            const observerOptions = {
                root: null,
                threshold: 0.1,
                rootMargin: "0px 0px -40px 0px"
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target); // Animates once for production speed optimization
                    }
                });
            }, observerOptions);

            revealElements.forEach(element => {
                observer.observe(element);
            });
        }

        // --- 5. RUN EXECUTIONS ON LOAD ---
        window.addEventListener('load', () => {
            document.getElementById('current-year').textContent = new Date().getFullYear();
            initThreeJSGlobe();
            renderSocialCards();
            renderReviewCards();
            applyCMSContent();
            initScrollAnimations();
        });