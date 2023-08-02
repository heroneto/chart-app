import { TrashIcon } from '@heroicons/react/24/solid'
import { ChartItem } from '../components/ChartItem'
import { ListResume } from '../components/ListResume'
import { useState } from 'react'
import { AddItem } from '../components/AddItem'
import { useChart } from '../contexts/ChartContext'
export default function Home() {
  const { items, deleteAll } = useChart()
  const [isAddItemActive, setIsAddItemActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>()


  function handleSelectItem(id: string) {
    setSelectedItem(id)
    setIsAddItemActive(true)

  }

  function onClose() {
    setSelectedItem(undefined)
    setIsAddItemActive(false)
  }

  return (
    <div className='bg-gray-300 w-full h-screen z-0'>
      <header className="bg-blue-900 w-full h-16 flex p-6 items-center fixed top-0 left-0">       <div>
        <input disabled className="w-72 bg-blue-950 p-3 rounder text-white" placeholder='Insira o nome do item' />
      </div>
        <div className='ml-8'>
          <button onClick={deleteAll} type='button' name='clear_chart_itens' id='clear_chart_itens'>
            <TrashIcon className='h-6 w-6 text-white' />
          </button>
        </div>

      </header>

      {!isAddItemActive && (
        <div className='flex bg-gray-300 mt-16'>
          <div id='chart-list' className='w-full px-4 mb-32'>
            {items.map(item => (
              <ChartItem onClick={() => handleSelectItem(item.id)} key={item.id} brand={item.brand} name={item.name} quantity={item.quantity} value={item.value} />
            ))}
          </div>
        </div>
      )}

      {!isAddItemActive && (
        <ListResume setIsAddItemActive={setIsAddItemActive} />
      )}

      {isAddItemActive && (
        <AddItem isEditing={selectedItem ? true : false} onClose={onClose} itemId={selectedItem} setIsAddItemActive={setIsAddItemActive} />
      )}
    </div >
  )
}
