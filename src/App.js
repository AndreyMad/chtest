import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import './index.css';
import Main from './pages/main/Main';
import Details from './pages/details/Details';
import List from "./pages/list/List";

const App = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/list" element={<List />}/>
    <Route path="/list/:id" element={<Details />} />
    <Route path="*" element={<Main />}/>
  </>
  )
);
export default App;
