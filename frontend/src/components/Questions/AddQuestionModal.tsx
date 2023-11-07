import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { QuestionSchema } from '../../services/apiSchema';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
  MenuProps
} from '@mui/material';
import { useState } from 'react';
import { Category } from '../../constants/enums';

interface AddQuestionModalProps {
  addQuestion: (question: QuestionSchema) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  questions: QuestionSchema[];
}

function AddQuestionModal(props: AddQuestionModalProps) {
  const addQuestion = props.addQuestion;
  const questions = props.questions;
  const handleClose = () => props.setOpen(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [complexity, setComplexity] = useState('Easy');
  const [validation, setValidation] = useState({
    title: '',
    body: ''
  });

  const categoryLabels = Object.values(Category).filter(
    (value) => typeof value !== 'number'
  );

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(value);
  };

  const submitQuestion = () => {
    if (!title && !body) {
      setValidation({ title: '', body: '' });
    } else if (!title) {
      setValidation({ ...validation, title: "Title can't be empty" });
    } else if (!body) {
      setValidation({
        ...validation,
        body: "Body can't be empty"
      });
    }
    if (!title || !body) {
      return;
    }

    const newQuestion: QuestionSchema = {
      title: title,
      body: body,
      categories: [],
      complexity: complexity as 'Easy' | 'Medium' | 'Hard'
    };

    for (let question of questions) {
      if (question.title === newQuestion.title) {
        setValidation({
          ...validation,
          title: 'There already exists a question with the same title.'
        });
        return;
      }
    }

    addQuestion(newQuestion);
    handleClose();
  };

  const menuProps: Partial<MenuProps> = {
    PaperProps: {
      style: {
        maxHeight: '300px',
        overflow: 'auto',
        position: 'absolute',
        marginTop: '8px'
      }
    }
  };

  return (
    <div>
      <Modal open={props.open} onClose={handleClose}>
        <Paper
          style={
            {
              display: 'grid',
              gridRowGap: '20px',
              padding: '20px',
              margin: '10px 300px'
            } as React.CSSProperties
          }
        >
          <Typography variant="h6">Add Question</Typography>

          <FormControl>
            <FormLabel error={!!validation.title}>Question Title*</FormLabel>
            <TextField
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setValidation({ ...validation, title: '' });
              }}
              error={!!validation.title}
              helperText={validation.title}
            />
          </FormControl>
          <FormControl>
            <FormLabel error={!!validation.body}>Question Body*</FormLabel>
            <TextField
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                setValidation({ ...validation, body: '' });
              }}
              error={!!validation.body}
              helperText={validation.body}
              multiline
              minRows={4}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              labelId="categories-label"
              id="categories-select"
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={menuProps}
            >
              {categoryLabels.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox
                    checked={selectedCategories.indexOf(category) > -1}
                  />
                  <ListItemText primary={category} />
                </MenuItem>
              ))}
            </Select>
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
          <Button variant={'contained'} onClick={submitQuestion}>
            Submit
          </Button>
        </Paper>
      </Modal>
    </div>
  );
}

export default AddQuestionModal;
