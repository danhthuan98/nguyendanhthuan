import { Button } from "../src";

function App() {
  return (
    <>
      <div style={{ padding: 24, display: "flex", gap: 12 }}>
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button size="lg" variant="outline">
          Large
        </Button>
      </div>
    </>
  );
}

export default App;
