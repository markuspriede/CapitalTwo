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
}

const CustomCard: React.FC<ICardProps> = ({
  title,
  price,
  subTitle,
  subPlan,
  comingUp,
  center,
  showLogo =true,
}) => {
  const cardClasses = center ? 'flex flex-col items-center justify-center h-full' : '';

  return (
    <div className={`rounded overflow-hidden shadow-lg border-2 border-gray-200 p-4 w-96 mb-4 ml-0 ${cardClasses}`}>
      <div className="text-center">
        {comingUp && <div className="font-bold text-xl mb-2">{comingUp}</div>}

        <div className="flex items-center justify-center mb-2">
          {showLogo && <Image src={YoutubeIcon} alt="Youtube logo" className="w-6 h-6 mr-2" />}
          <div className="font-bold text-xl">{title}</div>
          <div className="font-bold text-xl ml-2">{price}</div>
        </div>

        <div className="text-gray-700 text-sm mb-2">
              <span>{subTitle}</span>
              {subPlan && <span className="font-semibold ml-14">{subPlan}</span>}
        </div>

      </div>
    </div>
  );
};

export default CustomCard;