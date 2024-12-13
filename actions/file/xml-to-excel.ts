import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { parseStringPromise } from "xml2js";

export async function convertXMLToExcel(formData: FormData) {
    const file = formData.get("file") as File;

    // Read the file as text
    const text = await file.text();
    console.log("XML Content:", text); // Log the XML content

    try {
        // Convert XML to JSON
        const jsonData = await parseStringPromise(text);
        console.log("Parsed JSON Data:", jsonData); // Log the parsed JSON data

        // Access the records based on your XML structure
        const records = jsonData.root.book.map((book: { author: any[]; title: any[]; year: any[]; }) => ({
            author: book.author[0], // Access the first element of the array
            title: book.title[0],   // Access the first element of the array
            year: book.year[0]      // Access the first element of the array
        }));

        // Convert JSON to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(records);

        // Create a new workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Write the workbook to a buffer
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        // Return the Excel file as a binary response
        return new Blob([excelBuffer], { type: "application/octet-stream" });
    } catch (error) {
        console.error("Error parsing XML:", error);
        throw new Error("Failed to convert XML to Excel");
    }
}