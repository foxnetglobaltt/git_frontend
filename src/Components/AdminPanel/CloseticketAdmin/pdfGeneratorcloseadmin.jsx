import jsPDF from 'jspdf';
import axios from 'axios';

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];

    return `${day}-${month}-${year}`;
};


const generateServiceTicketAdminPDF = async (ticketNo, eta, createdDate) => {
    const doc = new jsPDF();
    const imgUrl = '/image_black.png';
    const imgWidth = 35;
    const imgHeight = 35;

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/ticket-details/${ticketNo}`);
        const ticket = response.data;

        const imageResponse = await fetch(imgUrl);
        if (!imageResponse.ok) {
            throw new Error('Network response for image was not ok');
        }
        const imageBlob = await imageResponse.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
            const imgData = reader.result;
            doc.addImage(imgData, 'PNG', 10, 4, imgWidth, imgHeight, undefined, 'FAST');

            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('Service Ticket', 140, 20);

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`#${ticket.ticketId || ''}`, 140, 30); // Fallback value

            // Ticket Owner Details
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Ticket Owner:', 10, 50);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(ticket.name || '', 42, 49.5); // Fallback value
            doc.text(`Contact No: ${ticket.contactNumber || ''}`, 10, 58); // Fallback value
            doc.text(`Email: ${ticket.email || ''}`, 10, 64); // Fallback value

            // Ticket Assigned To
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Ticket Assigned to:', 140, 50);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(`${ticket.engineerName || ''}`, 156, 57.5); // Fallback value

            // Company Name
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Company Name:', 10, 75);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(ticket.companyName || '', 10, 83); // Fallback value

            // Created Date
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Created on:', 140, 70);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.text(`${ticket.date || ''}`, 165, 70); // Display formatted createdDate

            // Closed Date
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Closed on:', 140, 80);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.text(`${ticket.closeDate || ''}`, 165, 80); // Fallback value

            // Turnaround Time (TAT)
doc.setFontSize(12);
doc.setFont('helvetica', 'bold');
doc.text('Turnaround Time (TAT):', 140, 90);

// Debug: Log the eta object to see if totalDays is available and as expected
console.log(ticket.eta);

// Ensure totalDays exists and is a valid number, else fallback to 0
const totalDays = (ticket.eta && typeof ticket.eta.totalDays === 'number' && !isNaN(ticket.eta.totalDays)) 
  ? ticket.eta.totalDays 
  : 0;

// Debugging the value being used
console.log('Total Days to display:', totalDays);

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.text(`${totalDays} days`, 190, 90); // Display 0 days if totalDays is unavailable or invalid


            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.line(13, 110, 200, 110);

            // Issue Details
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Issue Category', 20, 130);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(ticket.issueCategory || '', 100, 130); // Fallback value

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Issue Description', 20, 140);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(ticket.issueDescription || '', 100, 140); // Fallback value

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Resolution', 20, 150);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(ticket.resolution || '', 100, 150); // Fallback value

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Preventive Action', 20, 160);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(ticket.preventiveAction || '', 100, 160); // Fallback value

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Warranty Category', 20, 170);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(ticket.warrantyCategory || '', 100, 170); // Fallback value

            // Ticket Status section with colored dot
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Ticket Status', 20, 180);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const status = ticket.status || '';
            const dotX = 105; // X position for the dot
            const dotY = 180; // Y position for the dot
            const dotRadius = 2; // Adjusted radius for smaller dot

            // Set color based on status
            if (status.toLowerCase() === 'open') {
                doc.setFillColor(87, 204, 32); // Green for open
            } else if (status.toLowerCase() === 'closed') {
                doc.setFillColor(255, 0, 0); // Red for closed
            } else {
                doc.setFillColor(0, 0, 0); // Default black if unknown
            }

            // Draw the dot
            doc.circle(dotX - dotRadius - 1, dotY - 1, dotRadius, 'F'); // 'F' for fill
            doc.setTextColor(0, 0, 0); // Reset text color to black
            doc.text(` ${status}`, dotX, dotY); // Position the text next to the dot

            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.5);
            doc.line(13, 270, 200, 270);

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text('This is a system-generated service report. Manual signing is not required.', 50, 280);

            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            window.open(url);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'ticket.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        reader.readAsDataURL(imageBlob);
    } catch (error) {
        console.error('Error fetching data or generating PDF:', error);
    }
};

export default generateServiceTicketAdminPDF;
