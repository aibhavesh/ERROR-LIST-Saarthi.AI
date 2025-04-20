import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContext } from './context/AuthContext';

const Root = () => {
  const [user, setUser] = useState(null);

  return (
    <StrictMode>
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContext.Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
