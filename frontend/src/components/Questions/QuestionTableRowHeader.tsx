import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableSortLabel,
  Popper,
  MenuItem,
  Menu,
  Paper,
  Fade,
  ListItemText,
  Checkbox,
  Button
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Categories } from '../../constants/enums';
import { useState } from 'react';

interface QuestionTableRowHeaderProps {
  sortConfig;
  handleSort;
  setSelectedCategoryIds;
  selectedCategoryIds;
}

export const QuestionTableRowHeader = (props: QuestionTableRowHeaderProps) => {
  const {
    sortConfig,
    handleSort,
    setSelectedCategoryIds,
    selectedCategoryIds
  } = props;

  const [categoryPopperAnchorEl, setCategoryPopperAnchorEl] = useState(null);

  const handleCategoryHeaderClick = (event) => {
    setCategoryPopperAnchorEl(
      categoryPopperAnchorEl ? null : event.currentTarget
    );
  };

  const handleClosePopper = () => {
    setCategoryPopperAnchorEl(null);
  };

  const handleCategoryClick = (event, categoryId) => {
    event.stopPropagation();
    const id = parseInt(categoryId, 10);
    selectedCategoryIds.includes(id)
      ? setSelectedCategoryIds(
          selectedCategoryIds.filter((item) => item !== id)
        )
      : setSelectedCategoryIds([...selectedCategoryIds, id]);
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell width="5%">
            <Button
              onClick={() => handleSort('id')}
              variant="outlined"
              sx={{ borderRadius: '12px' }}
            >
              <TableSortLabel
                active={sortConfig.key === 'id'}
                direction={
                  sortConfig.key === 'id' ? sortConfig.direction : 'asc'
                }
              >
                <Typography variant="subtitle2" noWrap>
                  ID
                </Typography>
              </TableSortLabel>
            </Button>
          </TableCell>
          <TableCell width="25%">
            <Button
              onClick={() => handleSort('title')}
              variant="outlined"
              sx={{ borderRadius: '12px' }}
            >
              <TableSortLabel
                active={sortConfig.key === 'title'}
                direction={
                  sortConfig.key === 'title' ? sortConfig.direction : 'asc'
                }
              >
                <Typography variant="subtitle2" noWrap>
                  Title
                </Typography>
              </TableSortLabel>
            </Button>
          </TableCell>
          <TableCell
            width="40%"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              onClick={handleCategoryHeaderClick}
              variant="outlined"
              sx={{ borderRadius: '12px' }}
            >
              <Typography variant="subtitle2" noWrap>
                Category
              </Typography>
              {selectedCategoryIds.length > 0 ? <FilterListIcon /> : null}
            </Button>
          </TableCell>
          <TableCell width="20%">
            <Button
              onClick={() => handleSort('complexity')}
              variant="outlined"
              sx={{
                borderRadius: '12px',
                justifyContent: 'start'
              }}
            >
              <TableSortLabel
                active={sortConfig.key === 'complexity'}
                direction={
                  sortConfig.key === 'complexity' ? sortConfig.direction : 'asc'
                }
              >
                <Typography variant="subtitle2" noWrap>
                  Complexity
                </Typography>
              </TableSortLabel>
            </Button>
          </TableCell>
          <TableCell width="10%">
            <Paper
              elevation={1}
              variant="outlined"
              sx={{
                borderRadius: '12px',
                borderColor: 'primary.main',
                padding: '6px 16px',
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle2" noWrap color="primary">
                ACTIONS
              </Typography>
            </Paper>
          </TableCell>
        </TableRow>
      </TableHead>
      <Popper
        open={Boolean(categoryPopperAnchorEl)}
        anchorEl={categoryPopperAnchorEl}
        placement="bottom"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Menu
                id="category-menu"
                keepMounted
                open={Boolean(categoryPopperAnchorEl)}
                onClose={handleClosePopper}
              >
                {Object.entries(Categories).map(([id, name]) => (
                  <MenuItem
                    key={id}
                    selected={selectedCategoryIds.includes(parseInt(id))}
                    onClick={(event) => {
                      handleCategoryClick(event, id);
                    }}
                  >
                    <Checkbox
                      checked={selectedCategoryIds.includes(parseInt(id))}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Menu>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
