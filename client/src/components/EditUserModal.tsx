import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Question } from "../api/questions";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  TextField,
  FormGroup,
  Checkbox,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { User } from "../api/users";

interface EditUserModalProps {
  editUser: (user: User) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  users: User[];
  user: User;
}

function EditUserModal(props: EditUserModalProps) {
  const { users, editUser, open, setOpen, user } = props;
  const handleClose = () => props.setOpen(false);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("Python");
  const [complexity, setComplexity] = useState("Easy");
  const [validation, setValidation] = useState({
    email: "",
  });

  const submitQuestion = () => {
    if (!email) {
      // lol cos setstate is async
      setValidation({ email: "" });
    } else if (!email) {
      setValidation({ ...validation, email: "Email can't be empty" });
    } else if (!password) {
    }
    if (!email) {
      return;
    }

    const newUser: User = {
      ...user,
      email: email,
      preferredLanguage: language,
      preferredComplexity: complexity,
    };

    editUser(newUser);
    handleClose();
  };

  return (
    <div>
      <Modal open={props.open} onClose={handleClose}>
        <Paper
          style={{
            display: "grid",
            gridRowGap: "20px",
            padding: "20px",
            margin: "10px 300px",
          }}
        >
          <Typography variant="h6">Edit User</Typography>

          <FormControl>
            <FormLabel error={!!validation.email}>Email*</FormLabel>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidation({ email: "" });
              }}
              error={!!validation.email}
              helperText={validation.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              value={password}
              hidden
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Preferred Language</FormLabel>
            <Select
              label="Preferred Language"
              value={language}
              onChange={(event: any) => {
                setLanguage(event.target.value as string);
              }}
              displayEmpty
            >
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Cpp">Cpp</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="Go">Go</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Preferred Question Complexity
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={complexity}
              onChange={(e) => setComplexity(e.target.value)}
              row
            >
              <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
            </RadioGroup>
          </FormControl>
          <Button variant={"contained"} onClick={submitQuestion}>
            Submit
          </Button>
        </Paper>
      </Modal>
    </div>
  );
}

export default EditUserModal;
