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
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

//
// const darkTheme = createTheme({
//     palette: {
//         mode: 'dark',
//     },
// });

function App() {
    const [addMode, setAddMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('new')
    const [votedHot, setVotedHot] = useState([])
    const [votedCold, setVotedCold] = useState([])
    const [foodItems, setFoodItems] = useState([])

    const closeAddOnSuccess = () => {
        setAddMode(false)
        fetchFoodItems()
    }

    const fetchFoodItems = async () => {
        axios.get('https://rayan-api-dot-rayan-305323.ew.r.appspot.com/ifg').then(res => {
            switch (sort) {
                case 'hot':
                    return setFoodItems(res.data.sort((a,b) => a.rating > b.rating ? -1 : 1))
                case 'cold':
                    return setFoodItems(res.data.sort((a,b) => a.rating < b.rating ? -1 : 1))
                case 'new':
                    return setFoodItems(res.data.reverse())
                default:
                    break
            }
        })
    }

    const fetchInitialFoodItems = async () => {
        setLoading(true)
        axios.get('https://rayan-api-dot-rayan-305323.ew.r.appspot.com/ifg').then(res => {
            setLoading(false)
            setFoodItems(res.data.reverse());
        })
    }

    const filteredResults = !!search && foodItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
        fetchInitialFoodItems()
    }, [])

    const foodToRender = !!search ? filteredResults : foodItems;

    const LandingPage = () => <>
        {loading && <Box sx={{display: 'flex', padding: '40px'}}>
            <CircularProgress/>
        </Box>}
        <div className="cards-parent">

            {!!foodToRender.length && foodToRender.map(item => <FoodCard
                setVotedHot={setVotedHot}
                setVotedCold={setVotedCold}
                votedHot={votedHot}
                votedCold={votedCold}
                fetchFoodItems={fetchFoodItems}
                id={item._id}
                rating={item.rating || 0} name={item.name || ""}
                imageUrl={item.imageUrl}/>
            )}
        </div>
    </>

    return (
        <div className="App">
            <div className="App-body">
                <img src={Logo} style={{ width: '300px', padding: '20px'}}/>
                <div style={{
                    margin: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: '100%'
                }}>
                    <TextField onChange={(e) => setSearch(e.target.value)} value={search} id="filled-basic" label="Search" variant="outlined" style={{ width: '90%', marginRight: '8px'}}/>
                    <div>
                        <InputLabel>Sort</InputLabel>
                        <Select
                            value={sort}
                            label="Sort by"
                            onChange={(e) => {
                                setSort(e.target.value)
                                switch (e.target.value) {
                                    case 'hot':
                                        return setFoodItems(foodItems.sort((a,b) => a.rating > b.rating ? -1 : 1))
                                    case 'cold':
                                        return setFoodItems(foodItems.sort((a,b) => a.rating < b.rating ? -1 : 1))
                                    case 'new':
                                        return fetchInitialFoodItems()
                                    default:
                                        break
                                }
                            }}
                        >
                            <MenuItem value='hot'>Hot</MenuItem>
                            <MenuItem value='cold'>Cold</MenuItem>
                            <MenuItem value='new'>New</MenuItem>
                        </Select>
                    </div>
                </div>

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
