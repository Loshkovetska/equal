import { observable, runInAction } from 'mobx'

const GlobalState = observable({
  menuIsOpen: false,
  cursorRefs: Array(),
  locoScroll: null,
  scrollRef: null,
  cursorRef: null,
  introRef: null,
})

export const changeMenuState = () => {
  runInAction(() => {
    GlobalState.menuIsOpen = !GlobalState.menuIsOpen
  })
}
export default GlobalState

