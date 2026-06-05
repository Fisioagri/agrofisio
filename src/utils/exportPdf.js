export async function exportToPdf(element, filename) {
  const { default: html2pdf } = await import('html2pdf.js')
  return html2pdf()
    .set({
      margin: [14, 10, 14, 10],
      filename: `${filename}.pdf`,
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before: '.pdf-page-before', avoid: '.pdf-no-break' },
    })
    .from(element)
    .save()
}
