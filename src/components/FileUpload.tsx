import { PhotoIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

const targetLanguages = [
  { code: 'HU', name: 'Hungarian' },
  { code: 'EN-US', name: 'English' },
  { code: 'DE', name: 'German' },
  { code: 'ES', name: 'Spanish' },
  { code: 'FR', name: 'French' },
]

export const FileUpload = () => {
  return (
    <>
      <p className="mt-1 text-sm/6 text-gray-400 mb-6">
        Enter the translation details and upload your .txt file.
      </p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        
        <div className="sm:col-span-1 flex flex-col gap-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6">
            <div className="sm:col-span-4">
              <label htmlFor="file-name" className="block text-sm/6 font-medium text-white">
                File Name
              </label>
              <div className="mt-2">
                <input
                  id="file-name"
                  name="file-name"
                  type="text"
                  placeholder="e.g., weekly_report"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="target-language" className="block text-sm/6 font-medium text-white">
                Target Language
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="target-language"
                  name="target-language"
                  defaultValue="EN-US"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                >
                  {targetLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.name} ({lang.code})</option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-grow">
            <label htmlFor="description" className="block text-sm/6 font-medium text-white">
              Short Description (Optional)
            </label>
            <div className="mt-2 flex-grow">
              <textarea
                id="description"
                name="description"
                placeholder="A few words about the file content for easier retrieval."
                className="block w-full h-full min-h-[100px] rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                defaultValue={''}
              />
            </div>
          </div>
        </div>

        <div className="sm:col-span-1 flex flex-col">
          <label htmlFor="file-upload-input" className="block text-sm/6 font-medium text-white">
            Source File
          </label>
          <div className="mt-2 flex-grow">
            <div className="flex h-full min-h-[210px] justify-center items-center rounded-lg border border-dashed border-white/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-600" />
                <div className="mt-4 flex text-sm/6 text-gray-400">
                  <label
                    htmlFor="file-upload-input"
                    className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300"
                  >
                    <span>Choose a file</span>
                    <input id="file-upload-input" name="file-upload-input" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-400">TXT files only, up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-2 pt-8">
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Upload and Translate
          </button>
        </div>
      </div>
    </>
  )
}