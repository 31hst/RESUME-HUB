import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';
import mammoth from 'mammoth';

// Configure pdfjs to use the locally bundled Vite worker asset (Zero CDN dependency)
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  } catch (err) {
    console.warn('Failed to set local pdfjs workerSrc:', err);
  }
}

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export interface ParseResult {
  text: string;
  pageCount?: number;
  fileName: string;
  fileSize: number;
}

/**
 * Fallback raw text extractor for PDF array buffers if pdfjs fails
 */
function extractRawPdfStrings(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  // Convert printable ASCII characters and newlines
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    if ((b >= 32 && b <= 126) || b === 10 || b === 13 || b === 9) {
      str += String.fromCharCode(b);
    } else {
      str += ' ';
    }
  }

  // Extract text within parentheses (...) which represent text in PDF syntax
  const matches = str.match(/\(([^()]{2,})\)/g);
  if (matches && matches.length > 5) {
    return matches
      .map(m => m.slice(1, -1).trim())
      .filter(m => m.length > 1 && !/^[0-9\W]+$/.test(m))
      .join(' ');
  }

  // Fallback to word-like tokens
  const words = str.split(/\s+/).filter(w => w.length > 2 && /^[a-zA-Z0-9#+.-]+$/.test(w));
  return words.slice(0, 500).join(' ');
}

export async function parsePdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });

    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str || '')
          .join(' ');
        fullText += pageText + '\n\n';
      } catch (pageErr) {
        console.warn(`Error reading page ${pageNum}:`, pageErr);
      }
    }

    if (fullText.trim().length >= 30) {
      return fullText.trim();
    }
  } catch (pdfErr) {
    console.warn('pdfjs extraction failed, attempting raw stream fallback:', pdfErr);
  }

  // Fallback if pdfjs parser failed
  const fallbackText = extractRawPdfStrings(arrayBuffer);
  if (fallbackText && fallbackText.trim().length >= 30) {
    return fallbackText.trim();
  }

  throw new Error('Could not extract readable text from this PDF. Please copy and paste your resume text directly into the "Paste Text" tab.');
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
  } else if (extension === 'txt' || extension === 'md') {
    text = await file.text();
  } else {
    // Try text reader fallback
    try {
      text = await file.text();
    } catch {
      throw new Error(`Unsupported file type (.${extension}). Please upload a PDF, DOCX, or TXT resume.`);
    }
  }

  if (!text || text.trim().length < 25) {
    throw new Error('The uploaded document appears to be empty or image-based. Please copy and paste your resume text into the "Paste Text" tab.');
  }

  return {
    text: text.trim(),
    fileName: file.name,
    fileSize: file.size,
  };
}
