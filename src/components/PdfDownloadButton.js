import React from 'react';

const PdfDownloadButton = ({fileUrl}) => {
  const handleDownload = () => {
    // Replace 'your-file-url' with the actual URL of your file
    // const fileUrl = 'https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2023_1/35359/materials/SDS_2023_Project-172259-16974308330695.pdf';
    window.open(fileUrl, '_blank');
  };

  return (
    <button onClick={handleDownload}>
      Download PDF
    </button>
  );
};

export default PdfDownloadButton;
