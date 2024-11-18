import propTypes from 'prop-types';
import { ContactIcon } from '../assets/Icons';

function ContactMeButton({ onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} border border-white w-12 h-12 md:h-16 md:w-[160px] md:text-lg rounded-full flex items-center justify-center transition-colors duration-300 bg-transparent hover:bg-white`}
    >
      <span className='hidden text-white md:block hover:text-black'>Contact Me</span>
      <span className='md:hidden'><ContactIcon height='30' width='30' /></span>
    </button>
  );
}

ContactMeButton.propTypes = {
  onClick: propTypes.func,
  className: propTypes.string,
};

export default ContactMeButton;

// relative right-0 px-4 py-2 text-xs text-white transition-colors duration-300 bg-transparent border border-white rounded-full hover:bg-white hover:text-black xl:text-2xl