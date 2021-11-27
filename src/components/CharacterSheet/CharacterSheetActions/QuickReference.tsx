import { Grid, CircularProgress } from "@material-ui/core";
import React from "react";
import { useAppStyles } from "../../AppStyles";

export const QuickReference = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const classes = useAppStyles();

    return !isLoading
        ?
        <div>
            <img src="images/QuickReference1.png" className={classes.imgAction} />
            <img src="images/QuickReference2.png" className={classes.imgAction} />
        </div>
        :
        <Grid container justifyContent="center">
            <Grid item>
                <CircularProgress color="secondary" className={classes.centerScreen} />
            </Grid>
        </Grid>
}