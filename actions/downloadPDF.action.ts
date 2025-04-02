'use server';

import { createNotesPdf } from '@/lib/createPDF';
import fs from 'fs';
import path from 'path';

type Note =
  | { type: 'paragraph'; content: string }
  | { type: 'bullet'; title: string; content: string };

interface NotesSchema {
  mainTitle: string;
  introduction?: string;
  topicHeading?: string;
  notes: Note[];
}

// Server Action to generate a PDF and return its path
export async function downloadPDF(notesData: NotesSchema) {
  try {
    console.log('Generating PDF...');
    // Generate the PDF and get its path
    const pdfPath = await createNotesPdf(notesData);

    if (!fs.existsSync(pdfPath)) {
      throw new Error('PDF file not found');
    }

    return {
      success: true,
      data: pdfPath, // Returning the file path instead of the file itself
    };
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return {
      success: false,
      message: 'Failed to generate PDF',
    };
  }
}
