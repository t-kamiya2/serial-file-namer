import JSZip from 'jszip';
import { FileItem } from './types';

export const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot > 0 ? filename.substring(lastDot) : '';
};

export const getFileNameWithoutExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot > 0 ? filename.substring(0, lastDot) : filename;
};

export const generateSerialNumber = (index: number, totalFiles: number): string => {
  const maxDigits = totalFiles < 1000 ? 3 : totalFiles.toString().length;
  return (index + 1).toString().padStart(maxDigits, '0');
};

export const generateRenamedFileName = (baseName: string, serialNumber: string, extension: string): string => {
  return `${baseName}_${serialNumber}${extension}`;
};

export const downloadFilesAsZip = async (files: FileItem[], baseName: string): Promise<void> => {
  const zip = new JSZip();
  
  files.forEach((fileItem, index) => {
    const serialNumber = generateSerialNumber(index, files.length);
    const newFileName = generateRenamedFileName(baseName, serialNumber, fileItem.extension);
    zip.file(newFileName, fileItem.file);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${baseName}_files.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};