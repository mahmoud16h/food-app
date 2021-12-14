import TextField from "@mui/material/TextField";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import {useState} from "react";

const AddPage = () => {
    const [images, setImages] = useState([]);
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
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            id="filled-basic"
            label="Food name"
            variant="filled"
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
        {!!foodName && !!images.length && <Button onClick={() => console.log({
            foodName: foodName,
            foodImage: images[0]
        })} variant="contained">Post Image</Button>}

    </div>)
}

export default AddPage;