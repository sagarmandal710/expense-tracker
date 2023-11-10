import { Routes, Route } from 'react-router-dom';
// import context
import { AppState } from './context/AppState';
// import page components
import Signin from './pages/Signin';
import AddExpense from './pages/AddExpense';
import MyExpenses from './pages/MyExpenses';
import Trash from './pages/Trash';

const App = () => {

  return (
    <AppState>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="addexpense" element={<AddExpense />} />
        <Route path="myexpenses" element={<MyExpenses />} />
        <Route path="bin" element={<Trash />} />
        <Route path="logout" element={<h1>Logout</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </AppState>
  );
}

export default App;