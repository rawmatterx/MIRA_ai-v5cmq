import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserImages from '@wasp/queries/getUserImages';
import uploadImage from '@wasp/actions/uploadImage';

export function Dashboard() {
  const { data: userImages, isLoading, error } = useQuery(getUserImages);
  const uploadImageFn = useAction(uploadImage);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUploadImage = () => {
    // Logic to handle image upload
  };

  return (
    <div className='p-4'>
      {/* Image upload UI */}
      <div className='flex items-center justify-between mb-4'>
        <input type='file' onChange={handleUploadImage} />
        <button
          onClick={handleUploadImage}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Upload
        </button>
      </div>

      {userImages.map((image) => (
        <div key={image.id} className='mb-4'>
          <img src={image.url} alt='Medical Image' className='w-full mb-2' />
          <div className='bg-gray-100 p-4 rounded-lg'>
            <p className='text-lg font-bold mb-2'>Report:</p>
            <p>{image.report}</p>
          </div>
          <Link to={`/report/${image.id}`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2'>
            View Report
          </Link>
        </div>
      ))}
    </div>
  );
}