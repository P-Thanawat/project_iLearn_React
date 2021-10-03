import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ShowLearnerFormProvider } from './contexts/ShowLeanerFormContext';
import { TeacherFormProvider } from './contexts/showTeacherFormContext'
import { AlertMessageProvider } from './contexts/AlertMessageContext';

ReactDOM.render(
  <AlertMessageProvider>
    <TeacherFormProvider>
      <ShowLearnerFormProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </ShowLearnerFormProvider>
    </TeacherFormProvider>
  </AlertMessageProvider>
  ,
  document.getElementById('root')
);
