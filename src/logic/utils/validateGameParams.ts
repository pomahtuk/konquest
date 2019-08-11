import ConquestGame, { GameOptions } from "../Game";
import getPlanetLimit from "./getPlanetLimit";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const validateGameParams = ({ fieldHeight, fieldWidth, neutralPlanetCount, players = [] }: GameOptions): ValidationResult => {
  const playerCount = players.length;
  if (playerCount > ConquestGame.maxPlayers || playerCount < ConquestGame.minPlayers) {
    return {
      valid: false,
      error: `Player count should be between ${ConquestGame.minPlayers} and ${ConquestGame.maxPlayers}`
    };
  }

  if (
    fieldHeight < ConquestGame.minSize ||
    fieldWidth < ConquestGame.minSize ||
    fieldHeight > ConquestGame.maxSize ||
    fieldWidth > ConquestGame.maxSize
  ) {
    return {
      valid: false,
      error: `Game Field could not be less than ${ConquestGame.minSize} and bigger than ${ConquestGame.maxSize} in any dimension`
    };
  }

  const planetLimit = getPlanetLimit(fieldWidth * fieldHeight, playerCount);
  if (neutralPlanetCount > planetLimit) {
    return {
      valid: false,
      error: `Game Field could not accommodate that many neutral planets, limit: ${planetLimit}`
    };
  }

  return {
    valid: true
  };
};

export default validateGameParams;
