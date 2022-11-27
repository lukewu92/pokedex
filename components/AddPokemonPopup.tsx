import { IAddPokemon, IPokemonType, PokemonTypes } from '@api/pokemon/types';
import { Input, Label, Option, Select } from '@components/FormElements';
import { Button } from '@form-elements/Button';
import { useAddPokemon } from '@hooks/pokemon/useAddPokemon';
import { useGetAddedPokemons } from '@hooks/pokemon/useGetAddedPokemons';
import { MinusIcon } from '@icons/MinusIcon';
import { PhotoIcon } from '@icons/PhotoIcon';
import { PlusIcon } from '@icons/PlusIcon';
import { getBase64Image } from '@utils/getBase64Image';
import { getSrcFromBase64Image } from '@utils/getSrcFromBase64Image';
import NextImage from 'next/image';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Loading } from './Loading';

type IError =
  | {
      [name: string]: boolean
    }
  | undefined

const defaultFormValues = {
  name: "",
  imageData: undefined,
  types: ["normal"],
} as IAddPokemon

const AddPokemonForm = ({ onClose }: { onClose: () => void }) => {
  const [errors, setErrors] = useState<IError>(undefined)
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const { mutate, isLoading: isAddingPokemon } = useAddPokemon()
  const { data } = useGetAddedPokemons()

  const [formData, setFormData] = useState({
    ...defaultFormValues,
  })

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const target = e.target
      const name = e.target.name
      if (target.dataset?.jsArrayIndex) {
        // @ts-ignore
        const addValueToArray = (arr: any[], index, value) => {
          const newArr = [...arr]
          newArr[index] = value
          return newArr
        }

        setFormData((prevState) => ({
          ...prevState,
          // @ts-ignore
          [name]: addValueToArray(
            prevState[name]!,
            Number(target.dataset?.jsArrayIndex),
            target.value,
          ),
        }))
      } else {
        setFormData((prevState) => ({ ...prevState, [name]: target.value }))
      }
    },
    [],
  )

  /* Pokemon Image Events */
  const imageSrc = useMemo(
    () =>
      formData?.imageData ? getSrcFromBase64Image(formData?.imageData) : null,
    [formData?.imageData],
  )
  const imageLoading =
    Boolean(fileUploadRef?.current?.files?.length) && Boolean(!imageSrc)

  const onChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    // console.log("files", files)
    if (files?.[0]) {
      const img = new Image()
      img.onload = () => {
        const base64Data = getBase64Image(img)
        setFormData((prevState) => ({ ...prevState, imageData: base64Data }))
      }
      img.src = URL.createObjectURL(files[0])
    } else {
      setFormData((prevState) => ({ ...prevState, imageData: undefined }))
    }
  }, [])

  const addFile = useCallback(() => {
    fileUploadRef.current?.click()
  }, [fileUploadRef])

  /* Pokemon Types Events */
  const addType = useCallback(() => {
    const addTypeToArray = (prevTypes: IPokemonType[]) => {
      // Check if there is type which aren't added
      const uniqueType = PokemonTypes.find((type) => !prevTypes.includes(type))
      return uniqueType ? [...prevTypes, uniqueType] : prevTypes
    }

    setFormData((prevState) => ({
      ...prevState,
      types: addTypeToArray(prevState.types),
    }))
  }, [])

  const removeType = useCallback(() => {
    const removeTypeFromArray = (prevTypes: IPokemonType[]) => {
      const newTypes = [...prevTypes]
      newTypes.pop()
      return newTypes ? newTypes : prevTypes
    }
    setFormData((prevState) => ({
      ...prevState,
      types: removeTypeFromArray(prevState.types),
    }))
  }, [])

  /* On Submit */
  const submitPokemon = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const submitFormData = {
        name: formData.name,
        imageData: formData.imageData,
        types: formData.types,
      }

      let errors: IError
      const oldAddedPokemons = data
      Object.keys(submitFormData).forEach((key) => {
        //@ts-ignore
        if (!Boolean(submitFormData[key])) {
          errors = { ...errors, [key]: true }
        }
      })

      if (
        submitFormData.name &&
        oldAddedPokemons?.find((p) => p.name === submitFormData.name)
      ) {
        errors = { ...errors, ["duplicated-name"]: true, ["name"]: true }
      }

      if (errors) {
        setErrors(errors)
      }
      setErrors(errors)
      // console.log('errors', errors)

      if(!errors) {
        mutate({
          name: formData.name,
          imageData: formData.imageData,
          types: formData.types,
        }, {
          onSuccess: onClose
        })
      }
    },
    [formData.imageData, formData.name, formData.types, data],
  )

  return (
    <form
      className="flex relative flex-col bg-black w-full p-4 border border-slate-50/10 flex-1 rounded-md gap-4"
      onSubmit={submitPokemon}
    >
      {/* Overlay loader for when user submits */}
      {isAddingPokemon && (
        <div className="z-50 absolute left-0 top-0 right-0 bottom-0 flex flex-col text-center items-center justify-center bg-black/80">
          <Loading />
          <span className="animate-pulse">Adding Pokemon...</span>
        </div>
      )}
      {/* Photo Upload Field */}
      <div className="flex flex-col gap-3 mx-auto text-center">
        <input
          type="file"
          name="image"
          data-js-field-name="image"
          accept="image/png, image/jpeg"
          hidden
          ref={fileUploadRef}
          onChange={onChangeFile}
        />
        <span className="opacity-70 text-xs">Pokemon Photo</span>
        <button
          type="button"
          onClick={addFile}
          className={`group border relative ${
            errors?.["imageData"]
              ? "border-4 border-red-500 transition-none animate-shake bg-red-500/10 text-red-500"
              : "border-slate-50"
          } rounded-md w-[200px] h-[200px] mx-auto flex items-center justify-center cursor-pointer transition-all sm:hover:text-black sm:hover:bg-white sm:active:scale-90`}
        >
          {imageLoading && (
            <div className="absolute z-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black rounded-[inherit]">
              <Loading />
            </div>
          )}
          {imageSrc && (
            <NextImage
              width={200}
              height={200}
              className={"max-h-full w-auto border border-transparent"}
              alt="uploaded-pokemon-photo"
              src={imageSrc}
            />
          )}
          <div
            className={`${
              imageSrc
                ? "opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                : ""
            } absolute top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center`}
          >
            <PhotoIcon className="text-6xl" />
          </div>
        </button>
      </div>

      {/* Name Field */}
      <div className="flex gap-6 justify-between">
        <Label>Name:</Label>
        <Input
          autoComplete={"off"}
          className={`${
            errors?.["name"]
              ? "outline outline-4 !outline-red-500 transition-none animate-shake"
              : "bg-slate-900"
          }`}
          name="name"
          onChange={onChange}
          value={formData?.name}
        />
      </div>
      {/* Check if pokemon name already existed in added pokemon list. */}
      {errors?.["duplicated-name"] && (
        <span className='text-sm text-red-500 -mt-4'>Name already existed!</span>
      )}

      {/* Pokemon Types Field */}
      <div className="flex gap-6 justify-between">
        <Label>Type:</Label>
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            {formData?.types?.map((_, index) => (
              <Select
                className="flex-1"
                name="types"
                data-js-array-index={index}
                value={formData?.types[index]}
                onChange={onChange}
                key={index}
              >
                {PokemonTypes.map((type) => (
                  <Option key={type} className="capitalize" value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={removeType}
              className="flex-1 w-9 h-9 flex items-center justify-center text-center bg-slate-700/10 text-4xl hover:opacity-70"
            >
              <MinusIcon />
            </button>
            <button
              type="button"
              onClick={addType}
              className="flex-1 w-9 h-9 flex items-center justify-center text-center bg-slate-700/10 text-4xl hover:opacity-70"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 ml-auto mt-auto">
        <Button onClick={onClose} type="button" secondary>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}

type IAddPokemonPopup = React.HTMLAttributes<HTMLDivElement> & {
  onClosePopup: () => void
}

export const AddPokemonPopup = ({
  onClosePopup,
  ...rest
}: IAddPokemonPopup) => {
  const [portalElem, setPortalElem] = useState<Element | null>()

  useEffect(() => {
    setPortalElem(
      document?.querySelector('[ data-ts-portal="overlay-container"]'),
    )
  }, [])

  if (!portalElem) return null

  return createPortal(
    <div
      className="fixed z-20 left-0 top-0 right-0 bottom-0 flex items-center justify-center bg-black/50 pointer-events-auto backdrop-blur-sm animate-fade-in"
      {...rest}
    >
      <div
        className="absolute left-0 right-0 bottom-0 top-0"
        onClick={onClosePopup}
      />
      <div className="w-full z-20 max-w-[min(100%-24px)] sm:max-w-[380px] flex flex-col p-4 gap-4 rounded-xl bg-black/80 backdrop-blur border border-slate-100/50">
        <div className="text-center">Add Pokemon Form</div>
        <AddPokemonForm onClose={onClosePopup} />
      </div>
    </div>,
    portalElem,
  )
}
