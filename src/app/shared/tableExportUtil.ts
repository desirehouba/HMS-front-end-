import * as XLSX from 'xlsx';
import { TableElement } from './TableElement';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const getFileName = (name: string) => {
  const timeSpan = new Date().toISOString();
  const sheetName = name || 'ExportResult';
  const fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName,
  };
};
export class TableExportUtil {
  static exportToExcel(arr: Partial<TableElement>[], name: string) {
    const { sheetName, fileName } = getFileName(name);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  static exportToPDF(exportData: any[], fileNames: any) {
     const doc = new jsPDF();
     const dataValue: any = Object.keys(exportData).map(function (
       personNamedIndex: any
     ) {
       return Object.values(exportData[personNamedIndex]);
     });
    const keys: any = Object.keys(exportData[0]);
    console.log(exportData);
    
     
    autoTable(doc, {
      body: [
        [
          {
            content: fileNames,
            styles: {
              halign: 'center',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
        ]
      ],
      theme : 'plain',
      styles : {
        fillColor: '#028b5b'
      }
    });
    autoTable(doc, {
       head: [keys],
        body: dataValue,
     });

     const { fileName } = getFileName(fileNames);

     doc.save(`${fileName}.pdf`);
  }

  static exportToPDFs(exportData: any[], fileNames:any, clesssss: any[],) {
     const doc = new jsPDF();
     const dataValue: any = Object.keys(exportData).map(function (
       personNamedIndex: any
     ) {
       return Object.values(exportData[personNamedIndex]);
     });
    const keys: any = Object.keys(exportData[0]);
    console.log(clesssss);
    
     
    autoTable(doc, {
      body: [
        [
          {
            content: fileNames + ': '+clesssss[0].Classe+ ' 2024-2025',
            styles: {
              halign: 'center',
              fontSize: 18,
              textColor: '#ffffff'
            }
          },
        ]
      ],
      theme : 'plain',
      styles : {
        fillColor: '#028b5b'
      }
    });
    autoTable(doc, {
       head: [keys],
        body: dataValue,
     });

     const { fileName } = getFileName(fileNames);

     doc.save(`${fileName}.pdf`);
  }

  static exportToPDFTransactions(exportData: any[], stats:any, fileNames : any) {
    const doc = new jsPDF();
    console.log(exportData);
    
    const dataValue: any = Object.keys(exportData).map(function (
       personNamedIndex: any
     ) {
       return Object.values(exportData[personNamedIndex]);
     });
    console.log(exportData[0]);
    
    const keys: any = Object.keys(exportData[0]);
     
    autoTable(doc, {
      body: [
        [
          {
            content: fileNames,
            styles: {
              halign: 'center',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
        ]
      ],
      theme : 'plain',
      styles : {
        fillColor: '#028b5b'
      }
    });
    autoTable(doc, {
      head: [['Sommes', 'Cash','OM', 'bank']],
      body: [[stats.sommes,stats.cash ,stats.oms, stats.bank]],/* 
      styles: { halign: 'right' }, */
      theme: 'striped',
      headStyles:{
        fillColor: '#028b5b',/* 
        halign: 'left' */
      }
    });
    autoTable(doc, {
       head: [keys],
        body: dataValue,
     });

     const { fileName } = getFileName(fileNames);

     doc.save(`${fileName}.pdf`);
  }
}
