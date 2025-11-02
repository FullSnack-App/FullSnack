import './App.css';
import { routes } from './router/AppRouter';
import { BrowserRouter } from 'react-router';

function App() {
    /*
          <Menu></Menu>
      <HeroSection></HeroSection>
      <Footer></Footer>
  */
    return <BrowserRouter>{routes}</BrowserRouter>;
}

export default App;
