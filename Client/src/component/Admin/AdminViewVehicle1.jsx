import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactSortable } from 'react-sortablejs';  // ✅ Correct

import AXIOS from 'axios';

export default function DragDropSortableUploader() {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const res = await AXIOS.post('http://localhost:4000/api/admin/adminpackage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(res.data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Drag & Drop + Sort Files</h2>
      <div
        {...getRootProps()}
        className="border border-secondary p-4 text-center bg-light"
        style={{ cursor: 'pointer' }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>

      <ReactSortable
  list={files}
  setList={setFiles}
  className="d-flex flex-wrap gap-2 mt-3"
>
  {files.map((file, index) => (
    <div key={index} className="badge bg-secondary p-2">
      {file.name}
    </div>
  ))}
</ReactSortable>


      <button className="btn btn-primary mt-4" onClick={handleUpload} disabled={files.length === 0}>
        Upload in Sorted Order
      </button>
    </div>
  );
}
