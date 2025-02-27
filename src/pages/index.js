import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [captchaToken, setCaptchaToken] = useState(null);
  const router = useRouter();

  async function handleAuth(event) {
    event.preventDefault();

    if (!captchaToken) {
      alert('Potwierdź, że nie jesteś robotem!');
      return;
    }

    if (isLogin) {
      // Logowanie
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken }
      });
      if (error) alert('Błąd logowania: ' + error.message);
      else router.push('/dashboard');
    } else {
      // Rejestracja
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { captchaToken }
      });
      if (error) alert('Błąd rejestracji: ' + error.message);
      else {
        alert('Sprawdź e-mail i potwierdź konto!');
        router.push('/dashboard');
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
        </h1>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* hCaptcha */}
          <div className="flex justify-center">
            <HCaptcha
              sitekey="58527594-635a-40da-a078-19dcdf3036ea"
              onVerify={(token) => setCaptchaToken(token)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-200 hover:bg-yellow-600"
          >
            {isLogin ? 'Zaloguj' : 'Zarejestruj'}
          </button>
        </form>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-center cursor-pointer text-blue-400 hover:underline"
        >
          {isLogin ? 'Nie masz konta? Zarejestruj się!' : 'Masz już konto? Zaloguj się!'}
        </p>
      </div>
    </div>
  );
}
