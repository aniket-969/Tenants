import { Spinner } from "@/components/ui/spinner"
import React from "react"
import { ErrorBoundary } from "react-error-boundary"

export const AppProvider = ({children})=>{
    return (
        <React.Suspense  fallback={
            <div className="flex h-screen w-screen items-center justify-center">
              <Spinner size="xl" />
            </div>
          }>
            <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => (
    <div>
        <p>Something went wrong: {error.message}</p>
        <button onClick={resetErrorBoundary}>Retry</button>
    </div>
)}>
    {children}
</ErrorBoundary>
        </React.Suspense>
    )
}


