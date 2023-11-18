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

interface QuestionModalProps {
  updateQuestion: (question: Question) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  question: Question;
  questions: Question[];
}

function EditQuestionModal(props: QuestionModalProps) {
  const { updateQuestion, questions, question } = props;
  const handleClose = () => props.setOpen(false);
  const [title, setTitle] = useState(question.title);
  const [description, setDescription] = useState(question.description);
  const [categories, setCategories] = useState({
    Strings: false,
    "Data Structure": false,
    Algorithms: false,
    Arrays: false,
    Recursion: false,
    "Bit Manipulation": false,
    Databases: false,
    "Brain Teaser": false,
  });
  const [complexity, setComplexity] = useState(question.complexity);
  const [validation, setValidation] = useState({
    title: "",
    description: "",
  });

  // lol
  const categoryLabels = [
    "Strings",
    "Data Structure",
    "Algorithms",
    "Arrays",
    "Recursion",
    "Bit Manipulation",
    "Databases",
    "Brain Teaser",
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories({ ...categories, [e.target.name]: e.target.checked });
  };

  const submitQuestion = () => {
    if (!title && !description) {
      // lol cos setstate is async
      setValidation({ title: "", description: "" });
    } else if (!title) {
      setValidation({ ...validation, title: "Title can't be empty" });
    } else if (!description) {
      setValidation({
        ...validation,
        description: "Description can't be empty",
      });
    }
    if (!title || !description) {
      return;
    }

    const newQuestion: Question = {
      _id: question._id,
      title: title,
      description: description,
      categories: categoryLabels.filter((x) => (categories as any)[x]),
      complexity: complexity as "Easy" | "Medium" | "Hard",
    };

    updateQuestion(newQuestion);
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
          <Typography variant="h6">Edit Question</Typography>

          <FormControl>
            <FormLabel error={!!validation.title}>Question Title*</FormLabel>
            <TextField
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setValidation({ ...validation, title: "" });
              }}
              error={!!validation.title}
              helperText={validation.title}
            />
          </FormControl>
          <FormControl>
            <FormLabel error={!!validation.description}>
              Question Description*
            </FormLabel>
            <TextField
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setValidation({ ...validation, description: "" });
              }}
              error={!!validation.description}
              helperText={validation.description}
              multiline
              minRows={4}
            />
          </FormControl>
          <FormControl component="fieldset" variant="standard">
            <FormLabel>Categories</FormLabel>
            <FormGroup row>
              {categoryLabels.map((category: string) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={category}
                      checked={(categories as any)[category]}
                      onChange={handleCategoryChange}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Complexity
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
            Update
          </Button>
        </Paper>
      </Modal>
    </div>
  );
}

export default EditQuestionModal;
