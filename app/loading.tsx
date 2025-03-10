export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-amber-600"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
} 