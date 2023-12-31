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
  MenuProps,
  IconButton
} from '@mui/material';
import { useState } from 'react';
import { Categories } from '../../constants/enums';
import { toast } from 'react-toastify';
import { createQuestion } from '../../services/questions';
import CloseIcon from '@mui/icons-material/Close';

interface AddQuestionModalProps {
  setData: (data: QuestionSchema[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  questions: QuestionSchema[];
}

function AddQuestionModal(props: AddQuestionModalProps) {
  const questions = props.questions;
  const handleClose = () => props.setOpen(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: number]: string;
  }>({});
  const [complexity, setComplexity] = useState('Easy');
  const [validation, setValidation] = useState({
    title: '',
    body: ''
  });

  const addQuestion = async (question) => {
    await createQuestion({
      ...question,
      categories: Object.entries(question.categories).map(([key, value]) => ({
        id: parseInt(key, 10),
        name: value
      }))
    }).then(
      (res) => {
        question.id = res.data.question.id;
        console.log('Question created succesfully', res);
        props.setData([...questions, question]);
        toast('Question created successfully', { type: 'success' });
        setTitle('');
        setBody('');
        setSelectedCategories({});
        setComplexity('Easy');
      },
      (error) => {
        console.error('Error creating question', error);
        toast.warn('Error creating question', { type: 'error' });
      }
    );
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value as number[];
    const newSelectedCategories = value.reduce((acc, id) => {
      acc[id] = Categories[id];
      return acc;
    }, {} as { [key: number]: string });
    setSelectedCategories(newSelectedCategories);
  };

  const submitQuestion = async () => {
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

    const newQuestion = {
      title: title,
      body: body,
      categories: selectedCategories,
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

    await addQuestion(newQuestion);

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
    <Modal open={props.open} onClose={handleClose}>
      <Paper
        sx={{
          display: 'grid',
          gridRowGap: '20px',
          padding: '20px',
          margin: '10px 40px',
          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}
        >
          <Typography variant="h6">Add Question</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              marginLeft: 'auto'
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

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
            maxRows={12}
            sx={{ overflowY: 'auto' }}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="categories-label">Categories</InputLabel>
          <Select
            labelId="categories-label"
            id="categories-select"
            multiple
            value={Object.keys(selectedCategories)}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) =>
              selected.map((id) => Categories[id]).join(', ')
            }
            MenuProps={menuProps}
          >
            {Object.entries(Categories).map(([id, name]) => (
              <MenuItem key={id} value={id}>
                <Checkbox
                  checked={Object.keys(selectedCategories).includes(
                    id.toString()
                  )}
                />
                <ListItemText primary={name} />
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
  );
}

export default AddQuestionModal;
