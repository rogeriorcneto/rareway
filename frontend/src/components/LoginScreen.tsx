import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

interface LoginScreenProps {
  authChecked: boolean
  loginUsuario: string
  setLoginUsuario: (v: string) => void
  loginSenha: string
  setLoginSenha: (v: string) => void
  loginError: string
  loginLoading: boolean
  handleLogin: () => void
}

export default function LoginScreen({
  authChecked, loginUsuario, setLoginUsuario, loginSenha, setLoginSenha,
  loginError, loginLoading, handleLogin
}: LoginScreenProps) {
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotStatus, setForgotStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [forgotLoading, setForgotLoading] = useState(false)

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) return
    setForgotLoading(true)
    setForgotStatus(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      setForgotStatus({ type: 'success', msg: 'E-mail de recuperação enviado! Verifique sua caixa de entrada.' })
    } catch (err: any) {
      setForgotStatus({ type: 'error', msg: err?.message || 'Erro ao enviar e-mail. Verifique o endereço.' })
    } finally {
      setForgotLoading(false)
    }
  }

  // Tela de loading enquanto verifica sessão
  if (!authChecked) {
    return (
      <div className="min-h-screen fashion-gradient flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-900/80 backdrop-blur-fashion rounded-fashion-lg shadow-fashion-lg mx-auto flex items-center justify-center mb-6 animate-pulse p-3 border border-primary-500/30">
            <img src="/Logo_Rareway.jpg" alt="RW" className="w-full h-full object-contain rounded-fashion" />
          </div>
          <p className="text-primary-300 mt-4 font-medium">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen fashion-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-28 h-28 bg-gray-900/80 backdrop-blur-fashion rounded-fashion-lg shadow-fashion-lg mx-auto flex items-center justify-center mb-6 p-4 border border-primary-500/30 hover-glow">
            <img src="/Logo_Rareway.jpg" alt="RW" className="w-full h-full object-contain rounded-fashion" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Rareway</h1>
          <p className="text-gray-300 text-sm">Sistema de Gestão de Moda</p>
        </div>

        {showForgot ? (
          <div className="glass-morphism rounded-fashion-lg shadow-fashion-lg p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Recuperar Senha</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="input-field"
                  placeholder="seu@email.com"
                />
              </div>
              {forgotStatus && (
                <div className={`p-3 rounded-fashion text-sm ${
                  forgotStatus.type === 'success' 
                    ? 'bg-success-500/20 text-success-400 border border-success-500/30' 
                    : 'bg-danger-500/20 text-danger-400 border border-danger-500/30'
                }`}>
                  {forgotStatus.msg}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowForgot(false); setForgotStatus(null) }}
                  className="flex-1 btn-secondary"
                  disabled={forgotLoading}
                >
                  Voltar
                </button>
                <button
                  onClick={handleForgotPassword}
                  className="flex-1 btn-primary"
                  disabled={forgotLoading || !forgotEmail.trim()}
                >
                  {forgotLoading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-morphism rounded-fashion-lg shadow-fashion-lg p-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Bem-vindo(a)</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin() }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Usuário</label>
                <input
                  type="text"
                  value={loginUsuario}
                  onChange={(e) => setLoginUsuario(e.target.value)}
                  className="input-field"
                  placeholder="Digite seu usuário"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
                <input
                  type="password"
                  value={loginSenha}
                  onChange={(e) => setLoginSenha(e.target.value)}
                  className="input-field"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                />
              </div>
              {loginError && (
                <div className="bg-danger-500/20 border border-danger-500/30 text-danger-400 px-4 py-3 rounded-fashion text-sm">
                  {loginError}
                </div>
              )}
              <button
                type="submit"
                className="w-full btn-primary"
                disabled={loginLoading || !loginUsuario.trim() || !loginSenha}
              >
                {loginLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-700 space-y-4">
              <div className="bg-primary-500/10 border border-primary-500/30 rounded-fashion p-4 text-sm">
                <p className="font-semibold text-primary-300 text-center mb-3">🔓 Credenciais de Demonstração</p>
                <div className="bg-gray-800/50 rounded-fashion p-3 text-center">
                  <p className="text-gray-200">
                    <strong>Usuário:</strong> <span className="text-primary-400">adm</span><br/>
                    <strong>Senha:</strong> <span className="text-primary-400">adm123</span>
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">Use as credenciais acima ou seu email/senha cadastrados.</p>
              <p className="text-center">
                <button
                  onClick={() => { setShowForgot(true); setForgotEmail(loginUsuario); setForgotStatus(null) }}
                  className="text-xs text-primary-400 hover:text-primary-300 underline transition-colors"
                >
                  Esqueci minha senha
                </button>
              </p>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2024 Rareway - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  )
}
