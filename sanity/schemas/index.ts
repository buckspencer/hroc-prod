// schema.ts

// documents
import site from './documents/site';
import page from './documents/page';
import blogPost from './documents/blog.post';
import blogCategory from './documents/blog.category';
import navigation from './documents/navigation';
import announcement from './documents/announcement';
import redirect from './documents/redirect';
import logo from './documents/logo';
import testimonial from './documents/testimonial';

// objects
import cta from './objects/cta';
import link from './objects/link';
import linkList from './objects/link.list';
import metadata from './objects/metadata';

// modules
import accordionList from './modules/accordion-list';
import blogRollup from './modules/blog-rollup';
import callout from './modules/callout';
import contactForm from './modules/contact-form';
import creativeModule from './modules/creative';
import customHtml from './modules/custom-html';
import dailyPassage from './modules/daily-passage';
import flagList from './modules/flag-list';
import photoGallery from './modules/photo-gallery'; // Import the new module
import hero from './modules/hero';
import heroSaas from './modules/hero.saas';
import heroSplit from './modules/hero.split';
import logoList from './modules/logo-list';
import richtextModule from './modules/richtext-module';
import statList from './modules/stat-list';
import stepList from './modules/step-list';
import testimonialList from './modules/testimonial-list';

export const schemaTypes = [
  // documents
  site,
  page,
  blogPost,
  blogCategory,
  navigation,
  announcement,
  redirect,
  logo,
  testimonial,

  // objects
  cta,
  link,
  linkList,
  metadata,

  // modules (alphabetized)
  accordionList,
  blogRollup,
  callout,
  contactForm,
  creativeModule,
  customHtml,
  dailyPassage,
  flagList,
  photoGallery,
  hero,
  heroSaas,
  heroSplit,
  logoList,
  richtextModule,
  statList,
  stepList,
  testimonialList,
];
