export function printInvoice(content) {
  const invoiceContent = content;

  // Detect if device is mobile
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    // For mobile devices: Open in new window/tab
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      console.error("Failed to open print window. Please allow popups.");
      alert("Please allow popups to print the invoice.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(invoiceContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Close the window after printing (optional)
        // printWindow.close();
      }, 250);
    };
  } else {
    // For desktop: Use iframe method
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";

    document.body.appendChild(iframe);

    const iframeDocument =
      iframe.contentWindow && iframe.contentWindow.document;
    if (!iframeDocument) {
      console.error("Failed to access iframe document");
      return;
    }

    iframeDocument.open();
    iframeDocument.write(invoiceContent);
    iframeDocument.close();

    iframe.onload = () => {
      iframe.contentWindow && iframe.contentWindow.print();
      document.body.removeChild(iframe);
    };
  }
}
