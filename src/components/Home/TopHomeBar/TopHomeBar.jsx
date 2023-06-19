import { Box, styled } from '@mui/system';
import {themeShadows } from "../../MatxTheme/themeColors";
import {topBarHeight } from "../../../utils/constant";
import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { Span } from '../../Typography';


export function TopHomeBar() {  
    const TopbarRoot = styled('div')(({ theme }) => ({
        top: 0,
        zIndex: 96,
        transition: 'all 0.3s ease',
        boxShadow: themeShadows[8],
        height: topBarHeight,
      }));
    
    const TopbarContainer = styled(Box)(({ theme }) => ({
    padding: '8px',
    paddingLeft: 18,
    paddingRight: 20,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: "black",
    [theme.breakpoints.down('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    [theme.breakpoints.down('xs')]: {
        paddingLeft: 14,
        paddingRight: 16,
    },
    }));

    const StyledItem = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    minWidth: 185,
    '& a': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    '& span': { marginRight: '10px', color: "green" },
    }));

    return (
         /*Deberia fijar la bar pero no se fija... hay que revisar porque*/
        <TopbarRoot position="fixed">
            <TopbarContainer>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <StyledItem position="center">
                        <Link to="/users/signin">
                            <Span> Login </Span>
                        </Link>
                    </StyledItem>
                    <StyledItem>
                        <Link to="/users/signup">
                            <Span> Registrarse </Span>
                        </Link>
                    </StyledItem>
                </Box>
            </TopbarContainer>
        </TopbarRoot> 
    );
  }
  