import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setMode(mode);
    if (replace) {
      history.splice(history.length - 1, 1, mode);
    } else {
      setHistory([...history, mode]);
    }
  }

  function back() {
    // going back past initial mode is not allowed:
    if (history.length === 1) {
      setMode(history[0]);
    } else {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
