export async function exportToPdf(element, filename) {
  const { default: html2pdf } = await import('html2pdf.js')
  return html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename: `${filename}.pdf`,
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    })
    .from(element)
    .save()
}
