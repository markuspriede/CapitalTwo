import React from 'react';
import Image from 'next/image';
import YoutubeIcon from '../../icons/youtube-icon.png';


interface ICardProps {
  title: string;
  price: string;
  subTitle: string;
  subPlan: string;
  center?: boolean;
  comingUp?:string;
  showLogo?:boolean;
  customHeightCard0?: boolean;
  customWidthCard0?: boolean;
  customHeightCard1?: boolean;
  customWidthCard1?: boolean;
}

const CustomCard: React.FC<ICardProps> = ({
  title,
  price,
  subTitle,
  subPlan,
  comingUp,
  center,
  showLogo =true,
  customHeightCard0 = false,
  customWidthCard0 = false,
  customHeightCard1 = false,
  customWidthCard1 = false,

}) => {
  const cardClasses = center ? 'flex flex-col items-center justify-center h-full text-center' : '';
  const customHeightClass = customHeightCard0 ? 'h-48' : customHeightCard1 ? 'h-40' : '';
  const customWidthClass = customWidthCard0 ? 'w-72' : customWidthCard1 ? 'w-96' : '';

  return (
    <div
    className={`rounded overflow-hidden shadow-lg border-2 border-gray-200 p-4 mb-4 ml-0 ${cardClasses} ${
      (customHeightCard0 || customHeightCard1) && (customWidthCard0 || customWidthCard1)
        ? `${customHeightClass} ${customWidthClass}`
        : ''
    }`}
    style={{ maxWidth: '100%' }}
    >
      {comingUp && !center && (
        <div className="font-semibold text-m mb-2" style={{ textAlign: 'left' }}>
          {comingUp}
        </div>
      )}

    <div className={`${center ? 'mb-2' : 'flex items-start justify-center mb-2'}`}>
      {showLogo && <Image src={YoutubeIcon} alt="Youtube logo" className="w-6 h-6 mr-2" />}
      <div className="flex-grow">
      <div className={`${title === 'Subscription Total' ? 'text-xl font-normal' : 'font-bold text-lg'}`}>
      {title}</div>
      </div>
      <div className={`${title === 'Subscription Total' ? 'font-bold text-2xl' : 'font-bold text-lg'} ml-4`}>{price}</div>
      </div>

      <div className="text-gray-700 text-sm mb-2 flex justify-between">
     <span className={title === 'YouTube Premium' ? 'font-semibold' : ''}>{subTitle}</span>
      {subPlan && <span className="font-semibold">{subPlan}</span>}
    </div>
  </div>
);
};
export default CustomCard;