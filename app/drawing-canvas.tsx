"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

export default function DrawingCanvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [eraserWidth, setEraserWidth] = useState(1);

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
  return (
    <>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
      ></ReactSketchCanvas>
      <div className="absolute bottom-0 p-8">
        <Menubar className="h-16">
          <MenubarMenu>
            <ToggleGroup type="single" size={"lg"}>
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
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
