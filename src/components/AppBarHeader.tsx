import { Toolbar, Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.png';

const useStyles = makeStyles({
    bar: {
        backgroundColor: '#1d1d1d',
        display: 'flex',
        maxHeight: 100,
        fontSize: 'calc(10px + 2vmin)'
    },
    link: {
        textDecoration: "none",
        color: "#ffffff"
    }
});

export const AppBarHeader = () => {

    const classes = useStyles();

    return (
        <AppBar position="static" color="secondary" >
            <Toolbar>
                <Typography variant="h4"><a href="/" className={classes.link}>Wrath &#38; Glory</a></Typography>
                <img src={logo} />
            </Toolbar>
        </AppBar >
    );
}