export const FilesContainer = ({ files }: { files: any[] }) => {
  return (
    <>
      {files.length === 0 ? (
        <div className="text-center p-10 border border-dashed border-gray-700/50 rounded-lg">
          <p className="text-gray-400">No translated files yet.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {files.map((file) => (
            <li key={file.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-gray-700/50">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-indigo-400 truncate">{file.name}</p>
                <p className="text-sm text-gray-300 truncate mt-1">{file.description}</p>
                <p className="text-xs text-gray-400 mt-1">{file.language} • {file.timestamp}</p>
              </div>
              
            </li>
          ))}
        </ul>
      )}
    </>
  )
}