import { Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';

const styles = {
    imagePreview: {
        width: '150px',
        height: '150px',
        backgroundColor: '#f3f3f3',
        objectFit: 'cover',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        transition: '0.1s ease',
    },
    imagePreviewHover: {
        border: '1px solid #d32f2f !important',
        backgroundColor: '#e9e9e9 !important',
        transition: '0.1s ease',
    }
};

const ImageUploader = ({setImageBytes, src}) => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const readerBeforeCompression = new FileReader();
  
    readerBeforeCompression.onloadend = async () => {
      const options = {
        maxSizeKB: 100,
        maxWidthOrHeight: 200,
        useWebWorker: true
      };
  
      try {
        const compressedFile = await imageCompression(file, options);
        const readerAfterCompression = new FileReader();
  
        readerAfterCompression.onloadend = () => {
          const byteArrayAfterCompression = new Uint8Array(readerAfterCompression.result);
          setImageBytes(byteArrayAfterCompression);
          setImage(URL.createObjectURL(compressedFile));
        };
  
        readerAfterCompression.readAsArrayBuffer(compressedFile);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (file) readerBeforeCompression.readAsArrayBuffer(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{display:'flex', justifyContent: 'center'}}>
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
      <Box onClick={triggerFileInput} style={styles.imagePreview} sx={{':hover': styles.imagePreviewHover}}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${src ? src : image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} />
    </Box>
    </div>
  );
};

export default ImageUploader;