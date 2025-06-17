import "./App.css";
import { ThemeProvider, useTheme } from "./components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor, ThermometerSnowflake } from "lucide-react";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <ThemeToggle />
        <Button>Click Me</Button>
      </div>
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Monitor className="h-4 w-4" />
      )}
    </Button>
  );
}

export default App;
