<!-- <script lang="ts" setup>
import type { HomeQueryResult } from "~/types/sanity.types";
import { homeQueryString } from "../../studio/src/queries-strings";
import { UIElements } from "~/assets/static-data/ui-elements";

const { currentLevel } = useLevelExperience();

// DATA
const homeQuery = groq`${homeQueryString}`;
const { data, error } = await useLazySanityQuery<HomeQueryResult>(homeQuery);

// SEO
const config = useRuntimeConfig();

// Override page title to ZapMinds Academy
const pageTitle = "ZapMinds Academy";

useSeoMeta({
  title: pageTitle,
  // description: data.value?.seoDescription,
  ogTitle: pageTitle,
  // ogUrl: config.public.siteBaseUrl + config.app.baseURL,
  ogType: "website",
  ogDescription: data.value?.seoDescription,
  // ogImage:
  //   config.public.siteBaseUrl +
  //   config.app.baseURL +
  //   "images/martin-laxenaire-socials.jpg",
  // twitterCard: "summary_large_image",
  twitterTitle: pageTitle,
  // twitterSite: "@martinlaxenaire",
  // twitterCreator: "@martinlaxenaire",
  // twitterDescription: data.value?.seoDescription,
  // twitterImage:
  //   config.public.siteBaseUrl +
  //   config.app.baseURL +
  //   "images/martin-laxenaire-socials.jpg",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: config.public.siteBaseUrl + config.app.baseURL,
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <div>
    <div :class="$style.root" v-if="data">
      <VHero :baseline="'Zapminds Academy'" />

      <section
        :class="[$style.level, currentLevel >= 1 && $style['level--is-active']]"
        id="level-1"
        :inert="currentLevel >= 1 ? false : true"
      >
        <LazyVIntro :hydrate-after="0" :intro="data.intro" />

        <LazyVProjectsList
          hydrate-on-idle
          :title="data.projectsTitle"
          :description="data.projectsDescription"
          :projects="data.projects"
          :recognition="data.recognition"
        />

        <LazyVYearsList hydrate-on-idle :title="data.yearsTitle" />

        <LazyVScrollToContinue hydrate-on-idle :level="2" />
      </section>

      <section
        :class="[$style.level, currentLevel >= 2 && $style['level--is-active']]"
        id="level-2"
        :inert="currentLevel >= 2 ? false : true"
      >
        <VInvoices
          :process="data.processDescription"
          :title="data.invoicesTitle"
          :description="data.invoicesDescription"
        />
      </section>

      <section
        :class="[$style.level, currentLevel >= 3 && $style['level--is-active']]"
        id="level-3"
        :inert="currentLevel >= 3 ? false : true"
      >
        <VOpenSource
          :title="data.openSourceTitle"
          :description="data.openSourceDescription"
          :legend="data.openSourceLegend"
        />
      </section>
      <section
        :class="[$style.level, currentLevel >= 4 && $style['level--is-active']]"
        id="level-4"
        :inert="currentLevel >= 4 ? false : true"
      >
        <VFooter
          :title="data.footerTitle"
          :site-title="data.title"
          :description="data.footerDescription"
          :socials="data.socials"
        />
      </section>

      <LazyVGainedExperience hydrate-on-idle />
    </div>

    <Transition
      appear
      :enter-active-class="$style['fade-enter-active']"
      :leave-active-class="$style['fade-leave-active']"
      :enter-from-class="$style['fade-enter-from']"
      :leave-to-class="$style['fade-leave-to']"
    >
      <div v-if="!data" :class="$style.fallback">
        <h2>{{ UIElements.common.noData }}</h2>
      </div>
    </Transition>
  </div>
</template>

<style module lang="scss">
.root {
  a {
    color: inherit;
  }
}

.level {
  height: 0;
  overflow: hidden;

  &--is-active {
    height: auto;
    overflow: visible;
  }

  @media (prefers-reduced-motion) {
    height: auto;
    overflow: visible;
  }
}

.fallback {
  position: absolute;
  inset: 0;
  padding-top: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-family: var(--light-display-font);
    font-weight: normal;
    text-transform: uppercase;
  }
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;

  transition: opacity 0.5s 0.65s ease(in-quad);

  @media (prefers-reduced-motion) {
    transition: none !important;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s 0s ease(in-quad);
}
</style> -->

<script lang="ts" setup>
// 🔔 Keep your own composables / utilities
import { UIElements } from "~/assets/static-data/ui-elements";

const { currentLevel } = useLevelExperience();

// ─────────────────────────────────────────────
// STATIC CONTENT (replace with your own later)
// ─────────────────────────────────────────────

// Hero
const heroBaseline = "Zapminds Academy";

// Intro section – simple rich text structure compatible with your <LazyVIntro>
const intro = [
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text:
          "Zapminds Academy helps developers learn by building real-world projects using modern stacks and tools.",
        _key: "intro-1",
      },
    ],
    _key: "intro-block-1",
    markDefs: [],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text:
          "Our focus is on hands-on, production-style work: you ship features, debug issues, and improve systems just like in a real product team.",
        _key: "intro-2",
      },
    ],
    _key: "intro-block-2",
    markDefs: [],
  },
];

// Projects section
const projectsTitle = "Learn by shipping real projects";
const projectsDescription = [
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text:
          "Explore a curated set of practical projects designed to strengthen your fundamentals and expose you to real-world problems.",
        _key: "proj-desc-1",
      },
    ],
    _key: "proj-desc-block-1",
    markDefs: [],
  },
];

// ⚠️ For now we keep projects & recognition empty so nothing from Sanity appears.
//    You can later replace these with your own data structure that
//    <LazyVProjectsList> expects.
// const projects: any[] = [];
const projects = [
  { _ref: "a7424544-fa6a-427a-b505-85853688f40c", _type: "reference", _key: "9847524b6610" },
  { _ref: "710d25f5-1f49-4d9e-9130-b9d5978a04be", _type: "reference", _key: "46b941e15c5e" },
  { _ref: "8b457503-64e0-483f-8a00-fbb30a4db7bc", _type: "reference", _key: "15f507341880" },
  { _ref: "610ae501-dbd7-48eb-aa13-ef8d1f314522", _type: "reference", _key: "a8bb7dc255f2" },
  { _ref: "bba56d90-0a23-4994-b913-462867c5b26c", _type: "reference", _key: "0f250e30667b" },
  { _ref: "2f4d451d-beee-4723-a992-30c31fa51238", _type: "reference", _key: "18847a138033" },
];
const recognition: any[] = [];

// Years / timeline section
const yearsTitle = "What we’ve been building lately";

// Invoices / contributions section
const invoicesTitle = "Make every learning moment count";
const processDescription = [
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text:
          "Zapminds Academy works closely with learners, teams, and mentors to create an environment where practice and feedback go hand in hand.",
        _key: "proc-1",
      },
    ],
    _key: "proc-block-1",
    markDefs: [],
  },
];
const invoicesDescription = [
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text:
          "Each project, assignment, and review is designed to push you one step closer to production-ready confidence.",
        _key: "inv-1",
      },
    ],
    _key: "inv-block-1",
    markDefs: [],
  },
];

// Open source / learning section
const openSourceTitle = "Hours of practice and exploration";
const openSourceDescription = [
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text:
          "From small utilities to full-stack apps, our learners and mentors constantly experiment, share, and iterate on ideas.",
        _key: "os-1",
      },
    ],
    _key: "os-block-1",
    markDefs: [],
  },
];
const openSourceLegend = [
  {
    _type: "block",
    style: "h3",
    children: [
      {
        _type: "span",
        marks: [],
        text: "Real progress, visualized",
        _key: "os-leg-1",
      },
    ],
    _key: "os-leg-block-1",
    markDefs: [],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text:
          "Follow your journey from your first commit to confident, production-ready code.",
        _key: "os-leg-2",
      },
    ],
    _key: "os-leg-block-2",
    markDefs: [],
  },
];

// Footer section
const footerTitle = "Let’s build something meaningful";
const siteTitle = "Zapminds Academy";
const footerDescription = [
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text: "You made it to the footer – nice! 🎉",
        _key: "foot-1",
      },
    ],
    _key: "foot-block-1",
    markDefs: [],
  },
  {
    _type: "block",
    style: "normal",
    children: [
      {
        _type: "span",
        marks: [],
        text:
          "Have a question, idea, or collaboration in mind? Reach out and let’s see what we can build together.",
        _key: "foot-2",
      },
    ],
    _key: "foot-block-2",
    markDefs: [],
  },
];

// ⚠️ Empty socials for now so no foreign accounts leak through.
//    Later you can pass your own structure that VFooter expects.
const socials: any[] = [];

// ─────────────────────────────────────────────
// SEO / META (fully static now, no Sanity)
// ─────────────────────────────────────────────
const config = useRuntimeConfig();

const pageTitle = "Zapminds Academy – Learn by Building";
const seoDescription =
  "Zapminds Academy helps developers learn by building real-world, production-style projects with modern tools and mentorship.";

useSeoMeta({
  title: pageTitle,
  description: seoDescription,
  ogTitle: pageTitle,
  ogDescription: seoDescription,
  ogType: "website",
  ogUrl: config.public.siteBaseUrl + config.app.baseURL,
  // ogImage:
  //   config.public.siteBaseUrl +
  //   config.app.baseURL +
  //   "images/martin-laxenaire-socials.jpg", // change to your own OG image later
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle,
  twitterDescription: seoDescription,
  twitterSite: "@zapminds", // change to your handle
  twitterCreator: "@zapminds", // change to your handle
  // twitterImage:
  //   config.public.siteBaseUrl +
  //   config.app.baseURL +
  //   "images/martin-laxenaire-socials.jpg", // change to your own OG image
});

useHead({
  link: [
    {
      rel: "canonical",
      href: config.public.siteBaseUrl + config.app.baseURL,
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <div>
    <div :class="$style.root">
      <VHero :baseline="heroBaseline" />

      <section
        :class="[$style.level, currentLevel >= 1 && $style['level--is-active']]"
        id="level-1"
        :inert="currentLevel >= 1 ? false : true"
      >
        <LazyVIntro :hydrate-after="0" :intro="intro" />

        <LazyVProjectsList
          hydrate-on-idle
          :title="projectsTitle"
          :description="projectsDescription"
          :projects="projects"
          :recognition="recognition"
        />

        <LazyVYearsList hydrate-on-idle :title="yearsTitle" />

        <LazyVScrollToContinue hydrate-on-idle :level="2" />
      </section>

      <section
        :class="[$style.level, currentLevel >= 2 && $style['level--is-active']]"
        id="level-2"
        :inert="currentLevel >= 2 ? false : true"
      >
        <VInvoices
          :process="processDescription"
          :title="invoicesTitle"
          :description="invoicesDescription"
        />
      </section>

      <section
        :class="[$style.level, currentLevel >= 3 && $style['level--is-active']]"
        id="level-3"
        :inert="currentLevel >= 3 ? false : true"
      >
        <VOpenSource
          :title="openSourceTitle"
          :description="openSourceDescription"
          :legend="openSourceLegend"
        />
      </section>

      <section
        :class="[$style.level, currentLevel >= 4 && $style['level--is-active']]"
        id="level-4"
        :inert="currentLevel >= 4 ? false : true"
      >
        <VFooter
          :title="footerTitle"
          :site-title="siteTitle"
          :description="footerDescription"
          :socials="socials"
        />
      </section>

      <LazyVGainedExperience hydrate-on-idle />
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  a {
    color: inherit;
  }
}

.level {
  height: 0;
  overflow: hidden;

  &--is-active {
    height: auto;
    overflow: visible;
  }

  @media (prefers-reduced-motion) {
    height: auto;
    overflow: visible;
  }
}
</style>
