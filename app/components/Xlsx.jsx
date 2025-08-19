import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportButton({ transactions }) {
  const exportToExcel = () => {
    // 1. Convert JSON → Worksheet
    const worksheet = XLSX.utils.json_to_sheet(transactions);

    // 2. Create Workbook & add the Worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    // 3. Generate Excel buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // 4. Save it
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "transactions.xlsx");
  };

  return (
    <button onClick={exportToExcel} className="hover:cursor-pointer text-[20px]">
      Export to Excel
    </button>
  );
}

export default ExportButton;
