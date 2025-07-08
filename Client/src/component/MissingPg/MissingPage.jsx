import React from 'react';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';
import duck from '../../../src/animations/duck.json';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 40px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 120px;
  font-weight: bold;
  margin: 0;
  color: #343a40;
  line-height: 1;
`;

const Subtitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin: 20px 0 10px;
  color: #495057;
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
        <>
        <Container>
            <Lottie
                animationData={duck}
                loop={true}
                style={{ height: '300px',width:'500px' }}
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
        </>
    );
}