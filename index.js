import { registerRootComponent } from "expo";
import AppWrapper from "./src/AppWrapper";
import { ThemeProvider } from "./src/themes/ThemeContext";

function Main() {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  );
}

registerRootComponent(Main);
