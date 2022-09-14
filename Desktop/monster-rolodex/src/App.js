import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

//Using hooks, functional component
const App = () => {
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonster, setFilterMonster] = useState(monsters);
  const [titleField, setTitleField] = useState('');

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }
  
  const onTitleChange = (event) => {
    const searchTitleField = event.target.value.toLocaleLowerCase();
    setTitleField(searchTitleField);
  }

  //componentDidMount
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users))
  }, [])

  useEffect(()=>{
    const newFilteredMonster = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonster(newFilteredMonster);
  }, [monsters, searchField])

  return (
    <div className="App">
        <h1 className='app-title'>{titleField}</h1>
        
        <SearchBox 
          onChangeHandler={onSearchChange} 
          placeholder='Seach monster'
          className='monster-search-box'
        />
        <br/>
        <SearchBox 
          onChangeHandler={onTitleChange} 
          placeholder='Set title'
          className='monster-search-box'
        />
        <CardList monsters={filteredMonster}/>
      </div>
  )
}

// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       monsters: [],
//       searchField: '',
//     }
//   }

//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then((users) => this.setState(() => {
//         return {monsters: users}
//       }))
//   }

//   onSearchChange = (event) => {
//     // console.log(event.target.value)
//     const searchField = event.target.value.toLowerCase();
//     this.setState(() => {
//       return {searchField};
//     })
//    }

//   render(){
//     //Initialized variable
//     const {monsters, searchField } = this.state;
//     const {onSearchChange} = this;

    // const filteredMonster = monsters.filter((monster) => {
    //   return monster.name.toLowerCase().includes(searchField);
    // });
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox 
//           onChangeHandler={onSearchChange} 
//           placeholder='Seach monster'
//           className='monster-search-box'
//         />
//         {/* <input className='seach-box' type='search' placeholder='search monster'
//          onChange={onSearchChange}/> */}
//         {/* {filteredMonster.map((monster)=>{
//           return (
//             <div key={monster.id}>
//               <h1>{monster.name}</h1>
//             </div>
//           );
//         })} */}
//         <CardList monsters={filteredMonster}/>
//       </div>
//     );
//   }
// }

export default App;
