"use client";

import Color, { ColorLike } from "color";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
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
  ColorPickerHue,
  ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import {
  BrushCleaning,
  Circle,
  EllipsisVertical,
  Eraser,
  ImageUp,
  LineSquiggle,
  PencilLine,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DrawingCanvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [eraserWidth, setEraserWidth] = useState(8);
  const [strokeColor, setStrokeColor] = useState("#000000");

  const [uploadState, setUploadState] = useState("loading");

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

  function getSizeIconSize(size: number) {
    switch (size) {
      case 1:
        return "size-[8px]";
      case 2:
        return "size-[12px]";
      case 3:
        return "size-[16px]";
      case 4:
        return "size-[20px]";
      case 5:
        return "size-[24px]";
    }
  }

  async function handleSave() {
    const dataUrl = await canvasRef.current?.exportImage("png");
    if (!dataUrl) return;

    const payload = {
      dataUrl,
      createdAt: new Date().toISOString(),
      fileType: "image/png",
    };

    const res = await fetch("/api/upload-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const result = await res.json();
      // Optionally show a success message or handle result
      console.log("Upload success:", result);
      setUploadState("success");
    } else {
      // Optionally handle error
      console.error("Upload failed");
      setUploadState("error");
    }
  }

  function handleReset() {
    canvasRef.current?.resetCanvas();
  }

  return (
    <>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={strokeWidth}
        eraserWidth={eraserWidth}
        strokeColor={strokeColor}
        canvasColor="transparent"
      ></ReactSketchCanvas>
      <div className="absolute top-0 right-0 p-8">
        <Menubar className="py-8">
          <MenubarMenu>
            <MenubarTrigger className="p-4">
              <EllipsisVertical></EllipsisVertical>
            </MenubarTrigger>
            <MenubarContent>
              <div>
                <AlertDialog>
                  <AlertDialogTrigger
                    onClick={handleSave}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full rounded-md text-gray-500"
                  >
                    <ImageUp className="size-10" strokeWidth={1.5}></ImageUp>
                    <span className="text-black">Salvar</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        {uploadState === "loading" && "Salvando desenho..."}
                        {uploadState === "success" && "Seu desenho foi salvo!"}
                        {uploadState === "error" && "Erro"}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {uploadState === "error" &&
                          "Erro ao tentar salvar senho desenho, tente novamente."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      {(uploadState === "success" ||
                        uploadState === "error") && (
                        <AlertDialogAction
                          className="bg-purple-400"
                          onClick={() => setUploadState("loading")}
                        >
                          Continuar Desenhando!
                        </AlertDialogAction>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <MenubarItem onClick={handleReset} className="text-gray-800">
                <BrushCleaning
                  className="size-10"
                  strokeWidth={1.5}
                ></BrushCleaning>
                Limpar
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="absolute bottom-0 p-8">
        <Menubar className="py-18">
          <MenubarMenu>
            <ToggleGroup type="single" size={"lg"} defaultValue="0">
              <ToggleGroupItem
                className="py-16 px-8"
                value={"0"}
                onClick={handleStrokeClick}
              >
                <PencilLine className="size-12" strokeWidth={1.5}></PencilLine>
              </ToggleGroupItem>
              <ToggleGroupItem
                className="py-16 px-8"
                value={"1"}
                onClick={handleEraserClick}
              >
                <Eraser className="size-12" strokeWidth={1.5}></Eraser>
              </ToggleGroupItem>
            </ToggleGroup>

            {eraseMode ? (
              <Select
                onValueChange={handleEraserWidthChange}
                value={(eraserWidth / 4).toString()}
              >
                <SelectTrigger className="py-16 px-8 border-0">
                  <SelectValue
                    placeholder={
                      <Circle
                        className="size-2"
                        strokeWidth={1.5}
                        fill={"gray"}
                      ></Circle>
                    }
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((item, index) => {
                    return (
                      <SelectItem
                        className="py-8 px-8 border-0"
                        key={`item-${index}`}
                        value={item.toString()}
                      >
                        <Circle className={getSizeIconSize(item)}></Circle>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            ) : (
              <Select
                onValueChange={handleStrokeWidthChange}
                value={(strokeWidth / 4).toString()}
              >
                <SelectTrigger className="py-16 px-8 border-0">
                  <SelectValue
                    placeholder={
                      <Circle
                        className="size-2"
                        strokeWidth={1.5}
                        fill={"gray"}
                      ></Circle>
                    }
                  ></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((item, index) => {
                    return (
                      <SelectItem
                        className="py-8 px-8 border-0"
                        key={`item-${index}`}
                        value={item.toString()}
                      >
                        <Circle
                          className={getSizeIconSize(item)}
                          fill="gray"
                        ></Circle>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}

            <MenubarTrigger
              className={`px-8 py-10 ${eraseMode ? "opacity-20" : ""}`}
              disabled={eraseMode}
            >
              <LineSquiggle
                className="size-12"
                color={strokeColor}
                strokeWidth={1.5}
              ></LineSquiggle>
            </MenubarTrigger>
            <MenubarContent
              className="h-[400px] w-[360px]"
              onTouchMove={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <ColorPicker
                className="max-w-sm rounded-md border bg-background p-4 shadow-sm"
                onChange={(e) => handleColorChange(e)}
              >
                <ColorPickerSelection className="touch-none" />

                <div className="flex items-center gap-4">
                  <div className="grid w-full gap-1">
                    <ColorPickerHue />
                  </div>
                </div>
                {/* <div className="flex items-center gap-2">
                  <ColorPickerOutput />
                  <ColorPickerFormat />
                </div> */}
              </ColorPicker>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
}
