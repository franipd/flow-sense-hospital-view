import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientButton } from '@/components/ui/gradient-button';
import { csvImportApi } from '@/services/supabaseApi';
import { RoleBasedAccess } from '@/components/RoleBasedAccess';
import { validateFileSize, validateFileType, validateCSVHeaders } from '@/utils/validation';
import { toast } from '@/components/ui/use-toast';

interface ProcessResult {
  processed_count: number;
  error_count: number;
  batch_id: string;
}

export const SecureCSVImporter = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('patients');
  const [importing, setImporting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lastBatchId, setLastBatchId] = useState<string | null>(null);

  const tableOptions = [
    { value: 'patients', label: 'Patients', requiredHeaders: ['mrn', 'first_name', 'last_name', 'date_of_birth'] },
    { value: 'patient_events', label: 'Patient Events', requiredHeaders: ['patient_id', 'event_type', 'event_timestamp'] },
    { value: 'staff', label: 'Staff', requiredHeaders: ['employee_id', 'first_name', 'last_name', 'role'] },
    { value: 'resources', label: 'Resources', requiredHeaders: ['resource_type', 'resource_name'] }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file type
    if (!validateFileType(file, ['text/csv', 'application/vnd.ms-excel'])) {
      toast({
        title: "Invalid file type",
        description: "Please select a CSV file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (10MB limit)
    if (!validateFileSize(file, 10)) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);
    setLastBatchId(null);
  };

  const validateCSVContent = async (file: File, table: string): Promise<boolean> => {
    const text = await file.text();
    const lines = text.split('\n');
    
    if (lines.length < 2) {
      toast({
        title: "Invalid CSV",
        description: "CSV file must have at least a header row and one data row.",
        variant: "destructive",
      });
      return false;
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const tableConfig = tableOptions.find(t => t.value === table);
    
    if (!tableConfig) {
      toast({
        title: "Invalid table",
        description: "Selected table is not supported.",
        variant: "destructive",
      });
      return false;
    }

    const requiredHeaders = tableConfig.requiredHeaders.map(h => h.toLowerCase());
    
    if (!validateCSVHeaders(headers, requiredHeaders)) {
      toast({
        title: "Missing required headers",
        description: `Required headers for ${table}: ${tableConfig.requiredHeaders.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      setImporting(true);
      setResult(null);

      // Validate CSV content
      const isValid = await validateCSVContent(selectedFile, selectedTable);
      if (!isValid) {
        return;
      }

      const text = await selectedFile.text();
      const lines = text.split('\n').filter(line => line.trim());
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

      if (csvData.length === 0) {
        toast({
          title: "No data found",
          description: "The CSV file contains no valid data rows.",
          variant: "destructive",
        });
        return;
      }

      if (csvData.length > 1000) {
        toast({
          title: "Too many records",
          description: "Please limit CSV imports to 1000 records or fewer.",
          variant: "destructive",
        });
        return;
      }

      const batchId = await csvImportApi.importData(selectedTable, csvData);
      setLastBatchId(batchId);
      
      setResult(`Successfully staged ${csvData.length} records. Batch ID: ${batchId}. Use "Process Staged Data" to move data to the main tables.`);
      
      toast({
        title: "Import successful",
        description: `${csvData.length} records staged for processing.`,
      });
      
    } catch (error) {
      console.error('Import error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult(`Import failed: ${errorMessage}`);
      
      toast({
        title: "Import failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const handleProcessStagedData = async () => {
    if (!lastBatchId) return;

    setProcessing(true);
    
    try {
      const processResult = await csvImportApi.processStagedData(lastBatchId);
      const typedResult = processResult as unknown as ProcessResult;
      setResult(`Successfully processed ${typedResult.processed_count} records into ${selectedTable} table. ${typedResult.error_count} errors occurred.`);
      
      toast({
        title: "Processing complete",
        description: `${typedResult.processed_count} records processed successfully.`,
      });
      
    } catch (error) {
      console.error('Processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult(`Processing failed: ${errorMessage}`);
      
      toast({
        title: "Processing failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <RoleBasedAccess 
      allowedRoles={['admin']}
      fallback={
        <Card className="bg-gradient-to-br from-red-500/10 via-orange-500/5 to-red-500/10 backdrop-blur-sm border border-red-400/20">
          <CardContent className="p-6">
            <div className="text-center text-red-300">
              <p className="font-medium">Access Denied</p>
              <p className="text-sm mt-1">Only administrators can import CSV data.</p>
            </div>
          </CardContent>
        </Card>
      }
    >
      <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-light text-white">Secure CSV Data Import</CardTitle>
          <p className="text-sm text-white/60">Administrator access required</p>
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
    </RoleBasedAccess>
  );
};
