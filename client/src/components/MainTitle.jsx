export default function MainTitle() {
  return (
    <div className="w-full font-sans">
      <h1 className="mb-2 text-5xl font-bold tracking-normal text-center text-txtColor 2lg:text-left">Web Developer<br /><span className="text-secTxtColor">Data Analyst</span></h1>
      <p className="w-3/4 mx-auto mb-16 text-base font-normal text-center 2lg:mx-0 2lg:text-left 2lg:w-1/2 text-secTxtColor">Passionate on building a solution and gaining insight for your business in one place</p>
      <div className="flex items-center justify-center px-3 mb-16 space-x-6 2lg:items-start 2lg:justify-start">
        <div className="w-20">
          <p className="font-semibold text-5xl tracking-[-0.5px] text-txtColor">+5</p>
          <p className="text-secTxtColor font-normal text-sm tracking-[-0.14px] uppercase">years of experience</p>
        </div>
        <div className="w-20">
          <p className="font-semibold text-5xl tracking-[-0.5px] text-txtColor">+3</p>
          <p className="text-secTxtColor font-normal text-sm tracking-[-0.14px] uppercase">projects completed</p>
        </div>
      </div>
    </div>
  )
};