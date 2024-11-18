import { HomeIcon, ProjectIcon, ArticleIcon, CreateIcon, ExpIcon } from '../assets/Icons';

export default function Navbar() {
  return (
    <div className="px-5 py-[6px] bg-accColor rounded-2xl">
      <ul className="flex items-center justify-around space-x-4">
        <li className="text-white hover:text-gray-400">
          <a href="#home"><HomeIcon height='36' width='36' /></a>
        </li>
        <li className="text-white hover:text-gray-400">
          <a href="#project"><ProjectIcon height='36' width='36' /></a>
        </li>
        <li className="text-white hover:text-gray-400">
          <a href="#experience"><ExpIcon height='34' width='36' /></a>
        </li>
        <li className="text-white hover:text-gray-400">
          <a href="#article"><ArticleIcon height='34' width='36' /></a>
        </li>
        <li className="text-white hover:text-gray-400">
          <a href="#contact"><CreateIcon height='36' width='36' /></a>
        </li>
      </ul>
    </div>
  );
};