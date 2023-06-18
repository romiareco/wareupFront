import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import {Grid } from '@mui/material';
import { H4, H3 } from '../../Typography';

const WhoWeAre = () => {

    const item = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 5,
      };

    return (
        <Box
        component="section"
        sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'transparent' }}
      >
        <Container sx={{ mt: 15, mb: 30, position: 'relative', fixed:true, background:'transparent' }}>
          <Box
            sx={{ 
                backgroundImage: `url("assets/images/home-bg-black.png")`, 
                backgroundRepeat: "no-repeat"
            }}
          />
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="assets/images/who-we-are/who-we-are-1.png"
                />
                <H4>
                  {
                    'Te ofrecemos acceso a una amplia oferta de depósitos'
                  }
                  {
                    ', con la flexibilidad necesaria para adaptarse ágilmente a tus necesidades,'
                  }
                  {
                    ', donde lo precises.'
                  }
                </H4>
              </Box>
            </Grid>
            <Grid>
              <Box sx={item}>
                <Box
                  component="img"
                  src="assets/images/who-we-are/who-we-are-2.png"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="assets/images/who-we-are/who-we-are-3.png"
                />
                <H3>
                  {'Te ayudamos a capitalizar el espacio ocioso'}
                  {', tranformándolo en una nueva fuente de ingreso.'}
                </H3>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      );
}

export default WhoWeAre;