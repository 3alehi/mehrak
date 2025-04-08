import React from 'react';

interface TextWithReadMoreProps {
  htmlContent: string;
  isExpanded:boolean;
  setIsExpanded: (value: boolean) => void; 

}
const TextWithReadMore: React.FC<TextWithReadMoreProps> = ({ htmlContent ,isExpanded, setIsExpanded }) => {

  return (
    <div className="mt-2 text-customGray text-lg leading-8 font-extralight text-justify">
      <div
        className={`overflow-hidden ${isExpanded ? '' : 'line-clamp-4'}`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-aquaBlue  focus:outline-none"
      >
        {isExpanded ? 'نمایش کمتر' : 'نمایش بیشتر'}
      </button>
    </div>
  );
};

export default TextWithReadMore;