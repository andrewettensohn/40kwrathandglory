import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    sheetHeader: {
        minHeight: 100,
        padding: 10
    },
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    actionModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionMenu: {
        //backgroundColor: "#1d1d1d",
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
});