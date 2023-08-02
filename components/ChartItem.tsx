import { CheckIcon } from "@heroicons/react/24/solid"
import { transformMoney } from "../commons/utils"
import { useChart } from "../contexts/ChartContext"

interface IChartItem {
  itemId: string,
  checked: boolean,
  quantity: number,
  name: string,
  brand: string,
  value: number,
  onClick(): void
}

export function ChartItem({
  itemId,
  checked,
  quantity,
  name,
  brand,
  value,
  onClick
}: IChartItem) {
  const { modifyItem } = useChart()

  function toggleChecked(isChecked: boolean) {

    modifyItem({
      inChart: isChecked,
      brand,
      id: itemId,
      name, quantity, value
    })
  }

  return (
    <div id='chart_item' className='bg-white mt-4 w-auto p-4 rounded-md flex h-28 w-60 cursor-pointer items-center' >
      <input onChange={(e) => toggleChecked(e.target.checked)} checked={checked} type='checkbox' className="w-8 h-8 rounded border-gray-300 r" />
      <div onClick={onClick} className="flex w-full ml-4">

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
    </div>
  )
}