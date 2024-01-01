import { Actions } from "@/components/tree-view/reducer";
import { Dispatch, createContext } from "react";

export type OpenState = Map<string | number, boolean>;

type ContextType = {
  open: OpenState;
  dispatch: Dispatch<Actions>;

  selectedNodeId: string | number | null;
  selectNode: (id: string | number) => void;
};

export const TreeViewContext = createContext<ContextType>({
  open: new Map<string | number, boolean>(),
  dispatch: () => {},
  selectedNodeId: null,
  selectNode: () => {},
});
