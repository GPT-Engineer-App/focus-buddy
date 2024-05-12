import React, { useState, useEffect } from "react";
import { Container, VStack, Button, Text, Progress, useToast } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";

const Index = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const toast = useToast();

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (!isActive && secondsLeft !== 0 && secondsLeft !== 25 * 60) {
      clearInterval(interval);
    }
    if (secondsLeft === 0) {
      toast({
        title: "Pomodoro Complete!",
        description: "Take a short break!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setPomodoroCount(pomodoroCount + 1);
      setSecondsLeft(25 * 60); // Reset timer
      setIsActive(false); // Stop the timer
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, pomodoroCount, toast]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSecondsLeft(25 * 60);
    setIsActive(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={8}>
        <Text fontSize="4xl">Pomodoro Tracker</Text>
        <Text fontSize="2xl">{formatTime()}</Text>
        <Progress value={((25 * 60 - secondsLeft) / (25 * 60)) * 100} width="100%" size="lg" colorScheme="pink" />
        <VStack>
          <Button leftIcon={isActive ? <FaPause /> : <FaPlay />} onClick={toggle} colorScheme="teal" size="lg">
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button leftIcon={<FaSync />} onClick={reset} colorScheme="orange" size="lg">
            Reset
          </Button>
        </VStack>
        <Text>Pomodoros Completed: {pomodoroCount}</Text>
      </VStack>
    </Container>
  );
};

export default Index;
