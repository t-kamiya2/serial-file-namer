import React, { useState } from 'react';
import { FileItem } from '../types';
import './FileListItem.css';

interface FileListItemProps {
  file: FileItem;
  previewName: string;
  onDelete: () => void;
  onRename: (newName: string) => void;
}

const FileListItem: React.FC<FileListItemProps> = ({
  file,
  previewName,
  onDelete,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(file.name);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(file.name);
  };

  const handleSave = () => {
    if (editValue.trim()) {
      onRename(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(file.name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-list-item">
      <div className="file-info">
        <div className="file-name-section">
          <div className="original-name">
            <span className="label">Original:</span>
            <span className="name">{file.originalName}</span>
          </div>
          <div className="current-name">
            <span className="label">Current:</span>
            {isEditing ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="edit-input"
                autoFocus
              />
            ) : (
              <span className="name">{file.name}{file.extension}</span>
            )}
          </div>
          <div className="preview-name">
            <span className="label">Preview:</span>
            <span className="name preview">{previewName}</span>
          </div>
        </div>
        <div className="file-meta">
          <span className="file-size">{formatFileSize(file.file.size)}</span>
        </div>
      </div>
      
      <div className="file-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-button">
              ✓
            </button>
            <button onClick={handleCancel} className="cancel-button">
              ✕
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="edit-button">
              ✏️
            </button>
            <button onClick={onDelete} className="delete-button">
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FileListItem;