import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";

interface ColumnFilterMenuProps {
  columns: { key: string; label: string }[];
  visibleColumns: string[];
  onApply: (selected: string[]) => void;
  onReset: () => void;
}

const ColumnFilterMenu = ({
  columns,
  visibleColumns,
  onApply,
  onReset,
}: ColumnFilterMenuProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(visibleColumns);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 8, // slightly below icon
      });
    }
  };

  const handleOpen = () => {
    updatePosition();
    setOpen((o) => !o);
  };

  const handleToggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const handleApply = () => {
    onApply(selected);
    setOpen(false);
  };

  const handleReset = () => {
    onReset();
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.querySelector(".global-filter-menu");
      if (
        open &&
        menu &&
        !menu.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {open &&
        createPortal(
          <div
            className="global-filter-menu fixed z-[999999] bg-white dark:bg-gray-900 
            border border-gray-200 dark:border-gray-700 shadow-2xl rounded-xl w-64 p-4 
            text-sm animate-fadeIn"
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              transform: "translate(-50%, 0)",
            }}
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-2 text-center">
              Column Filter
            </h3>

            <div className="max-h-48 overflow-y-auto space-y-2 px-1">
              {columns.map((col) => (
                <label
                  key={col.key}
                  className="flex items-center space-x-2 text-[15px] text-gray-800 dark:text-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(col.key)}
                    onChange={() => handleToggle(col.key)}
                    className="accent-[#0042E4] scale-110"
                  />
                  <span>{col.label}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleReset}
                className="px-4 py-1.5 text-[14px] rounded-md border border-gray-300 dark:border-gray-600 
                hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-1.5 text-[14px] rounded-md bg-[#0042E4] text-white hover:bg-[#0032b0] transition"
              >
                Apply
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ColumnFilterMenu;
