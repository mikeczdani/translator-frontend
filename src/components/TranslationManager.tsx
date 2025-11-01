import { useState } from 'react'
import { FileUpload } from './FileUpload'
import { FilesContainer } from './FileContainer';

const initialFiles = [
  { 
    id: 1, 
    name: 'weekly_report_HU.txt', 
    description: 'A few words about the file content.', 
    language: 'Hungarian (HU)', 
    timestamp: '2 mins ago' 
  },
  { 
    id: 2, 
    name: 'product_brief_DE.txt', 
    description: 'New product features for the German market.', 
    language: 'German (DE)', 
    timestamp: '1 hour ago' 
  },
  { 
    id: 3, 
    name: 'legal_doc_ES.txt', 
    description: 'Spanish contract draft.', 
    language: 'Spanish (ES)', 
    timestamp: '3 hours ago' 
  },
  { 
    id: 4, 
    name: 'marketing_copy_FR.txt', 
    description: 'Ad copy for the new campaign.', 
    language: 'French (FR)', 
    timestamp: '1 day ago' 
  },
];

export const TranslationManager = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'list'>('upload');
  const [files, setFiles] = useState(initialFiles);

  return (
    <form className="w-full max-w-6xl mt-16 bg-gray-800/60 backdrop-blur-lg border border-gray-700/50 rounded-lg shadow-md overflow-hidden">
      
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
            <FileUpload />
          </div>
          
          <div className={activeTab === 'list' ? 'block h-full overflow-y-auto px-1' : 'hidden'}>
            <FilesContainer files={files} />
          </div>

        </div>

      </div>
    </form>
  )
}