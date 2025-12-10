// Auth helper functions
import { createClient } from '@/lib/supabase/server'

export async function getSession() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function isAdmin(email: string) {
  const supabase = await createClient()
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('email', email)
    .single()
  
  return adminUser?.role === 'admin'
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient()
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOut() {
  const supabase = await createClient()
  return await supabase.auth.signOut()
}

export async function signUp(email: string, password: string, fullName: string) {
  const supabase = await createClient()
  
  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  })

  if (authError) return { data: null, error: authError }

  // Add to admin_users table
  if (authData.user) {
    const { error: dbError } = await supabase
      .from('admin_users')
      .insert({
        email: authData.user.email!,
        full_name: fullName,
        role: 'admin'
      })

    if (dbError) return { data: null, error: dbError }
  }

  return { data: authData, error: null }
}
