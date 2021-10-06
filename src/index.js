import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ShowLearnerFormProvider } from './contexts/ShowLeanerFormContext';
import { TeacherFormProvider } from './contexts/showTeacherFormContext'
import { AlertMessageProvider } from './contexts/AlertMessageContext';
import { ShowLessonFormProvider } from './contexts/showLessonFormContext';
import { ShowBookingProvider } from './contexts/showBookingContext';
import { SendDataFromTeacherProvider } from './contexts/SendDataFromTeacherContext';
import { TableDataProvider } from './contexts/TableData';
import { ModalProvider } from './contexts/ModalContext';

ReactDOM.render(
  <ModalProvider >
    <TableDataProvider>
      <SendDataFromTeacherProvider>
        <ShowBookingProvider>
          <ShowLessonFormProvider>
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
          </ShowLessonFormProvider>
        </ShowBookingProvider>
      </SendDataFromTeacherProvider>
    </TableDataProvider>
  </ModalProvider>
  ,
  document.getElementById('root')
);
