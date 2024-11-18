import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RegisterLoginButton = ({buttonName, textNoLink, linkTo, textLink}) => {
  return (
    <div className="flex flex-col mt-4">
      <button className="inline-block w-full items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 justify-center">
        {buttonName}
      </button>
      <p className='mb-0 mt-2 pt-1 text-sm font-semibold'>
        {textNoLink}
        <Link to={linkTo}>
          <a href="/" className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 text-red-600"> {textLink}</a>
        </Link>
      </p>
    </div>
  );
};

// define props types for FormButton
RegisterLoginButton.propTypes = {
  buttonName: PropTypes.string,
  textNoLink: PropTypes.string,
  linkTo: PropTypes.string,
  textLink: PropTypes.string,
};

export default RegisterLoginButton;