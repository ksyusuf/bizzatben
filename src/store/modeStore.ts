import { create } from 'zustand'

export type Mode = 'programming' | 'civil'

interface ModeState {
  currentMode: Mode
  isTransitioning: boolean
  setMode: (mode: Mode) => void
  toggleMode: () => void
  startTransition: () => void
  endTransition: () => void
}

export const useModeStore = create<ModeState>((set) => ({
  currentMode: 'programming',
  isTransitioning: false,
  setMode: (mode) => set({ currentMode: mode }),
  toggleMode: () => {
    set((state) => ({ isTransitioning: true }))
    setTimeout(() => {
      set((state) => ({ 
        currentMode: state.currentMode === 'programming' ? 'civil' : 'programming',
        isTransitioning: false
      }))
    }, 1200) // Animasyon süresi artırıldı
  },
  startTransition: () => set({ isTransitioning: true }),
  endTransition: () => set({ isTransitioning: false }),
})) 