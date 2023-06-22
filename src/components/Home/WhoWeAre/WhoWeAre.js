import { Box } from '@mui/system';
import { Container, Image } from "semantic-ui-react";
import {Grid } from '@mui/material';
import { H4, H3 } from '../../Typography';
import {image} from "../../../assets";

export function WhoWeAre() {

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
                <Image src={image.whoWeAre1} />
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
              <Image src={image.whoWeAre2} />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
              <Image src={image.whoWeAre3} />
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
