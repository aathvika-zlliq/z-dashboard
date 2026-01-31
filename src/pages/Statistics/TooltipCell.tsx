import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const TooltipCell = ({ label, value, tooltipData }: any) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement | null>(null);

  const update = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos({ x: r.left + r.width / 2, y: r.top - 8 });
  };

  useEffect(() => {
    if (!show) return;
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [show]);

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={() => {
          update();
          setShow(true);
        }}
        onMouseLeave={() => setShow(false)}
        className="cursor-pointer font-medium text-blue-600 dark:text-blue-400"
      >
        {value}
      </span>

      {show &&
        createPortal(
          <div
            className="fixed z-[999999] w-80 rounded-xl border 
                       bg-white dark:bg-gray-900 
                       border-gray-200 dark:border-gray-700 
                       shadow-2xl p-4 text-sm"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <h4 className="font-semibold mb-2 text-center">{label} Details</h4>
            <ul className="space-y-1">
              {Object.entries(tooltipData).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span>{k}</span>
                  <span className="font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
};

export default TooltipCell;
