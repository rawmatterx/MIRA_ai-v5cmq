import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getImageReport from '@wasp/queries/getImageReport';
import createReport from '@wasp/actions/createReport';

export function ReportPage() {
  const { imageId } = useParams();
  const { data: report, isLoading, error } = useQuery(getImageReport, { imageId });
  const createReportFn = useAction(createReport);
  const [regenerateReport, setRegenerateReport] = useState(false);

  useEffect(() => {
    if (regenerateReport) {
      createReportFn({ imageId });
      setRegenerateReport(false);
    }
  }, [regenerateReport, imageId, createReportFn]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleRegenerateReport = () => {
    setRegenerateReport(true);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Report for Image ID: {imageId}</h1>
      <p className='mb-4'>{report.text}</p>
      <button
        onClick={handleRegenerateReport}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Regenerate Report
      </button>
      <Link to='/' className='block mt-4 text-blue-500'>Go back to Dashboard</Link>
    </div>
  );
}