import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useInterval from '../../hooks/useInterval';
import { ProgrammingLanguages, Difficulties } from '../../constants/enums';
import { sessionText } from '../../constants/text';
import LoadingIndicator from '..//LoadingIndicator';
import SelectionMenu from '../SelectionMenu';
import { deleteMatch, findMatch } from '../../services/match';
import { useNavigate } from 'react-router-dom';
import useUserSession from '../../hooks/useUserSession';

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

function MatchModal(props: {
  user;
  sessionUser;
  open;
  setOpen;
}): React.ReactElement {
  const sessionuser = props.sessionUser;
  const difficultyOptions = Object.values(Difficulties);
  const user = props.user;
  const [difficulty, setDifficulty] = useState(user.userPreferredComplexity);
  const [language, setLanguage] = useState(
    user ? user.userPreferredLanguage : ProgrammingLanguages.Python
  );
  const [open, openModal] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const data = useUserSession(sessionuser.id);

  const CloseModal = async () => {
    console.log(`Deleting match for ${sessionuser!.id}`);

    const { session, isLoading } = data;
    console.log(session);

    if (isLoading) {
      console.log('Waiting for session data to load...');
    } else {
      openModal(false);
      setIsRetrying(false);
      setCount(0);
      if (session.sessionId == '') {
        // If there is no session, delete the match
        deleteMatch(sessionuser.id, difficulty, language).then(() => {
          console.log('Deleted match');
        });
      } else {
        setIsSuccess(false);
        setIsLoading(true);
        // navigate('/interview');
      }
    }
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
      if (count === 30) {
        setIsLoading(false);
        setIsSuccess(false);
        CloseModal();
        toast.warn('Failed to find matching user');
        return;
      }

      console.log(`Counter: ${count}`);

      findMatch(sessionuser.id, difficulty, language).then((response) => {
        console.log('response', response);
        if (response.status) {
          setIsLoading(false);
          setIsSuccess(true);
          toast('🍭 Match found! 🍭');
          const sessionId = response.sessionId;
          sessionStorage.setItem(sessionId, JSON.stringify(response));
          console.log(`Found match for ${sessionuser.id}`);
          console.log('Session ID: ' + sessionId);
          successCloseModal();
        } else {
          setCount((count) => count + 1);
        }
      });
    },
    isRetrying ? 1000 : null
  );

  const DifficultyMenu = () => {
    return (
      <SelectionMenu
        header="Difficulty"
        items={difficultyOptions}
        value={difficulty}
        setValue={setDifficulty}
      />
    );
  };

  const LanguageMenu = () => {
    return (
      <SelectionMenu
        header="Language"
        items={Object.values(ProgrammingLanguages)}
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
          onClose={CloseModal}
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
              onClick={CloseModal}
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
