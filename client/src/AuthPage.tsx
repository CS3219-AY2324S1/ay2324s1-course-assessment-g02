import { createClient } from '@supabase/supabase-js'

import {
  Auth,
} from '@supabase/auth-ui-react'

import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'


const supabase = createClient(
  process.env.APP_SUPABASE_URL || '',
  process.env.APP_ANON_KEY || ''
)


function AuthPage() {

  return (

    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}

      />
    </div>


  );
}

export default AuthPage;