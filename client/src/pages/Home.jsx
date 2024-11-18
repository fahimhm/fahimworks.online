import { Navbar, MiniProfile, MainTitle, ContactMeForm, Dock, RecentProjects, Exp, Article } from '../components';

export default function Home() {
  return (
    <section id='container' className='grid grid-cols-1 px-5 md:px-[107px] grid-rows-[100px_repeat(6,_auto)_100px] 2lg:max-w-screen-2lg 2lg:px-[150px] 2lg:grid-cols-[1fr_2fr] 2lg:gap-x-[100px] 2lg:rid-rows-[100px_repeat(5,_auto)_100px] mx-auto'>
      <nav id='navbar' className='h-[100px] flex items-center justify-center 2lg:col-span-2'><Navbar /></nav>

      <section id='home' className='mb-10 2lg:fixed 2lg:top-[100px] 2lg:row-span-5'><MiniProfile /></section>
      <section id='title' className='2lg:col-start-2'><MainTitle /></section>
      <section id='project' className='mb-8'><RecentProjects /></section>
      <section id='experience' className='mb-8'><Exp /></section>
      <section id='article' className='hidden mb-20'><Article /></section>
      <section id='contact' className='mb-5'><ContactMeForm /></section>

      <footer className="fixed bottom-0 hidden pb-10 mx-auto transform -translate-x-1/2 2lg:block left-1/2 2lg:col-span-2"><Dock /></footer>
    </section>
  );
};