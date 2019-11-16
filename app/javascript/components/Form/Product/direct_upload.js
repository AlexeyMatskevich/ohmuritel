import { BlobUpload } from '@rails/activestorage/src/blob_upload'
import { CSRF } from '../../../utils/csrf'

export const directUpload = (url, headers, file) => {
  if (process.env.NODE_ENV === 'development') {
    headers = ({ ...headers, 'X-CSRF-Token': CSRF() })
  }

  const upload = new BlobUpload({ file, directUploadData: { url, headers } })
  console.log(upload)
  return new Promise((resolve, reject) => {
    upload.create(error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
