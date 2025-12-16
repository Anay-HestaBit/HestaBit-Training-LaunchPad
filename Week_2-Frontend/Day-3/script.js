// Select all accordion headers
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Loop through each header
accordionHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    const icon = header.querySelector('.icon');

    // Close all other accordion items
    document.querySelectorAll('.accordion-item').forEach((item) => {
      if (item !== accordionItem) {
        item.classList.remove('active');
        item.querySelector('.icon').textContent = '+';
      }
    });

    // Toggle current accordion
    accordionItem.classList.toggle('active');

    // Update icon
    if (accordionItem.classList.contains('active')) {
      icon.textContent = '−';
    } else {
      icon.textContent = '+';
    }
  });
});
