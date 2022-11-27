import { base64ToBlob } from './base64ToBlob';

export const getSrcFromBase64Image = (base64Data: string) => {
  const blob = base64ToBlob(base64Data, "image/jpeg")
  const src = URL.createObjectURL(blob)
  return src
}
