'use client';

import { uploadFile } from '@/actions/exiff';
import { useState } from 'react';

export default function UploadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [metadata, setMetadata] = useState<any>(null);

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('loading');
      const result = await uploadFile(formData);
      setMetadata(result.metadata);
      setStatus('success');
    } catch (error) {
      console.error('Upload failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="p-4">
      <input 
        type="file" 
        name="file" 
        className="mb-4"
        onChange={handleSubmit}
        disabled={status === 'loading'}
      />

      {status === 'loading' && (
        <p>Processing...</p>
      )}

      {status === 'success' && metadata && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Metadata:</h2>
          <pre className="mt-2 p-4 bg-gray-100 rounded">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </div>
      )}

      {status === 'error' && (
        <p className="mt-4 text-red-500">
          Failed to process file. Please try again.
        </p>
      )}
    </div>
  );
}