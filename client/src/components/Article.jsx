import PropTypes from 'prop-types';

function ArticleItem({title, main, sub}) {
  return (
    <li className='flex flex-col items-start px-2 py-4'>
      <h3 className='mb-5 text-lg font-semibold lg:max-w-[420px] text-txtColor'>{title}</h3>
      <p className='mb-5 text-base font-normal text-left lg:max-w-[420px] text-secTxtColor'>{main}</p>
      <p className='mb-4 text-base font-normal text-left lg:max-w-[420px] text-txtColor'>{sub}</p>
    </li>
  );
};

export default function Article() {
  const article = [
    {title: 'Article Title 1', main: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum est laudantium ex quos laborum molestiae unde assumenda atque reiciendis deleniti!', sub: 'Jan 2022'},
    {title: 'Article TItle 2', main: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum reiciendis debitis in necessitatibus placeat magni consequuntur magnam ratione delectus dolorum?', sub: 'Nov 2019'},
  ];

  return (
    <div>
      <h2 className="mb-5 text-4xl font-bold text-center uppercase 2lg:text-left text-txtColor">talk the<br /><span className='text-secTxtColor'>thoughts</span></h2>
      <ul>
        {article.map((exp) => (
          <ArticleItem key={exp.title} title={exp.title} main={exp.main} sub={exp.sub} />
        ))}
      </ul>
    </div>
  );
};

ArticleItem.propTypes = {
  title: PropTypes.string.isRequired,
  main: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
};