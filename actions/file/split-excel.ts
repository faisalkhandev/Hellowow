import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const maxRowsPerFile = parseInt(formData.get('maxRowsPerFile') as string, 10);

    if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetNames = workbook.SheetNames;
    const splitFiles: { file: Blob; name: string }[] = [];

    // Process each sheet in the workbook
    for (const sheetName of sheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Get data as an array of arrays

        // Split the data into chunks
        for (let i = 0; i < jsonData.length; i += maxRowsPerFile) {
            const chunk = jsonData.slice(i, i + maxRowsPerFile) as unknown[][]; // Ensure chunk is typed correctly
            const newWorksheet = XLSX.utils.aoa_to_sheet(chunk);
            const newWorkbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);

            // Generate a Blob for the new Excel file
            const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const fileName = `${sheetName}_part${Math.floor(i / maxRowsPerFile) + 1}.xlsx`;

            splitFiles.push({ file: blob, name: fileName });
        }
    }

    return NextResponse.json(splitFiles);
}