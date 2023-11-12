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
} from "@mui/material";
import { useState } from "react";
import { User } from "../api/users";

interface AddUserModalProps {
  addUser: (email: string, password: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  users: User[];
}

function addUserModal(props: AddUserModalProps) {
  const { users, addUser, open, setOpen } = props;
  const handleClose = () => props.setOpen(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("Python");
  const [complexity, setComplexity] = useState("Easy");
  const [validation, setValidation] = useState({
    email: "",
    password: "",
  });

  const submitQuestion = () => {
    if (!email && !password) {
      // lol cos setstate is async
      setValidation({ email: "", password: "" });
    } else if (!email) {
      setValidation({ ...validation, email: "Email can't be empty" });
    } else if (!password) {
      setValidation({
        ...validation,
        password: "Password can't be empty",
      });
    }
    if (!email || !password) {
      return;
    }

    for (let u of users) {
      if (u.email === email) {
        setValidation({
          ...validation,
          email: "There already exists a user with the same email.",
        });
        return;
      }
    }

    addUser(email, password);
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
          <Typography variant="h6">Add Question</Typography>

          <FormControl>
            <FormLabel error={!!validation.email}>Email*</FormLabel>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidation({ ...validation, email: "" });
              }}
              error={!!validation.email}
              helperText={validation.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel error={!!validation.password}>Password*</FormLabel>
            <TextField
              value={password}
              hidden
              onChange={(e) => {
                setPassword(e.target.value);
                setValidation({ ...validation, password: "" });
              }}
              error={!!validation.password}
              helperText={validation.password}
            />
          </FormControl>
          <FormControl>
            <FormLabel error={!!validation.password}>
              Preferred Language
            </FormLabel>
            <TextField />
          </FormControl>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Preferred QuestionComplexity
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

export default addUserModal;
