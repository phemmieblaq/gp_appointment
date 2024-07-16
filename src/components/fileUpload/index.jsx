
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';

const validationSchema = yup.object().shape({
  file: yup
    .mixed()
    .required('A file is required')
    .test('fileSize', 'File is too large', (value) => {
      return value && value.size <= 2000000; // 2MB
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      return value && ['image/jpeg', 'image/png'].includes(value.type);
    }),
});

const FileUpload = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setValue('file', acceptedFiles[0], { shouldValidate: true });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {errors.file && <div className="error">{errors.file.message}</div>}
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <div>
            {field.value && (
              <div>
                <strong>Selected file:</strong> {field.value.name}
              </div>
            )}
          </div>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileUpload;
 