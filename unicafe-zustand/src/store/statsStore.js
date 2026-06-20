import { create } from "zustand";

const useStatsStore = create((set) => ({
  good: 0,
  bad: 0,
  neutral: 0,
  actions: {
    incrementGood: () => set((state) => ({ good: state.good + 1 })),
    incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
    incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
  },
}));

export const useStats = () => {
  const good = useStatsStore((state) => state.good);
  const bad = useStatsStore((state) => state.bad);
  const neutral = useStatsStore((state) => state.neutral);
  const all = good + bad + neutral;

  return {
    good,
    bad,
    neutral,
    all,
    average: all > 0 ? (good - bad) / all : 0,
    positive: all > 0 ? (good / all) * 100 : 0,
  };
};

export const useStatsControls = () => useStatsStore((state) => state.actions);
