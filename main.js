document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. OBTENER DATOS DESDE LOS ARCHIVOS EXTERNOS
    // =============================================
    const novedadesData = window.novedades || [];
    const tutorialesData = window.tutoriales || [];
    const allData = [...novedadesData, ...tutorialesData];

    // =============================================
    // 2. FUNCIONES REUTILIZABLES (Helpers)
    // =============================================

    // Función para renderizar tarjetas verticales (columna izquierda)
    function renderVerticalCards(containerId, posts, baseUrl) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Conservamos el título <h2> si existe
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

    // Función para cargar el artículo principal (contenido + recomendados)
    async function loadArticle(containerId, postId, postsData, baseUrl) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const post = postsData.find(p => p.id === postId);
        if (!post) {
            container.innerHTML = '<h2 style="color:#ffffff;">Artículo no encontrado</h2>';
            return;
        }

        try {
            const response = await fetch(post.archivoUrl);
            if (!response.ok) throw new Error('Error al cargar el archivo');
            const html = await response.text();
            container.innerHTML = `<div class="articulo-cargado">${html}</div>`;
            document.title = post.titulo + ' | RVC Studio';
        } catch (e) {
            console.error(e);
            container.innerHTML = '<h2 style="color:#ffffff;">Error al cargar el artículo</h2>';
        }

        // Renderizar recomendados (excluyendo el actual)
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

            // Agregar siempre el footer de redes sociales al final
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
    // 3. DETECCIÓN DE PÁGINA Y RUTEO
    // =============================================

    const hasIndexContainer = document.getElementById('contenedor-horizontales');
    const hasNovedadesContainer = document.getElementById('contenido-del-articulo');
    const hasTutorialesContainer = document.getElementById('contenido-del-tutorial');

    // ---------- A) PÁGINA PRINCIPAL (index.html) ----------
    if (hasIndexContainer) {
        const contVertical = document.getElementById('contenedor-verticales');
        const contHorizontal = document.getElementById('contenedor-horizontales');

        // Limpiamos y conservamos títulos
        const vH2 = contVertical ? contVertical.querySelector('h2') : null;
        if (contVertical) {
            contVertical.innerHTML = '';
            if (vH2) contVertical.appendChild(vH2);
        }
        if (contHorizontal) {
            contHorizontal.innerHTML = '';
        }

        // Renderizar TODOS los posts (mezclados)
        allData.forEach((post, index) => {
            // Determinar a qué página pertenece para el enlace
            let baseUrl = 'novedades.html';
            if (tutorialesData.some(p => p.id === post.id)) {
                baseUrl = 'tutoriales.html';
            }

            if (index < 3) {
                // Tarjeta vertical (izquierda)
                const card = document.createElement('a');
                card.className = 'tarjeta-vertical';
                card.href = `${baseUrl}?post=${post.id}`;
                card.innerHTML = `
                    <div class="img-vertical" style="background-image: url('${post.imagenCover}');"></div>
                    <div class="info-vertical"><h3>${post.titulo}</h3></div>
                `;
                if (contVertical) contVertical.appendChild(card);
            } else {
                // Tarjeta horizontal (derecha)
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

    // ---------- B) PÁGINA DE NOVEDADES (novedades.html) ----------
    if (hasNovedadesContainer) {
        const params = new URLSearchParams(window.location.search);
        const postID = params.get('post');

        // Columna izquierda (verticales)
        renderVerticalCards('contenedor-verticales', novedadesData, 'novedades.html');

        // Artículo principal y recomendados
        if (postID) {
            loadArticle('contenido-del-articulo', postID, novedadesData, 'novedades.html');
        } else if (novedadesData.length > 0) {
            loadArticle('contenido-del-articulo', novedadesData[0].id, novedadesData, 'novedades.html');
        } else {
            const container = document.getElementById('contenido-del-articulo');
            if (container) container.innerHTML = '<h2 style="color:#ffffff;">No hay novedades disponibles</h2>';
        }
    }

    // ---------- C) PÁGINA DE TUTORIALES (tutoriales.html) ----------
    if (hasTutorialesContainer) {
        const params = new URLSearchParams(window.location.search);
        const postID = params.get('post');

        // Columna izquierda (verticales)
        renderVerticalCards('contenedor-verticales', tutorialesData, 'tutoriales.html');

        // Artículo principal y recomendados
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
    // 4. BANNER DE COOKIES (GLOBAL, si existe)
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
});