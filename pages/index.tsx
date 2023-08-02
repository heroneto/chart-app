import { TrashIcon } from '@heroicons/react/24/solid'
import { ChartItem } from '../components/ChartItem'
import { ListResume } from '../components/ListResume'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AddItem } from '../components/AddItem'
import { useChart } from '../contexts/ChartContext'
import { ConfirmDeleteAll, ConfirmDeleteAllRef } from '../components/ConfirmDeleteAll'
export default function Home() {
  const { items } = useChart()
  const [isAddItemActive, setIsAddItemActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string>()
  const [itemQuery, setItemQuery] = useState('')

  const ref = useRef<ConfirmDeleteAllRef>(null)

  function handleSelectItem(id: string) {
    setSelectedItem(id)
    setIsAddItemActive(true)

  }

  function onClose() {
    setSelectedItem(undefined)
    setIsAddItemActive(false)
  }

  const filteredItems = useMemo(() => {
    return itemQuery.length ? items.filter(item => item.name.toUpperCase().includes(itemQuery.toLocaleUpperCase())) : items
  }, [itemQuery, items])



  return (
    <div className='bg-gray-300 w-full h-screen z-0'>


      <header className="bg-blue-900 w-full h-16 flex p-6 items-center fixed top-0 left-0">
        <div>
          <input id='search-item' value={itemQuery} onChange={e => setItemQuery(e.target.value)} className="w-72 bg-blue-950 p-3 rounded-md text-white" placeholder='Insira o nome do item' />
        </div>
        <div className='ml-8'>
          <button onClick={ref.current?.openDialog} type='button' name='clear_chart_itens' id='clear_chart_itens'>
            <TrashIcon className='h-6 w-6 text-white' />
          </button>
        </div>

      </header>

      {!isAddItemActive && (
        <div className='flex bg-gray-300 mt-16'>
          <div id='chart-list' className='w-full px-4 mb-32'>
            {filteredItems.map(item => (
              <ChartItem itemId={item.id} checked={item.inChart} onClick={() => handleSelectItem(item.id)} key={item.id} brand={item.brand} name={item.name} quantity={item.quantity} value={item.value} />
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
      <ConfirmDeleteAll compRef={ref} />
    </div >
  )
}
