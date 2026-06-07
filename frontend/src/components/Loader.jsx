function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500 text-sm">Checking your website, please wait...</p>
    </div>
  )
}

export default Loader