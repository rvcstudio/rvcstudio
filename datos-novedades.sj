 const novedades = [
    {
        id: "d-mini-behringer",
        titulo: "D MINI de Behringer: Minimoog de bolsillo con un secuenciador, filtro ladder y tres osciladores analógicos",
        categoria: "Ultimas noticias en el mundo del audio y la produccion musical",
        resumen: "Behringer inicia la preventa de su D MINI, una versión compacta del Model D que cuenta con tres osciladores analógicos, un filtro escalera paso-bajo, un secuenciador de 16 pasos y 27 teclas táctiles. Se espera que esté disponible en agosto de 2026 a un precio estimado de 99€ o 99$.",
        imagenCover: "imagenes/Behringer-Model-D-Soul@2000x1500.jpg",
        archivoUrl: "posts/d-mini-behringer.html",
        esExterno: true
    },
    {
        id: "abletonlive-live-12-4",
        titulo: "Ableton Live 12.4: Revolución en Workflow, Plugins y Separación de Stems",
        categoria: "Categoría: Novedades & Software Update | Por: RVC Studio",
        resumen: "La llegada de Ableton Live 12.4 marca un paso adelante decisivo en la optimización del flujo de trabajo y el procesamiento nativo.",
        imagenCover: "imagenes/ableton-live-12-4/stem-seperation-in-live.jpg",
        esExterno: true,
        archivoUrl: "posts/ableton-live-12-4.html"
    },
    {
        id: "cpu-cuanticos-y-audio-digital",
        titulo: "Procesadores Cuánticos y el Audio Digital: La Próxima Revolución del Sonido", 
        categoria: "Categoría: Tecnología & Futuro del Audio | Por: RVC Studio",
        resumen: "La llegada de los procesadores cuánticos al campo del audio digital no sustituirá inmediatamente tu equipo de estudio actual, pero transformará la industria desde sus cimientos musicales y técnicos.",
        imagenCover: "imagenes/cpu-cuanticos-y-el-audio-digital/tech-cuantica.jpg",
        esExterno: true,
        archivoUrl: "posts/cpu-cuanticos-y-el-audio-digital.html"
    },
    {
        id: "hz-profundidad-bits",
        titulo: "Frecuencia de Muestreo y Calidad de Audio: Lo que Realmente Debes Entender", 
        categoria: "Categoría: Teoría del Audio & Conceptos Clave | Por: RVC Studio",
        resumen: "Imaginemos el proceso de fabricación de unas baquetas. Supongamos que queremos crear unas baquetas resistentes y duraderas. Si utilizamos una madera de mala calidad o una madera hinchada y húmeda, difícilmente obtendremos un producto final confiable, independientemente del esfuerzo, maquinaria o barniz que pongamos en su fabricación. La razón es sencilla: la calidad del producto final depende directamente de la calidad de la materia prima.",
        imagenCover: "imagenes/hz-profundidad-bits/portada.jpg",
        esExterno: true,
        archivoUrl: "posts/hz-profundidad-bits.html"
    },
    {
        id: "cadena-plugins-urbana",
        titulo: "La Cadena de Plugins Urbana: El Secreto del Sonido Vocal de la Industria", 
        resumen: "Para lograr ese sonido vocal urbano clásico de la industria —brillante, al frente, controlado y con esa textura costosa que escuchas en el Reggaeton, Trap o R&B actual— necesitas una combinación precisa de corrección de tono, control dinámico estricto, ecualización quirúrgica y saturación analógica sutil. No es magia; es estructura de señal.",
        imagenCover: "imagenes/cadena-plugins-urbana/waves-ssl-ev2.jpg",
        esExterno: true,
        archivoUrl: "posts/cadena-plugins-urbana.html"
    },
    {
        id: "acondicionamiento-acustico-asero",
        titulo: "Acondicionamiento Acústico Casero: Cómo Mejorar tu Sala sin Presupuesto Profesional", 
        categoria: "Categoría: Acústica & Home Studio | Por: RVC Studio",
        resumen: " Qué tal, amigos? Yo soy el Mzbbeat y hoy vamos a hablar de uno de los pilares más descuidados en los estudios caseros: la acústica de tu habitación.",
        imagenCover: "imagenes/acondicionamiento-acustico-casero/home-acustic.jpg",
        esExterno: true,
        archivoUrl: "posts/acondicionamiento-acustico-asero.html"
    }, 
    {
        id: "console-one-compact",
        titulo: "El Softube Console 1 Compact, la consola de mezcla híbrida que está dando que hablar en el mundo del audio procesado por hardware", 
        categoria: "Categoría: Consolas Analógicas & Hardware | Por: RVC Studio",
        resumen: "Antes de empezar a hablar de este nuevo dispositivo tecnológico para el audio, debemos dejar claro qué es exactamente y para qué sirve: ¿se trata solo de un controlador o de un preamplificador analógico para mezclar canciones? La Console 1 Compact de Softube es un dispositivo híbrido (hardware y software) que permite manejar tu DAW mediante tecnología táctil.",
        imagenCover: "imagenes/console-one-compact/muestra-lateral.jpg",
        esExterno: true,
        archivoUrl: "posts/console-one-compact.html"
    },
    {
        id: "los-5-sintetizadores-analogos",
        titulo: "Los 5 mejores sintetizadores analógicos del mercado para empezar en el mundo del sonido analógico", 
        categoria: "Categoría: Sintetizadores & Hardware Analógico | Por: RVC Studio",
        resumen: " Adentrarse en el mundo de los sintetizadores analógicos puede resultar abrumador. Entre terminología técnica, precios elevados y una oferta cada vez más amplia, es fácil perderse. Por eso hemos seleccionado los 5 modelos que consideramos ideales para dar tus primeros pasos en este fascinante universo sonoro.",
        imagenCover: "imagenes/los-5-sintetizadores-analogos/korg-vocal.jpg",
        esExterno: true,
        archivoUrl: "los-5-sintetizadores-analogos.html"
    },
    {
        id: "melodyne-autotune",
        titulo: "Técnica profesional para afinar voces con Melodyne y Auto‑Tune", 
        categoria: "Categoría: Mezcla & Producción Vocal | Por: RVC Studio",
        resumen: "En el proceso de mezcla, es habitual recibir pistas vocales grabadas en estudios remotos o caseros, con condiciones técnicas muy variables.",
        imagenCover: "imagenes/melodyne-autotune/melodyne.jpg",
        esExterno: true,
        archivoUrl: "melodyne-autotune.html"
    },
    {
        id: "tipos-de-sataturacion",
        titulo: "Los 4 Tipos Principales de Saturación en la Producción Musical", 
        categoria: "Categoría: Mezcla & Procesamiento | Por: RVC Studio",
        resumen: " En la producción musical, la <strong>saturación</strong> y la <strong>distorsión</strong> son herramientas creativas que se utilizan para añadir carácter, calidez o agresividad a un sonido. Aunque a menudo se usan como sinónimos, la saturación se considera un tipo de distorsión armónica más sutil, mientras que la distorsión abarca un espectro más amplio de efectos.",
        imagenCover: "imagenes/tipos-de-sataturacion/sat-de-cinta-tape.jpg",
        esExterno: true,
        archivoUrl: "tipos-de-sataturacion.html"
    },
    {
        id: "tipos-compresion",
        titulo: "Los 5 Tipos Principales de Compresores en la Producción Musical", 
        categoria: "Categoría: Mezcla & Procesamiento | Por: RVC Studio",
        resumen: "En la producción musical, los compresores son herramientas esenciales para controlar la dinámica y dar carácter a tus pistas. Sin embargo, no todos los compresores son iguales.",
        imagenCover: "imagenes/tipos-compresion/vca.jpg",
        esExterno: true,
        archivoUrl: "tipos-compresion.html"
    },
    {
        id: "tipos-eq",
        titulo: "Los Tipos de Ecualización en la Producción Musical", 
        categoria: "Categoría: Mezcla & Procesamiento | Por: RVC Studio",
        resumen: "En el mundo de la producción musical, la ecualización es una de las herramientas más fundamentales y poderosas para dar forma al sonido. Sin embargo, no todos los ecualizadores son iguales. Cada tipo ofrece un <strong>nivel diferente de precisión, control y coloración</strong>, y conocer sus diferencias es clave para elegir la herramienta adecuada en cada situación.",
        imagenCover: "imagenes/tipos-eq/grafico.jpg",
        esExterno: true,
        archivoUrl: "tipos-eq.html"
    },
         
];
