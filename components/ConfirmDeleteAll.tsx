import { DialogHTMLAttributes, RefObject, useEffect, useImperativeHandle, useRef, useState } from "react"
import { useChart } from "../contexts/ChartContext"


export type ConfirmDeleteAllRef = {
  openDialog(): void
  closeDialog(): void
}

interface IConfirmDeleteAll {
  compRef: RefObject<ConfirmDeleteAllRef>
}

export function ConfirmDeleteAll({
  compRef
}: IConfirmDeleteAll) {
  const [isOpen, setIsOpen] = useState(false)
  const { deleteAll } = useChart()
  const ref = useRef<HTMLDialogElement>(null)
  console.log('isOpen', isOpen)
  function openDialog() {
    ref.current?.showModal()
    setIsOpen(true)
  }

  function closeDialog() {
    ref.current?.close()
    setIsOpen(false)
  }
  useEffect(() => {
    setIsOpen(ref?.current?.open || false)
  }, [])

  useImperativeHandle(compRef, () => {
    return {
      openDialog,
      closeDialog
    };
  }, []);

  function handleSubmit() {
    deleteAll()
    closeDialog()
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => { document.body.style.overflow = "scroll" }
  }, [isOpen])


  return (
    <dialog ref={ref}
      className='bg-white w-full p-8 fixed mb-0 rounded-t-xl h-52'
    >
      <form>
        <div className="flex flex-col justify-between h-36 ">

          <div>
            <span className="font-medium ">Deseja deletar todos items?</span>
          </div>
          <div className='w-full flex flex-row justify-evenly'>
            <button className="bg-gray-600 text-white p-2 w-28 font-medium rounded-lg" type="button" onClick={closeDialog}>Não</button>
            <button onClick={handleSubmit} className="bg-blue-800 text-white p-2 w-28 font-medium rounded-lg">Sim</button>
          </div>
        </div>
      </form>
    </dialog>
  )
}