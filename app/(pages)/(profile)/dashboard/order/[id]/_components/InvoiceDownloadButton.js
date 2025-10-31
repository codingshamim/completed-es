"use client";

import { useEffect } from "react";

import formatePrice from "@/helpers/formatePrice";
import { printInvoice } from "@/app/_components/printInvoice";
import { Printer } from "lucide-react";

const InvoiceDownloadButton = ({ order, customClass = "", children }) => {
  // Destructure order data properly
  const {
    _id: orderId,
    address,
    paymentMethod,
    shippingOption,
    createdAt: date,
    transactionId,
  } = order;

  // Destructure address data
  const {
    name: fullName,
    city,
    district,
    phone: phoneNumber,
    postalCode: postCode,
    address: shippingAddress,
  } = address;

  // Calculate totals
  const totalAmount = order.orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharge = shippingOption?.fee || 0;

  // Format date function (you may need to adjust this based on your formatTimeTwo function)
  const formatTimeTwo = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Render items as HTML string
  const renderItems = order?.orders
    .map((item, index) => {
      return `<tr key=${item?._id} class="border border-gray-200">
      <td class="border border-gray-200 p-2 text-center">${index + 1}</td>
      <td class="border border-gray-200 p-2 text-black" style="font-weight: 600">
       ${item?.productId?.title} <br />
        <span class="text-gray-500" style="font-weight: 400; font-size: 12px">
          Size: ${item?.size || "N/A"}
        </span>
      </td>
      <td class="border border-gray-200 p-2 text-center">
        ${formatePrice(item?.productId?.price, item?.productId?.discount)}
      </td>
      <td class="border border-gray-200 p-2 text-center">
        ${item?.quantity}
      </td>
      <td class="border border-gray-200 p-2 text-center">
        ${formatePrice(
          item?.productId?.price,
          item?.productId?.discount,
          item?.quantity
        )}
      </td>
    </tr>`;
    })
    .join("");

  // Determine payment method display text
  let payment;
  switch (paymentMethod) {
    case "cod":
      payment = "Cash On Delivery";
      break;
    case "bkash":
      payment = "Bkash";
      break;
    case "nagad":
      payment = "Nagad";
      break;
    default:
      payment = "Unknown Payment Method";
  }

  const invoiceContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice - ${transactionId}</title>
     <style>
       @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
     @media print {
    body {
      -webkit-print-color-adjust: exact !important; /* Chrome, Safari */
      print-color-adjust: exact !important; /* Firefox */
      color-adjust: exact !important;
      background: inherit !important;
    }

    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  }
       
     @page{
     margin : 0}
     *{
        font-family: "Montserrat";
    }
      .bg-white {
        background-color: white !important;
      }
        .bg-black{
         background-color: black !important;
        }
    .text-black{
        color : black;
    }
    .text-white{
        color : white;
    }
      .shadow-md {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
.border-r-transparent{
    border-right: 1px solid transparent;
}
      .p-6 {
        padding: 1.5rem; /* 24px */
      }

      .flex {
        display: flex;
      }

      .justify-between {
        justify-content: space-between;
      }

      .items-center {
        align-items: center;
      }

      .mb-6 {
        margin-bottom: 1.5rem;
      }

      .text-xl {
        font-size: 1.25rem; /* 20px */
        line-height: 1.75rem; /* 28px */
      }

      .font-semibold {
        font-weight: 600;
      }

      .grid {
        display: grid;
      }

      .grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .grid-cols-4 {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .gap-4 {
        gap: 1rem;
      }

      .bg-secondary {
        background-color: #f3f4f6; /* Example secondary color */
      }

      .p-3 {
        padding: 0.75rem;
      }

      .rounded-sm {
        border-radius: 0.125rem;
      }

      .font-medium {
        font-weight: 500;
      }

      .text-sm {
        font-size: 0.875rem; /* 14px */
        line-height: 1.25rem; /* 20px */
      }

      .border {
        border-width: 1px;
        border-style: solid;
        border-color: #e5e7eb; /* Default border color */
      }

      .p-2 {
        padding: 0.5rem;
      }

      .font-bold {
        font-weight: 700;
      }

      .text-center {
        text-align: center;
      }

      .text-gray-400 {
        color: #9ca3af;
      }
      
      .text-gray-700 {
        color: #374151;
      }

      .border-t-transparent {
        border-top-color: transparent;
      }

      .w-full {
        width: 100%;
      }

      .border-collapse {
        border-collapse: collapse;
      }

      .border-gray-200 {
        border-color: #e5e7eb;
      }

      .text-black {
        color: black;
      }

      .mt-4 {
        margin-top: 1rem;
      }

      .text-lg {
        font-size: 1.125rem; /* 18px */
        line-height: 1.75rem;
      }

      .text-green-600 {
        color: #16a34a; /* Green color */
      }

      .ml-2 {
        margin-left: 0.5rem;
      }

      .mt-6 {
        margin-top: 1.5rem;
      }

      .w-\[110px\] {
        width: 110px;
      }

      .inline-block {
        display: inline-block;
      }

      .h-\[2px\] {
        height: 2px;
      }

      .border-t-2 {
        border-top-width: 2px;
      }

      .border-black {
        border-color: black;
      }
      .logo {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 18px;  /* 4 * 0.25rem */
    padding-right: 18px;
    background-color: black;
    color: white;
    font-weight: 500;
    font-size: 16px;  /* text-sm -> 14px */
    border-radius: 5px;  /* rounded-sm -> 2px */
}

      /* Signature styles */
      .signature-section {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .signature-box {
        text-align: center;
      }

      .signature-line {
        width: 200px;
        height: 60px;
        border-bottom: 2px solid #333;
        margin-bottom: 8px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 5px;
      }

      .signature-text {
        font-style: italic;
        font-size: 18px;
        color: #333;
        font-weight: 500;
      }

      .signature-label {
        font-weight: 600;
        font-size: 14px;
        color: #555;
        margin-top: 5px;
      }

    </style>
  </head>
  <body>
    <div class="p-6">
      <!-- Header -->
    <div style="display: flex; align-items: center; gap: 8px; justify-content: flex-center; margin-bottom: 20px;">
  <!-- Logo Icon -->
  <div
    style="
      width: 38px;
      height: 38px;
      background-color: black;
      color: white;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: -0.5px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    "
  >
    ES
  </div>

  <!-- Logo Text -->
  <div style="display: flex; flex-direction: column; line-height: 1.1;">
    <div
      style="
        color: black;
        font-weight: bold;
        font-size: 20px;
        letter-spacing: 0.5px;
      "
    >
      ES VIBES
    </div>
    <p
      style="
        color: black;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.5px;
        margin: 0;
        text-transform: uppercase;
      "
    >
      next level tees
    </p>
  </div>
  </div
</div>


      <!-- Address & Invoice Info -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="shadow-md p-3 rounded-sm border">
            <span style="font-weight:700">
            From,
            </span>
            <div style="margin-left:10px">
              <p style="font-weight:700">Company : <span style="font-weight:500; color:#2b2b2b">ESSEVEN</span></p>
               <p style="font-weight:700">District : <span style="font-weight:500; color:#2b2b2b">Gazipur</span></p>
               <p style="font-weight:700">City : <span style="font-weight:500; color:#2b2b2b">Tongi</span></p>
               <p style="font-weight:700">Address : <span style="font-weight:500; color:#2b2b2b">Tongi,Bazar, Gazipur - 1710</span></p>
               </div>
            </div>
        <div class="border shadow-md p-3 rounded-sm">
        <span style="font-weight:700">
        To,
        </span>
        <div style="margin-left:10px">
          <p style="font-weight:700">Name : <span style="font-weight:500; color:#2b2b2b">${fullName}</span></p>
           <p style="font-weight:700">District : <span style="font-weight:500; color:#2b2b2b">${district}</span></p>
           <p style="font-weight:700">City : <span style="font-weight:500; color:#2b2b2b">${city}</span></p>
           <p style="font-weight:700">Address : <span style="font-weight:500; color:#2b2b2b">${shippingAddress}, ${postCode}</span></p>
           </div>
        </div>
      </div>

      <!-- Invoice Details -->
      <div class="mb-6">
        <div class="grid grid-cols-4 text-sm">
          <div class="border p-2 font-bold text-center">Invoice Date</div>
          <div class="border p-2 font-bold text-center">Payment Method</div>
          <div class="border p-2 font-bold text-center">Phone Number</div>
          <div class="border p-2 font-bold text-center">Invoice No.</div>
        </div>
        <div class="grid grid-cols-4 text-sm">
          <div class="border border-t-transparent p-2 text-center text-gray-700">
           ${formatTimeTwo(date)}
          </div>
          <div class="border border-t-transparent p-2 text-center text-gray-700">
          ${payment}
          </div>
          <div class="border border-t-transparent p-2 text-center text-gray-700">
           ${phoneNumber}
          </div>
          <div class="border border-t-transparent p-2 text-center text-gray-700">
           ${transactionId}
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <table class="w-full border-collapse border border-black text-sm">
        <thead>
          <tr class="bg-black text-white">
            <th class="border p-2">No.</th>
            <th class="border p-2">Item Detail</th>
            <th class="border p-2">Price</th>
            <th class="border p-2">Qty</th>
            <th class="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
         ${renderItems}
        </tbody>
      </table>

     <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
  <thead>
    <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid #ddd; font-weight: 700;">Description</th>
      <th style="text-align: right; padding: 8px; border: 1px solid #ddd; font-weight: 700;">Amount</th>
    </tr>
  </thead>
  <tbody>
    <!-- Grand Total Row -->
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight:600">Grand Total</td>
      <td style="text-align: right; padding: 8px; border: 1px solid #ddd;">
        ${formatePrice(totalAmount + deliveryCharge, 0)}
      </td>
    </tr>
    <!-- Advance Payment Row -->
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight:600">Advanced Payment</td>
      <td style="text-align: right; padding: 8px; border: 1px solid #ddd;">
        ${
          paymentMethod === "cod"
            ? formatePrice(deliveryCharge, 0)
            : formatePrice(totalAmount + deliveryCharge, 0)
        }
      </td>
    </tr>
    <!-- Due Payment Row -->
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-weight:600">Due Amount</td>
      <td style="text-align: right; padding: 8px; border: 1px solid #ddd;">
        ${
          paymentMethod === "cod"
            ? formatePrice(totalAmount, 0)
            : formatePrice(0, 0)
        }
      </td>
    </tr>
  </tbody>
</table>

      <!-- Signature Section -->
      <div class="signature-section">
        <div class="signature-box">
          <div class="signature-line">
          
          </div>
          <div class="signature-label">Authorised Sign</div>
        </div>
        <div style="flex: 1;"></div>
        <div class="signature-box">
          <div class="signature-line">
            <!-- Empty space for customer signature -->
          </div>
          <div class="signature-label">Customer Sign</div>
        </div>
      </div>

  </body>
</html>`;

  const handlePrintInvoice = () => {
    printInvoice(invoiceContent);
  };

  useEffect(() => {
    const handleKeydownEvent = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        printInvoice(invoiceContent);
      }
    };

    window.addEventListener("keydown", handleKeydownEvent);
    return () => {
      window.removeEventListener("keydown", handleKeydownEvent);
    };
  }, [invoiceContent]);

  return (
    <button
      onClick={handlePrintInvoice}
      className={`new-btn bangla-font text-center ${customClass}`}
    >
      <Printer width={20} height={20} /> {children || "Print Invoice"}
    </button>
  );
};

export default InvoiceDownloadButton;
