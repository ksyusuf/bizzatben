import { create } from 'zustand'

export type Mode = 'programming' | 'civil'

interface ModeState {
  currentMode: Mode
  setMode: (mode: Mode) => void
  toggleMode: () => void
}

export const useModeStore = create<ModeState>((set, get) => ({
  currentMode: 'programming',
  setMode: (mode) => set({ currentMode: mode }),
  toggleMode: () => {
    const currentMode = get().currentMode
    const targetMode = currentMode === 'programming' ? 'civil' : 'programming'
    set({ currentMode: targetMode })
  },
})) 