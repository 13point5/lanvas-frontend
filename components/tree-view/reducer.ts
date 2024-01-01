import { OpenState } from "@/components/tree-view/context";

enum ActionTypes {
  TOGGLE = "TOGGLE",
}

export type Actions = {
  type: ActionTypes;
  payload: {
    id: string | number;
  };
};

export const reducer = (state: OpenState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.TOGGLE: {
      const { id } = action.payload;
      const isOpen = state.get(id) ?? false;
      return new Map(state).set(id, !isOpen);
    }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const actions = {
  toggle: (id: string | number): Actions => ({
    type: ActionTypes.TOGGLE,
    payload: { id },
  }),
};
