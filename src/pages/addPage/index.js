import TextField from "@mui/material/TextField";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import {useState} from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AddPage = ({ closeAdd }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [foodName, setFoodName] = useState('');
    console.log('images', images)
    return (<div style={{
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    }}>
        <TextField
            required
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            id="filled-basic"
            label="Food name"
            variant="outlined"
            style={{width: '100%'}}
        />
        <ImageUploading
            multiple
            value={images}
            onChange={setImages}
            maxNumber={1}
            dataURLKey="data_url"
        >
            {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  dragProps,
              }) => (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    {!images.length && <Button style={{margin: '20px'}} onClick={onImageUpload} variant="outlined" {...dragProps}>Upload image</Button>}
                    {imageList.map((image, index) => (
                        <div key={index} style={{ paddingTop: '20px'}}>
                            <img src={image['data_url']} alt="" style={{ width: '100%', borderRadius: '4px' }}/>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: '20px'
                            }}>
                                <Button onClick={() => onImageUpdate(index)} variant="outlined">Change</Button>
                                <Button onClick={() => onImageRemove(index)} variant="outlined">Remove</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
        {loading && <Box sx={{display: 'flex', padding: '40px'}}>
            <CircularProgress/>
        </Box>}
        <Button disabled={!foodName || !images.length || loading} onClick={() => {
            setLoading(true)
            const form = new FormData();
            form.append('file', images[0].file)
            form.append('name', foodName)
            axios.post('https://rayan-api-dot-rayan-305323.ew.r.appspot.com/ifg', form).then(res => {
                setLoading(false)
                closeAdd()
            })

        }} variant="contained">Post Image</Button>

    </div>)
}

export default AddPage;