import PropTypes from 'prop-types';
import portfolio1 from '../assets/portfolio1.jpg';
import portfolio2 from '../assets/portfolio2.jpg';
import { LittleArrowIcon } from '../assets/Icons';
import SkillItem from './SkillItem';

function ProjectItem({title, subtitle, image, skill}) {
  return (
    <li key={title} className='mb-12'>
      <div className='relative grid gap-4 pb-1 transition-all group sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
        <div className='absolute z-0 hidden transition rounded-md -inset-x-4 -inset-y-4 motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg'></div>
        <div className='z-10 sm:order-2 sm:col-span-6'>
          <h3>
            <div className='inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link'>
              <span className='absolute -inset-x-4 -inset-y-2.5 rounded hidden md:-inset-x-6 md:-inset-y-4 lg:block'></span>
              <span>
                {title}
                <span className='inline-block'>
                  <LittleArrowIcon className='inline-block w-4 h-4 ml-1 transition-transform translate-y-px shrink-0 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none' />
                </span>
              </span>
            </div>
          </h3>
          <p className='mt-2 text-sm leading-normal text-secTxtColor'>{subtitle}</p>
          <ul className='flex flex-wrap mt-2'>
            {skill.map((skill) => (
              <SkillItem key={skill} skill={skill} />
            ))}
          </ul>
        </div>
        {image}
      </div>
    </li>
  );
};

function getImage({source_, alter}) {
  return <img src={source_} alt={alter} loading='lazy' width={100} height={100} decoding='async' data-nimg='1' className='transition border-2 rounded border-slate-200/10 group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1' />
};

export default function RecentProjects() {
  const projects = [
    {title: 'Second Design of Portfolio', subtitle: "Decide to re-design my portfolio for better layout and responsive", image: getImage({source_: portfolio2, alter: 'second project'}), skillTag: ['React', 'TailwindCSS', 'Framer Motion', 'NodeJS', 'Express', 'MongoDB', 'Nodemailer']},
    {title: 'First Design of Portfolio', subtitle: "My first website for portfolio, re-code from Brittany Chiang's website", image: getImage({source_: portfolio1, alter: 'first project'}), skillTag: ['React', 'TailwindCSS', 'NodeJS', 'Express', 'MongoDB']},
  ];

  return (
    <div>
      <h2 className="mb-5 text-4xl font-bold text-center uppercase 2lg:text-left text-txtColor">
        recent
        <span className='inline lg:hidden'>
          <br />
        </span>
        <span className='hidden lg:inline'>
          &nbsp;
        </span>
        <span className='text-secTxtColor'>
          projects
        </span>
      </h2>
      <ol className='group/list'>
        {projects.map((project) => (
          <ProjectItem key={project.title} title={project.title} subtitle={project.subtitle} image={project.image} skill={project.skillTag} />
        ))}
      </ol>
    </div>
  );
};

ProjectItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.element.isRequired,
  skill: PropTypes.array.isRequired,
};

getImage.propTypes = {
  source_: PropTypes.string.isRequired,
  alter: PropTypes.string.isRequired,
};

SkillItem.propTypes = {
  skill: PropTypes.string.isRequired,
};