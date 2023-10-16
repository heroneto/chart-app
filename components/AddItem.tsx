import { PlusIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useChart } from "../contexts/ChartContext";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { transformMoney } from "../commons/utils";
import { CurrencyInput } from "./CurrencyInput";
interface IAddItem {
  setIsAddItemActive: (state: boolean) => void
  itemId?: string
  onClose(): void
  isEditing?: boolean
}


export function AddItem({ setIsAddItemActive, itemId, onClose, isEditing = false }: IAddItem) {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [value, setValue] = useState<number>(0)
  const [inChart, setInChart] = useState(false)
  const formatedValue = useMemo(() => {
    return Number(value?.toString().replaceAll(',', '.'))
  }, [value])
  const { addItem, removeItem, getItem, modifyItem } = useChart()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (isEditing && itemId) {
      modifyItem({
        brand,
        name,
        quantity,
        value: formatedValue,
        id: itemId,
        inChart: false,
      })
    } else {

      addItem({
        brand,
        name,
        quantity,
        value: formatedValue,
        inChart: inChart

      })
    }
    setIsAddItemActive(false)
    onClose()
  }

  function handleRemove() {
    if (itemId) {
      removeItem(itemId)
      setIsAddItemActive(false)
      onClose()
    }
  }

  function loadItem(id: string) {
    const itemFromState = getItem(id)
    setName(itemFromState.name)
    setBrand(itemFromState.brand)
    setQuantity(itemFromState.quantity)
    setValue(itemFromState.value)
    setValue(itemFromState.value)
    setInChart(itemFromState.inChart)
  }

  useEffect(() => {
    if (isEditing && itemId) {
      loadItem(itemId)
    }
  }, [])

  function decrement() {
    const newValue = quantity <= 1 ? 0 : quantity - 1
    setQuantity(newValue)
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className='fixed top-10 left-4 right-4 bottom-10  bg-white z-10 rounded-md pt-4 px-4'>
        <div className='w-full flex justify-between h-1/4 items-end flex-col'>
          <button type="button" onClick={handleRemove}><TrashIcon className={`text-red-800 h-8 w-8 ${!isEditing && 'hidden'}`} /></button>
          <div className="flex flex-col items-end ">
            <span className='text-md font-normal'>{transformMoney(formatedValue)} un. </span>
            <span className='text-4xl font-semibold '>{transformMoney(formatedValue * quantity)}</span>
          </div>
        </div>
        <div className='h-1/4 '>
          <div>
            <label className='text-sm mb-2 font-medium text-gray-900' htmlFor='nome-produto' >Nome do produto</label>
            <input
              type='text'
              id='nome-produto'
              name='nome-produto'
              className='bg-gray-200 p-3 w-full rounded-sm  h-10'
              placeholder='Insira o nome do produto'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mt-2 ">
            <label className='text-sm mb-2 font-medium text-gray-900' htmlFor='marca-produto' >Marca do produto</label>
            <input
              type='text'
              id='marca-produto'
              name='marca-produto'
              value={brand}
              onChange={e => setBrand(e.target.value)}
              className='bg-gray-200 p-3 w-full rounded-sm mt-2  h-10' placeholder='Insira a marca' />
          </div>
          <div className='flex justify-between mt-3'>
            <div className="flex flex-col w-1/4 ">
              <div className="custom-number-input h-10 w-32">
                <label htmlFor="quantidade" className="w-full text-gray-700 text-sm font-semibold">Quantidade
                </label>
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button onClick={decrement} type='button' data-action="decrement" className=" bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input onChange={e => setQuantity(Number(quantity))} name='quatidade' id='quantidade' value={quantity} type="number" className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 "  ></input>
                  <button onClick={() => setQuantity(quantity + 1)} type='button' data-action="increment" className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
                {/* <label className='text-sm mb-2 font-medium text-gray-900' htmlFor='quantidade-produto' >Quantidade</label>
              <div className='flex justify-between '>
                <button type='button'>
                  <span>-</span>
                </button>
                <input
                  type='number'
                  id='quantidade-produto'
                  name='quantidade-produto'
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className='p-3 rounded-sm bg-gray-300 '
                  placeholder='Quantidade'
                />
                <button type='button'>
                  <span>+</span>
                </button> */}
              </div>
            </div>
            <div className="flex flex-col w-2/4">
              <CurrencyInput currency={value} setCurrency={setValue} />
              {/* <CurrencyInput
                className='bg-gray-200 p-3  rounded-sm  h-10'
                id="input-example"
                name="input-name"
                placeholder="Please enter a number"
                defaultValue={value}
                decimalsLimit={2}
                value={value}
                onValueChange={(value) => setValue(value || 0)}
                intlConfig={{
                  locale: 'pt-BR',
                  currency: 'BRL'
                }}
              /> */}

            </div>
          </div>
          <div >


          </div>
        </div>

        <div className='flex justify-evenly items-end h-2/4 mt-8'>

          <button type='button' onClick={onClose} className='bg-gray-600 h-16 w-16 p-4 rounded-full hover:brightness-125' style={{
            WebkitTapHighlightColor: 'transparent'
          }}>
            <XMarkIcon className='text-white' />
          </button>
          <button type='submit' className='bg-green-600 h-16 w-16 p-4 rounded-full hover:brightness-125' style={{
            WebkitTapHighlightColor: 'transparent'
          }}>
            <PlusIcon className='text-white' />
          </button>

        </div>
      </form >
      <div className='fixed top-0 left-0 bg-black h-screen w-screen opacity-30  z-0' />
    </>
  )
}