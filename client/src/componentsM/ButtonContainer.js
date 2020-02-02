import React from 'react';
import Container from '@material-ui/core/Container';

export default function ButtonContainer(props) {
  return (
    <Container
      style={{

        justifyContent: 'center',
        display: 'flex',
        paddingLeft: '24px',
        paddingRight: '24px',
        alignContent: 'center',
        padding: '8px 0 4px'
      }}
    >
      {props.children}
    </Container>
  )
};