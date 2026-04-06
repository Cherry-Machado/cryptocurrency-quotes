
// ErrorMessage is a simple wrapper component for displaying error messages.
// It accepts children to render any error content passed to it.
export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}
