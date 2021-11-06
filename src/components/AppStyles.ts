import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles({
    sheetHeader: {
        minHeight: 100,
        padding: 5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
    },
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    centerScreen: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
    },
    numberInput: {
        maxWidth: 100
    },
    mt5: {
        marginTop: 5
    },
    mt10: {
        marginTop: 10
    },
    mb25: {
        marginBottom: 25
    },
    scrollBox: {
        overflowY: "scroll",
        height: "45vh",
        overflowX: "hidden",
        marginLeft: 16,
        marginRight: 16
    }
});