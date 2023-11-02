"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { default as Moon } from "@mui/icons-material/DarkModeOutlined";
import { default as Sun } from "@mui/icons-material/LightModeOutlined";
import { useTheme } from "next-themes";
import * as React from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 grid grid-cols-1 justify-items-center bg-background/10 shadow-sm shadow-foreground/40"
        >
          <Sun className="col-start-1 row-start-1 h-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-500" />
          <Moon className="col-start-1 row-start-1 h-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-500" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
