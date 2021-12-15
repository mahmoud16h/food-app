import './styles.css'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import axios from "axios";

const FoodCard = ({ name, imageUrl, rating, id, fetchFoodItems, setVotedHot, setVotedCold, votedCold, votedHot }) => {

    const randomNumber = Math.floor(Math.random() * (20 - 1 + 1) + 1)

    const rateHot = async () => {
        await rate(rating + randomNumber)
        setVotedHot([...votedHot, id])
    }

    const rateCold = async () => {
        await rate(rating - randomNumber)
        setVotedCold([...votedCold, id])
    }

    const rate = async (rating) => {
        await axios.put(`https://rayan-api-dot-rayan-305323.ew.r.appspot.com/ifg/${id}`, { rating }).then((res) => {
            fetchFoodItems()
        } )
    }

    const hasBeenVotedHot = votedHot.includes(id)
    const hasBeenVotedCold = votedCold.includes(id)

    const hasBeenVoted = hasBeenVotedHot || hasBeenVotedCold;
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
                        <WhatshotIcon onClick={!hasBeenVoted && rateHot} fontSize="large" style={{ color: hasBeenVotedHot ? '#ff0000' : 'grey', cursor: hasBeenVoted ? 'default' :'pointer' }}/>
                    </div>
                    <div style={{ padding: '6px', fontWeight: 'bold' }}>{rating}°</div>
                    <div className="icon-wrapper-blue">
                        <AcUnitIcon onClick={!hasBeenVoted && rateCold} fontSize="large" style={{ color: hasBeenVotedCold? '#61c4ff' : 'grey', cursor: hasBeenVoted ? 'default' : 'pointer' }}/>
                    </div>
                </div>
                <div style={{ padding: '10px' }}>{name}</div>
            </div>
        </div>
    );
}

export default FoodCard;
