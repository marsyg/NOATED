import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Define structured types
type Note =
  | { type: 'paragraph'; content: string }
  | { type: 'bullet'; title: string; content: string };

interface NotesSchema {
  mainTitle: string;
  introduction?: string;
  topicHeading?: string;
  notes: Note[];
}

// Function to draw notes content
const drawNotes = (
  page: any,
  notesData: NotesSchema,
  x: number,
  y: number
): number => {
  const lineHeight = 18;
  const fontSize = 12;

  // Helper function to draw text
  const drawLine = (text: string, bold = false) => {
    page.drawText(text, {
      x,
      y,
      size: bold ? 14 : fontSize,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight;
  };

  // Draw Main Title
  drawLine(notesData.mainTitle, true);
  y -= 10;

  // Draw optional introduction
  if (notesData.introduction) {
    drawLine(notesData.introduction);
    y -= 10;
  }

  // Draw optional topic heading
  if (notesData.topicHeading) {
    drawLine(`Topic: ${notesData.topicHeading}`, true);
    y -= 10;
  }

  // Draw Notes
  notesData.notes.forEach((note) => {
    if (note.type === 'paragraph') {
      drawLine(note.content);
    } else {
      drawLine(`• ${note.title}`, true);
      drawLine(note.content);
    }
    y -= 5;
  });

  return y;
};

// PDF generation function
export const createNotesPdf = async (
  notesData: NotesSchema
): Promise<string> => {
  try {
    console.log('Creating PDF...');
    console.log('Notes Data:', notesData);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { height } = page.getSize();

    let y = height - 50;

    // Title
    page.drawText('Extracted Notes', {
      x: 50,
      y,
      size: 18,
      color: rgb(0.2, 0.5, 0.8),
    });

    y -= 30;

    // Draw notes content
    y = drawNotes(page, notesData, 50, y);

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(
      process.cwd(),
      'public',
      `notes-${Date.now()}.pdf`
    );
    fs.writeFileSync(filePath, pdfBytes);
    console.log('PDF created successfully:', filePath);
    return filePath;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw new Error('PDF generation failed');
  }
};
