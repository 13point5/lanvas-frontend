import clsx from "clsx";
import { ChevronRightIcon, FolderIcon } from "lucide-react";
import { ReactNode, useContext, useReducer } from "react";
import { reducer } from "@/components/tree-view/reducer";
import { TreeViewContext } from "@/components/tree-view/context";

type NodeType = {
  id: string | number;
  label: string;
};

type NodeProps = {
  node: NodeType;
  children: ReactNode | ReactNode[];
};

export const Node = ({ node: { id, label }, children }: NodeProps) => {
  console.log("id, label, children", id, label, children);
  const { open, dispatch, selectedNodeId, selectNode } =
    useContext(TreeViewContext);
  const isOpen = open.get(id);

  return (
    <li className="flex flex-col">
      <div className={clsx("flex items-center gap-2 px-1")}>
        <ChevronRightIcon size={16} />
        <FolderIcon size={16} />
        <span>{label}</span>
      </div>

      {children && <ul className="pl-4">{children}</ul>}

      {/* {children.length > 0 && (
        <ul className="pl-4">
          {children.map((node) => (
            <Node node={node} key={node.id} />
          ))}
        </ul>
      )} */}
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
