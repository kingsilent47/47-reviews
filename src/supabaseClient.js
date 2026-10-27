import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uaipymtyeuuumrdxptyu.supabase.co';
const supabaseAnonKey = 'sb_publishable_k-07z373swuLyGaCHT6XIw_zfLDS6i0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
