# Henry — Servicio Técnico Especializado

Landing page for a (fictional) electronics repair technician. A frontend showcase built with **vanilla HTML, CSS and JavaScript** — no frameworks, no build step.

## Highlights

- **Layout cloned from a reference design** (service-business landing): floating pill header, full-bleed hero, common-problems grid with an overlapping featured card, 2×2 service cards, inset CTA band, why-us with progressive rows and photo, image-overlay resources, two-column FAQ with CTA card, family/contact band and a dark footer with watermark.
- **Design system**: navy + blue, Inter (700/800 headings), fluid type with `clamp()`, soft cards and rounded buttons.
- **Responsive**: from 320px to 1440px, mobile-first, no overflow.
- **Accessible (WCAG 2.1 AA)**: skip link, semantic landmarks, visible focus, labeled fields, `prefers-reduced-motion`.
- **Working CTA band**: a phone input that prefills the contact form and scrolls to it.
- **SEO**: meta description, Open Graph/Twitter cards, JSON-LD `ProfessionalService`, favicon.
- **Performance**: WebP images, no jQuery/icon fonts (inline SVG), deferred lightweight JS.

## Stack

- HTML5
- CSS3 (custom properties, Grid, `clamp()`)
- Vanilla JS (`IntersectionObserver`, accessible nav, form validation)

## Structure

```
index.html
styles.css
main.js
favicon.svg
img/
  foto-contacto.webp
  trabajo1.webp
  trabajo2.webp
  trabajo3.webp
```

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8080
```

Then visit <http://localhost:8080>.

## Live preview

<https://jordanroberto74.github.io/henry-tecnico/>

## Notes

- **Demo / fictional content**: brand, testimonials, stats and contact details are illustrative. The UI layout is inspired by a reference design; the brand and copy are Henry's own.
- The contact form is **front-end only**: it validates fields and shows a success state; no backend.
- The CTA band phone input is a demo: it copies the number into the contact form and scrolls there.

## Contact

[jordanroberto74@gmail.com](mailto:jordanroberto74@gmail.com)
