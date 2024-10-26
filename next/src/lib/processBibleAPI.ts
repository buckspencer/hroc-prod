export class processBibleAPI {
  private htmlContent: string;

  constructor(htmlContent: string) {
    this.htmlContent = htmlContent;
  }

  process(): string {
    // Create a temporary DOM element to hold the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.htmlContent;

    // Process each paragraph
    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      // Add Tailwind CSS classes to the paragraphs
      paragraph.classList.add('mb-4', 'text-gray-700');

      // Process each span for specific classes
      const spans = paragraph.querySelectorAll('span');
      spans.forEach(span => {
        if (span.dataset.number) {
          // Add Tailwind CSS classes for styling verse numbers as superscript with margin
          span.classList.add('text-gray-600/40', 'text-xs', 'align-super', 'relative', 'top-[-0.5em]', 'mr-5'); // Added 'mr-1' for right margin
        }

      });
    });

    // Return the modified HTML as a string
    return tempDiv.innerHTML;
  }
}
