import { transformMoney } from "../commons/utils"

interface IChartItem {
  quantity: number,
  name: string,
  brand: string,
  value: number,
  onClick(): void
}

export function ChartItem({
  quantity,
  name,
  brand,
  value,
  onClick
}: IChartItem) {
  return (
    <div onClick={onClick} id='chart_item' className='bg-white mt-4 w-auto p-4 rounded-md flex h-28 w-60 cursor-pointer' >
      <div className='h-full flex justify-center items-center'>
        <span className='text-2xl font-semibold'>{quantity}x</span>
      </div>
      <div className='flex h-full flex-col ml-3 justify-center'>
        <span className='font-medium'>{name}</span>
        <span className='text-xs'>{brand}</span>
      </div>
      <div className='flex flex-col ml-auto text-end justify-center'>
        <span className='font-medium'>
          {transformMoney(value)}
        </span>
        <span className='text-xs'>{quantity}x {transformMoney(value * quantity)}</span>
      </div>
    </div>
  )
}