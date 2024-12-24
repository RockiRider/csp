import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";


export default function App() {

  const [count, setCount] = useState(0)

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 2, color: "#3f50b5" }}
        >
          Vite + Material UI + TS
        </Typography>
      </Box>
      <Button variant="contained" sx={{backgroundColor: "blue"}} onClick={() => setCount(count + 1)}>Count is {count}</Button>
    </Container>
  );
}
