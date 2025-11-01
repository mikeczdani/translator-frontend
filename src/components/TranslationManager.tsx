import React, { useState, useEffect } from 'react'
import { FileUpload } from './FileUpload'
import { Notification } from './Notification'
import { FilesContainer } from './FileContainer';

const API_BASE_URL = "http://localhost:8000/api";

export const TranslationManager = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'list'>('upload');
  const [files, setFiles] = useState<any[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [description, setDescription] = useState("");
  
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });


  const fetchFiles = async () => {
    setIsLoadingList(true);
    try {
      const response = await fetch(`${API_BASE_URL}/get-translated-files`);
      if (!response.ok) {
        throw new Error("Hiba a fájlok letöltésekor.");
      }
      const data = await response.json();
      setFiles(data);
    } catch (error: any) {
      console.error(error);
      setNotification({ show: true, message: error.message, type: 'error' });
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'list') {
      fetchFiles();
    }
  }, [activeTab]);

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
    } else {
      setFileName("");
    }
  };
  
  const resetForm = () => {
    setSelectedFile(null);
    setFileName("");
    setTargetLanguage("en");
    setDescription("");
  };

  const handleUploadSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    setNotification({ show: false, message: '', type: 'success' });

    if (!selectedFile || selectedFile.size === 0) {
      setNotification({ show: true, message: 'Nincs fájl kiválasztva.', type: 'error' });
      setIsUploading(false);
      return;
    }
    
    if (selectedFile.type !== "text/plain") {
      setNotification({ show: true, message: 'Csak .txt fájl tölthető fel.', type: 'error' });
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);
    formData.append('fileName', fileName);
    formData.append('targetLanguage', targetLanguage);
    formData.append('description', description);
    
    try {
      const response = await fetch(`${API_BASE_URL}/translate-and-upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Feltöltési hiba");
      }

      await response.json();
      
      setNotification({ 
        show: true, 
        message: "Sikeres feltöltés és fordítás!", 
        type: 'success' 
      });
      resetForm();
      setActiveTab('list');

    } catch (error: any) {
      setNotification({ 
        show: true, 
        message: `Hiba: ${error.message}`, 
        type: 'error' 
      });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: 'success' })}
        />
      )}

      <form 
        className="w-full max-w-6xl mt-16 bg-gray-800/60 backdrop-blur-lg border border-gray-700/50 rounded-lg shadow-md overflow-hidden"
        onSubmit={handleUploadSubmit}
      >
        
        <div className="p-6 md:p-8">
          
          <div className="border-b border-gray-700/50">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`
                  ${activeTab === 'upload' 
                    ? 'border-indigo-400 text-white' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}
                  whitespace-nowrap py-3 px-1 border-b-2 text-sm/6 font-semibold
                `}
              >
                Upload New File
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className={`
                  ${activeTab === 'list' 
                    ? 'border-indigo-400 text-white' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}
                  whitespace-nowrap py-3 px-1 border-b-2 text-sm/6 font-semibold
                `}
              >
                Translated Files
                <span className="ml-2 inline-flex items-center justify-center rounded-full bg-gray-600 px-2.5 py-0.5 text-xs font-medium text-gray-100">
                  {files.length}
                </span>
              </button>
            </nav>
          </div>

          <div className="mt-8 h-[400px] overflow-hidden">

            <div className={activeTab === 'upload' ? 'block h-full overflow-y-auto px-1' : 'hidden'}>
              <FileUpload 
                isUploading={isUploading}
                selectedFile={selectedFile}
                fileName={fileName}
                targetLanguage={targetLanguage}
                description={description}
                onFileChange={handleFileSelected}
                onFileNameChange={setFileName}
                onTargetLanguageChange={setTargetLanguage}
                onDescriptionChange={setDescription}
              />
            </div>
            
            <div className={activeTab === 'list' ? 'block h-full overflow-y-auto px-1' : 'hidden'}>
              {isLoadingList ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-400 animate-pulse">Loading files...</p>
                </div>
              ) : (
                <FilesContainer files={files} />
              )}
            </div>

          </div>

        </div>
      </form>
    </>
  )
}