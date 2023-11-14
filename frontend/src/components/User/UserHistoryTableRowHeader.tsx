import {
  TableRow,
  TableCell,
  Typography,
  TableHead,
  TableSortLabel
} from '@mui/material';

interface UserHistoryTableRowHeaderProps {
  handleSort;
  sortConfig;
}

export const UserHistoryTableRowHeader = (
  props: UserHistoryTableRowHeaderProps
) => {
  const { handleSort, sortConfig } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell width="15%">
          <TableSortLabel
            active={sortConfig.key === 'completedAt'}
            direction={
              sortConfig.key === 'completedAt' ? sortConfig.direction : 'asc'
            }
            onClick={() => handleSort('completedAt')}
          >
            <Typography variant="subtitle2">Completed</Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell width="35%">
          <TableSortLabel
            active={sortConfig.key === 'questionTitle'}
            direction={
              sortConfig.key === 'questionTitle' ? sortConfig.direction : 'asc'
            }
            onClick={() => handleSort('questionTitle')}
          >
            <Typography variant="subtitle2">Question Name</Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell width="20%">
          <TableSortLabel
            active={sortConfig.key === 'candyBuddy'}
            direction={
              sortConfig.key === 'candyBuddy' ? sortConfig.direction : 'asc'
            }
            onClick={() => handleSort('candyBuddy')}
          >
            <Typography variant="subtitle2">Candy Buddy</Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell width="15%">
          <TableSortLabel
            active={sortConfig.key === 'language'}
            direction={
              sortConfig.key === 'language' ? sortConfig.direction : 'asc'
            }
            onClick={() => handleSort('language')}
          >
            <Typography variant="subtitle2">Language</Typography>
          </TableSortLabel>
        </TableCell>
        <TableCell width="15%">
          <TableSortLabel
            active={sortConfig.key === 'difficulty'}
            direction={
              sortConfig.key === 'difficulty' ? sortConfig.direction : 'asc'
            }
            onClick={() => handleSort('difficulty')}
          >
            <Typography variant="subtitle2">Difficulty</Typography>
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
