import { OpenState } from "@/components/tree-view/context";

enum ActionTypes {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export type Actions = {
  type: ActionTypes;
  payload: {
    id: string | number;
  };
};

export const reducer = (state: OpenState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.OPEN:
      return new Map(state.set(action.payload.id, true));

    case ActionTypes.CLOSE:
      return new Map(state.set(action.payload.id, false));

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const actions = {
  open: (id: string): Actions => ({
    type: ActionTypes.OPEN,
    payload: { id },
  }),
  close: (id: string): Actions => ({
    type: ActionTypes.CLOSE,
    payload: { id },
  }),
};
