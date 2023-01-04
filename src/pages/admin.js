import React, { useState, useEffect } from 'react';
import UserDataService from '../services/services'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserAuth } from "../services/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from './header';
import Footer from './footer';


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Admin = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { logOut } = useUserAuth();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {

        getUsers();
        console.log(auth.currentUser);
        if (!auth.currentUser) {
              navigate("/2022/react/login");
        }
        // eslint-disable-next-line

    }, []);

    const getUsers = async () => {
        const data = await UserDataService.getAllUsers();
        // console.log(data.docs);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    const deleteHandler = async (id) => {
        UserDataService.deleteUser(id);
        getUsers();
    }
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/2022/react/login");
        } catch (error) {
            console.log(error.message);
        }
    };


    return (

        <div>
            <div className="container-fluid" style={{ minHeight: "86vh", padding: 0 }}>
            <Header />
                <Button variant="contained" onClick={handleLogout} style={{ marginRight: 0, float: 'right', backgroundColor: '#012b53', marginTop : '15px' }} >
                    Log out
                </Button>
                <div className='container' style={{ marginTop : 50,}}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>SL No.</StyledTableCell>
                                    <StyledTableCell align="center">First Name</StyledTableCell>
                                    <StyledTableCell align="center">Last Name</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center">Steps</StyledTableCell>
                                    <StyledTableCell align="center">Score</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : users
                                ).map((doc, index) => (
                                    <StyledTableRow key={doc.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center" component="th" scope="row">
                                            {doc.first_name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {doc.last_name}
                                        </StyledTableCell>
                                        <StyledTableCell  align="center">
                                            {doc.email}
                                        </StyledTableCell>
                                        <StyledTableCell  align="center">
                                            {doc.steps}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {doc.score}
                                        </StyledTableCell>
                                        <StyledTableCell  align="center">
                                        <Button component={Link} to={`/2022/react/edit/id:${doc.id}`} variant="contained" color="success" sx={{
                                                marginRight: '15px',
                                                minWidth : '20px',
                                                padding : '5px' ,
                                                marginBottom : '5px'
                                            }} >
                                                <EditIcon />
                                            </Button>
                                                <Button variant="contained" color="error" onClick={(e) => { if (window.confirm('Delete the item?')) { deleteHandler(doc.id) }; }} sx={{
                                                marginRight: '15px',
                                                minWidth : '20px',
                                                padding : '5px' 
                                            }}>
                                                <DeleteIcon/>
                                                </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={7}
                                        count={users.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>

                    {/* <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>SL No.</StyledTableCell>
                                    <StyledTableCell align="center">First Name</StyledTableCell>
                                    <StyledTableCell align="center">Last Name</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center">Steps</StyledTableCell>
                                    <StyledTableCell align="center">Score</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((doc, index) => {
                                    return (
                                        <StyledTableRow key={doc.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {index + 1}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{doc.first_name}</StyledTableCell>
                                            <StyledTableCell align="center">{doc.last_name}</StyledTableCell>
                                            <StyledTableCell align="center">{doc.email}</StyledTableCell>
                                            <StyledTableCell align="center">{doc.steps}</StyledTableCell>
                                            <StyledTableCell align="center">{doc.score}</StyledTableCell>
                                            <StyledTableCell align="center"><Button component={Link} to={`/2022/react/edit/id:${doc.id}`} variant="contained" color="success" sx={{
                                                marginRight: '15px',
                                            }} >
                                                Edit
                                            </Button>
                                                <Button variant="contained" color="error" onClick={(e) => { if (window.confirm('Delete the item?')) { deleteHandler(doc.id) }; }}>
                                                    Delete
                                                </Button></StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer> */}




                </div>
            </div>

            <Footer />


        </div>







    );

}


export default Admin;