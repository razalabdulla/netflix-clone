
import './App.css';
import Navbar from './components/navbar/navbar';
import Banner from './components/banner/banner';
import RowPost from './components/row-post/RowPost';
import { actions, comady, originalS,horror, romance } from './constants/urls'
import Footer from './components/footer/footer';
function App() {
  return (
   <div className="">
<Navbar/>
<Banner title='YouTube'/>

<RowPost url={originalS} title='Netflix Originals'/>
<RowPost url={actions} title='Action' isSmall/>
<RowPost url={comady} title='Comady' isSmall/>
<RowPost url={horror} title='Horror' isSmall/>
<RowPost url={romance} title='Romance' isSmall/>
<Footer/>
   </div>
  );
}

export default App;
