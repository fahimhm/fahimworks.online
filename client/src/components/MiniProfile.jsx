import cropped from '../assets/cropped.jpg';
import { GithubIcon, InstagramIcon, LinkedInIcon, DiscordIcon } from '../assets/Icons';

export default function MiniProfile() {
  return (
    <div className="bg-secBgColor rounded-2xl py-[30px] px-5 2lg:max-w-[344px]">
      <div className='border  border-black rounded-2xl w-[260px] h-[210px] lg:w-[240px] lg:h-[284px] mx-auto overflow-hidden mb-6'>
        <img src={cropped} alt="myprofile" />
      </div>
      <div className='w-full font-sans'>
        <h1 className='mb-4 text-4xl font-bold text-center text-black px-9 md:px-auto'>Fahim Maula</h1>
        <div>
          <p className='text-black mb-4 text-base font-medium text-center mx-auto w-[300px] lg:w-[280px]'>A web developer and data analyst who will bring you solutions</p>
          <ul className='flex items-center justify-center px-16 space-x-4'>
            <li>
              <a href="https://github.com/fahimhm" target='_blank' rel='noopener noreferrer' >
                <div className='w-8 aspect-square'><GithubIcon /></div>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/maulafhm" target='_blank' rel='noopener noreferrer'>
                <div className='w-8 aspect-square'><InstagramIcon /></div>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/fahim-maula-a4b18099/" target='_blank' rel='noopener noreferrer'>
                <div className='w-8 aspect-square'><LinkedInIcon /></div>
              </a>
            </li>
            <li>
              <a href="http://discordapp.com/users/729009850712850524" target='_blank' rel='noopener noreferrer'>
              <div className='w-8 aspect-square'><DiscordIcon /></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};