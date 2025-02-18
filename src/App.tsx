import React, { useState, useEffect } from 'react';

    function App() {
      const [files1, setFiles1] = useState<FileList | null>(null);
      const [files2, setFiles2] = useState<FileList | null>(null);
      const [files3, setFiles3] = useState<FileList | null>(null);
      const [selectedFile1, setSelectedFile1] = useState<string | null>(null);
      const [selectedFile2, setSelectedFile2] = useState<string | null>(null);
      const [selectedFile3, setSelectedFile3] = useState<string | null>(null);
      const [tableData1, setTableData1] = useState<string[][]>([]);
      const [tableData2, setTableData2] = useState<string[][]>([]);
      const [tableData3, setTableData3] = useState<string[][]>([]);
      const [searchQuery1, setSearchQuery1] = useState('');
      const [searchQuery2, setSearchQuery2] = useState('');
      const [searchQuery3, setSearchQuery3] = useState('');
      const [selectedRow1, setSelectedRow1] = useState<number | null>(null);
      const [selectedRow2, setSelectedRow2] = useState<number | null>(null);
      const [selectedRow3, setSelectedRow3] = useState<number | null>(null);
      const [editingCell1, setEditingCell1] = useState<{ row: number | null; col: number | null }>({ row: null, col: null });
      const [editingCell2, setEditingCell2] = useState<{ row: number | null; col: number | null }>({ row: null, col: null });
      const [editingCell3, setEditingCell3] = useState<{ row: number | null; col: number | null }>({ row: null, col: null });
      const [cellValue1, setCellValue1] = useState('');
      const [cellValue2, setCellValue2] = useState('');
      const [cellValue3, setCellValue3] = useState('');
      const [searchColumn1, setSearchColumn1] = useState('columna2'); // Default search column
      const [searchColumn2, setSearchColumn2] = useState('all'); // Default search column
      const [searchColumn3, setSearchColumn3] = useState('all'); // Default search column

      // Load data from localStorage
      useEffect(() => {
        const storedData1 = localStorage.getItem('tableData1');
        if (storedData1) setTableData1(JSON.parse(storedData1));

        const storedData2 = localStorage.getItem('tableData2');
        if (storedData2) setTableData2(JSON.parse(storedData2));

        const storedData3 = localStorage.getItem('tableData3');
        if (storedData3) setTableData3(JSON.parse(storedData3));
      }, []);

      // Autosave to localStorage
      useEffect(() => {
        localStorage.setItem('tableData1', JSON.stringify(tableData1));
      }, [tableData1]);

      useEffect(() => {
        localStorage.setItem('tableData2', JSON.stringify(tableData2));
      }, [tableData2]);

      useEffect(() => {
        localStorage.setItem('tableData3', JSON.stringify(tableData3));
      }, [tableData3]);

      const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        setFiles1(newFiles);
        if (newFiles && newFiles.length > 0) {
          setSelectedFile1(newFiles[0].name);
        } else {
          setSelectedFile1(null);
        }
      };

      const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        setFiles2(newFiles);
        if (newFiles && newFiles.length > 0) {
          setSelectedFile2(newFiles[0].name);
        } else {
          setSelectedFile2(null);
        }
      };

      const handleFileChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = event.target.files;
        setFiles3(newFiles);
        if (newFiles && newFiles.length > 0) {
          setSelectedFile3(newFiles[0].name);
        } else {
          setSelectedFile3(null);
        }
      };

      const processCSV = async (file: File | undefined, setTableData: React.Dispatch<React.SetStateAction<string[][]>>) => {
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const csvText = event.target?.result as string;
          const rows = csvText.split('\n').map(row => row.split(';')); // Use semicolon as separator
          setTableData(rows);
        };

        reader.readAsText(file);
      };

      useEffect(() => {
        if (files1 && selectedFile1) {
          const file = Array.from(files1).find(file => file.name === selectedFile1);
          processCSV(file, setTableData1);
        }
      }, [selectedFile1, files1]);

      useEffect(() => {
        if (files2 && selectedFile2) {
          const file = Array.from(files2).find(file => file.name === selectedFile2);
          processCSV(file, setTableData2);
        }
      }, [selectedFile2, files2]);

      useEffect(() => {
        if (files3 && selectedFile3) {
          const file = Array.from(files3).find(file => file.name === selectedFile3);
          processCSV(file, setTableData3);
        }
      }, [selectedFile3, files3]);

      const handleFileSelect1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFile1(event.target.value);
      };

      const handleFileSelect2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFile2(event.target.value);
      };

      const handleFileSelect3 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFile3(event.target.value);
      };

      const filteredTableData1 = tableData1.filter(row => {
        if (searchColumn1 === 'all') {
          return row.some(cell => cell.toLowerCase().includes(searchQuery1.toLowerCase()));
        } else if (searchColumn1 === 'columna2') {
          // Assuming 'columna2' refers to the second column (index 1)
          return row[1]?.toLowerCase().includes(searchQuery1.toLowerCase());
        }
        return false;
      });

      const filteredTableData2 = tableData2.filter(row => {
        if (searchColumn2 === 'all') {
          return row.some(cell => cell.toLowerCase().includes(searchQuery2.toLowerCase()));
        }
        return false;
      });

      const filteredTableData3 = tableData3.filter(row => {
        if (searchColumn3 === 'all') {
          return row.some(cell => cell.toLowerCase().includes(searchQuery3.toLowerCase()));
        }
        return false;
      });

      const handleRowSelect1 = (index: number) => {
        setSelectedRow1(index === selectedRow1 ? null : index);
      };

      const handleRowSelect2 = (index: number) => {
        setSelectedRow2(index === selectedRow2 ? null : index);
      };

      const handleRowSelect3 = (index: number) => {
        setSelectedRow3(index === selectedRow3 ? null : index);
      };

      const handleCellClick1 = (row: number, col: number, value: string) => {
        setEditingCell1({ row, col });
        setCellValue1(value);
      };

      const handleCellClick2 = (row: number, col: number, value: string) => {
        setEditingCell2({ row, col });
        setCellValue2(value);
      };

      const handleCellClick3 = (row: number, col: number, value: string) => {
        setEditingCell3({ row, col });
        setCellValue3(value);
      };

      const handleCellValueChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCellValue1(event.target.value);
      };

      const handleCellValueChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCellValue2(event.target.value);
      };

      const handleCellValueChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCellValue3(event.target.value);
      };

      const handleCellKeyDown1 = (event: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
        if (event.key === 'Enter') {
          const newData = [...tableData1];
          newData[row][col] = cellValue1;

          if (col === 3 && cellValue1 === '0') {
            newData.splice(row, 1);
          }

          setTableData1(newData);
          setEditingCell1({ row: null, col: null });
        } else if (event.key === 'Escape') {
          setEditingCell1({ row: null, col: null });
        }
      };

      const handleCellKeyDown2 = (event: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
        if (event.key === 'Enter') {
          const newData = [...tableData2];
          newData[row][col] = cellValue2;

          if (col === 3 && cellValue2 === '0') {
            newData.splice(row, 1);
          }

          setTableData2(newData);
          setEditingCell2({ row: null, col: null });
        } else if (event.key === 'Escape') {
          setEditingCell2({ row: null, col: null });
        }
      };

      const handleCellKeyDown3 = (event: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
        if (event.key === 'Enter') {
          const newData = [...tableData3];
          newData[row][col] = cellValue3;

          if (col === 3 && cellValue3 === '0') {
            newData.splice(row, 1);
          }

          setTableData3(newData);
          setEditingCell3({ row: null, col: null });
        } else if (event.key === 'Escape') {
          setEditingCell3({ row: null, col: null });
        }
      };

      const saveTableData1 = () => {
        const confirmSave = window.confirm("Are you sure you want to save Table 1 to ddbb1.csv?");
        if (confirmSave) {
          const csvContent = tableData1.map(row => row.join(';')).join('\n');
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'ddbb1.csv'); // Fixed filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

      const saveTableData = (tableData: string[][], fileName: string | null, tableNumber: number) => {
        if (!fileName) {
          alert(`No file selected for Table ${tableNumber}.`);
          return;
        }

        const csvContent = tableData.map(row => row.join(';')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      const saveTableData1Public = () => {
        const confirmSave = window.confirm("Are you sure you want to save Table 1 to public/ddbb2.csv?");
        if (confirmSave) {
          const csvContent = tableData1.map(row => row.join(';')).join('\n');
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'ddbb2.csv');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

      // Function to read ddbb1.csv and set tableData1 on component mount
      useEffect(() => {
        const readDdbb1 = async () => {
          try {
            const response = await fetch('/ddbb1.csv');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const csvText = await response.text();
            const rows = csvText.split('\n').map(row => row.split(';'));
            setTableData1(rows);
          } catch (error) {
            console.error("Could not read ddbb1.csv:", error);
          }
        };

        readDdbb1();
      }, []);

      const handleSearchColumnChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchColumn1(event.target.value);
      };

      const handleSearchColumnChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchColumn2(event.target.value);
      };

      const handleSearchColumnChange3 = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchColumn3(event.target.value);
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Dynamic Tables with Multi-File Upload</h1>

          <div className="flex flex-col">
            <div className="w-full p-2">
              <h2 className="text-lg font-bold mb-2">Table 1</h2>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Search Table 1..."
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 w-auto"
                  value={searchQuery1}
                  onChange={(e) => setSearchQuery1(e.target.value)}
                />
                <select
                  value={searchColumn1}
                  onChange={handleSearchColumnChange1}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-auto"
                >
                  <option value="columna2">Column 2</option>
                  <option value="all">All Columns</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="fileUpload1" className="block text-gray-700 text-sm font-bold mb-2">
                  Upload CSV Files for Table 1:
                </label>
                <input
                  id="fileUpload1"
                  type="file"
                  multiple
                  accept=".csv"
                  onChange={handleFileChange1}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {files1 && files1.length > 0 && (
                  <select
                    value={selectedFile1 || ''}
                    onChange={handleFileSelect1}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  >
                    {Array.from(files1).map(file => (
                      <option key={file.name} value={file.name}>{file.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      {filteredTableData1[0]?.map((header, index) => (
                        <th key={index} className="border border-gray-400 px-4 py-2">{header}</th>
                      )) || <tr><th>No Data</th></tr>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableData1.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        onClick={() => handleRowSelect1(rowIndex)}
                        className={rowIndex === selectedRow1 ? 'bg-blue-100' : ''}
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-400 px-4 py-2"
                            onClick={() => handleCellClick1(rowIndex, cellIndex, cell)}
                          >
                            {editingCell1.row === rowIndex && editingCell1.col === cellIndex ? (
                              <input
                                type="text"
                                value={cellValue1}
                                onChange={handleCellValueChange1}
                                onKeyDown={(event) => handleCellKeyDown1(event, rowIndex, cellIndex)}
                                className="w-full"
                              />
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
                onClick={() => saveTableData1()}
              >
                Save Table 1 to ddbb1.csv
              </button>
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
                onClick={() => saveTableData1Public()}
              >
                Save Table 1 to public/ddbb2.csv
              </button>
              {selectedFile1 && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={() => saveTableData(tableData1, selectedFile1, 1)}
                >
                  Download Table 1 as {selectedFile1}
                </button>
              )}
            </div>

            <div className="w-full p-2">
              <h2 className="text-lg font-bold mb-2">Table 2</h2>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Search Table 2..."
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 w-auto"
                  value={searchQuery2}
                  onChange={(e) => setSearchQuery2(e.target.value)}
                />
                <select
                  value={searchColumn2}
                  onChange={handleSearchColumnChange2}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-auto"
                >
                  <option value="all">All Columns</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="fileUpload2" className="block text-gray-700 text-sm font-bold mb-2">
                  Upload CSV Files for Table 2:
                </label>
                <input
                  id="fileUpload2"
                  type="file"
                  multiple
                  accept=".csv"
                  onChange={handleFileChange2}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {files2 && files2.length > 0 && (
                  <select
                    value={selectedFile2 || ''}
                    onChange={handleFileSelect2}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  >
                    {Array.from(files2).map(file => (
                      <option key={file.name} value={file.name}>{file.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      {filteredTableData2[0]?.map((header, index) => (
                        <th key={index} className="border border-gray-400 px-4 py-2">{header}</th>
                      )) || <tr><th>No Data</th></tr>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableData2.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        onClick={() => handleRowSelect2(rowIndex)}
                        className={rowIndex === selectedRow2 ? 'bg-blue-100' : ''}
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-400 px-4 py-2"
                            onClick={() => handleCellClick2(rowIndex, cellIndex, cell)}
                          >
                            {editingCell2.row === rowIndex && editingCell2.col === cellIndex ? (
                              <input
                                type="text"
                                value={cellValue2}
                                onChange={handleCellValueChange2}
                                onKeyDown={(event) => handleCellKeyDown2(event, rowIndex, cellIndex)}
                                className="w-full"
                              />
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => saveTableData(tableData2, selectedFile2, 2)}
              >
                Save Table 2
              </button>
              {selectedFile2 && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={() => saveTableData(tableData2, selectedFile2, 2)}
                >
                  Download Table 2 as {selectedFile2}
                </button>
              )}
            </div>

            <div className="w-full p-2">
              <h2 className="text-lg font-bold mb-2">Table 3</h2>
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Search Table 3..."
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 w-auto"
                  value={searchQuery3}
                  onChange={(e) => setSearchQuery3(e.target.value)}
                />
                <select
                  value={searchColumn3}
                  onChange={handleSearchColumnChange3}
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-auto"
                >
                  <option value="all">All Columns</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="fileUpload3" className="block text-gray-700 text-sm font-bold mb-2">
                  Upload CSV Files for Table 3:
                </label>
                <input
                  id="fileUpload3"
                  type="file"
                  multiple
                  accept=".csv"
                  onChange={handleFileChange3}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {files3 && files3.length > 0 && (
                  <select
                    value={selectedFile3 || ''}
                    onChange={handleFileSelect3}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  >
                    {Array.from(files3).map(file => (
                      <option key={file.name} value={file.name}>{file.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      {filteredTableData3[0]?.map((header, index) => (
                        <th key={index} className="border border-gray-400 px-4 py-2">{header}</th>
                      )) || <tr><th>No Data</th></tr>}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableData3.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        onClick={() => handleRowSelect3(rowIndex)}
                        className={rowIndex === selectedRow3 ? 'bg-blue-100' : ''}
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-400 px-4 py-2"
                            onClick={() => handleCellClick3(rowIndex, cellIndex, cell)}
                          >
                            {editingCell3.row === rowIndex && editingCell3.col === cellIndex ? (
                              <input
                                type="text"
                                value={cellValue3}
                                onChange={handleCellValueChange3}
                                onKeyDown={(event) => handleCellKeyDown3(event, rowIndex, cellIndex)}
                                className="w-full"
                              />
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => saveTableData(tableData3, selectedFile3, 3)}
              >
                Save Table 3
              </button>
              {selectedFile3 && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={() => {
                    const csvContent = tableData3.map(row => row.join(';')).join('\n');
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', selectedFile3);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download Table 3 as {selectedFile3}
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    export default App;
