import './styles.css'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import axios from "axios";

const FoodCard = ({ name, imageUrl, rating, id, fetchFoodItems }) => {

    const rateHot = async () => {
        await rate(rating + 1)
        console.log('rate hot')
    }

    const rateCold = async () => {
        await rate(rating - 1)
        console.log('rate cold')
    }

    const rate = async (rating) => {
        await axios.put(`https://rayan-api-dot-rayan-305323.ew.r.appspot.com/ifg/${id}`, { rating }).then((res) => {
            fetchFoodItems()
        } )
    }

    return (
        <div className="card-container">
            <img
                style={{ resizeMode: 'contain', width: '100%', borderRadius: '20px 20px 0 0 ', paddingTop: '6px' }}
                src={imageUrl}
                alt="new"
            />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                justifyContent: 'space-around',
                width: '100%',
                borderStyle: 'solid',
                borderColor: '#b4b4b4',
                borderWidth: '0 1px 1px 1px',
                boxSizing: 'border-box',
                borderRadius: '0 0 20px 20px',
                backgroundColor: 'white',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                    <div className="icon-wrapper-red">
                        <WhatshotIcon onClick={rateHot} fontSize="large" style={{ color: '#ff0000', cursor: 'pointer' }}/>
                    </div>
                    <div style={{ padding: '6px' }}>{rating}</div>
                    <div className="icon-wrapper-blue">
                        <AcUnitIcon onClick={rateCold} fontSize="large" style={{ color: '#61c4ff', cursor: 'pointer' }}/>
                    </div>
                </div>
                <div style={{ padding: '10px' }}>{name}</div>
            </div>
        </div>
    );
}

export default FoodCard;
