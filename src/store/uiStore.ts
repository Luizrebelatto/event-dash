import { Store } from "@tanstack/store"

type UIState = {
  sidebarOpen: boolean
  selectedPhotoId: string | null
}

export const uiStore = new Store<UIState>({
  sidebarOpen: true,
  selectedPhotoId: null,
})

export function toggleSidebar() {
  uiStore.setState((state) => ({
    ...state,
    sidebarOpen: !state.sidebarOpen,
  }))
}

export function selectPhoto(photoId: string | null) {
  uiStore.setState((state) => ({
    ...state,
    selectedPhotoId: photoId,
  }))
}