export const state = () => ({
  darkMode: true,
  themeModules: "Dungeon",
  themeDungeons: "Dungeon",
  themeCreatures: "Microfigure",
  wantedList: [],
  userWantedList: [],
  showWalls: true,
  showSets: true,
  showMicrofigs: true,
  showMonsters: true,
  showRelatedItems: true,
  showWantedList: false,
  showXML: false,
  moduleSearch: "",
  showMenu: false,
  currentPage: null,
  showPremiumPopup: null,
  expensive: [
    "Cave_Subterranean_Mushrooms-1",
    "Cave_Subterranean_Mushrooms-2",
    "Pyramids_Decorative_Scarab-puzzle"
  ],
  premium: [
    "Castle",
    "Mansion",
    "Crypt",
    "Dragon Lair",
    "Mage Tower",
    "Sewers",
    "Pyramids"
  ]
});

export const getters = {
  isExpensive: state => id => {
    return state.expensive.find(item => item === id);
  },
  isPremium: state => id => {
    return state.premium.find(item => item === id);
  },
  getTotalModulesInWantedList(state) {
    let total = 0;
    state.wantedList.map(list => {
      total += list.total;
    });
    return total;
  },
  getTotalPartsInWantedList(state) {
    let total = 0;
    state.wantedList.map(list => {
      list.parts.map(part => {
        total += part.Qty * list.total;
      });
    });
    return total;
  },
  getPartList(state) {
    let partList = [];
    state.wantedList.map(list => {
      list.parts.map(part => {
        partList.push({
          itemType: list.type === "microfig" ? "M" : "P",
          itemId: part.BLItemNo,
          color: part.BLColorId,
          minQty: part.Qty * list.total
        });
      });
    });
    partList = [
      ...partList
        .reduce((r, o) => {
          const key = o.itemId + "-" + o.color;

          const item =
            r.get(key) ||
            Object.assign({}, o, {
              id: key,
              minQty: 0
            });
          item.minQty += o.minQty;

          return r.set(key, item);
        }, new Map())
        .values()
    ];
    return partList;
  },
  isWantedListBookmarked(state) {
    const objectsEqual = (o1, o2) =>
      typeof o1 === "object" && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length &&
          Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;
    return objectsEqual(state.wantedList, state.userWantedList);
  }
};

export const mutations = {
  SET_THEME(state, payload) {
    if (payload.type === "modules") {
      state.themeModules = payload.theme;
    } else if (payload.type === "dungeons") {
      state.themeDungeons = payload.theme;
    } else if (payload.type === "creatures") {
      state.themeCreatures = payload.theme;
    }
  },
  ADD_MODULE(state, payload) {
    if (state.premium.some(item => item === payload.theme)) {
      state.showPremiumPopup = payload.id;
    } else {
      let moduleExists = state.wantedList.find(item => item.id === payload.id);

      if (moduleExists) {
        state.wantedList.find(item => item.id === payload.id).total++;
      } else {
        state.wantedList.push({ ...payload, total: 1 });
      }
    }
  },
  REMOVE_MODULE(state, payload) {
    let moduleExists = state.wantedList.find(item => item.id === payload.id);

    if (moduleExists) {
      state.wantedList.find(item => item.id === payload.id).total > 1
        ? state.wantedList.find(item => item.id === payload.id).total--
        : state.wantedList.splice(
            state.wantedList.findIndex(item => item.id === payload.id),
            1
          );
    }
  },
  RESET_WANTEDLIST(state) {
    state.wantedList = [];
    state.showWantedList = false;
  },
  ADD_MAP(state, payload) {
    payload.modules.map(mod => {
      let moduleExists = state.wantedList.find(item => item.id === mod.id);
      if (moduleExists) {
        state.wantedList.find(item => item.id === mod.id).total += mod.total;
      } else {
        state.wantedList.push({ ...mod, total: mod.total });
      }
    });
  },
  SAVE_WANTEDLIST(state, payload) {
    if (payload) {
      state.userWantedList = payload;
    } else {
      const tempArray = JSON.parse(JSON.stringify(state.wantedList));
      const objectsEqual = (o1, o2) =>
        typeof o1 === "object" && Object.keys(o1).length > 0
          ? Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
          : o1 === o2;
      if (objectsEqual(state.wantedList, state.userWantedList)) {
        state.userWantedList = [];
        localStorage.setItem("userWantedList", null);
      } else {
        state.userWantedList = tempArray;
      }
    }
  },
  LOAD_WANTEDLIST(state) {
    const tempArray = JSON.parse(JSON.stringify(state.userWantedList));
    state.wantedList = tempArray;
  },
  TOGGLE_MODULE_SECTION(state, payload) {
    if (payload === "Walls and floor tiles") {
      state.showWalls = !state.showWalls;
    } else if (payload === "Item sets") {
      state.showSets = !state.showSets;
    } else if (payload === "Microfigs") {
      state.showMicrofigs = !state.showMicrofigs;
    } else if (payload === "Related items") {
      state.showRelatedItems = !state.showRelatedItems;
    } else {
      state.showMonsters = !state.showMonsters;
    }
  },
  TOGGLE_WANTEDLIST(state) {
    state.showWantedList = !state.showWantedList;
  },
  CLOSE_WANTEDLIST(state) {
    state.showWantedList = false;
  },
  TOGGLE_XML(state) {
    state.showXML = !state.showXML;
  },
  SET_MODULE_SEARCH(state, payload) {
    state.moduleSearch = payload;
  },
  SET_MENU(state, payload) {
    state.showMenu = payload;
  },
  SET_CURRENT_PAGE(state, payload) {
    state.currentPage = payload;
  },
  TOGGLE_DARK_MODE(state) {
    state.darkMode = !state.darkMode;
  },
  CLOSE_PREMIUM_POPUP(state) {
    state.showPremiumPopup = false;
  }
};

export const actions = {
  setTheme({ commit }, payload) {
    commit("SET_THEME", payload);
  },
  addModule({ commit }, payload) {
    commit("ADD_MODULE", payload);
  },
  removeModule({ commit }, payload) {
    commit("REMOVE_MODULE", payload);
  },
  resetWantedList({ commit }) {
    commit("RESET_WANTEDLIST");
  },
  addMap({ commit }, payload) {
    commit("ADD_MAP", payload);
  },
  saveWantedList({ commit }, payload) {
    commit("SAVE_WANTEDLIST", payload);
  },
  loadWantedList({ commit }) {
    commit("LOAD_WANTEDLIST");
  },
  toggleModuleSection({ commit }, payload) {
    commit("TOGGLE_MODULE_SECTION", payload);
  },
  toggleWantedList({ commit }) {
    commit("TOGGLE_WANTEDLIST");
  },
  closeWantedList({ commit }) {
    commit("CLOSE_WANTEDLIST");
  },
  toggleXML({ commit }) {
    commit("TOGGLE_XML");
  },
  setModuleSearch({ commit }, payload) {
    commit("SET_MODULE_SEARCH", payload);
  },
  setMenu({ commit }, payload) {
    commit("SET_MENU", payload);
  },
  setCurrentPage({ commit }, payload) {
    commit("SET_CURRENT_PAGE", payload);
  },
  toggleDarkMode({ commit }) {
    commit("TOGGLE_DARK_MODE");
  },
  closePremiumPopup({ commit }) {
    commit("CLOSE_PREMIUM_POPUP");
  }
};
