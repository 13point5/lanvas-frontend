import clsx from "clsx";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import { ReactNode, useContext, useReducer } from "react";
import { actions, reducer } from "@/components/tree-view/reducer";
import { TreeViewContext } from "@/components/tree-view/context";

const PlaceholderIcon = () => <div className="w-4 h-4" />;

type NodeProps = {
  id: string | number;
  label: string;
  icons?: {
    open: ReactNode;
    close: ReactNode;
  };
  disableSelect?: boolean;
  alwaysOpen?: boolean;

  children?: ReactNode | ReactNode[];
};

export const Node = ({
  id,
  label,
  children,
  icons,
  disableSelect = false,
  alwaysOpen = false,
}: NodeProps) => {
  const { open, dispatch, selectedNodeId, selectNode } =
    useContext(TreeViewContext);
  const isOpen = alwaysOpen || open.get(id);

  return (
    <li className="flex flex-col">
      <div
        className={clsx(
          "flex items-center gap-2 px-1 cursor-pointer hover:bg-slate-100",
          selectedNodeId === id && "bg-blue-200 hover:bg-blue-200"
        )}
        onClick={() => {
          dispatch(actions.toggle(id));
          !disableSelect && selectNode(id);
        }}
      >
        {children ? (
          isOpen ? (
            <ChevronDownIcon size={16} />
          ) : (
            <ChevronRightIcon size={16} />
          )
        ) : (
          <PlaceholderIcon />
        )}

        {children ? (
          isOpen ? (
            !icons ? (
              <FolderOpenIcon size={16} />
            ) : (
              icons.open
            )
          ) : !icons ? (
            <FolderIcon size={16} />
          ) : (
            icons.close
          )
        ) : !icons ? (
          <PlaceholderIcon />
        ) : (
          icons.open // TODO: FIX THIS, it's so bleh
        )}

        <span>{label}</span>
      </div>

      {children && isOpen && <ul className="pl-4">{children}</ul>}
    </li>
  );
};

type RootProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  value: string | number | null;
  onChange: (id: string | number) => void;
};

export const Root = ({ children, className, value, onChange }: RootProps) => {
  const [open, dispatch] = useReducer(reducer, new Map<string, boolean>());

  return (
    <TreeViewContext.Provider
      value={{
        open,
        dispatch,
        selectedNodeId: value,
        selectNode: onChange,
      }}
    >
      <ul className={clsx("flex flex-col overflow-auto", className)}>
        {children}
      </ul>
    </TreeViewContext.Provider>
  );
};
