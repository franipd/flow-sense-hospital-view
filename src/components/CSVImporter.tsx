
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientButton } from '@/components/ui/gradient-button';
import { csvImportApi } from '@/services/supabaseApi';

export const CSVImporter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('patients');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const tableOptions = [
    { value: 'patients', label: 'Patients' },
    { value: 'patient_events', label: 'Patient Events' },
    { value: 'staff', label: 'Staff' },
    { value: 'resources', label: 'Resources' }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setImporting(true);
    setResult(null);

    try {
      const text = await selectedFile.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const csvData = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim());
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || null;
          });
          return row;
        });

      const batchId = await csvImportApi.importData(selectedTable, csvData);
      setResult(`Successfully imported ${csvData.length} records. Batch ID: ${batchId}`);
      
    } catch (error) {
      console.error('Import error:', error);
      setResult(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
      <CardHeader>
        <CardTitle className="text-xl font-light text-white">CSV Data Import</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-light text-white/80 mb-2">
            Select Target Table
          </label>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm"
          >
            {tableOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-light text-white/80 mb-2">
            Select CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white backdrop-blur-sm file:bg-white/20 file:border-0 file:rounded file:px-3 file:py-1 file:text-white file:mr-3"
          />
        </div>

        <GradientButton
          onClick={handleImport}
          disabled={!selectedFile || importing}
          className="w-full"
        >
          {importing ? 'Importing...' : 'Import CSV Data'}
        </GradientButton>

        {result && (
          <div className={`mt-4 p-3 rounded-lg ${
            result.includes('failed') 
              ? 'bg-red-500/20 text-red-300' 
              : 'bg-green-500/20 text-green-300'
          }`}>
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
