import AccordionList from './AccordionList';
import BlogRollup from './blog/Rollup';
import Callout from './Callout';
import ContactForm from './ContactForm';
import CreativeModule from './CreativeModule';
import CustomHTML from './CustomHTML';
import DailyPassage from './DailyPassage';
import FlagList from './FlagList';
import PhotoGallery from './PhotoGallery'; // Import the new module
import Hero from './Hero';
import HeroSaaS from './HeroSaaS';
import HeroSplit from './HeroSplit';
import LogoList from './LogoList';
import RichtextModule from './RichtextModule';
import StatList from './StatList';
import StepList from './StepList';
import TestimonialList from './TestimonialList';

export default function Modules({ modules }: { modules?: Sanity.Module[] }) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case 'accordion-list':
						return <AccordionList {...module} key={module._key} />;
					case 'blog-rollup':
						return <BlogRollup {...module} key={module._key} />;
					case 'callout':
						return <Callout {...module} key={module._key} />;
					case 'contact-form':
						return <ContactForm {...module} key={module._key} />;
					case 'creative-module':
						return <CreativeModule {...module} key={module._key} />;
					case 'custom-html':
						return <CustomHTML {...module} key={module._key} />;
					case 'daily-passage':
						return <DailyPassage {...module} key={module._key} />;
					case 'flag-list':
						return <FlagList {...module} key={module._key} />;
					case 'photo-gallery':
						return <PhotoGallery {...module} key={module._key} />;
					case 'hero':
						return <Hero {...module} key={module._key} />;
					case 'hero.saas':
						return <HeroSaaS {...module} key={module._key} />;
					case 'hero.split':
						return <HeroSplit {...module} key={module._key} />;
					case 'logo-list':
						return <LogoList {...module} key={module._key} />;
					case 'richtext-module':
						return <RichtextModule {...module} key={module._key} />;
					case 'stat-list':
						return <StatList {...module} key={module._key} />;
					case 'step-list':
						return <StepList {...module} key={module._key} />;
					case 'testimonial-list':
						return <TestimonialList {...module} key={module._key} />;
					default:
						return <div data-type={module._type} key={module._key} />;
				}
			})}
		</>
	);
}
