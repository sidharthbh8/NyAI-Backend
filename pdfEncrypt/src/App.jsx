import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const PDFEncryptor = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value.slice(0, 3); // Take the first 3 characters
    setPassword(newPassword);
  };

  const handleYearOfBirthChange = (event) => {
    setYearOfBirth(event.target.value);
  };

  const encryptPDF = async () => {
    if (!file || !password || !yearOfBirth) {
      alert('Please provide all required information.');
      return;
    }
  
    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
  
      // Set the password for the PDF
      pdfDoc.setPassword(password);
  
      // Create a Blob with the encrypted PDF data
      const encryptedPdfBytes = await pdfDoc.save();
      const encryptedPdfBlob = new Blob([encryptedPdfBytes], { type: 'application/pdf' });
  
      // Create a download link and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(encryptedPdfBlob);
      downloadLink.download = 'encrypted.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error encrypting PDF:', error);
    }
  };
  

  return (
    <div>
      <div>
        <label>
          Select PDF File:
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </label>
      </div>
      <div>
        <label>
          Enter Password:
          <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      <div>
        <label>
          Enter Year of Birth:
          <input type="text" value={yearOfBirth} onChange={handleYearOfBirthChange} />
        </label>
      </div>
      <div>
        <button onClick={encryptPDF}>Encrypt PDF</button>
      </div>
    </div>
  );
};

export default PDFEncryptor;
