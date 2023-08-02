import { PlusIcon } from "@heroicons/react/24/solid";
import { useChart } from "../contexts/ChartContext";
import { useMemo } from "react";
import { transformMoney } from "../commons/utils";

interface IListResume {
  setIsAddItemActive: (state: boolean) => void
}

export function ListResume({ setIsAddItemActive }: IListResume) {
  const { items } = useChart()

  const sumValues = useMemo(() => {
    const total = items.reduce((acc: number, cur) => {
      return cur.inChart ? acc + (cur.value * cur.quantity) : acc
    }, 0)
    return transformMoney(total)
  }, [items])

  const totalUnid = useMemo(() => {
    return items.reduce((acc: number, cur) => {
      return cur.inChart ? acc + cur.quantity : acc
    }, 0)
  }, [items])

  const totalItems = useMemo(() => {
    return items.filter(item => item.inChart).length
  }, [items])
  return (
    <div className='flex justify-evenly fixed bottom-0 left-0 h-20 w-full bg-white drop-shadow'>
      <div className='flex flex-col h-full justify-center'>
        <span>
          Total de itens
        </span>
        <span>
          {totalUnid} unid / {totalItems} items
        </span>
      </div>
      <div>

        <button onClick={() => setIsAddItemActive(true)} className='bg-green-600 h-16 w-16 p-4 rounded-full -mt-6 hover:brightness-125' style={{
          WebkitTapHighlightColor: 'transparent'
        }}>
          <PlusIcon className='text-white' />
        </button>
      </div>
      <div className='flex flex-col h-full justify-center'>
        <span>
          Soma valores
        </span>
        <span>
          {sumValues}
        </span>
      </div>
    </div >
  )
}