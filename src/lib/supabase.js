import { createClient } from '@supabase/supabase-js';

// 🔥 Wstaw tutaj swoje dane z Supabase
const supabaseUrl = 'https://bgjetrfxrgbsolltkqod.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnamV0cmZ4cmdic29sbHRrcW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMDEyMDgsImV4cCI6MjA1NTU3NzIwOH0.ZwWhs1Caqn6T_r6CAOI6UPchOiuLmbb8WnB1LHZhIN0';

// 📌 Tworzymy klienta Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
