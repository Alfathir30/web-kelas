export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-600"></div>
        <div className="w-12 h-12 rounded-full border-4 border-blue-400 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  )
}
