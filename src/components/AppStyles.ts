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
    numberInputMd: {
        maxWidth: 150
    },
    mt5: {
        marginTop: 5
    },
    mt10: {
        marginTop: 10
    },
    mb5: {
        marginBottom: 5
    },
    mb25: {
        marginBottom: 25
    },
    m3: {
        margin: 3
    },
    imgAction: {
        width: "100%",
        height: "auto",
    },
    scrollBox: {
        overflowY: "scroll",
        height: "45vh",
        overflowX: "hidden",
        marginLeft: 16,
        marginRight: 16
    },
    multiScrollBox: {
        overflowY: "scroll",
        height: "25vh",
        width: 300,
        overflowX: "scroll",
        marginLeft: 16,
        marginRight: 16
    },
    scrollBoxLong: {
        overflowY: "scroll",
        height: "70vh",
        overflowX: "hidden",
        marginLeft: 16,
        marginRight: 16
    },
    scrollBoxLargeScreen: {
        overflowY: "scroll",
        height: "45vh",
        overflowX: "hidden",
        maxWidth: 850,
        margin: 16
    },
    textAreaInput: {
        width: '25ch'
    }
});