import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ShowLearnerFormProvider } from './contexts/ShowLeanerFormContext';

ReactDOM.render(
  <ShowLearnerFormProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </ShowLearnerFormProvider>
  ,
  document.getElementById('root')
);
