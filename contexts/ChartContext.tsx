import React, { useContext, createContext, useState, useEffect, } from "react";
import { v4 as uuidV4 } from 'uuid'

type Item = {
  id: string,
  name: string,
  brand: string,
  quantity: number,
  value: number
}

interface ChartContextProps {
  items: Item[]
  addItem(item: Omit<Item, 'id'>): void
  removeItem(itemId: string): void
  modifyItem(item: Item): void
  getItem(itemId: string): Item
}

const ChartContext = createContext<ChartContextProps>(null!)

interface IChartContextProvider {
  children: React.ReactNode
}

export const ChartContextProvider = ({ children }: IChartContextProvider) => {
  const [items, setItems] = useState<Item[]>([])



  function saveItems(itemsToSave: Item[]) {
    localStorage.setItem('chart-app:items', JSON.stringify(itemsToSave))
  }

  useEffect(() => {
    const chartItemsInStorate = localStorage.getItem('chart-app:items')
    setItems(JSON.parse(chartItemsInStorate || '[]'))
  }, [])

  function addItem(item: Omit<Item, 'id'>) {
    const id = uuidV4()
    const newItems = [
      ...items,
      {
        id,
        ...item
      }
    ]
    setItems(newItems)
    saveItems(newItems)
  }
  function removeItem(itemId: string) {
    const newItems = items.filter(item => item.id !== itemId)
    setItems(newItems)
    saveItems(newItems)
  }
  function modifyItem(item: Item) {
    const newItems = items.reduce((acc: Item[], cur) => {
      if (cur.id === item.id) {
        cur = item
      }
      acc.push(cur)
      return acc
    }, [])
    setItems(newItems)
    saveItems(newItems)
  }
  function getItem(itemId: string) {
    return items.find(item => item.id === itemId)
  }

  return (
    <ChartContext.Provider value={{
      items,
      addItem,
      removeItem,
      modifyItem,
      getItem
    }}>
      {children}
    </ChartContext.Provider>
  )
}

export const useChart = () => {
  const result = useContext(ChartContext)
  return result
}