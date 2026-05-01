'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadsApi } from '@/lib/api';
import { formatBytes } from '@/lib/utils';
import toast from 'react-hot-toast';
import { X, CheckCircle, AlertCircle, ImageIcon, Video, File, CloudUpload } from 'lucide-react';
import axios from 'axios';
import { PageHeader } from '@/components/dashboard';

type UploadState = 'idle' | 'initiating' | 'uploading' | 'confirming' | 'done' | 'error';

interface UploadItem {
  id: string;
  file: File;
  state: UploadState;
  progress: number;
  error?: string;
  uploadId?: string;
}

const STATE_LABEL: Record<UploadState, string> = {
  idle: 'Queued',
  initiating: 'Preparing…',
  uploading: 'Uploading…',
  confirming: 'Finalizing…',
  done: 'Complete',
  error: 'Failed',
};

const STATE_COLOR: Record<UploadState, string> = {
  idle: 'var(--text-muted)',
  initiating: 'var(--text-muted)',
  uploading: 'var(--accent)',
  confirming: 'var(--accent)',
  done: 'var(--success)',
  error: 'var(--destructive)',
};

function MediaIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith('image/')) return <ImageIcon size={13} />;
  if (mimeType.startsWith('video/')) return <Video size={13} />;
  return <File size={13} />;
}

const HOW_IT_WORKS = [
  'Files are uploaded directly to secure cloud storage',
  'Each file is versioned automatically on upload',
  'You can restore any previous version from the Files page',
];

export default function UploadsPage() {
  const [items, setItems] = useState<UploadItem[]>([]);

  const updateItem = useCallback((id: string, patch: Partial<UploadItem>) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const uploadFile = useCallback(async (item: UploadItem) => {
    updateItem(item.id, { state: 'initiating' });
    try {
      const { data: initData } = await uploadsApi.initiate({
        filename: item.file.name,
        mime_type: item.file.type,
        size: item.file.size,
      });
      const { upload_id, presigned_url } = initData.data;
      updateItem(item.id, { uploadId: upload_id, state: 'uploading' });
  
      let etag = '';
      await axios.put(presigned_url, item.file, {
        timeout: 300000,
        onUploadProgress: e => {
          const pct = Math.round((e.loaded / (e.total || item.file.size)) * 100);
          updateItem(item.id, { progress: pct });
        },
      }).then(res => { etag = res.headers.etag || ''; });
  
      updateItem(item.id, { state: 'confirming' });
      await uploadsApi.confirm(upload_id, {
        etag,
        filename: item.file.name,   // ← tambah ini
        mime_type: item.file.type,  // ← tambah ini
        size: item.file.size,       // ← tambah ini
      });
      updateItem(item.id, { state: 'done', progress: 100 });
      toast.success(`${item.file.name} uploaded`);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const msg = error.response?.data?.message || 'Upload failed';
      updateItem(item.id, { state: 'error', error: msg });
      toast.error(msg);
    }
  }, [updateItem]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newItems: UploadItem[] = acceptedFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      state: 'idle',
      progress: 0,
    }));
    setItems(prev => [...prev, ...newItems]);
    newItems.forEach(item => uploadFile(item));
  }, [uploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'],
      'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
    },
  });

  const doneCount = items.filter(i => i.state === 'done').length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <PageHeader title="Upload" description="Drop your photos and videos here" />

      <div style={{ padding: '24px 32px', maxWidth: 640 }}>
        {/* Dropzone */}
        <div
          {...getRootProps()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 32px',
            borderRadius: 12,
            border: `2px dashed ${isDragActive ? 'var(--accent)' : 'var(--border)'}`,
            background: isDragActive ? 'var(--accent-subtle)' : 'var(--surface)',
            cursor: 'pointer',
            transition: 'all 0.15s',
            textAlign: 'center',
          }}
        >
          <input {...getInputProps()} />
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
              background: isDragActive ? 'rgba(200,169,110,0.2)' : 'var(--bg-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            <CloudUpload size={18} style={{ color: isDragActive ? 'var(--accent-dark)' : 'var(--text-muted)' }} />
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>
            {isDragActive ? 'Drop to upload' : 'Drop files here'}
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 300 }}>
            or <span style={{ color: 'var(--text-secondary)', textDecoration: 'underline', textUnderlineOffset: 2 }}>browse your files</span>
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 300, marginTop: 14, fontFamily: 'var(--font-mono)' }}>
            JPEG · PNG · GIF · WebP · MP4 · WebM · MOV
          </p>
        </div>

        {/* Queue */}
        {items.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
                {items.length} file{items.length !== 1 ? 's' : ''}
              </p>
              {doneCount > 0 && (
                <button
                  onClick={() => setItems(prev => prev.filter(i => i.state !== 'done'))}
                  style={{ fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                >
                  Clear completed
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'var(--surface)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Icon */}
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <MediaIcon mimeType={item.file.type} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.file.name}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                          {item.state === 'done' && <CheckCircle size={12} style={{ color: 'var(--success)' }} />}
                          {item.state === 'error' && <AlertCircle size={12} style={{ color: 'var(--destructive)' }} />}
                          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: STATE_COLOR[item.state] }}>
                            {STATE_LABEL[item.state]}
                          </span>
                          {(item.state === 'done' || item.state === 'error') && (
                            <button
                              onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: 0 }}
                            >
                              <X size={11} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                          <div
                            style={{
                              height: '100%',
                              borderRadius: 2,
                              width: `${item.progress}%`,
                              background: STATE_COLOR[item.state],
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', flexShrink: 0 }}>
                          {formatBytes(item.file.size)}
                        </span>
                      </div>

                      {item.error && (
                        <p style={{ fontSize: 11, marginTop: 4, color: 'var(--destructive)', fontWeight: 300 }}>{item.error}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <div
          style={{
            marginTop: 24,
            padding: '16px 18px',
            borderRadius: 10,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 10 }}>
            How uploads work
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {HOW_IT_WORKS.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>
                  0{i + 1}
                </span>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.5 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
