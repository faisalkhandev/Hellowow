import * as XLSX from "xlsx";
import jsPDF from "jspdf";

interface PageConfig {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export async function convertExcelToPDF(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    // Read the file as an ArrayBuffer
    const bytes = await file.arrayBuffer();
    const workbook = XLSX.read(bytes, { type: "array" });

    // Initialize PDF with A4 size
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Define page configuration (A4 in mm)
    const pageConfig: PageConfig = {
      width: 210,
      height: 297,
      margin: {
        top: 20,
        right: 15,
        bottom: 20,
        left: 15,
      },
    };

    // Process each worksheet
    workbook.SheetNames.forEach((sheetName, sheetIndex) => {
      if (sheetIndex > 0) {
        doc.addPage();
      }

      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];

      // Skip empty sheets
      if (!jsonData.length) return;

      let currentY = pageConfig.margin.top;

      // Add sheet title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(sheetName, pageConfig.margin.left, currentY);
      currentY += 10; // Adjust spacing after title

      // Reset font for table content
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      // Calculate column widths based on content
      const columnWidths = calculateOptimalColumnWidths(jsonData, pageConfig.width - pageConfig.margin.left - pageConfig.margin.right);

      // Process header row
      if (jsonData.length > 0) {
        currentY = drawRow(doc, jsonData[0], columnWidths, currentY, pageConfig, true);
      }

      // Process data rows
      for (let rowIndex = 1; rowIndex < jsonData.length; rowIndex++) {
        const row = jsonData[rowIndex];
        currentY = drawRow(doc, row, columnWidths, currentY, pageConfig);
      }

      // Add page numbers
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(`Page ${i} of ${totalPages}`, pageConfig.width / 2, pageConfig.height - 10, { align: "center" });
      }
    });

    // Return the PDF as a Blob
    return doc.output("arraybuffer");
  } catch (error) {
    console.error("Conversion error:", error);
    throw error instanceof Error ? error : new Error("Failed to convert file");
  }
}

// Helper functions
function calculateOptimalColumnWidths(data: unknown[][], maxWidth: number): number[] {
  const columnWidths: number[] = [];
  const minWidth = 20; // Minimum column width in mm
  const maxColWidth = 60; // Maximum column width in mm

  // First pass: calculate minimum required widths
  data.forEach((row) => {
    row.forEach((cell, colIndex) => {
      const content = formatCellContent(cell);
      const requiredWidth = Math.min(maxColWidth, Math.max(minWidth, content.length * 1.8)); // Approximate width based on character count
      columnWidths[colIndex] = Math.max(columnWidths[colIndex] || 0, requiredWidth);
    });
  });

  // Adjust widths to fit page
  const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
  if (totalWidth > maxWidth) {
    const scale = maxWidth / totalWidth;
    columnWidths.forEach((width, index) => {
      columnWidths[index] = Math.max(minWidth, width * scale);
    });
  }

  return columnWidths;
}

function drawRow(doc: jsPDF, row: unknown[], columnWidths: number[], startY: number, pageConfig: PageConfig, isHeader: boolean = false): number {
  const lineHeight = 5;
  let currentX = pageConfig.margin.left;

  // Draw each cell in the row
  row.forEach((cell, colIndex) => {
    const content = formatCellContent(cell);
    const width = columnWidths[colIndex];

    // Draw cell background for header
    if (isHeader) {
      doc.setFillColor(240, 240, 240);
      doc.rect(currentX, startY, width, lineHeight, "F");
    }

    // Draw cell border
    doc.setDrawColor(200, 200, 200);
    doc.rect(currentX, startY, width, lineHeight);

    // Draw cell content
    doc.text(content, currentX + 2, startY + 5); // Adjust text position
    currentX += width;
  });

  return startY + lineHeight; // Move to the next row
}

function formatCellContent(cell: unknown): string {
  if (cell === null || cell === undefined) {
    return "";
  }
  if (typeof cell === "number") {
    return cell.toLocaleString();
  }
  if (cell instanceof Date) {
    return cell.toLocaleDateString();
  }
  return cell.toString().trim();
}



export async function convertTextToExcel(text: string, delimiter: string = ",") {
  try {
    if (!text) {
      throw new Error("No text provided");
    }

    // Split content into lines and process
    const lines = text.split("\n");
    const data = lines
      .filter((line) => line.trim()) // Remove empty lines
      .map((line) => line.split(delimiter).map((cell) => cell.trim()));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();

    // Get headers from the first row
    const headers = data[0];

    // Process data to handle potential errors
    const processedData = data.slice(1).map((row) => {
      const processedRow: { [key: string]: string } = {};
      headers.forEach((header, index) => {
        processedRow[header] = row[index] || ""; // Handle missing values
      });
      return processedRow;
    });

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(processedData, {
      header: headers,
    });

    // Auto-size columns
    const colWidths = headers.map((header) => ({
      wch: Math.max(
        header.length,
        ...processedData.map((row) => String(row[header] || "").length)
      ),
    }));
    ws["!cols"] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, {
      type: "array",
      bookType: "xlsx",
    });

    return new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  } catch (error) {
    console.error("Conversion error:", error);
    throw error instanceof Error ? error : new Error("Failed to convert text to Excel");
  }
}




export async function convertCSVToExcel(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const delimiter = (formData.get("delimiter") as string) || ",";

    if (!file) {
      throw new Error("No file provided");
    }

    // Read file content in memory
    const csvContent = await file.text();

    // Split content into lines and process
    const lines = csvContent.split("\n");
    const data = lines
      .filter((line) => line.trim()) // Remove empty lines
      .map((line) => line.split(delimiter).map((cell) => cell.trim()));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();

    // Get headers from first row
    const headers = data[0];

    // Process data to handle potential errors
    const processedData = data.slice(1).map((row) => {
      const processedRow: { [key: string]: string } = {};
      headers.forEach((header, index) => {
        processedRow[header] = row[index] || ""; // Handle missing values
      });
      return processedRow;
    });

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(processedData, {
      header: headers,
    });

    // Auto-size columns
    const colWidths = headers.map((header) => ({
      wch: Math.max(
        header.length,
        ...processedData.map((row) => String(row[header] || "").length)
      ),
    }));
    ws["!cols"] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate Excel file
    const excelBuffer = XLSX.write(wb, {
      type: "buffer",
      bookType: "xlsx",
    });

    return Buffer.from(excelBuffer);
  } catch (error) {
    console.error("Conversion error:", error);
    throw error instanceof Error ? error : new Error("Failed to convert file");
  }
}
