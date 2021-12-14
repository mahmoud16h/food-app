import './styles.css'
import { Card } from '@mui/material'
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const FoodCard = ({ name, imageUrl, rating }) => {

    const rateHot = () => {
        console.log('rate hot')
    }

    const rateCold = () => {
        console.log('rate cold')
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
                    flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
                        <WhatshotIcon onClick={rateHot} fontSize="large" style={{ color: '#ff0000', cursor: 'pointer' }}/>
                        <div style={{ padding: '6px' }}>100</div>
                        <AcUnitIcon onClick={rateCold} fontSize="large" style={{ color: '#61c4ff', cursor: 'pointer' }}/>
                    </div>
                    <div style={{ padding: '10px' }}>Food Name that is really long</div>
                </div>
            </div>
    );
}

export default FoodCard;
