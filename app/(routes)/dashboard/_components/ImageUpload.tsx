import { Button } from '@/components/ui/button'
import { CloudUpload } from 'lucide-react'
import React from 'react'

function ImageUpload() {
  return (
    <div className='mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='p-7 border border-dashed rounded-md shadow-md
        flex flex-col items-center justify-center
        '>
          <CloudUpload className='h-10 w-10' />
          <h2 className=''> Upload Image</h2>

          <p className='text-gray-400 mt-3'> Click on select button to upload image </p>
          <div>
            <Button className='p-5 border w-full flex mt-7 justify-center'> Select image</Button>
          </div>
          </div>
        <div>
          User input textarea
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
