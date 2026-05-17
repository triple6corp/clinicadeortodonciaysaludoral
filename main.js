/* Clínica de Ortodoncia y Salud Oral — main.js */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');

  // ── Nav state ────────────────────────────────────────────────────
  function updateNav() {
    const atTop = window.scrollY < 60;
    nav.classList.toggle('nav--scrolled', !atTop);
    nav.classList.toggle('nav--hero',      atTop);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ── Smooth anchor scroll ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ── Mobile burger (toggle nav links) ────────────────────────────
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('nav__mobile--open');
      burger.setAttribute('aria-expanded', open);
      burger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      burger.querySelectorAll('span')[1].style.opacity   = open ? '0' : '1';
      burger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('nav__mobile--open');
        burger.setAttribute('aria-expanded', 'false');
        burger.querySelectorAll('span').forEach(function (s) {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }

  // ── LÓGICA DE ENVÍO A WHATSAPP ─────────────────────────────────────
  const whatsappForm = document.getElementById('whatsapp-form');

  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita que la página se recargue

      // 1. Capturar los datos ingresados por el paciente
      const nombre = document.getElementById('form-name').value.trim();
      const servicio = document.getElementById('form-servicio').value;
      const mensajeAdicional = document.getElementById('form-msg').value.trim();

      // 2. Definir tu número de WhatsApp de la clínica (Código de país + número sin espacios)
      const telefonoClinica = "573217553697"; 

      // 3. Construir el texto del mensaje con formato limpio
      let textoMensaje = `Hola, Clínica de Ortodoncia y Salud Oral. Me gustaría solicitar información.\n\n`;
      textoMensaje += `*Nombre:* ${nombre}\n`;
      textoMensaje += `*Servicio:* ${servicio}\n`;
      
      if (mensajeAdicional !== "") {
        textoMensaje += `*Notas:* ${mensajeAdicional}`;
      }

      // 4. Codificar el texto para que sea válido en una URL
      const mensajeCodificado = encodeURIComponent(textoMensaje);

      // 5. Construir la URL final de WhatsApp
      const urlWhatsApp = `https://wa.me/${telefonoClinica}?text=${mensajeCodificado}`;

      // 6. Abrir en una pestaña nueva de forma segura
      window.open(urlWhatsApp, '_blank');
    });
  }

  // ── Scroll-reveal ────────────────────────────────────────────────
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }


  // ── LÓGICA INTERACTIVA ANTES Y DESPUÉS ─────────────────────────────
  const slider = document.querySelector('.comparison-slider');
  const beforeImageContainer = document.querySelector('.comparison-before');
  const sliderLine = document.querySelector('.comparison-line');

  if (slider && beforeImageContainer && sliderLine) {
    slider.addEventListener('input', function (e) {
      const value = e.target.value;
      
      // Ajusta dinámicamente el ancho del recorte de la foto "Antes"
      beforeImageContainer.style.width = `${value}%`;
      // Mueve la barra blanca central
      sliderLine.style.left = `${value}%`;
    });
  }

  // ── Active nav link highlight on scroll ─────────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__links a');

  function highlightNav() {
    var scrollPos = window.scrollY + nav.offsetHeight + 40;
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

})();

