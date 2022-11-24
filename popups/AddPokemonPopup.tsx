import { useAddPokemon } from '@hooks/pokemon/useAddPokemon';
import { createPortal } from 'react-dom';

const AddPokemonForm = () => {
  const addPokemon = useAddPokemon()
  const submitPokemon = () => {
    
  }
  return (
    <form className="flex flex-col" onSubmit={submitPokemon}>
      <div className="flex gap-4">
        <label>Name</label>
        <input placeholder="Pokemon Name" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export const AddPokemonPopup = () => {
  const portalElementsContainer = document.querySelector(
    '[ data-ts-portal="overlay-container"]'
  )

  if (!portalElementsContainer) return null

  return createPortal(
    <div className="fixed z-20 left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black/10 backdrop-blur">
      <div className="w-full max-w-[380px] flex flex-col">
        <div>Add Pokemon Form</div>
      </div>
    </div>,
    portalElementsContainer
  )
}
