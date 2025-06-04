import './App.css';
import ClicksByTargetChart from './ClicksByTargetChart';
 // TSX

function App() {
  return (
    <div style={{ direction: 'rtl', padding: 32 }}>
      <h1>גרף קליקים לפי יעד</h1>
      <ClicksByTargetChart type="bar" />
    </div>
  );
}

export default App
