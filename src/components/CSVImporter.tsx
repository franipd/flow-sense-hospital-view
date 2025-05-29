
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientButton } from '@/components/ui/gradient-button';
import { csvImportApi } from '@/services/supabaseApi';

export const CSVImporter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('patients');
  const [importing, setImporting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lastBatchId, setLastBatchId] = useState<string | null>(null);
  const [stagingSummary, setStagingSummary] = useState<any>(null);

  const tableOptions = [
    { value: 'patients', label: 'Patients' },
    { value: 'patient_events', label: 'Patient Events' },
    { value: 'staff', label: 'Staff' },
    { value: 'resources', label: 'Resources' }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    setResult(null);
    setStagingSummary(null);
    setLastBatchId(null);
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setImporting(true);
    setResult(null);
    setStagingSummary(null);

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
      setLastBatchId(batchId);
      
      // Get staging summary
      const summary = await csvImportApi.getStagingData(batchId);
      setStagingSummary(summary);
      
      setResult(`Successfully staged ${csvData.length} records. Batch ID: ${batchId}. Use "Process Staged Data" to move data to the main tables.`);
      
    } catch (error) {
      console.error('Import error:', error);
      setResult(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setImporting(false);
    }
  };

  const handleProcessStagedData = async () => {
    if (!lastBatchId) return;

    setProcessing(true);
    
    try {
      const processResult = await csvImportApi.processStagedData(lastBatchId);
      setResult(`Successfully processed ${processResult.processed_count} records into ${selectedTable} table. ${processResult.error_count} errors occurred.`);
      
      // Refresh staging summary
      const summary = await csvImportApi.getStagingData(lastBatchId);
      setStagingSummary(summary);
      
    } catch (error) {
      console.error('Processing error:', error);
      setResult(`Processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setProcessing(false);
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

        <div className="flex gap-2">
          <GradientButton
            onClick={handleImport}
            disabled={!selectedFile || importing}
            className="flex-1"
          >
            {importing ? 'Importing...' : 'Import to Staging'}
          </GradientButton>

          {lastBatchId && (
            <GradientButton
              onClick={handleProcessStagedData}
              disabled={processing}
              variant="variant"
              className="flex-1"
            >
              {processing ? 'Processing...' : 'Process Staged Data'}
            </GradientButton>
          )}
        </div>

        {stagingSummary && stagingSummary.length > 0 && (
          <div className="mt-4 p-3 bg-blue-500/20 text-blue-300 rounded-lg">
            <div className="text-sm font-medium mb-2">Staging Summary:</div>
            <div className="text-xs space-y-1">
              <div>Total Records: {stagingSummary.length}</div>
              <div>Ready to Process: {stagingSummary.filter((r: any) => !r.processed).length}</div>
              <div>Already Processed: {stagingSummary.filter((r: any) => r.processed).length}</div>
            </div>
          </div>
        )}

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
