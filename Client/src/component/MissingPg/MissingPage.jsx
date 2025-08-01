import React from 'react';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';
import duck from '../../../src/animations/duck.json';

// Responsive container layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #899db1ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

// Responsive Lottie animation
const StyledLottie = styled(Lottie)`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 40px;
  }
`;

// Content box
const Content = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 40px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Title with scaling
const Title = styled.h1`
  font-size: 72px;
  font-weight: bold;
  margin: 0;
  color: #343a40;
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 120px;
  }
`;

// Subtitle with scaling
const Subtitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0 10px;
  color: #495057;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const Text = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function MissingPage() {
  return (
    <Container>
      <StyledLottie
        animationData={duck}
        loop={true}
      />
      <Content>
        <Title>404</Title>
        <Subtitle>Oops! Page not found</Subtitle>
        <Text>
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button onClick={() => window.history.back()}>
          Go Back
        </Button>
      </Content>
    </Container>
  );
}
