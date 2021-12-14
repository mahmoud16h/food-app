import './App.css';
import FoodCard from "./components/foodCard";
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SortIcon from '@mui/icons-material/Sort';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState} from "react";
import AddPage from "./pages/addPage";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

//
// const darkTheme = createTheme({
//     palette: {
//         mode: 'dark',
//     },
// });

function App() {
    const [addMode, setAddMode] = useState(false)
    const [sort, setSort] = useState('hot')
        console.log('sort', sort)
    const LandingPage = () => <>
        <div style={{
            margin: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%'
        }}>
            <TextField id="filled-basic" label="Search" variant="filled" style={{ width: '90%', marginRight: '8px'}}/>
            <div>
            <InputLabel>Sort</InputLabel>
            <Select
                value={sort}
                label="Sort by"
                onChange={(e) => setSort(e.target.value)}
            >
                <MenuItem value='hot'>Hot</MenuItem>
                <MenuItem value='cold'>Cold</MenuItem>
                <MenuItem value='new'>New</MenuItem>
            </Select>
            </div>
        </div>
        <FoodCard imageUrl="https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&w=1000&q=80" />
        <FoodCard imageUrl="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80" />
        <FoodCard imageUrl="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80" />
        <FoodCard imageUrl="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80" />
        <FoodCard imageUrl="http://cdn.cnn.com/cnnnext/dam/assets/140430115517-06-comfort-foods.jpg" />
        <FoodCard imageUrl="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80" />
    </>

    return (
        <div className="App">
                <div className="App-body">
                    <div style={{ padding: '20px', fontWeight: 'bold', fontSize: '22px' }}>Think you can cook?</div>
                    {!addMode && <AddCircleIcon fontSize="large" style={{position: 'absolute', top: '16px', right: '16px'}}
                                                onClick={() => setAddMode(true)}/>}
                    {addMode && <CancelIcon fontSize="large" style={{position: 'absolute', top: '16px', right: '16px'}}
                                            onClick={() => setAddMode(false)}/>}

                    {addMode ? <AddPage /> : <LandingPage />}
                </div>
        </div>
    );
}

export default App;
