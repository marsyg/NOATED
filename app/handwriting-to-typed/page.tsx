'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Share2,
  Languages,
  FileImage,
  Save,
  Camera,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function HandwritingToTypedPage() {
  const router = useRouter();
  const [extractedText, setExtractedText] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  );
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setSelectedImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64String = reader.result; // Remove the prefix

        const payload = {
          docBase64: base64String,
          filename: file.name,
        };

        try {
          const response = await fetch('/api/jsonToUploadFile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          console.log('Upload Response:', data);
        } catch (error) {
          console.error('Upload Error:', error);
        }
      };
    }
  };

  const openFileExplorer = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className='container py-6 max-w-6xl'>
      <header className='mb-6'>
        <div className='flex items-center gap-4'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => router.back()}
            className='h-12 w-12 rounded-md border-wood text-wood hover:bg-wood/10'
          >
            <ArrowLeft className='h-6 w-6' />
          </Button>
          <h1 className='text-2xl font-bold font-playfair text-wood'>
            Handwriting to typed
          </h1>
        </div>
      </header>

      <div className='flex flex-col lg:flex-row gap-6'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='lg:w-1/3 space-y-4'
        >
          <div className='cabinet text-cream'>
            <h2 className='text-xl font-semibold font-playfair mb-4'>
              Your image:
            </h2>
            <div className='aspect-[3/4] bg-cream rounded-md border-2 border-cream/20 flex items-center justify-center mb-4'>
              <img
                src={selectedImage || '/placeholder.svg?height=400&width=300'}
                alt='Handwritten note'
                className='max-h-full object-contain'
              />
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <Button
                variant='outline'
                className='w-full border-cream/20 text-cream hover:bg-wood/80'
              >
                Take picture
              </Button>
              <Button
                variant='outline'
                className='w-full border-cream/20 text-cream hover:bg-wood/80'
              >
                Send image(s) again
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <Button
              variant='outline'
              className='justify-start gap-2 border-wood text-wood hover:bg-wood/10'
            >
              <Camera className='h-4 w-4' />
              Take a picture
            </Button>
            <Button
              variant='outline'
              className='justify-start gap-2 border-wood text-wood hover:bg-wood/10'
              onClick={openFileExplorer}
            >
              <Upload className='h-4 w-4' />
              Upload from computer
            </Button>
            <input
              id='fileInput'
              type='file'
              accept='image/*'
              onChange={handleUploadImage}
              className='hidden'
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='lg:w-2/3 space-y-4'
        >
          <div className='notebook-page rounded-lg p-4 border border-wood/20 relative'>
            <div className='notebook-holes'>
              <div className='notebook-hole'></div>
              <div className='notebook-hole'></div>
              <div className='notebook-hole'></div>
              <div className='notebook-hole'></div>
              <div className='notebook-hole'></div>
            </div>

            <div className='mb-4 pl-6'>
              <h2 className='text-xl font-semibold font-playfair text-wood'>
                Typed script:
              </h2>
              <p className='text-wood/70'>
                You can edit by typing or re-send an image to be read again!
              </p>
            </div>

            <Textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              className='min-h-[400px] bg-cream/50 border-wood/20 focus-visible:ring-forest pl-6'
            />

            <div className='flex flex-wrap gap-2 mt-4 pl-6'>
              <Button className='gap-2 bg-wood hover:bg-wood/80 text-cream'>
                <Save className='h-4 w-4' />
                Save to computer
              </Button>
              <Button
                variant='outline'
                className='gap-2 border-wood text-wood hover:bg-wood/10'
              >
                <FileImage className='h-4 w-4' />
                Add to folder!
              </Button>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            <Button
              variant='outline'
              className='gap-2 border-wood text-wood hover:bg-wood/10'
            >
              <Download className='h-4 w-4' />
              Download PDF
            </Button>
            <Button
              variant='outline'
              className='gap-2 border-wood text-wood hover:bg-wood/10'
            >
              <Share2 className='h-4 w-4' />
              Share Publicly
            </Button>
            <Button
              variant='outline'
              className='gap-2 border-wood text-wood hover:bg-wood/10'
            >
              <Languages className='h-4 w-4' />
              Change language
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
