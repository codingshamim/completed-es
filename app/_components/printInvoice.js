export function printInvoice(content) {
  const invoiceContent = content;

  // Create a temporary iframe to load the invoice content
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.style.border = "none";

  // Append the iframe to the document body
  document.body.appendChild(iframe);

  const iframeDocument = iframe.contentWindow && iframe.contentWindow.document;
  if (!iframeDocument) {
    console.error("Failed to access iframe document");
    return;
  }

  iframeDocument.open();
  iframeDocument.write(invoiceContent);
  iframeDocument.close();

  // Wait for the content to load, then print
  iframe.onload = () => {
    iframe.contentWindow && iframe.contentWindow.print();
    document.body.removeChild(iframe); // Remove the iframe after printing
  };
}
