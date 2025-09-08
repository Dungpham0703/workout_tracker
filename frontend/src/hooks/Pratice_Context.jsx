import { useReducer } from "react";

const PracticeReducer = () => {
  const initialScore = [
    { id: 1, score: 0, name: "John" },
    { id: 2, score: 5, name: "Sally" },
  ];

  const scoreReducer = (state, action) => {
    switch (action.type) {
      case "INCREASE":
        return state.map((player) =>
          player.id === action.payload
            ? { ...player, score: player.score + 1 }
            : player
        );
      case "DECREASE":
        return state.map((player) =>
          player.id === action.payload
            ? { ...player, score: player.score - 1 }
            : player
        );
      default:
        return state;
    }
  };

   const [state, dispatch] = useReducer(scoreReducer, initialScore);

  return (
    <div>
      <h2>Scoreboard</h2>
      {state.map((player) => (
        <div key={player.id}>
          <span>
            {player.name}: {player.score}
          </span>
          <button onClick={() => dispatch({ type: "INCREASE", payload: player.id })}>
            +
          </button>
          <button onClick={() => dispatch({ type: "DECREASE", payload: player.id })}>
            -
          </button>
        </div>
      ))}
    </div>
  );
};

export default PracticeReducer;
