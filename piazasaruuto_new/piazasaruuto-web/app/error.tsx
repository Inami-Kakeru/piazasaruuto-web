'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            申し訳ございません
          </h1>
          <p className="text-gray-600">
            予期しないエラーが発生しました。
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            もう一度試す
          </button>
          
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>問題が続く場合は、お電話でお問い合わせください。</p>
          <p className="font-semibold">03-3978-4800</p>
        </div>
      </div>
    </div>
  )
}
