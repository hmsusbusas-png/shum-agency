# SHUM* — Digital Agency Landing Page

A single-page marketing site for **SHUM***, a fictional full-cycle digital agency (websites, branding, performance marketing). Built as a portfolio piece in pure **vanilla HTML / CSS / JavaScript** — no frameworks, no build step.

Design language: **neo-brutalism** — thick black borders, hard offset shadows (no blur), flat acid-green fills, oversized display typography with outlined words.

## Quick start

```bash
# just open it — no dependencies, no build
open index.html          # macOS
start index.html         # Windows
```

Or serve it locally:

```bash
python -m http.server 8080
# → http://localhost:8080
```

## Features

- **Neo-brutalist UI kit** — buttons with hard shadows and press-down interaction, rotated sticker badges, outlined (`-webkit-text-stroke`) display headings
- **CSS marquee** — infinite scrolling ticker ("САЙТЫ ✦ БРЕНДИНГ ✦ …"), zero JS
- **Services accordion** — numbered rows with hover color inversion, single-open behavior, animated height
- **Cases grid** — bordered cards with sample result metrics, hover shifts the shadow
- **Animated counters** — sample figures count up on scroll via `IntersectionObserver`
- **Snappy scroll reveal** — fast translate-based entrance animations (not slow fades)
- **Lead form** — client-side validation (name, phone/email, budget select), inline error messages, success state
- **Responsive** — burger menu below 920px, grids collapse to one column on mobile
- **Accessibility** — `aria-expanded` on the accordion and burger, `aria-live` error messages, visible focus states, `prefers-reduced-motion` support
- **SEO** — semantic markup, meta description, Open Graph / Twitter tags, SVG favicon

## Project structure

```
shum-agency/
├── index.html        # single page, all sections
├── css/
│   └── style.css     # design system + components + responsive
├── js/
│   └── main.js       # menu, accordion, counters, reveal, form validation
├── favicon.svg
├── screenshots/      # desktop.png / mobile.png (added separately)
└── README.md
```

## Screenshots

- Desktop: `screenshots/desktop.png`
- Mobile: `screenshots/mobile.png`

## Palette & type

| Token   | Value     | Usage                  |
| ------- | --------- | ---------------------- |
| Acid    | `#D9FF3D` | primary accent, fills  |
| Ink     | `#0A0A0A` | borders, text, shadows |
| Paper   | `#F4F1EA` | background             |
| Hot     | `#FF5C39` | secondary accent       |

Fonts (Google Fonts, Cyrillic support): **Unbounded** for display, **IBM Plex Sans** for body.

---

## ШУМ* — лендинг digital-агентства (RU)

Одностраничный сайт вымышленного digital-агентства «ШУМ*»: сайты, брендинг, performance. Портфолио-проект на чистых HTML/CSS/JS — без фреймворков и сборки.

**Дизайн:** нео-брутализм — толстые чёрные рамки, жёсткие offset-тени без блюра, кислотные заливки, контурная типографика.

**Что внутри:**
- бесконечная marquee-строка на чистом CSS;
- аккордеон услуг с hover-инверсией и ценами «от»;
- сетка кейсов с цифрами результата (+140% заявок, −38% CPL);
- счётчики на `IntersectionObserver` (7 лет, 120+ проектов, 94% возвращаются);
- резкий scroll-reveal, адаптив с бургер-меню, `prefers-reduced-motion`;
- форма заявки с валидацией (имя, телефон/email, бюджет) и success-состоянием;
- SEO-мета, Open Graph, SVG-favicon.

**Запуск:** открыть `index.html` в браузере — зависимостей нет.
