import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

const Result = (props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 4,
            }}
        >
            {props.movies.map((movie, index) => (
                <Box key={Math.random()}>
                    <List
                        variant="outlined"
                        sx={{
                            bgcolor: 'background.body',
                            minWidth: 240,
                            borderRadius: 'sm',
                            boxShadow: 'sm',
                            '--ListItem-paddingLeft': '1.5rem',
                            '--ListItem-paddingRight': '1rem',
                        }}
                    >
                        <ListItem>
                            <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                            </ListItemDecorator>
                            {movie}
                        </ListItem>
                        {/* {index === props.movies.length - 1 ? "" : <ListDivider inset={'gutter'} />} */}
                    </List>
                </Box>
            ))}
        </Box>
    );
}

export default Result;