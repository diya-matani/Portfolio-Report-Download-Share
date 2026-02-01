import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generatePdfReport = (account, holdings) => {
    const doc = new jsPDF();

    // Brand Colors
    const COLOR_PRIMARY = [15, 23, 42]; // #0F172A
    const COLOR_ACCENT = [14, 165, 233]; // #0EA5E9
    const COLOR_TEXT = [51, 65, 85]; // #334155

    // Header Background
    doc.setFillColor(...COLOR_PRIMARY);
    doc.rect(0, 0, 210, 40, 'F');

    // Logo / Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Aurum Wealth', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Portfolio Report', 14, 28);

    doc.text(`As of: ${new Date().toLocaleDateString()}`, 196, 20, { align: 'right' });
    doc.text(`Generated for: ${account.name} (ID: ${account.id})`, 196, 28, { align: 'right' });

    // Summary Section
    let yPos = 55;
    doc.setTextColor(...COLOR_TEXT);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Portfolio Summary', 14, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.text('Total Balance:', 14, yPos);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`$${account.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 50, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Day Change:', 110, yPos);

    const isPositive = account.dayChange >= 0;
    doc.setTextColor(isPositive ? 16 : 239, isPositive ? 185 : 68, isPositive ? 129 : 68); // Green / Red
    doc.text(
        `${isPositive ? '+' : ''}$${Math.abs(account.dayChange).toLocaleString()} (${account.dayChangePercent}%)`,
        140,
        yPos
    );

    // Reset Color
    doc.setTextColor(...COLOR_TEXT);

    // Holdings Table
    yPos += 20;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Holdings Detail', 14, yPos);

    const tableColumn = ["Asset", "Type", "Quantity", "Price", "Value", "Allocation"];
    const tableRows = holdings.map(item => [
        item.name,
        item.type,
        item.quantity.toString(),
        `$${item.price.toLocaleString()}`,
        `$${item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
        `${item.allocation}%`
    ]);

    autoTable(doc, {
        startY: yPos + 5,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: {
            fillColor: COLOR_PRIMARY,
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 10,
            textColor: COLOR_TEXT
        },
        alternateRowStyles: {
            fillColor: [241, 245, 249] // Slate 100
        },
        columnStyles: {
            0: { cellWidth: 50 }, // Asset Name
            2: { halign: 'right' },
            3: { halign: 'right' },
            4: { halign: 'right', fontStyle: 'bold' },
            5: { halign: 'right' }
        }
    });

    // Footer Disclaimer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
        'Disclaimer: This report is for informational purposes only and does not constitute official tax advice or a rigorous audit of assets. Values may be delayed.',
        105,
        pageHeight - 10,
        { align: 'center' }
    );

    // Save/Download
    doc.save(`Aurum_Portfolio_${new Date().toISOString().split('T')[0]}.pdf`);
};
