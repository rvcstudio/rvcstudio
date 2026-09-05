console.log('🚀 main.js cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM listo');

    // =============================================
    // 1. OBTENER DATOS DESDE LOS ARCHIVOS EXTERNOS
    // =============================================
    const novedadesData = window.novedades || [];
    const tutorialesData = window.tutoriales || [];
    const allData = [...novedadesData, ...tutorialesData];

    console.log(`📊 Novedades: ${novedadesData.length}, Tutoriales: ${tutorialesData.length}, Total: ${allData.length}`);

    // Si no hay datos, mostramos un aviso
    if (allData.length === 0) {
        console.warn('⚠️ No se encontraron datos en window.novedades ni window.tutoriales');
    }

    // =============================================
    // 2. FUNCIONES REUTILIZABLES
    // =============================================
    function renderVerticalCards(containerId, posts, baseUrl) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`⚠️ Contenedor #${containerId} no encontrado`);
            return;
        }
        console.log(`🎨 Renderizando ${posts.length} tarjetas verticales en #${containerId}`);
        
        const h2 = container.querySelector('h2');
        container.innerHTML = '';
        if (h2) container.appendChild(h2);
        
        posts.slice(0, 5).forEach(post => {
            const card = document.createElement('a');
            card.className = 'tarjeta-vertical';
            card.href = `${baseUrl}?post=${post.id}`;
            card.innerHTML = `
                <div class="img-vertical" style="background-image: url('${post.imagenCover}');"></div>
                <div class="info-vertical">
                    <h3>${post.titulo}</h3>
                </div>
            `;
            container.appendChild(card);
        });
    }

    async function loadArticle(containerId, postId, postsData, baseUrl) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`⚠️ Contenedor #${containerId} no encontrado`);
            return;
        }

        const post = postsData.find(p => p.id === postId);
        if (!post) {
            console.warn(`⚠️ Post con ID "${postId}" no encontrado`);
            container.innerHTML = '<h2 style="color:#ffffff;">Artículo no encontrado</h2>';
            return;
        }

        console.log(`📖 Cargando artículo: ${post.titulo} desde ${post.archivoUrl}`);

        try {
            const response = await fetch(post.archivoUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const html = await response.text();
            container.innerHTML = `<div class="articulo-cargado">${html}</div>`;
            document.title = post.titulo + ' | RVC Studio';
            console.log(`✅ Artículo cargado: ${post.titulo}`);
        } catch (e) {
            console.error(`❌ Error al cargar ${post.archivoUrl}:`, e);
            container.innerHTML = '<h2 style="color:#ffffff;">Error al cargar el artículo</h2>';
        }

        // Recomendados
        const recContainer = document.getElementById('contenedor-lista-recomendados');
        if (recContainer) {
            recContainer.innerHTML = '';
            const others = postsData.filter(p => p.id !== postId);
            others.forEach(p => {
                const card = document.createElement('a');
                card.className = 'tarjeta-tutorial';
                card.href = `${baseUrl}?post=${p.id}`;
                card.innerHTML = `
                    <div class="info-tarjeta"><h3>${p.titulo}</h3></div>
                    <div class="img-tarjeta" style="background-image: url('${p.imagenCover}');"></div>
                `;
                recContainer.appendChild(card);
            });

            // Redes sociales
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
            recContainer.appendChild(social);
        }
    }

    // =============================================
    // 3. DETECCIÓN DE PÁGINA
    // =============================================
    const hasIndexContainer = document.getElementById('contenedor-horizontales');
    const hasNovedadesContainer = document.getElementById('contenido-del-articulo');
    const hasTutorialesContainer = document.getElementById('contenido-del-tutorial');

    console.log(`📍 Página detectada: ${hasIndexContainer ? 'INDEX' : hasNovedadesContainer ? 'NOVEDADES' : hasTutorialesContainer ? 'TUTORIALES' : 'DESCONOCIDA'}`);

    // ---------- INDEX ----------
    if (hasIndexContainer) {
        console.log('🏠 Renderizando INDEX');
        const contVertical = document.getElementById('contenedor-verticales');
        const contHorizontal = document.getElementById('contenedor-horizontales');

        if (contVertical) {
            const h2 = contVertical.querySelector('h2');
            contVertical.innerHTML = '';
            if (h2) contVertical.appendChild(h2);
        }
        if (contHorizontal) contHorizontal.innerHTML = '';

        allData.forEach((post, index) => {
            let baseUrl = 'novedades.html';
            if (tutorialesData.some(p => p.id === post.id)) {
                baseUrl = 'tutoriales.html';
            }

            if (index < 3) {
                const card = document.createElement('a');
                card.className = 'tarjeta-vertical';
                card.href = `${baseUrl}?post=${post.id}`;
                card.innerHTML = `
                    <div class="img-vertical" style="background-image: url('${post.imagenCover}');"></div>
                    <div class="info-vertical"><h3>${post.titulo}</h3></div>
                `;
                if (contVertical) contVertical.appendChild(card);
            } else {
                const card = document.createElement('a');
                card.className = 'tarjeta-novedades';
                card.href = `${baseUrl}?post=${post.id}`;
                card.innerHTML = `
                    <div class="info-tarjeta"><h3>${post.titulo}</h3></div>
                    <div class="img-tarjeta" style="background-image: url('${post.imagenCover}');"></div>
                `;
                if (contHorizontal) contHorizontal.appendChild(card);
            }
        });
    }

    // ---------- NOVEDADES ----------
    if (hasNovedadesContainer) {
        console.log('📰 Renderizando NOVEDADES');
        const params = new URLSearchParams(window.location.search);
        const postID = params.get('post');

        renderVerticalCards('contenedor-verticales', novedadesData, 'novedades.html');

        if (postID) {
            loadArticle('contenido-del-articulo', postID, novedadesData, 'novedades.html');
        } else if (novedadesData.length > 0) {
            loadArticle('contenido-del-articulo', novedadesData[0].id, novedadesData, 'novedades.html');
        } else {
            const container = document.getElementById('contenido-del-articulo');
            if (container) container.innerHTML = '<h2 style="color:#ffffff;">No hay novedades disponibles</h2>';
        }
    }

    // ---------- TUTORIALES ----------
    if (hasTutorialesContainer) {
        console.log('🎓 Renderizando TUTORIALES');
        const params = new URLSearchParams(window.location.search);
        const postID = params.get('post');

        renderVerticalCards('contenedor-verticales', tutorialesData, 'tutoriales.html');

        if (postID) {
            loadArticle('contenido-del-tutorial', postID, tutorialesData, 'tutoriales.html');
        } else if (tutorialesData.length > 0) {
            loadArticle('contenido-del-tutorial', tutorialesData[0].id, tutorialesData, 'tutoriales.html');
        } else {
            const container = document.getElementById('contenido-del-tutorial');
            if (container) container.innerHTML = '<h2 style="color:#ffffff;">No hay tutoriales disponibles</h2>';
        }
    }

    // =============================================
    // 4. COOKIES (solo si existen)
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
