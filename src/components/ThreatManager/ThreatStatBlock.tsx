import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { AddBoxOutlined, ExpandMore, ExpandMoreOutlined } from "@material-ui/icons";
import React from "react";
import { Threat } from "../../interfaces/Threat";
import { useAppStyles } from "../AppStyles";
import { ArmorTraitsList } from "../CharacterSheet/CharacterSheetActions/ArmorTraits";
import { WeaponTraitsList } from "../CharacterSheet/CharacterSheetActions/WeaponTraitsList";

export interface ThreatStatBlockProps {
    threat: Threat
};

export const ThreatStatBlock = ({ threat }: ThreatStatBlockProps) => {
    const [isAccordionExpanded, setIsAccordionExpanded] = React.useState(false);
    const [currentWounds, setCurrentWounds] = React.useState(0);
    const [currentShock, setCurrentShock] = React.useState(0);
    const classes = useAppStyles();

    return (
        <div>
            <Accordion expanded={isAccordionExpanded}>
                <AccordionSummary>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item>
                                    <Typography variant="h6">{threat.Name}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item>
                                    <Typography>Defence: {threat.Defence}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>Resilience: {threat.Resilience}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <TextField
                                label={`Wounds | Max ${threat.Wounds}`}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={currentWounds}
                                onChange={(e) => setCurrentWounds(parseFloat(e.target.value))}
                                className={classes.numberInputMd}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label={`Shock | Max ${threat.Shock}`}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={currentWounds}
                                onChange={(e) => setCurrentShock(parseFloat(e.target.value))}
                                className={classes.numberInputMd}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}>
                                Toggle Stats
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        <Grid item>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>S</TableCell>
                                            <TableCell>T</TableCell>
                                            <TableCell>A</TableCell>
                                            <TableCell>I</TableCell>
                                            <TableCell>Wil</TableCell>
                                            <TableCell>Int</TableCell>
                                            <TableCell>Fel</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="right">{threat.Attributes?.Strength}</TableCell>
                                            <TableCell align="right">{threat.Attributes?.Toughness}</TableCell>
                                            <TableCell align="right">{threat.Attributes?.Agility}</TableCell>
                                            <TableCell align="right">{threat.Attributes?.Intellect}</TableCell>
                                            <TableCell align="right">{threat.Attributes?.Willpower}</TableCell>
                                            <TableCell align="right">{threat.Attributes?.Initiative}</TableCell>
                                            <TableCell align="right">{threat.Attributes?.Fellowship}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item>
                            <Typography>Default Skill Value: {threat.DefaultSkill}</Typography>
                        </Grid>
                        <Grid item>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Ballistic</TableCell>
                                            <TableCell>Weapon</TableCell>
                                            <TableCell>Awareness</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="right">{threat.Skills?.Ballistic}</TableCell>
                                            <TableCell align="right">{threat.Skills?.Weapon}</TableCell>
                                            <TableCell align="right">{threat.Skills?.Awareness}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Stealth</TableCell>
                                            <TableCell>Insight</TableCell>
                                            <TableCell>Intimidation</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="right">{threat.Skills?.Stealth}</TableCell>
                                            <TableCell align="right">{threat.Skills?.Insight}</TableCell>
                                            <TableCell align="right">{threat.Skills?.Intimidation}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        {threat.Weapons.length > 0 &&
                            <Grid item>
                                <TableContainer className={classes.multiScrollBox}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Weapon</TableCell>
                                                <TableCell>DMG</TableCell>
                                                <TableCell>ED</TableCell>
                                                <TableCell>Salvo</TableCell>
                                                <TableCell>Traits</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {threat.Weapons.map(x => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="right">{x.Name}</TableCell>
                                                        <TableCell align="right">{x.Damage}</TableCell>
                                                        <TableCell align="right">{x.ED}</TableCell>
                                                        <TableCell align="right">{x.Salvo}</TableCell>
                                                        <TableCell align="right"><WeaponTraitsList traits={x.WeaponTraits} /></TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        }
                        {threat.Armor.length > 0 &&
                            <Grid item>
                                <TableContainer className={classes.multiScrollBox}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Armor</TableCell>
                                                <TableCell>AR</TableCell>
                                                <TableCell>Traits</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {threat.Armor.map(x => {
                                                return (
                                                    <TableRow>
                                                        <TableCell align="right">{x.Name}</TableCell>
                                                        <TableCell align="right">{x.AR}</TableCell>
                                                        <TableCell align="right"><ArmorTraitsList traits={x.ArmorTraits} /></TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        }
                        {threat.Talents.length > 0 &&
                            <Grid item>
                                <Typography>Talents</Typography>
                                <List>
                                    {threat.Talents.map(x => {
                                        return (
                                            <ListItem>
                                                <Grid container>
                                                    <Grid item>
                                                        <Typography variant="h6">{x.Name}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        {x.Description}
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Grid>
                        }
                        <Grid item>
                            <Typography>{threat.Description}</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}