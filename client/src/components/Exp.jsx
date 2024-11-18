import PropTypes from 'prop-types';
import SkillItem from './SkillItem';
import { LittleArrowIcon } from '../assets/Icons';

function ExpItem({title, main, sub, pos, skill}) {
  return (
    <li key={title} className='mb-12'>
      <div className='relative grid gap-4 pb-1 transition-all group sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50'>
      <div className='absolute z-0 hidden transition rounded-md -inset-x-4 -inset-y-4 motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg'></div>
        <header className='z-10 mt-1 mb-2 text-xs font-semibold tracking-wide uppercase text-secTxtColor sm:col-span-2'>
          {sub}
        </header>
        <div className='z-10 sm:col-span-6'>
          <h3 className='font-medium leading-snug text-txtColor'>
            <div>
              <a href="/" className='inline-flex items-baseline text-base font-medium leading-tight text-txtColor hover:text-teal-300 focus-visible:text-teal-300 group/link'>
                <span className='absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block'></span>
                <span>
                  {pos}
                  <span className='inline-block capitalize'>
                    &nbsp;-&nbsp;{title}
                    <LittleArrowIcon className='inline-block w-4 h-4 ml-1 transition-transform translate-y-px shrink-0 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none' />
                  </span>
                </span>
              </a>
            </div>
          </h3>
          <p className='mt-2 text-sm leading-normal text-secTxtColor'>{main}</p>
          <ul className='flex flex-wrap mt-2'>
            {skill.map((skill) => (
              <SkillItem key={skill} skill={skill} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default function Exp() {
  const exps = [
    {title: 'Grab', pos:'Data Analyst', main: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum est laudantium ex quos laborum molestiae unde assumenda atque reiciendis deleniti!', sub: "Jan'22 - Present", skill: ['Python', 'SQL', 'PowerBI', 'AWS - Databricks', 'MLFlow']},
    {title: 'Shopee International', pos:'Business Intelligence', main: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum reiciendis debitis in necessitatibus placeat magni consequuntur magnam ratione delectus dolorum?', sub: "Nov'19 - Dec'21", skill: ['Python', 'SQL']},
  ];

  return (
    <div>
      <h2 className="mb-5 text-4xl font-bold text-center uppercase 2lg:text-left text-txtColor">
        5 years of
        <span className='inline lg:hidden'>
          <br />
        </span>
        <span className='hidden lg:inline'>
          &nbsp;
        </span>
        <span className='text-secTxtColor'>
          experience
        </span>
      </h2>
      <ol className='group/list'>
        {exps.map((exp) => (
          <ExpItem key={exp.title} title={exp.title} main={exp.main} sub={exp.sub} pos={exp.pos} skill={exp.skill} />
        ))}
      </ol>
    </div>
  );
};

ExpItem.propTypes = {
  title: PropTypes.string.isRequired,
  main: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  skill: PropTypes.array.isRequired,
};