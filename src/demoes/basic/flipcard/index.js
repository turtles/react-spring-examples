import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring'
import styled from 'styled-components';

const trans = (x) => `perspective(600px) rotateX(${x*180}deg)`;

function FlipCard() {
  const [isFaceUp, setIsFaceUp] = useState(false);
  const props = useSpring({x: isFaceUp ? 1 : 0, opacity: isFaceUp ? 0 : 1, config: { mass: 5, tension: 500, friction: 80 }});


  const Front = animated(CardFront);
  const Back = animated(CardBack);

  return (
    <Container onClick={() => {
          setIsFaceUp(!isFaceUp);
      }}>
      <Front style={{
        opacity: props.opacity,
        transform: props.x.interpolate(trans)}}/>
      <Back style={{
        opacity: props.opacity.interpolate(o=>1-o),
        transform: props.x.interpolate(x=>`${trans(x)} rotateZ(180deg)`)}}  />
    </Container>
  );

}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  position: absolute;
  min-width: 240px;
  min-height: 180px;
  max-width: 480px;
  max-height: 360px;
  width: 50%;
  height: 50%;
  border-radius: 4px;
  background-size: cover;
  cursor: pointer;
  will-change: transform, opacity;
`;

const CardFront = styled(Card)`
  background: url('https://i.imgur.com/jUTidw0.jpg');
`;

const CardBack = styled(Card)`
  background: url('https://i.imgur.com/B4huTuc.jpg');
`;


export default FlipCard;
