import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseurl='https://zknxbvmxrrhrrybszbny.supabase.co'
const supabasekey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprbnhidm14cnJocnJ5YnN6Ym55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTIxNjMsImV4cCI6MjAxNzUyODE2M30.uoHWshWJ4x0uyKu-7v-eOABGmsTJm3tRo_9wNGt8jdU'

export const supabase = createClient(supabaseurl, supabasekey);