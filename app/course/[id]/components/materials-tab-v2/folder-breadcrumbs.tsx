import { ChevronRightIcon, FolderIcon } from "lucide-react";

type Props = {
  items: Array<{
    id: number;
    name: string;
  }>;
  onItemClick: (id: number | null) => void;
};

const FolderBreadcrumbs = ({ items, onItemClick }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <h4
        className={`text-lg font-semibold cursor-pointer ${
          items.length > 0 ? "text-gray-400" : "text-foreground"
        }`}
        onClick={() => onItemClick(null)}
      >
        Materials
      </h4>

      {items.length > 0 && (
        <ChevronRightIcon className="text-gray-400" size={18} />
      )}

      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <div key={item.id} className="flex gap-2 items-center">
            <h4
              onClick={() => {
                onItemClick(item.id);
              }}
              className={`text-lg font-semibold cursor-pointer ${
                isLastItem ? "text-foreground" : "text-gray-400"
              }`}
            >
              {item.name}
            </h4>
            {!isLastItem && (
              <ChevronRightIcon className="text-gray-400" size={18} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FolderBreadcrumbs;
