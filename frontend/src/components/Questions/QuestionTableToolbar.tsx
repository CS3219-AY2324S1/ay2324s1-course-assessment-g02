import { Toolbar, Tooltip, Button, Grid, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface QuestionTableHeaderProps {
  user;
  setAddQuestionModalOpen: (open: boolean) => void;
  data;
  rowsPerPage;
  page;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const QuestionTableToolbar = (props: QuestionTableHeaderProps) => {
  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '10px 10px 10px 10px',
        height: '64px',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <Grid item>
          <Tooltip title="Add Question">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              disabled={
                props.user ? props.user.email !== 'admin@gmail.com' : true
              }
              onClick={() => props.setAddQuestionModalOpen(true)}
            >
              Add Question
            </Button>
          </Tooltip>
        </Grid>

        <Grid item sx={{ display: 'flex', alignItems: 'center' }}></Grid>

        <Grid item>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.data.length}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onPageChange={props.handleChangePage}
            onRowsPerPageChange={props.handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Toolbar>
  );
};
