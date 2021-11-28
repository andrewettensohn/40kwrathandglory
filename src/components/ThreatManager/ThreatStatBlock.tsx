import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, List, ListItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { AddBoxOutlined, ExpandMore, ExpandMoreOutlined } from "@material-ui/icons";
import React from "react";
import { Threat } from "../../interfaces/Threat";
import { useAppStyles } from "../AppStyles";
import { ArmorTraitsList } from "../CharacterSheet/CharacterSheetActions/ArmorTraits";
import { DiceRoller } from "../CharacterSheet/CharacterSheetActions/DiceRoller";
import { WeaponTraitsList } from "../CharacterSheet/CharacterSheetActions/WeaponTraitsList";

export interface ThreatStatBlockProps {
    threat: Threat
};

export const ThreatStatBlock = ({ threat }: ThreatStatBlockProps) => {
    const [currentWounds, setCurrentWounds] = React.useState(0);
    const [currentShock, setCurrentShock] = React.useState(0);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const classes = useAppStyles();

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <div>
                <Paper>
                <Grid container justifyContent="center" spacing={3}>
                        <Grid item>
                            <Grid container>
                                <Grid item>
                                    <Typography variant="h6">{threat.Name}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={() => setIsModalOpen(true)}>
                                Open Stats
                            </Button>
                        </Grid>
                        <Grid item>
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
                                value={currentShock}
                                onChange={(e) => setCurrentShock(parseFloat(e.target.value))}
                                className={classes.numberInputMd}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            <Modal
                open={isModalOpen}
                onClose={toggleModal}
                className={classes.centerScreen}
            >
                <Paper className={classes.scrollBoxLong}>
                    <Grid container justifyContent="center" className={classes.mt10}>
                        <Grid item>
                            <DiceRoller initalDiceValue={0} />
                        </Grid>
                    </Grid>
                <Grid container justifyContent="center" spacing={3}>
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
                        <Grid container justifyContent="center">
                        <Grid item>
                            <Typography>Default Skill Value: {threat.DefaultSkill}</Typography>
                        </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
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
                        </Grid>
                        <Grid container justifyContent="center">
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
                        </Grid>
                        {threat.Weapons.length > 0 &&
                        <Grid container justifyContent="center">
                                                        <Grid item className={classes.multiScrollBox}>
                                <TableContainer>
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
                                            {threat.Weapons.map((x, key) => {
                                                return (
                                                    <TableRow key={key}>
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
                            </Grid>
                        }
                        {threat.Armor.length > 0 &&
                        <Grid container justifyContent="center">
                                                        <Grid item className={classes.multiScrollBox}>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Armor</TableCell>
                                                <TableCell>AR</TableCell>
                                                <TableCell>Traits</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {threat.Armor.map((x, key) => {
                                                return (
                                                    <TableRow key={key}>
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
                            </Grid>
                        }
                        {threat.Talents.length > 0 &&
                        <Grid container justifyContent="center">
                            <Grid item className={classes.multiScrollBox}>
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
                            </Grid>
                        
                        }
                    </Grid>
                </Paper>
            </Modal>
        </div>
    );
}