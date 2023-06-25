import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  
export function OKAlert() {

    return <Alert
    status='success'
    variant='subtle'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
    height='200px'
  >
    <AlertIcon boxSize='40px' mr={0} />
    <AlertTitle mt={4} mb={1} fontSize='lg'>
      ¡Usuario creado!
    </AlertTitle>
    <AlertDescription maxWidth='sm'>
      Gracias por registrarte en WareUp. 
    </AlertDescription>
  </Alert>
}