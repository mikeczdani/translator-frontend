import { TranslationManager } from "../components/TranslationManager";

export default function MainPage() {
  return (
    <div className="relative isolate h-screen overflow-hidden bg-gray-900 flex flex-col items-center justify-center p-6">
      
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="flex justify-center items-center p-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">
            EasyTranslate
          </h1>
        </div>
      </header>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{ clipPath: '...' }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#1e3a8a] to-[#5b21b6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      
      <div className="w-full flex justify-center">
        <TranslationManager />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{ clipPath: '...' }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#1e3a8a] to-[#5b21b6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  )
}