import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadReportAsPdf(elementId: string, candidateName = 'CareerLens_Analysis'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Report element not found');
  }

  // Create temporary loading indicator or style adjustments
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#000000',
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Add subsequent pages if report is long
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${candidateName}_Resume_Report.pdf`);
}
