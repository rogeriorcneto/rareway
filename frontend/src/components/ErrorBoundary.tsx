import React from 'react'

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center p-4">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg mx-auto flex items-center justify-center mb-6 p-2">
              <img src="/Logo_Rareway.jpg" alt="RW" className="w-full h-full object-contain rounded-xl" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Algo deu errado</h1>
            <p className="text-primary-200 mb-4">Ocorreu um erro inesperado. Tente recarregar a página.</p>
            
            {/* Mostrar informações de ambiente em produção */}
            <div className="bg-blue-900/40 border border-blue-400/30 rounded-xl p-4 mb-6 text-left">
              <p className="text-blue-200 text-sm font-semibold mb-2">🔍 Informações do Sistema:</p>
              <p className="text-blue-300 text-xs">Modo: {import.meta.env.MODE}</p>
              <p className="text-blue-300 text-xs">Demo Mode: {import.meta.env.VITE_DEMO_MODE || 'false'}</p>
              <p className="text-blue-300 text-xs">Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? 'Configurado' : 'Não configurado'}</p>
              <p className="text-blue-300 text-xs">Bot URL: {import.meta.env.VITE_BOT_URL || 'Não configurado'}</p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <div className="bg-red-900/40 border border-red-400/30 rounded-xl p-4 mb-6 text-left">
                <p className="text-red-200 text-xs font-mono break-all">{this.state.error.message}</p>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                🔄 Recarregar Página
              </button>
              <button
                onClick={() => {
                  // Tentar limpar localStorage e recarregar
                  localStorage.clear()
                  window.location.reload()
                }}
                className="w-full px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
              >
                🗑️ Limpar Dados e Recarregar
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
