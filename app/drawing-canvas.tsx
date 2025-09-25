"use client";

import Color, { ColorLike } from "color";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

export default function DrawingCanvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [eraserWidth, setEraserWidth] = useState(1);
  const [strokeColor, setStrokeColor] = useState("#000000");
  function handleStrokeClick() {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  }

  function handleEraserClick() {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  }

  function handleStrokeWidthChange(value: string) {
    setStrokeWidth(Number(value) * 4);
  }

  function handleEraserWidthChange(value: string) {
    setEraserWidth(Number(value) * 4);
  }

  function handleColorChange(value: ColorLike) {
    const color = new Color(value);
    setStrokeColor(color.hex());
  }
  return (
    <>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
        strokeColor={strokeColor}
      ></ReactSketchCanvas>
      <div className="absolute bottom-0 p-8">
        <Menubar className="h-16">
          <MenubarMenu>
            <ToggleGroup type="single" size={"lg"} defaultValue="0">
              <ToggleGroupItem value={"0"} onClick={handleStrokeClick}>
                Caneta
              </ToggleGroupItem>
              <ToggleGroupItem value={"1"} onClick={handleEraserClick}>
                Borracha
              </ToggleGroupItem>
            </ToggleGroup>
            {eraseMode ? (
              <Select onValueChange={handleEraserWidthChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Borracha 1"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <SelectItem key={`eraser-${index}`} value={item.toString()}>
                      Borracha {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select onValueChange={handleStrokeWidthChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Lápis 1"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((item, index) => (
                    <SelectItem key={`stroke-${index}`} value={item.toString()}>
                      Lápis {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <MenubarTrigger>Color</MenubarTrigger>
            <MenubarContent className="h-[400px]">
              <ColorPicker
                className="max-w-sm rounded-md border bg-background p-4 shadow-sm"
                onChange={(e) => handleColorChange(e)}
              >
                <ColorPickerSelection />
                <div className="flex items-center gap-4">
                  <ColorPickerEyeDropper />
                  <div className="grid w-full gap-1">
                    <ColorPickerHue />
                    <ColorPickerAlpha />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ColorPickerOutput />
                  <ColorPickerFormat />
                </div>
              </ColorPicker>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
