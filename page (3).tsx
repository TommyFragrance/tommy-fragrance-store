@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
  --bg: #ffffff;
  --fg: #0d0d0d;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-feature-settings: "ss01" on, "cv01" on;
}

::selection { background: #0d0d0d; color: #ffffff; }

.luxury-grid {
  background-image:
    linear-gradient(rgba(13,13,13,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13,13,13,.045) 1px, transparent 1px);
  background-size: 44px 44px;
}

.noise {
  position: relative;
}
.noise::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .06;
  background-image: radial-gradient(#000 0.7px, transparent 0.7px);
  background-size: 8px 8px;
}

@layer components {
  .container-lux {
    @apply mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8;
  }

  .btn-primary {
    @apply inline-flex items-center justify-center rounded-full bg-graphite-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-graphite-700 focus:outline-none focus:ring-2 focus:ring-graphite-900 focus:ring-offset-2;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center rounded-full border border-graphite-300 bg-white px-6 py-3 text-sm font-medium text-graphite-900 transition hover:border-graphite-900 focus:outline-none focus:ring-2 focus:ring-graphite-900 focus:ring-offset-2;
  }

  .eyebrow {
    @apply text-xs font-semibold uppercase tracking-luxury text-graphite-500;
  }

  .panel {
    @apply rounded-[2rem] border border-graphite-100 bg-white shadow-soft;
  }
}
