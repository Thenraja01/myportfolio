import RootLayout from "./components/layout/RootLayout";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
export default function App() {
  return (
    <BrowserRouter>

      <RootLayout />
    </BrowserRouter>
  )
}
