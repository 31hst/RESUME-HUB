import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure pdfjs worker source safely
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
  } catch (err) {
    console.warn('Failed to set pdfjs workerSrc:', err);
  }
}

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export interface ParseResult {
  text: string;
  pageCount?: number;
  fileName: string;
  fileSize: number;
}

export async function parsePdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str || '')
      .join(' ');
    fullText += pageText + '\n\n';
  }

  return fullText.trim();
}

export async function parseDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

export async function parseResumeFile(file: File): Promise<ParseResult> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload a smaller file.`);
  }

  const extension = file.name.split('.').pop()?.toLowerCase();
  let text = '';

  if (extension === 'pdf') {
    text = await parsePdf(file);
  } else if (extension === 'docx') {
    text = await parseDocx(file);
  } else if (extension === 'txt') {
    text = await file.text();
  } else {
    throw new Error(`Unsupported file type (.${extension}). Please upload a PDF or DOCX resume.`);
  }

  if (!text || text.trim().length < 50) {
    throw new Error('Could not extract readable text from this file. The document might be image-based or password-protected.');
  }

  return {
    text: text.trim(),
    fileName: file.name,
    fileSize: file.size,
  };
}
