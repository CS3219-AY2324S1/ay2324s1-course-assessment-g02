import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useInterval from '../../hooks/useInterval';
import { ProgrammingLanguages, Difficulties } from '../../constants/enums';
import { sessionText } from '../../constants/text';
import LoadingIndicator from '../../components/LoadingIndicator';
import SelectionMenu from '../../components/SelectionMenu';
import { deleteMatch, findMatch } from '../../services/match';
import { useAuth } from '../../components/Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 10,
  boxShadow: 24,
  p: 4
};

function MatchModal(props: { open; setOpen }): React.ReactElement {
  const { user } = useAuth();
  const [difficulty, setDifficulty] = useState(Difficulties.Easy);
  const [language, setLanguage] = useState(ProgrammingLanguages.Python);
  const [open, openModal] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    openModal(false);
    setIsRetrying(false);
    setCount(0);
    console.log(`Deleting match for ${user!.id}`);
    deleteMatch(user.id, difficulty, language).then(() => {
      console.log('Deleted match');
    });

    setIsSuccess(false);
    setIsLoading(true);
  };

  const successCloseModal = () => {
    openModal(false);
    setIsRetrying(false);
    setCount(0);
    setIsSuccess(true);
    setIsLoading(false);
    navigate('/interview');
  };

  useInterval(
    () => {
      if (count === 6) {
        setIsLoading(false);
        setIsSuccess(false);
        closeModal();
        toast.warn('Failed to find matching user');
        return;
      }

      console.log(`Counter: ${count}`);

      findMatch(user.id, difficulty, language).then((response) => {
        if (response.status) {
          setIsLoading(false);
          setIsSuccess(true);
          toast('🍭 Match found! 🍭');
          const sessionId = response.sessionId;
          sessionStorage.setItem(sessionId, JSON.stringify(response));
          console.log(`Found match for ${user.id}`);
          console.log('Session ID: ' + sessionId);
          successCloseModal();
        } else {
          setCount((count) => count + 1);
        }
      });
    },
    isRetrying ? 5000 : null
  );

  const DifficultyMenu = () => {
    return (
      <SelectionMenu
        header="Difficulty"
        items={Difficulties}
        value={difficulty}
        setValue={setDifficulty}
      />
    );
  };

  const LanguageMenu = () => {
    return (
      <SelectionMenu
        header="Language"
        items={ProgrammingLanguages}
        value={language}
        setValue={setLanguage}
      />
    );
  };

  const MatchButton = () => {
    return (
      <Button
        style={{
          marginTop: 60
        }}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          openModal(true);
          setIsRetrying(true);
        }}
      >
        Start coding!
      </Button>
    );
  };

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Box>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: 10,
            boxShadow: 18,
            p: 4
          }}
        >
          <Typography color="primary">{sessionText}</Typography>
          <DifficultyMenu />
          <LanguageMenu />
          <MatchButton />
        </Paper>
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={modalStyle}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <LoadingIndicator loading={isLoading} success={isSuccess} />
            <Typography color="primary" style={{ margin: '10px 0px' }}>
              Matching is in progress...
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </Box>
    </Modal>
  );
}

export default MatchModal;
