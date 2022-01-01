import { useMediaQuery } from "@material-ui/core";

export const IsSmallScreen = (): boolean => useMediaQuery('(max-width: 1200px)');