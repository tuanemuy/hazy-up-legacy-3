import { useState, useEffect, useRef } from "react";
import { useScreenStateContext } from "document";

import { Box } from "@/lib/style/system/jsx";

const CANVAS_SIZE = 6000;
const MAX_SCALE = 3;
const MIN_SCALE = 0.25;
const MAX_WIDTH = 3000;
const MIN_WIDTH = 300;

type ZoomableFrameProps = {
  onBlankClicked?: () => void;
  initialScale?: number;
  children: React.ReactNode;
};

export const ZoomableFrame = ({
  onBlankClicked,
  initialScale,
  children,
}: ZoomableFrameProps) => {
  const { width, setWidth } = useScreenStateContext();
  const [scale, setScale] = useState(initialScale || 1.0);

  const ref = useRef<HTMLDivElement>(null);
  const leftResizeBarRef = useRef<HTMLDivElement>(null!);
  const rightResizeBarRef = useRef<HTMLDivElement>(null!);
  const resizeDirectionRef = useRef<"left" | "right" | null>(null!);

  const [resizeDirection, setResizeDirection] = useState<
    "left" | "right" | null
  >(null);
  resizeDirectionRef.current = resizeDirection;

  const changeScale = (delta: number) => {
    setScale((prev) => {
      let newScale = prev;

      if (delta < 0) {
        newScale = prev < MAX_SCALE ? prev - delta : prev;
      } else {
        newScale = prev > MIN_SCALE ? prev - delta : prev;
      }

      return newScale;
    });
  };

  const onWheelHandler = (event: WheelEvent) => {
    event.preventDefault();

    if (/*Math.abs(event.wheelDeltaX) === 240*/ event.deltaX % 1 !== 0) {
      changeScale(event.deltaX * 0.01);
    } else if (/*Math.abs(event.wheelDeltaY) === 240*/ event.deltaY % 1 !== 0) {
      changeScale(event.deltaY * 0.01);
    } else {
      if (ref.current) {
        ref.current.scrollBy({
          top: event.deltaY / 2,
          left: event.deltaX / 2,
        });
      }
    }
  };

  const changeWidth = (delta: number, direction: "left" | "right") => {
    setWidth((prev) => {
      let newWidth = prev;
      if (direction === "left") {
        newWidth = prev - delta * 2;
      } else {
        newWidth = prev + delta * 2;
      }
      newWidth =
        newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH ? newWidth : prev;

      return newWidth;
    });
  };

  const getOnDownHandler = (direction: "left" | "right") => {
    return (e: any) => {
      e.stopPropagation();
      setResizeDirection(direction);
    };
  };

  const onUpHandler = (e: any) => {
    e.stopPropagation();
    setResizeDirection(null);
  };

  const onResizeHandler = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (resizeDirectionRef.current) {
      changeWidth(event.movementX, resizeDirectionRef.current);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("wheel", onWheelHandler);
      ref.current.addEventListener("pointermove", onResizeHandler);
      ref.current.addEventListener("pointerup", onUpHandler);

      ref.current.scroll({
        top: CANVAS_SIZE / 2,
        left: CANVAS_SIZE / 2,
      });
    }

    if (leftResizeBarRef.current && rightResizeBarRef.current) {
      leftResizeBarRef.current.addEventListener(
        "pointerdown",
        getOnDownHandler("left")
      );

      rightResizeBarRef.current.addEventListener(
        "pointerdown",
        getOnDownHandler("right")
      );
    }

    setResizeDirection(null);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("wheel", onWheelHandler);
        ref.current.removeEventListener("pointermove", onResizeHandler);
        ref.current.removeEventListener("pointerup", onUpHandler);
      }

      if (leftResizeBarRef.current) {
        leftResizeBarRef.current.removeEventListener(
          "pointerdown",
          getOnDownHandler("left")
        );
      }

      if (rightResizeBarRef.current) {
        rightResizeBarRef.current.removeEventListener(
          "pointerdown",
          getOnDownHandler("right")
        );
      }
    };
  }, []);

  return (
    <Box
      ref={ref}
      className="zoomable-frame"
      position="relative"
      w="100%"
      h="100%"
      bg="gray.200"
      overflow="scroll"
    >
      <Box
        position="relative"
        border={`${CANVAS_SIZE / 2}px solid transparent`}
        onMouseDown={() => {
          onBlankClicked && onBlankClicked();
        }}
      >
        <Box
          position="absolute"
          top="0"
          minH="900px"
          bgColor="white"
          onMouseDown={(e: any) => e.stopPropagation()}
          style={{
            width: `${width}px`,
            left: `calc(50vw - ${width / 2}px)`,
            transform: `scale(${scale})`,
          }}
        >
          <Box position="absolute" top="-4rem" left="0">
            <p>{width}px</p>
            <p>{scale * 100}%</p>
          </Box>

          <Box
            ref={leftResizeBarRef}
            position="absolute"
            h="100%"
            w="1rem"
            top="0"
            left="-1.5rem"
            bg="gray.50"
            borderRadius="3px"
            cursor="ew-resize"
          ></Box>

          <Box
            ref={rightResizeBarRef}
            position="absolute"
            h="100%"
            w="1rem"
            top="0"
            right="-1.5rem"
            bg="gray.50"
            borderRadius="3px"
            cursor="ew-resize"
          ></Box>

          {children}
        </Box>
      </Box>
    </Box>
  );
};
