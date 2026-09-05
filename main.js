console.log('🚀 main.js cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM listo');

    // =============================================
    // 1. OBTENER DATOS GLOBALES
    // =============================================
    const novedadesData = window.novedades || [];
    const tutorialesData = window.tutoriales || [];
    const allData = [...novedadesData, ...tutorialesData];

    console.log(`📊 Novedades: ${novedadesData.length}, Tutoriales: ${tutorialesData.length}, Total: ${allData.length}`);

    // =============================================
    // 2. DETECCIÓN DE PÁGINA
    // =============================================
    const isIndex = document.getElementById('contenedor-horizontales') !== null;
    const isNovedades = document.getElementById('contenido-del-articulo') !== null;
    const isTutoriales = document.getElementById('contenido-del-tutorial') !== null;

    console.log(`📍 Página: ${isIndex ? 'INDEX' : isNovedades ? 'NOVEDADES' : isTutoriales ? 'TUTORIALES' : 'DESCONOCIDA'}`);

    // =============================================
    // 3. FUNCIONES REUTILIZABLES
    // =============================================

    function renderVerticalCards(containerId, posts, baseUrl) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`⚠️ Contenedor #${containerId} no encontrado`);
            return;
        }

        const h2 = container.querySelector('h2');
        const socialBlock = container.querySelector('.social-footer');
        container.innerHTML = '';
        if (h2) container.appendChild(h2);

        posts.slice(0, 5).forEach(post => {
            console.log(`🖼️ Vertical - URL imagen: ${post.imagenCover}`); // <--- LOG
            const card = document.createElement('a');
            card.className = 'tarjeta-vertical';
            card.href = `${baseUrl}?post=${post.id}`;
            card.innerHTML = `
                <div class="img-vertical" style="background-image: url('${post.imagenCover}'); background-color: #2a2a2a;"></div>
                <div class="info-vertical">
                    <h3>${post.titulo}</h3>
                    ${post.resumen ? `<p>${post.resumen}</p>` : ''}
                </div>
            `;
            container.appendChild(card);
        });

        if (posts.length === 0) {
            const msg = document.createElement('p');
            msg.style.color = '#888';
            msg.textContent = 'No hay contenido disponible aún.';
            container.appendChild(msg);
        }

        if (socialBlock) {
            container.appendChild(socialBlock);
        } else {
            const social = document.createElement('div');
            social.className = 'social-footer';
            social.innerHTML = `
                <p>Síguenos en:</p>
                <div class="social-icons">
                    <a href="https://www.instagram.com/r.v.c_studio" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/@rvc_studio" target="_blank"><i class="fab fa-youtube"></i></a>
                    <a href="https://www.facebook.com/profile.php?id=61590301659913" target="_blank"><i class="fab fa-facebook"></i></a>
                </div>
            `;
            container.appendChild(social);
        }
    }

    async function loadArticle(containerId, postId, postsData, baseUrl) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`⚠️ Contenedor #${containerId} no encontrado`);
            return;
        }

        const post = postsData.find(p => p.id === postId);
        if (!post) {
            container.innerHTML = '<h2 style="color:#ffffff; text-align:center;">Artículo no encontrado</h2>';
            return;
        }

        console.log(`📖 Cargando: ${post.titulo} desde ${post.archivoUrl}`);

        try {
            const response = await fetch(post.archivoUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const html = await response.text();
            container.innerHTML = `<div class="articulo-cargado">${html}</div>`;
            document.title = post.titulo + ' | RVC Studio';
            console.log('✅ Artículo cargado');
        } catch (e) {
            console.error('❌ Error al cargar:', e);
            container.innerHTML = `
                <div class="error-container">
                    <h2>Error al cargar el artículo</h2>
                    <p>No se pudo obtener el contenido. Verifica que el archivo <code>${post.archivoUrl}</code> exista.</p>
                    <button class="btn-retry" onclick="location.reload()">Reintentar</button>
                </div>
            `;
        }

        const recContainer = document.getElementById('contenedor-lista-recomendados');
        if (recContainer) {
            recContainer.innerHTML = '';
            const others = postsData.filter(p => p.id !== postId);
            if (others.length === 0) {
                recContainer.innerHTML = '<p style="color:#666;">No hay más artículos por ahora.</p>';
            } else {
                others.forEach(p => {
                    const card = document.createElement('a');
                    card.className = 'tarjeta-tutorial';
                    card.href = `${baseUrl}?post=${p.id}`;
                    card.innerHTML = `
                        <div class="info-tarjeta"><h3>${p.titulo}</h3></div>
                        <div class="img-tarjeta" style="background-image: url('${p.imagenCover}'); background-color: #2a2a2a;"></div>
                    `;
                    recContainer.appendChild(card);
                });
            }
        }
    }

    // =============================================
    // 4. RENDERIZAR SEGÚN PÁGINA
    // =============================================

    if (isIndex) {
        console.log('🏠 Renderizando INDEX');
        const contVertical = document.getElementById('contenedor-verticales');
        const contHorizontal = document.getElementById('contenedor-horizontales');

        if (contVertical) {
            const h2 = contVertical.querySelector('h2');
            const social = contVertical.querySelector('.social-footer');
            contVertical.innerHTML = '';
            if (h2) contVertical.appendChild(h2);
            
            allData.slice(0, 5).forEach(post => {
                console.log(`🖼️ Vertical Index - URL: ${post.imagenCover}`); // <--- LOG
                let baseUrl = 'novedades.html';
                if (tutorialesData.some(p => p.id === post.id)) {
                    baseUrl = 'tutoriales.html';
                }
                const card = document.createElement('a');
                card.className = 'tarjeta-vertical';
                card.href = `${baseUrl}?post=${post.id}`;
                card.innerHTML = `
                    <div class="img-vertical" style="background-image: url('${post.imagenCover}'); background-color: #2a2a2a;"></div>
                    <div class="info-vertical">
                        <h3>${post.titulo}</h3>
                    </div>
                `;
                contVertical.appendChild(card);
            });

            if (allData.length === 0) {
                const msg = document.createElement('p');
                msg.style.color = '#888';
                msg.textContent = 'No hay contenido disponible aún.';
                contVertical.appendChild(msg);
            }

            if (social) {
                contVertical.appendChild(social);
            } else {
                const newSocial = document.createElement('div');
                newSocial.className = 'social-footer';
                newSocial.innerHTML = `
                    <p>Síguenos en:</p>
                    <div class="social-icons">
                        <a href="https://www.instagram.com/r.v.c_studio" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.youtube.com/@rvc_studio" target="_blank"><i class="fab fa-youtube"></i></a>
                        <a href="https://www.facebook.com/profile.php?id=61590301659913" target="_blank"><i class="fab fa-facebook"></i></a>
                    </div>
                `;
                contVertical.appendChild(newSocial);
            }
        }

        if (contHorizontal) {
            contHorizontal.innerHTML = '';
            allData.forEach(post => {
                console.log(`🖼️ Horizontal Index - URL: ${post.imagenCover}`); // <--- LOG
                let baseUrl = 'novedades.html';
                if (tutorialesData.some(p => p.id === post.id)) {
                    baseUrl = 'tutoriales.html';
                }
                const card = document.createElement('a');
                card.className = 'tarjeta-tutorial';
                card.href = `${baseUrl}?post=${post.id}`;
                card.innerHTML = `
                    <div class="info-tarjeta">
                        <h3>${post.titulo}</h3>
                        ${post.resumen ? `<p>${post.resumen}</p>` : ''}
                    </div>
                    <div class="img-tarjeta" style="background-image: url('${post.imagenCover}'); background-color: #2a2a2a;"></div>
                `;
                contHorizontal.appendChild(card);
            });

            if (allData.length === 0) {
                contHorizontal.innerHTML = '<p style="color:#888; text-align:center;">Próximamente más contenido.</p>';
            }
        }
    }

    if (isNovedades) {
        console.log('📰 Renderizando NOVEDADES');
        const params = new URLSearchParams(window.location.search);
        const postID = params.get('post');
        renderVerticalCards('contenedor-verticales', novedadesData, 'novedades.html');
        const container = document.getElementById('contenido-del-articulo');
        if (postID) {
            loadArticle('contenido-del-articulo', postID, novedadesData, 'novedades.html');
        } else if (novedadesData.length > 0) {
            loadArticle('contenido-del-articulo', novedadesData[0].id, novedadesData, 'novedades.html');
        } else {
            if (container) container.innerHTML = '<h2 style="color:#ffffff; text-align:center;">No hay novedades disponibles</h2>';
        }
    }

    if (isTutoriales) {
        console.log('🎓 Renderizando TUTORIALES');
        const params = new URLSearchParams(window.location.search);
        const postID = params.get('post');
        renderVerticalCards('contenedor-verticales', tutorialesData, 'tutoriales.html');
        const container = document.getElementById('contenido-del-tutorial');
        if (postID) {
            loadArticle('contenido-del-tutorial', postID, tutorialesData, 'tutoriales.html');
        } else if (tutorialesData.length > 0) {
            loadArticle('contenido-del-tutorial', tutorialesData[0].id, tutorialesData, 'tutoriales.html');
        } else {
            if (container) container.innerHTML = '<h2 style="color:#ffffff; text-align:center;">No hay tutoriales disponibles</h2>';
        }
    }

    // =============================================
    // 5. COOKIES
    // =============================================
    const banner = document.getElementById('cookie-banner');
    const btn = document.getElementById('accept-cookies');
    if (banner && localStorage.getItem('cookiesAceptadas') === 'true') {
        banner.style.display = 'none';
    }
    if (btn) {
        btn.addEventListener('click', () => {
            localStorage.setItem('cookiesAceptadas', 'true');
            if (banner) banner.style.display = 'none';
        });
    }

    console.log('✅ main.js finalizado');
});
