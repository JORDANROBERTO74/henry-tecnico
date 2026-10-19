/* ==========================================================================
   Henry — Servicio Técnico Especializado
   Interacciones · Vanilla JS (sin jQuery)
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Mobile navigation ---------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  var mqDesktop = window.matchMedia("(min-width: 900px)");

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
    document.body.classList.add("no-scroll");
  }

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
    document.body.classList.remove("no-scroll");
  }

  function toggleNav() {
    if (nav.classList.contains("is-open")) closeNav();
    else openNav();
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", toggleNav);

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 899px)").matches) closeNav();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });

    var handleResize = function (ev) {
      if (ev.matches) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      }
    };

    if (mqDesktop.addEventListener) mqDesktop.addEventListener("change", handleResize);
    else if (mqDesktop.addListener) mqDesktop.addListener(handleResize);
  }

  /* ---------- Header scrolled state ---------- */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
      );
      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ---------- FAQ: only one open at a time ---------- */
  var faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- CTA band: paso el teléfono al formulario ---------- */
  var ctaForm = document.getElementById("cta-form");
  if (ctaForm) {
    var ctaPhone = document.getElementById("cta-phone");
    var ctaNote = document.getElementById("cta-note");

    ctaForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (ctaPhone.value || "").trim();

      if (value.replace(/[^0-9]/g, "").length < 6) {
        if (ctaNote) ctaNote.textContent = "Introduce un número válido.";
        if (ctaPhone) ctaPhone.focus();
        return;
      }

      var contactPhone = document.getElementById("telefono");
      if (contactPhone) contactPhone.value = value;

      if (ctaNote) {
        ctaNote.textContent = "¡Listo! Te contactamos en menos de 2 horas.";
      }

      var contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");

    var setError = function (name, message) {
      var errorEl = form.querySelector('[data-error-for="' + name + '"]');
      if (errorEl) errorEl.textContent = message || "";
      var input = form.querySelector("#" + name);
      if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
    };

    var validate = function () {
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var value = (input.value || "").trim();
        var name = input.name;
        var message = "";

        if (!value) {
          message = "Este campo es obligatorio.";
        } else if (input.type === "email") {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            message = "Introduce un correo válido.";
          }
        } else if (input.tagName === "SELECT" && !value) {
          message = "Selecciona una opción.";
        } else if (input.tagName === "TEXTAREA" && value.length < 10) {
          message = "Cuéntanos un poco más (mínimo 10 caracteres).";
        }

        setError(name, message);
        if (message) valid = false;
      });
      return valid;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validate()) {
        if (status) {
          status.textContent = "Revisa los campos marcados.";
          status.dataset.state = "error";
        }
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (status) {
        status.textContent =
          "¡Gracias! Tu solicitud fue registrada (sitio demostrativo).";
        status.dataset.state = "success";
      }
      form.reset();
      form.querySelectorAll("[data-error-for]").forEach(function (el) {
        el.textContent = "";
      });
      form.querySelectorAll("[aria-invalid]").forEach(function (el) {
        el.removeAttribute("aria-invalid");
      });
    });

    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") {
          setError(input.name, "");
        }
      });
    });
  }

  /* ---------- Scrollspy ---------- */
  var spyLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__link[href^="#"]')
  );
  if (spyLinks.length && "IntersectionObserver" in window) {
    var sections = spyLinks
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          spyLinks.forEach(function (link) {
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }
})();
