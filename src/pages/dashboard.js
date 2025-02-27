import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push('/'); // Jeśli brak użytkownika → wracamy do logowania
      setUser(user);
    };
    checkUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Witaj, {user?.email}!</h1>
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  );
}
