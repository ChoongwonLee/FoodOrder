import React, { useState, useContext } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import MenuContext from '../context/menu/menuContext';

const FileUpload = props => {
  const menuContext = useContext(MenuContext);

  const [images, setImages] = useState([]);

  const onDrop = async files => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    };
    formData.append('file', files[0]);
    //save the Image we chose inside the Node Server
    try {
      const res = await axios.post('/api/menus/image', formData, config);
      setImages([...images, res.data.image]);
    } catch (err) {
      console.error(err);
    }
  };
  const onDelete = image => {
    const currentIndex = images.indexOf(image);

    let newImages = [...images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '60px',
              height: '60px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <i className='fas fa-plus' style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>

      <div>
        {images.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
