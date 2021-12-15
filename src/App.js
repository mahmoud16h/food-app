import './App.css';
import FoodCard from "./components/foodCard";
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SortIcon from '@mui/icons-material/Sort';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
import AddPage from "./pages/addPage";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Logo from './assets/logo.png'
import axios from "axios";

//
// const darkTheme = createTheme({
//     palette: {
//         mode: 'dark',
//     },
// });

function App() {
    const [addMode, setAddMode] = useState(false)
    const [sort, setSort] = useState('hot')
    const [foodItems, setFoodItems] = useState([])

    const closeAddOnSuccess = () => {
        setAddMode(false)
        fetchFoodItems()
    }

    const fetchFoodItems = async () => {
        axios.get('https://rayan-api-dot-rayan-305323.ew.r.appspot.com/ifg').then(res => setFoodItems(res.data))
    }

    useEffect(() => {
        fetchFoodItems()
    }, [])

    console.log('foodItems', foodItems)
    const LandingPage = () => <>
        <div style={{
            margin: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%'
        }}>
            <TextField id="filled-basic" label="Search" variant="outlined" style={{ width: '90%', marginRight: '8px'}}/>
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
        <div className="cards-parent">
            {!!foodItems.length && foodItems.map(item => <FoodCard fetchFoodItems={fetchFoodItems} id={item._id} rating={item.rating || 0} name={item.name || ""} imageUrl={item.imageUrl}/>)}
        </div>
    </>

    return (
        <div className="App">
            <div className="App-body">
                <img src={Logo} style={{ width: '300px', padding: '20px'}}/>
                {!addMode && <AddCircleIcon fontSize="large" style={{position: 'absolute', top: '80px', right: '10px'}}
                                            onClick={() => setAddMode(true)}/>}
                {addMode && <CancelIcon fontSize="large" style={{position: 'absolute', top: '80px', right: '10px'}}
                                        onClick={() => setAddMode(false)}/>}

                {addMode ? <AddPage closeAdd={closeAddOnSuccess} /> : <LandingPage />}
            </div>
        </div>
    );
}

export default App;
