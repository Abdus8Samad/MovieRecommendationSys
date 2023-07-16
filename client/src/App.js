import {useEffect, useState} from 'react';
import axios from 'axios';
import Result from './Result';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/joy/Button';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
	position: 'relative',
	height: 200,
	[theme.breakpoints.down('sm')]: {
		width: '100% !important', // Overrides inline-style
		height: 100,
	},
	'&:hover, &.Mui-focusVisible': {
		zIndex: 1,
		'& .MuiImageBackdrop-root': {
		opacity: 0.4,
		},
		'& .MuiImageMarked-root': {
		opacity: 0,
		},
		'& .MuiTypography-root': {
		border: '4px solid currentColor',
		},
	},
}));
  
const ImageSrc = styled('span')({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundSize: 'cover',
	backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
	position: 'absolute',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundColor: theme.palette.common.black,
	opacity: 0.6,
	transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
	height: 3,
	width: 18,
	backgroundColor: theme.palette.common.white,
	position: 'absolute',
	bottom: -2,
	left: 'calc(50% - 9px)',
	transition: theme.transitions.create('opacity'),
}));

const App = () => {
	const [movies, setMovies] = useState([]);
	const [title, setTitle] = useState("");
	const [list, setList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() =>{
		axios.get('/getMovies')
		.then(res =>{
			setMovies(res.data);
		})
		.catch(err =>{
			console.error(err);
		})
	}, [])
	const recommend = () =>{
		setIsLoading(true);
		if(title === ""){
			alert("Please Type in the movie");
			setIsLoading(false);
			return;
		}
		axios.get(`getRecommendation/${title}`)
		.then(res =>{
			const {data, status, msg} = res.data;
			if(status === 200){
				setList(data);
			} else {
				alert(msg);
			}
			setIsLoading(false);
		})
		.catch(error =>{
			console.error(error.response.status + " " + error);
			setIsLoading(false);
		})
	}
	return(
		<div className='App'>
			<h1 style={{"text-align": "center"}}>Movie Recommendation System</h1>
			<Box
				sx={{
					width: 800,
					maxWidth: '100%',
					margin: "50px auto"
				}}
			>
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={movies}
					onChange={(event, newValue) => {
						setTitle(newValue);
					}}
					renderInput={(params) => <TextField {...params} color="secondary" fullWidth label="Movie Name" id="fullWidth" name='movie' />}
			    />
				<Box
					sx={{
						width:400,
						margin:"50px auto"
					}}
				>
					<ImageButton
						loading
						focusRipple
						key={"Recommend"}
						style={{
							width:"100%",
							height: 80,
						}}
						onClick={() => recommend()}
					>
						<ImageSrc style={{ backgroundImage: `url(https://wallpaperaccess.com/full/1835991.jpg)` }} />
						<ImageBackdrop className="MuiImageBackdrop-root" />
						<Image>
							<Typography
								component="span"
								variant="subtitle1"
								color="inherit"
								sx={{
									position: 'relative',
									p: 2,
									pt: 1,
									fontSize: 30,
									pb: (theme) => `calc(${theme.spacing(1)} + 0px)`,
								}}
							>
								{isLoading ? (
									<Button loading variant="plain">
										Plain
									</Button>
								) : "Recommend"}
							<ImageMarked className="MuiImageMarked-root" />
							</Typography>
						</Image>
					</ImageButton>
				</Box>
				<Result movies={list} />
			</Box>
		</div>
	)
}

export default App;
