import dynamic from 'next/dynamic'
import { ComponentType, Suspense } from 'react'

interface LazyLoadOptions {
  ssr?: boolean
  loading?: ComponentType
}

export function lazyLoad<T>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: LazyLoadOptions = {}
) {
  const {
    ssr = false,
    loading: LoadingComponent = () => <div className="animate-pulse h-32 bg-slate-200 dark:bg-slate-800 rounded-lg" />
  } = options

  const DynamicComponent = dynamic(importFn, {
    ssr,
    loading: LoadingComponent,
  })

  return function LazyLoadedComponent(props: T) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <DynamicComponent {...props} />
      </Suspense>
    )
  }
} 