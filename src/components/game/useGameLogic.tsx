import { useState, useEffect, useCallback } from "react";
import { CardType, generateCards } from "@/utils/gameData";
import { shuffleCards } from "@/utils/shuffleCards";
import { toast } from "sonner";
import { GameState, initialGameState, GameMode } from "./GameState";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from "lucide-react";

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [showSplash, setShowSplash] = useState(true);
  const [showRankings, setShowRankings] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const { t } = useLanguage();
  
  const {
    cards, flippedCards, gameStarted, gameWon, isChecking, 
    score, player2Score, playerName, player2Name, gameMode, currentPlayer
  } = gameState;

  const initGame = useCallback(() => {
    const newCards = shuffleCards(generateCards());
    setGameState(prevState => ({
      ...initialGameState,
      cards: newCards,
      playerName: prevState.playerName,
      player2Name: prevState.player2Name,
      gameMode: prevState.gameMode
    }));
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let timer: number | undefined;
    
    if (gameStarted && !gameWon && gameMode === "single") {
      timer = window.setInterval(() => {
        setGameState(prevState => ({
          ...prevState,
          time: prevState.time + 1
        }));
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameWon, gameMode]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setGameState(prevState => ({
        ...prevState, 
        gameWon: true,
        winnerName: determineWinner(prevState)
      }));
      
      if (gameMode === "single") {
        toast.success(t("gameCompleted"));
      } else {
        if (score > player2Score) {
          toast.success(`${playerName} ${t("playerWins")}`);
        } else if (player2Score > score) {
          toast.success(`${player2Name} ${t("playerWins")}`);
        } else {
          toast.info(t("itsATie"));
        }
      }
    }
  }, [cards, score, player2Score, playerName, player2Name, gameMode, t]);

  const determineWinner = (state: GameState): string => {
    if (state.gameMode !== "multiplayer") return state.playerName;
    
    if (state.score > state.player2Score) {
      return state.playerName;
    } else if (state.player2Score > state.score) {
      return state.player2Name;
    } else {
      return "It's a tie!";
    }
  };

  const handleStartGame = (name: string, mode: GameMode) => {
    if (mode === "multiplayer" && name.includes("|")) {
      const [player1, player2] = name.split("|");
      setGameState(prevState => ({
        ...prevState,
        playerName: player1,
        player2Name: player2,
        gameMode: mode
      }));
    } else {
      setGameState(prevState => ({
        ...prevState,
        playerName: name,
        gameMode: mode
      }));
    }
    
    setShowSplash(false);
    setShowCountdown(true);
    startCountdown();
  };
  
  const startCountdown = () => {
    setCountdownValue(3);
    
    const countdownInterval = setInterval(() => {
      setCountdownValue(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setTimeout(() => {
            setShowCountdown(false);
            setGameState(prevState => ({
              ...prevState,
              gameStarted: true
            }));
          }, 1000); // Keep "Go!" visible for 1 second
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const goToSplash = () => {
    setShowSplash(true);
    setGameState(prevState => ({
      ...prevState,
      gameStarted: false
    }));
    initGame();
  };

  const handleCardClick = (clickedCard: CardType) => {
    if (!gameStarted) return;
    
    if (isChecking || flippedCards.length >= 2) return;
    
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    
    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    
    const newFlippedCards = [...flippedCards, clickedCard];
    
    setGameState(prevState => ({
      ...prevState,
      cards: updatedCards,
      flippedCards: newFlippedCards
    }));
    
    if (newFlippedCards.length === 2) {
      setGameState(prevState => ({
        ...prevState,
        moves: prevState.moves + 1,
        isChecking: true
      }));
      
      const [first, second] = newFlippedCards;
      
      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setGameState(prevState => {
            let updatedScore = prevState.score;
            let updatedPlayer2Score = prevState.player2Score;
            
            if (gameMode === "multiplayer") {
              if (currentPlayer === 1) {
                updatedScore += 1;
              } else if (currentPlayer === 2) {
                updatedPlayer2Score += 1;
              }
            } else if (gameMode === "single") {
              updatedScore += 1;
            }
            
            return {
              ...prevState,
              cards: prevState.cards.map((card) =>
                card.pairId === first.pairId ? { ...card, isMatched: true } : card
              ),
              score: updatedScore,
              player2Score: updatedPlayer2Score,
              flippedCards: [],
              isChecking: false
            };
          });
          
          toast.success(t("matchFound"), {
            icon: <Check className="h-5 w-5 text-green-500" />
          });
        }, 500);
      } else {
        setTimeout(() => {
          setGameState(prevState => ({
            ...prevState,
            cards: prevState.cards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            ),
            currentPlayer: gameMode === "multiplayer" 
              ? (currentPlayer === 1 ? 2 : 1) 
              : currentPlayer,
            flippedCards: [],
            isChecking: false
          }));
        }, 1000);
      }
    }
  };

  const restartGame = () => {
    initGame();
    setShowCountdown(true);
    startCountdown();
    toast.info(t("gameRestarted"));
  };

  const setGameWon = (value: boolean) => {
    setGameState(prevState => ({
      ...prevState,
      gameWon: value
    }));
  };

  const handleViewRankings = () => {
    setShowRankings(true);
    setGameWon(false);
  };

  const handleBackFromRankings = () => {
    setShowRankings(false);
  };

  return {
    gameState,
    showSplash,
    showRankings,
    showCountdown,
    countdownValue,
    handleStartGame,
    goToSplash,
    handleCardClick,
    restartGame,
    setGameWon,
    handleViewRankings,
    handleBackFromRankings,
    setShowRankings
  };
};
