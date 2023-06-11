import * as React from 'react';
import Button from '@mui/material/Button';
import LogisticBannerLayout from './LogisticBannerLayout';
import { H5 } from 'app/components/Typography';

const backgroundImage =
  'https://wareup.com.uy/wp-content/uploads/2021/07/banner-1.jpg';

const LogisticBanner = () => {
    return (
        <LogisticBannerLayout
        sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        }}
    >
        <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
        />
        <H5>
        La logística para todos.
        </H5>
        <H5>
        +Flexible +Confiable +Simple
        </H5>
        <Button
            color="secondary"
            variant="contained"
            size="large"
            component="a"
            href="/clients/signup/"
            sx={{ minWidth: 200 }}
            >
            Empieza ahora
        </Button>
    </LogisticBannerLayout>
    );
};

export default LogisticBanner;