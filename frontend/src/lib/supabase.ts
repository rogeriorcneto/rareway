import { createClient } from '@supabase/supabase-js'

// MODO DEMO - Verificar se está em modo demo antes de exigir variáveis
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' || 
                 !import.meta.env.VITE_SUPABASE_URL || 
                 !import.meta.env.VITE_SUPABASE_ANON_KEY ||
                 import.meta.env.MODE === 'production'

console.log('🔍 Supabase Config:', {
  DEMO_MODE,
  MODE: import.meta.env.MODE,
  VITE_DEMO_MODE: import.meta.env.VITE_DEMO_MODE,
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? '***' : 'empty'
})

if (!DEMO_MODE) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Faltam variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env')
  }
}

// Criar cliente Supabase (em modo demo, será um cliente inválido mas não será usado)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
