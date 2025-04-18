'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Share2,
  Languages,
  Save,
  Camera,
  Upload,
  FolderPlus,
  Eye,
  File,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { downloadPDF } from '@/actions/downloadPDF.action';

export default function HandwritingToTypedPage() {
  const router = useRouter();
  const [json, setJson] = useState(null);
  const [extractedText, setExtractedText] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  );
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Mock folders data
  const folders = [
    { id: 1, name: 'Work' },
    { id: 2, name: 'Personal' },
    { id: 3, name: 'Projects' },
  ];
  const handlePreviewPDF = () => {
    window.open(pdfUrl, '_blank');
  };
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      console.log('Generating PDF from:', json);

      const result = await downloadPDF(json);

      if (result.success) {
        setPdfUrl(result.data);
        console.log('PDF generated successfully inside sucess:', result.data);
      } else {
        console.error('Failed to generate PDF:', result.error);
        alert('Failed to generate PDF. Please try again.');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('An error occurred while generating the PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

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
          if (!data.success) {
            throw new Error(data.error);
          }
          setJson(data.text);
          setExtractedText(JSON.stringify(data.text, null, 2)); // Pretty-print JSON

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
            <Button
              variant='outline'
              className='justify-start gap-2 border-wood text-wood hover:bg-wood/10'
              onClick={() => setShowPdfPreview(!showPdfPreview)}
            >
              <Eye className='h-4 w-4' />
              {showPdfPreview ? 'Hide PDF Preview' : 'Show PDF Preview'}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='lg:w-2/3 space-y-4'
        >
          {showPdfPreview ? (
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
                  PDF Preview:
                </h2>
                <p className='text-wood/70'>
                  {pdfUrl
                    ? 'Your PDF is ready to view and download'
                    : 'Generate a PDF to preview how your document will look'}
                </p>
              </div>

              {pdfUrl ? (
                <div>
                  <div>
                    <a href={pdfUrl} target='_blank' rel='noopener noreferrer'>
                      Open PDF
                    </a>

                    <iframe src={pdfUrl} width='100%' height='600px'></iframe>
                  </div>
                </div>
              ) : (
                <div className='min-h-[400px] bg-white border border-wood/20 rounded-md p-4 pl-6 flex flex-col items-center justify-center'>
                  <File className='h-16 w-16 text-wood/30 mb-4' />
                  <div className='max-w-md text-center'>
                    <h3 className='text-lg font-medium mb-2 text-wood'>
                      PDF Preview
                    </h3>
                    <p className='text-wood/70 mb-4'>
                      Generate a PDF to see a preview here
                    </p>
                    <div className='bg-cream/50 p-4 rounded-md text-left'>
                      {extractedText.split('\n\n').map((paragraph, i) => (
                        <p key={i} className='mb-4 last:mb-0'>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className='flex flex-wrap gap-2 mt-4 pl-6'>
                {pdfUrl ? (
                  <Button
                    className='gap-2 bg-wood hover:bg-wood/80 text-cream'
                    onClick={() => window.open(pdfUrl, '_blank')}
                  >
                    <Download className='h-4 w-4' />
                    Download PDF
                  </Button>
                ) : (
                  <Button
                    className='gap-2 bg-wood hover:bg-wood/80 text-cream'
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPdf}
                  >
                    {isGeneratingPdf ? 'Generating...' : 'Generate PDF'}
                  </Button>
                )}
                <Button
                  variant='outline'
                  className='gap-2 border-wood text-wood hover:bg-wood/10'
                  onClick={() => setShowPdfPreview(false)}
                >
                  <FileText className='h-4 w-4' />
                  Back to Editor
                </Button>
              </div>
            </div>
          ) : (
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
                className='min-h-[400px] bg-cream/50 border-wood/20 focus-visible:ring-forest pl-6 text-black'
              />

              <div className='flex flex-wrap gap-2 mt-4 pl-6'>
                <Button className='gap-2 bg-wood hover:bg-wood/80 text-cream'>
                  <Save className='h-4 w-4' />
                  Save to computer
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      className='gap-2 border-wood text-wood hover:bg-wood/10'
                    >
                      <FolderPlus className='h-4 w-4' />
                      Add to folder!
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='bg-cream border-wood'>
                    <DialogHeader>
                      <DialogTitle className='font-playfair text-wood'>
                        Add to Folder
                      </DialogTitle>
                      <DialogDescription className='text-wood/70'>
                        Choose an existing folder or create a new one
                      </DialogDescription>
                    </DialogHeader>

                    <RadioGroup defaultValue='existing' className='py-4'>
                      <div className='flex items-start space-x-2 mb-4'>
                        <RadioGroupItem
                          value='existing'
                          id='existing'
                          className='mt-1'
                        />
                        <div className='grid gap-1.5 w-full'>
                          <Label
                            htmlFor='existing'
                            className='font-medium text-wood'
                          >
                            Use existing folder
                          </Label>
                          <Select>
                            <SelectTrigger className='border-wood/50 focus:ring-forest'>
                              <SelectValue placeholder='Select a folder' />
                            </SelectTrigger>
                            <SelectContent className='bg-cream border-wood'>
                              {folders.map((folder) => (
                                <SelectItem
                                  key={folder.id}
                                  value={folder.id.toString()}
                                >
                                  {folder.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className='flex items-start space-x-2'>
                        <RadioGroupItem value='new' id='new' className='mt-1' />
                        <div className='grid gap-1.5 w-full'>
                          <Label
                            htmlFor='new'
                            className='font-medium text-wood'
                          >
                            Create new folder
                          </Label>
                          <Input
                            placeholder='Enter folder name'
                            className='border-wood/50 focus-visible:ring-forest'
                          />
                        </div>
                      </div>
                    </RadioGroup>

                    <DialogFooter>
                      <Button className='bg-wood hover:bg-wood/80 text-cream'>
                        Add to Folder
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}

          <div className='flex flex-wrap gap-2'>
            <Button
              variant='outline'
              className='gap-2 border-wood text-wood hover:bg-wood/10'
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
            >
              <Download className='h-4 w-4' />
              {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
            </Button>
            <Button
              variant='outline'
              className='gap-2 border-wood text-wood hover:bg-wood/10'
            >
              <Share2 className='h-4 w-4' />
              Share Publicly
            </Button>
            <div className='relative'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='gap-2 border-wood text-wood hover:bg-wood/10'
                  >
                    <Languages className='h-4 w-4' />
                    Change language
                  </Button>
                </DialogTrigger>
                <DialogContent className='bg-cream border-wood'>
                  <DialogHeader>
                    <DialogTitle className='font-playfair text-wood'>
                      Select Language
                    </DialogTitle>
                    <DialogDescription className='text-wood/70'>
                      Choose the language for handwriting recognition
                    </DialogDescription>
                  </DialogHeader>

                  <RadioGroup
                    defaultValue={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                    className='py-4 space-y-2'
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='english' id='english' />
                      <Label
                        htmlFor='english'
                        className='font-medium text-wood'
                      >
                        English
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='hindi' id='hindi' />
                      <Label htmlFor='hindi' className='font-medium text-wood'>
                        Hindi
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='hinglish' id='hinglish' />
                      <Label
                        htmlFor='hinglish'
                        className='font-medium text-wood'
                      >
                        Hinglish
                      </Label>
                    </div>
                  </RadioGroup>

                  <DialogFooter>
                    <Button className='bg-wood hover:bg-wood/80 text-cream'>
                      Apply Language
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
