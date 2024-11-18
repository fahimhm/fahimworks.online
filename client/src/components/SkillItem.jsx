import PropTypes from 'prop-types';

export default function SkillItem({skill}) {
  return (
    <li key={skill} className='mr-1.5 mt-2'>
      <div className='flex items-center px-3 py-1 text-xs font-medium leading-5 text-teal-300 rounded-full bg-teal-400/10'>{skill}</div>
    </li>
  );
};

SkillItem.propTypes = {
  skill: PropTypes.string.isRequired,
};