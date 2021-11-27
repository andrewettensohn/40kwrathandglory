import { Grid, CircularProgress } from "@material-ui/core";
import React from "react";
import { useAppStyles } from "../../AppStyles";

export const QuickReference = () => {
    const classes = useAppStyles();

    return (
        <div>
            <img src="images/QuickReference1.png" className={classes.imgAction} />
            <img src="images/QuickReference2.png" className={classes.imgAction} />
        </div>)
}