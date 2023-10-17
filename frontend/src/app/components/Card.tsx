interface ICardProps {
  title: string,
  line1: string,
  line2: string,
  buttonText: string
}

const Card = (props: ICardProps) => {
  return <>
    <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg text-center border-2 border-gray-200 p-1">
      <div className="px-6 py-4">
        <div className="mb-2 text-xl">{props.title}</div>
        <p className="font-bold text-4xl">{props.line1}</p>
      </div>
      <p>{props.line2}</p>
      <div className="px-6 py-8">
        <button className="flex-1 px-3 text-xs py-2 select-none rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">{props.buttonText}</button>
      </div>
    </div>
  </>
}

export default Card;